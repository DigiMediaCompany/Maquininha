import requests
from bs4 import BeautifulSoup
import re
import time
# ================= CONFIG =================
BASE_URL = "https://www.maquininha.com.br/recents/page/{}/"  #  URL to fetch HTML content from
API_ENDPOINT = "https://d1-admin.vinhdtq123123123.workers.dev/maquininha/articles?bulk=true"

# ================= SCRAPE PAGE =================
def scrape_page(html):
    soup = BeautifulSoup(html, "html.parser")
    items = soup.select("div.article-home-machine.recent")
    results = []

    for item in items:
        thumb_elem = item.select_one("a.article-home-machine-thumb img")
        thumb = thumb_elem["src"] if thumb_elem else ""

        category_elem = item.select_one("div.article-category-home-machine a.article-category-item")
        category = category_elem.text.strip() if category_elem else ""

        metadata_elem = item.select_one("div.article-meta-data")
        date, duration = "", ""
        if metadata_elem:
            parts = [p.strip() for p in metadata_elem.text.split("•")]
            date = parts[0] if len(parts) > 0 else ""
            duration = parts[1] if len(parts) > 1 else ""

        link_elem = item.select_one("h3 a.article-link")
        link = link_elem["href"] if link_elem else ""
        title = link_elem.get("title", "") if link_elem else ""

        results.append({
            "thumbnail": thumb,
            "category": category,
            "link": link,
            "title": title,
            "date": date,
            "duration": duration
        })

    return results

# ================= SCRAPE DETAIL =================
def scrape_detail(html):
    soup = BeautifulSoup(html, "html.parser")

    # remove unwanted selectors
    remove_selectors = [
        "a.cta-block.button.expanded",
        "div.cta-block-content-list",
        "div#av_top_wrapper"
    ]
    for sel in remove_selectors:
        for el in soup.select(sel):
            el.decompose()

    content_elem = soup.select_one("article.single-article")
    if content_elem:
        return re.sub(r'\s+', ' ', str(content_elem)).strip()
    return ""

# ================= MAIN =================
all_articles = []
MAX_RETRIES = 3
RETRY_DELAY = 2
for page in range(6, 8):
    print(f"Scraping page {page}...")

    # Retry logic for page request
    for attempt in range(1, MAX_RETRIES + 1):
        resp = requests.get(BASE_URL.format(page))
        if resp.status_code == 200:
            break
        else:
            print(f"❌ Attempt {attempt} failed for page {page} (status {resp.status_code})")
            if attempt < MAX_RETRIES:
                print("   Retrying...")
                time.sleep(RETRY_DELAY)
            else:
                print("   Skipping this page after max retries.")
                resp = None

    if not resp or resp.status_code != 200:
        continue

    page_results = scrape_page(resp.text)

    # Scrape details for each article
    for r in page_results:
        if r["link"]:
            for attempt in range(1, MAX_RETRIES + 1):
                print(f"  Scraping detail: {r['link']} (Attempt {attempt})")
                detail_resp = requests.get(r["link"])
                if detail_resp.status_code == 200:
                    
                    r["content"] = scrape_detail(detail_resp.text)
                    break
                else:
                    print(f"❌ Attempt {attempt} failed for detail {r['link']} (status {detail_resp.status_code})")
                    if attempt < MAX_RETRIES:
                        print("   Retrying...")
                    else:
                        r["content"] = ""

    # Upload **this page only**
    print(f"Uploading {len(page_results)} articles from page {page}...")
    upload_resp = requests.post(API_ENDPOINT, json=page_results)
    if upload_resp.status_code in (200, 201):
        print(f"✅ Page {page} upload successful!")
    else:
        print(f"❌ Page {page} upload failed: {upload_resp.status_code}, {upload_resp.text}")
