import os
from playwright.sync_api import sync_playwright

OUT = os.path.expanduser("~/mobbin-pdp/live-appliances")
os.makedirs(OUT, exist_ok=True)

SITES = [
    ("dyson",    "https://www.dyson.com/"),
    ("fortress", "https://www.fortress.com.hk/"),
    ("broadway", "https://www.broadwaylifestyle.com/"),
    ("panasonic","https://www.panasonic.com/hk/"),
]

UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")

def full_scroll(page):
    """Scroll section-by-section so lazy images intersect and load."""
    y, step = 0, 600
    height = page.evaluate("document.body.scrollHeight")
    while y < height:
        page.evaluate(f"window.scrollTo(0,{y})")
        page.wait_for_timeout(550)
        height = page.evaluate("document.body.scrollHeight")  # page may grow
        y += step
    page.evaluate("window.scrollTo(0,0)")
    try:
        page.wait_for_load_state("networkidle", timeout=9000)
    except Exception:
        pass
    page.wait_for_timeout(2500)

def grab(page, name, url):
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=60000)
    except Exception as e:
        return f"{name}: GOTO FAIL {type(e).__name__}: {str(e)[:100]}"
    page.wait_for_timeout(3500)
    full_scroll(page)
    path = os.path.join(OUT, f"{name}.png")
    try:
        page.screenshot(path=path, full_page=True)
        sz = os.path.getsize(path) // 1024
        dim = page.evaluate("[document.documentElement.scrollWidth, document.body.scrollHeight]")
        return f"{name}: OK {sz}KB  page={dim[0]}x{dim[1]}  title={page.title()[:48]!r}"
    except Exception as e:
        return f"{name}: SHOT FAIL {type(e).__name__}: {str(e)[:100]}"

results = []
with sync_playwright() as p:
    browser = p.chromium.launch(
        executable_path="/usr/bin/chromium",
        headless=True,
        args=["--no-sandbox", "--disable-blink-features=AutomationControlled"],
    )
    ctx = browser.new_context(
        viewport={"width": 1440, "height": 900},
        user_agent=UA, locale="en-US",
    )
    # light stealth: hide webdriver flag
    ctx.add_init_script("Object.defineProperty(navigator,'webdriver',{get:()=>undefined})")
    page = ctx.new_page()
    for name, url in SITES:
        results.append(grab(page, name, url))
        print(results[-1], flush=True)
    browser.close()

print("\n=== SUMMARY ===")
for r in results:
    print(r)
