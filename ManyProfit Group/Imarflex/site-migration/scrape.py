"""
Imarflex.net product catalog scraper.

Site is Shopline-hosted, SSR-rendered.  We can scrape with plain HTTP.

Output: products.csv with columns:
  category_slug, category_name, product_url, product_slug, name, model,
  price_hkd, hero_image, gallery_images (|-separated), description_html,
  description_text
"""
from __future__ import annotations
import csv, json, re, sys, time, urllib.parse as up
from pathlib import Path
import requests
from bs4 import BeautifulSoup

BASE = "https://imarflex.net"
HOME = f"{BASE}/"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
OUT_DIR = Path("/tmp/imarflex_scrape")
CACHE_DIR = OUT_DIR / "cache"
CACHE_DIR.mkdir(exist_ok=True)

session = requests.Session()
session.headers.update({"User-Agent": UA, "Accept-Language": "zh-HK,zh;q=0.9,en;q=0.8"})


def fetch(url: str, *, force: bool = False) -> str:
    """GET with on-disk cache so reruns are fast and polite."""
    key = re.sub(r"[^A-Za-z0-9._-]", "_", url)[-180:]
    path = CACHE_DIR / f"{key}.html"
    if path.exists() and not force:
        return path.read_text("utf-8")
    for attempt in range(3):
        try:
            r = session.get(url, timeout=30, verify=False)
            r.raise_for_status()
            path.write_text(r.text, encoding="utf-8")
            time.sleep(0.5)
            return r.text
        except Exception as e:
            print(f"  retry {attempt+1}: {e}", file=sys.stderr)
            time.sleep(2 ** attempt)
    raise RuntimeError(f"failed: {url}")


def get_categories() -> list[dict]:
    """Return [{slug, name}] from homepage nav."""
    html = fetch(HOME)
    soup = BeautifulSoup(html, "lxml")
    out, seen = [], set()
    # Anchor-rooted: only navigation links, skip slug-IDs (ObjectId-looking)
    for a in soup.select('a[href^="/categories/"]'):
        href = a.get("href", "").strip()
        slug = href.rsplit("/", 1)[-1].split("?")[0]
        if not slug or slug in seen:
            continue
        # skip raw ObjectId slugs (duplicates with named ones)
        if re.fullmatch(r"[0-9a-f]{24}", slug):
            continue
        name = a.get_text(strip=True) or slug
        seen.add(slug)
        out.append({"slug": slug, "name": name})
    return out


def parse_listing(html: str, category_slug: str) -> list[dict]:
    """Extract products from a category page."""
    soup = BeautifulSoup(html, "lxml")
    out = []
    for item in soup.select(".product-item"):
        a = item.select_one('a[href*="/products/"]')
        if not a:
            continue
        href = a["href"]
        # normalise to imarflex.net + un-encode slug
        path = up.urlparse(href).path
        url = up.urljoin(BASE, path)
        slug = up.unquote(path.rsplit("/", 1)[-1])
        # name + sku from ga-product JSON if present
        name, sku = "", ""
        ga = a.get("ga-product") or a.get("data-ga-product")
        if ga:
            try:
                gj = json.loads(ga.replace("\\u0026amp;quot;", '"').replace("&amp;quot;", '"'))
                name = gj.get("title", "")
                sku = gj.get("sku", "")
            except Exception:
                pass
        if not name:
            img = item.select_one("img[alt]")
            if img:
                name = img.get("alt", "")
        name = (name or "").replace("&amp;quot;", '"').replace("&quot;", '"').replace("&amp;", "&")
        # price (item-scoped — Shopline renders text in .price / .price-sale)
        price = ""
        for sel in (".price-sale", ".price__sale", ".price.price-sale",
                    ".price__regular", ".price", ".sl-price"):
            pe = item.select_one(sel)
            if pe and pe.get_text(strip=True):
                price = pe.get_text(strip=True)
                break
        if not price:
            pe = item.select_one("[data-currency-hkd]")
            if pe:
                price = pe.get("data-currency-hkd", "")
        img = item.select_one("img")
        thumb = ""
        if img:
            srcset = img.get("data-srcset") or img.get("srcset", "")
            if srcset:
                cands = [s.strip().split() for s in srcset.split(",") if s.strip()]
                cands = [c for c in cands if c]
                if cands:
                    thumb = cands[-1][0]
            if not thumb:
                thumb = img.get("data-original", "") or img.get("src", "")
        out.append({
            "category_slug": category_slug,
            "product_url": url,
            "product_slug": slug,
            "name_listing": name,
            "sku_listing": sku,
            "price_hkd_listing": price,
            "thumb": thumb,
        })
    return out


def parse_pdp(html: str) -> dict:
    """Extract PDP fields."""
    soup = BeautifulSoup(html, "lxml")
    # name
    og_title = soup.find("meta", property="og:title")
    name = og_title["content"] if og_title else ""
    name = name.replace("&quot;", '"').replace("&amp;", "&")
    # price (current displayed price — Shopline PDP)
    price = ""
    info = soup.select_one(".ProductDetail-product-info") or soup
    for sel in (".price-sale", ".price__sale", ".price-regular",
                ".price__regular", ".price", ".sl-price"):
        pe = info.select_one(sel)
        if pe and pe.get_text(strip=True):
            price = pe.get_text(strip=True)
            break
    if not price:
        el = soup.select_one("[data-currency-hkd]")
        if el:
            price = el.get("data-currency-hkd", "")
    # hero image
    og_img = soup.find("meta", property="og:image")
    hero = og_img["content"] if og_img else ""
    # description block
    desc_div = soup.select_one(".ProductDetail-description")
    desc_html = ""
    desc_text = ""
    if desc_div:
        # strip the title wrapper
        for t in desc_div.select(".ProductDetail-title"):
            t.decompose()
        desc_html = desc_div.decode_contents().strip()
        desc_text = desc_div.get_text(" ", strip=True)
    # gallery (the 了解更多 image list — Shopline puts spec sheets here)
    gallery = []
    for g in soup.select(".ProductDetail-gallery img"):
        srcset = g.get("data-srcset") or g.get("srcset") or ""
        if srcset:
            # take the largest in the srcset
            candidates = [s.strip().split() for s in srcset.split(",") if s.strip()]
            candidates = [c for c in candidates if c]
            if candidates:
                gallery.append(candidates[-1][0])
        elif g.get("data-original"):
            gallery.append(g["data-original"])
        elif g.get("src"):
            gallery.append(g["src"])
    # model — try to pull from URL slug tail or name
    return {
        "name": name,
        "price_hkd": price,
        "hero_image": hero,
        "gallery": gallery,
        "description_html": desc_html,
        "description_text": desc_text,
    }


def extract_model(slug: str, name: str) -> str:
    """Best-effort model code extraction (e.g. IRC-IH40, IFT-A30N)."""
    # try uppercase pattern in name
    m = re.search(r"\b([A-Z]{2,5}-[A-Z0-9]{2,10}[A-Z0-9-]*)\b", name)
    if m:
        return m.group(1)
    # from slug
    parts = slug.split("-")
    for i in range(len(parts) - 1, -1, -1):
        if re.fullmatch(r"[a-z]{2,5}", parts[i]) and i + 1 < len(parts):
            tail = "-".join(parts[i:]).upper()
            if re.match(r"^[A-Z]{2,5}-", tail):
                return tail
    return ""


def main():
    # Disable urllib3 cert warnings (we use verify=False because earlier curl needed -k)
    requests.packages.urllib3.disable_warnings()

    print("[1/4] Listing categories...")
    cats = get_categories()
    print(f"  {len(cats)} categories")
    with open(OUT_DIR / "categories.json", "w") as f:
        json.dump(cats, f, ensure_ascii=False, indent=2)

    print("[2/4] Walking category listings...")
    listings: list[dict] = []
    for i, c in enumerate(cats, 1):
        url = f"{BASE}/categories/{c['slug']}"
        try:
            html = fetch(url)
            items = parse_listing(html, c["slug"])
            print(f"  ({i}/{len(cats)}) {c['slug']}: {len(items)} products")
            for it in items:
                it["category_name"] = c["name"]
            listings.extend(items)
        except Exception as e:
            print(f"  ({i}/{len(cats)}) {c['slug']}: ERROR {e}")

    # dedupe: keep all category memberships per product
    by_slug: dict[str, dict] = {}
    cat_membership: dict[str, list[tuple[str, str]]] = {}
    for it in listings:
        s = it["product_slug"]
        cat_membership.setdefault(s, []).append((it["category_slug"], it["category_name"]))
        if s not in by_slug:
            by_slug[s] = it
    print(f"  {len(by_slug)} unique products across categories")

    print("[3/4] Fetching PDPs...")
    products: list[dict] = []
    for i, (slug, base_it) in enumerate(by_slug.items(), 1):
        try:
            html = fetch(base_it["product_url"])
            pdp = parse_pdp(html)
            cats_for_p = cat_membership[slug]
            cat_slugs = "|".join(c[0] for c in cats_for_p)
            cat_names = "|".join(c[1] for c in cats_for_p)
            row = {
                "category_slug": cat_slugs,
                "category_name": cat_names,
                "product_url": base_it["product_url"],
                "product_slug": slug,
                "name": pdp["name"] or base_it["name_listing"],
                "model": base_it.get("sku_listing") or extract_model(slug, pdp["name"] or base_it["name_listing"]),
                "price_hkd": pdp["price_hkd"] or base_it["price_hkd_listing"],
                "hero_image": pdp["hero_image"] or base_it.get("thumb", ""),
                "gallery_images": "|".join(pdp["gallery"]),
                "description_html": pdp["description_html"],
                "description_text": pdp["description_text"],
            }
            products.append(row)
            if i % 20 == 0 or i == len(by_slug):
                print(f"  ({i}/{len(by_slug)}) {slug}")
        except Exception as e:
            print(f"  ({i}/{len(by_slug)}) {slug}: ERROR {e}")

    print("[4/4] Writing CSV...")
    fields = ["category_slug", "category_name", "product_url", "product_slug",
              "name", "model", "price_hkd", "hero_image", "gallery_images",
              "description_text", "description_html"]
    out_csv = OUT_DIR / "imarflex_products.csv"
    with open(out_csv, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=fields, quoting=csv.QUOTE_ALL)
        w.writeheader()
        for r in products:
            w.writerow(r)
    print(f"  wrote {len(products)} rows -> {out_csv}")

    # also dump JSON for fidelity
    with open(OUT_DIR / "imarflex_products.json", "w") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
