import sys, os
from playwright.sync_api import sync_playwright

OUT = os.path.expanduser("~/mobbin-pdp/live-appliances")
os.makedirs(OUT, exist_ok=True)

SITES = [
    ("dyson",   "https://www.dyson.com/"),
    ("samsung", "https://www.samsung.com/us/"),
    ("fortress","https://www.fortress.com.hk/"),
    ("bestbuy", "https://www.bestbuy.com/"),
]

UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36")

def grab(page, name, url):
    try:
        page.goto(url, wait_until="domcontentloaded", timeout=60000)
    except Exception as e:
        return f"{name}: GOTO FAIL {type(e).__name__}: {str(e)[:120]}"
    page.wait_for_timeout(3000)
    # scroll to bottom to trigger lazy loading
    prev = -1
    for _ in range(40):
        h = page.evaluate("document.body.scrollHeight")
        page.mouse.wheel(0, 1400)
        page.wait_for_timeout(350)
        if h == prev:
            break
        prev = h
    page.evaluate("window.scrollTo(0,0)")
    page.wait_for_timeout(1500)
    path = os.path.join(OUT, f"{name}.png")
    try:
        page.screenshot(path=path, full_page=True)
        sz = os.path.getsize(path)
        dim = page.evaluate("[document.documentElement.scrollWidth, document.body.scrollHeight]")
        return f"{name}: OK {sz//1024}KB  page={dim[0]}x{dim[1]}  title={page.title()[:50]!r}"
    except Exception as e:
        return f"{name}: SHOT FAIL {type(e).__name__}: {str(e)[:120]}"

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
    page = ctx.new_page()
    for name, url in SITES:
        results.append(grab(page, name, url))
        print(results[-1], flush=True)
    browser.close()

print("\n=== SUMMARY ===")
for r in results:
    print(r)
