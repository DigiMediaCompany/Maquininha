import requests
from bs4 import BeautifulSoup
import re
import os
from dotenv import load_dotenv
import time
import unicodedata
load_dotenv()

MAQUININHA_URL = os.getenv("MAQUININHA_URL")
MAQUININHA_MACHINES_API_ENDPOINT = os.getenv("MAQUININHA_MACHINES_API_ENDPOINT")
# ================= SLUGIFY FUNCTION =================
def slugify(text):
    # Normalize Unicode (remove accents)
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    # Lowercase
    text = text.lower()
    # Replace any non-alphanumeric character with '-'
    text = re.sub(r'[^a-z0-9]+', '-', text)
    # Strip leading/trailing '-'
    text = text.strip('-')
    return text
# ================= SCRAPE PAGE =================
def scrape_page_from_html(html):
    """
    Parse the main page HTML and extract machine items with title, thumbnail, and detail link.
    """
    soup = BeautifulSoup(html, "html.parser")
    items = soup.select("li.orbit-slide")
    results = []

    for item in items:
        try:
            # Extract link and thumbnail
            link_elem = item.select_one("div.machine-emphasis-header-image a")
            thumb_elem = link_elem.select_one("img") if link_elem else None
            thumb = thumb_elem["src"] if thumb_elem else ""
            title = link_elem.get("title", "") if link_elem else ""

            # Extract detail page link
            detail_link_elem = item.select_one("div.machine-emphasis-topline-cta a[href*='/maquininha/']")
            link = detail_link_elem["href"] if detail_link_elem else ""
        except:
            title, thumb, link = "", "", ""

        # Only include items with all required fields
        if title and thumb and link:
            results.append({
                "link": link,
                "slug": slugify(title),
                "thumbnail": thumb,
                "title": title
            })

    return results

# ================= SCRAPE DETAIL =================
def scrape_detail_structured(html):
    """
    Extract structured HTML content from the detail page.
    Removes known advertisement sections.
    """
    soup = BeautifulSoup(html, "html.parser")

    # Remove advertisement sections if present
    ad_ids = ["av_top_wrapper", "av_top_1_wrapper", "av_content_1_wrapper", "av_content_2_wrapper"]
    for ad_id in ad_ids:
        el = soup.find(id=ad_id)
        if el:
            el.decompose()

    # Take first two <section> elements as main content
    sections = soup.find_all("section")[:2]
    section_html = []
    for sec in sections:
        # Minify whitespace
        html_str = re.sub(r'\s+', ' ', str(sec)).strip()
        section_html.append(html_str)

    return " ".join(section_html)

# Fetch the main page
MAX_RETRIES = 3
RETRY_DELAY = 2  # seconds

# ================= MAIN =================
# Fetch the main page with retries
for attempt in range(1, MAX_RETRIES + 1):
    response = requests.get(MAQUININHA_URL.format(1))
    if response.status_code == 200:
        break
    else:
        print(f"❌ Attempt {attempt} failed to fetch main page (status {response.status_code})")
        if attempt < MAX_RETRIES:
            print(f"   Retrying in {RETRY_DELAY}s...")
            time.sleep(RETRY_DELAY)
        else:
            print("   Max retries reached. Exiting.")
            exit()

# Parse main page and extract machine items
page_results = scrape_page_from_html(response.text)

# Scrape detail content for each machine with retries
for r in page_results:
    if r["link"]:
        for attempt in range(1, MAX_RETRIES + 1):
            print(f"  Scraping detail: {r['link']} (Attempt {attempt})")
            detail_resp = requests.get(r["link"])
            if detail_resp.status_code == 200:
                r["content"] = scrape_detail_structured(detail_resp.text)
                break
            else:
                print(f"❌ Failed to fetch detail page (status {detail_resp.status_code})")
                if attempt < MAX_RETRIES:
                    print(f"   Retrying in {RETRY_DELAY}s...")
                    time.sleep(RETRY_DELAY)
                else:
                    print("   Max retries reached for this detail page.")
                    r["content"] = ""
                    
# ================= UPLOAD BATCH =================
for r in page_results:
        if "link" in r:
            del r["link"]
print(f"Uploading {len(page_results)} machines to API...")
upload_resp = requests.post(MAQUININHA_MACHINES_API_ENDPOINT, json=page_results)
if upload_resp.status_code in (200, 201):
    print("✅ Upload successful!")
else:
    print(f"❌ Upload failed: {upload_resp.status_code}, {upload_resp.text}")
