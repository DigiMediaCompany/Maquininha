import time
import json
from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import re

# ================= CONFIG =================
MSEDGEDRIVER_PATH = "msedgedriver.exe"  # Path to Edge WebDriver executable
BASE_URL = "https://www.maquininha.com.br/recents/page/{}/"  # URL template for paginated articles
OUTPUT_FILE_PATTERN = "results_article_page_{}.json"  # Output JSON filename template

# ================= DRIVER =================
def setup_driver(headless=True):
    """
    Setup and return a Selenium Edge WebDriver instance.
    headless: if True, run browser in headless mode (no GUI)
    """
    options = Options()
    options.binary_location = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
    if headless:
        options.add_argument("--headless")
    options.add_argument("--disable-gpu")  # Disable GPU acceleration
    options.add_argument("--window-size=1920,1080")  # Set window size for consistent layout
    service = Service(MSEDGEDRIVER_PATH)
    return webdriver.Edge(service=service, options=options)

# ================= SCRAPE LIST PAGE =================
def scrape_page(driver, page_number):
    """
    Scrape the article list from a specific page.
    Returns a list of dicts with basic info (title, link, category, thumbnail, date, duration)
    """
    url = BASE_URL.format(page_number)
    driver.get(url)
    
    try:
        # Wait until all articles are present on the page
        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.article-home-machine.recent"))
        )
    except TimeoutException:
        print(f"❌ Timeout loading page {page_number}")
        return []

    items = driver.find_elements(By.CSS_SELECTOR, "div.article-home-machine.recent")
    results = []
    for item in items:
        try:
            # Extract thumbnail image URL
            thumb = item.find_element(By.CSS_SELECTOR, "a.article-home-machine-thumb img").get_attribute("src") if item.find_elements(By.CSS_SELECTOR, "a.article-home-machine-thumb img") else ""
            
            # Extract article category
            category = item.find_element(By.CSS_SELECTOR, "div.article-category-home-machine a.article-category-item").text if item.find_elements(By.CSS_SELECTOR, "div.article-category-home-machine a.article-category-item") else ""
            
            # Extract metadata text (contains date and duration)
            metadata_text = item.find_element(By.CSS_SELECTOR, "div.article-meta-data").text if item.find_elements(By.CSS_SELECTOR, "div.article-meta-data") else ""

            # Split metadata into date and duration
            date, duration = "", ""
            if "•" in metadata_text:
                parts = [p.strip() for p in metadata_text.split("•")]
                date = parts[0]
                duration = parts[1] if len(parts) > 1 else ""

            # Extract article link and title
            link_elem = item.find_element(By.CSS_SELECTOR, "h3 a.article-link")
            link = link_elem.get_attribute("href")
            title = link_elem.get_attribute("title")
        except:
            link, title, date, duration = "", "", "", ""

        results.append({
            "thumbnail": thumb,
            "category": category,
            "link": link,
            "title": title,
            "date": date,
            "duration": duration
        })
    return results


# ================= CLEAN TEXT =================
def clean_text(text):
    """
    Remove extra spaces and newlines from text.
    """
    return " ".join(text.split()).strip()

# ================= SCRAPE DETAIL =================
def scrape_detail_structured(driver, url, timeout=15, retries=2):
    """
    Scrape the detailed content of an article.
    Returns cleaned HTML string.
    Handles quizzes and waits for content to load.
    Retries if timeout occurs.
    """
    driver.get(url)

    # Check if there is a quiz in the article
    has_quiz = bool(driver.find_elements(By.CSS_SELECTOR, "div.aq-slide"))
    if has_quiz:
        solve_quiz(driver)

    # Wait for loader to disappear and content to be ready
    try:
        WebDriverWait(driver, timeout).until(
            EC.invisibility_of_element_located((By.CSS_SELECTOR, "div.loader-centro"))
        )
        WebDriverWait(driver, timeout).until(
            lambda d: d.find_element(By.CSS_SELECTOR, "div.single-article-content").text.strip() != ""
        )
        content_article = driver.find_element(By.CSS_SELECTOR, "article.single-article")
    except TimeoutException:
        if retries > 0:
            print(f"⚠️ Timeout, retrying {url} ({retries} retries left)...")
            return scrape_detail_structured(driver, url, timeout, retries-1)
        else:
            print(f"❌ Could not find content at {url}")
            return ""

    # ===== REMOVE UNWANTED ELEMENTS =====
    remove_selectors = [
        "a.cta-block.button.expanded",  # Remove call-to-action buttons linking to other articles
        "div.cta-block-content-list",    # Remove CTA blocks
        "div#av_top_wrapper"             # Remove Google ads
    ]
    for sel in remove_selectors:
        elements = content_article.find_elements(By.CSS_SELECTOR, sel)
        for el in elements:
            driver.execute_script("""
                var element = arguments[0];
                element.parentNode.removeChild(element);
            """, el)

    # Get HTML and clean extra spaces
    article_html = content_article.get_attribute("outerHTML")
    article_html_clean = re.sub(r'\s+', ' ', article_html).strip()

    return article_html_clean


# ================= SOLVE QUIZ =================
def solve_quiz(driver):
    """
    Automatically clicks the first answer on each quiz slide.
    Waits for article content to load after completing quiz.
    """
    slides = driver.find_elements(By.CSS_SELECTOR, "div.aq-slide")
    for slide in slides:
        buttons = slide.find_elements(By.CSS_SELECTOR, "button.aq-answer")
        if buttons:
            driver.execute_script("arguments[0].click();", buttons[0])
            time.sleep(0.5)

    # Wait for content after quiz is loaded
    WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "div.single-article-content"))
    )
    # Optional: wait for table rendering if present
    try:
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div.single-article-content table"))
        )
    except TimeoutException:
        pass


# ================= MAIN =================
driver = setup_driver(headless=True)  # Run browser in headless mode

# Loop through pages to scrape articles
for page in range(1, 48):
    print(f"Scraping page {page}...")
    page_results = scrape_page(driver, page)
    
    # Scrape detailed content for each article
    for r in page_results:
        if r["link"]:
            print(f"  Scraping detail: {r['link']}")
            r["content"] = scrape_detail_structured(driver, r["link"])
    
    # Save page results to JSON file
    output_file = OUTPUT_FILE_PATTERN.format(page)
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(page_results, f, ensure_ascii=False, indent=2)
    print(f"✅ Page {page} saved to {output_file}")

driver.quit()
