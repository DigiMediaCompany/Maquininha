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
BASE_URL = "https://www.maquininha.com.br"
OUTPUT_FILE_PATTERN = "results_machine.json"

def scrape_page(driver):
    driver.get(BASE_URL)
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "div.slider-container-datailed"))
        )
    except TimeoutException:
        print(f"❌ Timeout khi load page")
        return []
    results = []
    ul_list = driver.find_elements(By.CSS_SELECTOR, "ul.slider-container-datailed")
    for ul in ul_list:
        li_list = ul.find_elements(By.CSS_SELECTOR, "li.orbit-slide")
        for li in li_list:
            try:
                # tìm thẻ <a> chứa div.button-item
                a_tag = li.find_element(By.CSS_SELECTOR, "a:has(div.button-item)")
                link = a_tag.get_attribute("href")
                #tìm tên sản phẩm
                title_elem = li.find_element(By.XPATH, ".//h3[a]")
                title=title_elem.get_attribute("title")

            except:
                link = ""
                title= ""
            results.append({
                "link": link,
                "title" : title
            })
    return results
# ================= SCRAPE DETAIL =================
def scrape_detail_structured(driver, url, timeout=15, retries=2):
    driver.get(url)
    # Chờ content
    try:
        WebDriverWait(driver, timeout).until(
            EC.invisibility_of_element_located((By.CSS_SELECTOR, "div.machine-topline")))

    except TimeoutException:
        if retries > 0:
            print(f"⚠️ Timeout, thử lại {url} ({retries} lần còn lại)...")
            return scrape_detail_structured(driver, url, timeout, retries-1)
        else:
            print(f"❌ Không tìm thấy nội dung tại {url}")
            return []
    elements_data = []
    

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


# ================= MAIN =================
driver = setup_driver(headless=True)  # True nếu muốn chạy nền
machine_results= scrape_page(driver)
for r in machine_results:
        if r["link"]:
            print(f"  Scraping detail: {r['link']}")
            r["content"] = scrape_detail_structured(driver, r["link"])
    


driver.quit()
