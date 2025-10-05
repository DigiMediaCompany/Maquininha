import time
import json
from selenium import webdriver
from selenium.webdriver.edge.service import Service
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

# ================= CONFIG =================
CHROMEDRIVER_PATH = "msedgedriver.exe"
BASE_URL = "https://www.maquininha.com.br/recents/page/{}/"
OUTPUT_FILE_PATTERN = "results_page_{}.json"

# ================= DRIVER =================
def setup_driver(headless=True):
    options = Options()
    options.binary_location = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
    if headless:
        options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    service = Service(CHROMEDRIVER_PATH)
    return webdriver.Edge(service=service, options=options)

# ================= SCRAPE LIST PAGE =================
def scrape_page(driver, page_number):
    url = BASE_URL.format(page_number)
    driver.get(url)
    
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.article-home-machine.recent"))
        )
    except TimeoutException:
        print(f"❌ Timeout khi load page {page_number}")
        return []

    items = driver.find_elements(By.CSS_SELECTOR, "div.article-home-machine.recent")
    results = []
    for item in items:
        
        try:
            thumb = item.find_element(By.CSS_SELECTOR, "a.article-home-machine-thumb img").get_attribute("src") if item.find_elements(By.CSS_SELECTOR, "a.article-home-machine-thumb img") else ""
            category = item.find_element(By.CSS_SELECTOR, "div.article-category-home-machine a.article-category-item").text if item.find_elements(By.CSS_SELECTOR, "div.article-category-home-machine a.article-category-item") else ""
            metadata = item.find_element(By.CSS_SELECTOR, "div.article-meta-data").text if item.find_elements(By.CSS_SELECTOR, "div.article-meta-data") else ""
            link_elem = item.find_element(By.CSS_SELECTOR, "h3 a.article-link")
            link = link_elem.get_attribute("href")
            title = link_elem.get_attribute("title")
        except:
            link, title = "", ""
        results.append({
            "thumbnail": thumb,
            "category": category,
            "link": link,
            "title": title,
            "metadata": metadata
        })
    return results

# ================= CLEAN TEXT =================
def clean_text(text):
    return " ".join(text.split()).strip()

# ================= SCRAPE DETAIL =================
def scrape_detail_structured(driver, url, timeout=15, retries=2):
    driver.get(url)

    # Kiểm tra quiz
    has_quiz = bool(driver.find_elements(By.CSS_SELECTOR, "div.aq-slide"))
    if has_quiz:
        solve_quiz(driver)

    # Chờ loader + content
    try:
        WebDriverWait(driver, timeout).until(
            EC.invisibility_of_element_located((By.CSS_SELECTOR, "div.loader-centro"))
        )
        WebDriverWait(driver, timeout).until(
            lambda d: d.find_element(By.CSS_SELECTOR, "div.single-article-content").text.strip() != ""
        )
        content_div = driver.find_element(By.CSS_SELECTOR, "div.single-article-content")
    except TimeoutException:
        if retries > 0:
            print(f"⚠️ Timeout, thử lại {url} ({retries} lần còn lại)...")
            return scrape_detail_structured(driver, url, timeout, retries-1)
        else:
            print(f"❌ Không tìm thấy nội dung tại {url}")
            return []

    elements_data = []

    for el in content_div.find_elements(By.XPATH, "./*"):
        tag = el.tag_name.lower()
        el_class = el.get_attribute("class") or ""

        # Bỏ qua ads/CTA
        if "cta-block" in el_class or "cta-block-list" in el_class:
            continue

        if tag in ["h1", "h2"]:
            text = clean_text(el.get_attribute("textContent"))
            if text:
                elements_data.append({"type": tag, "text": text})

        elif tag == "p":
            text = clean_text(el.get_attribute("textContent"))
            if text:
                elements_data.append({"type": "paragraph", "text": text})

        elif tag in ["ul", "ol"]:
            items = [clean_text(li.get_attribute("textContent")) for li in el.find_elements(By.TAG_NAME, "li")]
            if items:
                elements_data.append({"type": f"list-{tag}", "items": items})

        elif tag in ["figure", "table"]:
            try:
                table = el.find_element(By.TAG_NAME, "table") if tag == "figure" else el

                # Chờ ít nhất 1 row để tránh table chưa render
                WebDriverWait(driver, 5).until(
                    EC.presence_of_element_located((By.XPATH, ".//tr"))
                )

                # Lấy header
                headers = []
                header_row = table.find_elements(By.XPATH, ".//thead/tr/th")
                if header_row:
                    headers = [clean_text(th.get_attribute("textContent")) for th in header_row]
                else:
                    first_row = table.find_elements(By.XPATH, ".//tr[1]/th|.//tr[1]/td")
                    if first_row:
                        headers = [clean_text(cell.get_attribute("textContent")) for cell in first_row]

                # Lấy rows
                rows = []
                for tr in table.find_elements(By.XPATH, ".//tbody/tr|.//tr[not(ancestor::thead)]"):
                    cells = [clean_text(td.get_attribute("textContent")) for td in tr.find_elements(By.XPATH, "./th|./td")]
                    if cells:
                        rows.append(cells)

                # Nếu rows bao gồm header thì bỏ đi
                if headers and rows and rows[0] == headers:
                    rows = rows[1:]

                elements_data.append({
                    "type": "table",
                    "headers": headers,
                    "rows": rows
                })
            except TimeoutException:
                print("⚠️ Table chưa load kịp, bỏ qua...")
            except Exception as e:
                print(f"⚠️ Lỗi table: {e}")
                continue

    return elements_data


# ================= SOLVE QUIZ =================
def solve_quiz(driver):
    slides = driver.find_elements(By.CSS_SELECTOR, "div.aq-slide")
    for slide in slides:
        buttons = slide.find_elements(By.CSS_SELECTOR, "button.aq-answer")
        if buttons:
            driver.execute_script("arguments[0].click();", buttons[0])
            time.sleep(0.5)

    # Chờ content sau quiz load
    WebDriverWait(driver, 15).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, "div.single-article-content"))
    )
    # Extra: chờ table render nếu có
    try:
        WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "div.single-article-content table"))
        )
    except TimeoutException:
        pass


# ================= MAIN =================
driver = setup_driver(headless=True)  # True nếu muốn chạy nền

for page in range(1, 48):
    print(f"Scraping page {page}...")
    page_results = scrape_page(driver, page)
    
    for r in page_results:
        if r["link"]:
            print(f"  Scraping detail: {r['link']}")
            r["content"] = scrape_detail_structured(driver, r["link"])
    
    output_file = OUTPUT_FILE_PATTERN.format(page)
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(page_results, f, ensure_ascii=False, indent=2)
    print(f"✅ Page {page} saved to {output_file}")

driver.quit()
