import requests
import os
import json
from pathlib import Path
BASE_URL = "https://d1-admin.vinhdtq123123123.workers.dev"
ARTICLE_GROUP = "/article"
FOLDER_PATH = "D:\DOCUMENT\DIGIMEDIA\AdminDashboard\d1\Crawler"  # đổi đường dẫn tới folder chứa JSON files

def upload_articles_from_folder(folder_path):
    folder = Path(folder_path)
    if not folder.is_dir():
        print(f"{folder_path} không phải folder hợp lệ")
        return

    # Lặp qua tất cả file JSON trong folder
    for json_file in folder.glob("*.json"):
        try:
            with open(json_file, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            # Nếu file chứa một mảng bài viết
            articles = data if isinstance(data, list) else data.get("data", [])
            
            for article_json in articles:
                upload_article(article_json)
        except Exception as e:
            print(f"Lỗi khi đọc/đăng {json_file.name}: {e}")
def post_to_endpoint(endpoint, data):
    url = f"{BASE_URL}{ARTICLE_GROUP}/{endpoint}"
    resp = requests.post(url, json=data)
    if resp.status_code in (200, 201):
        return resp.json()

    else:
        print(f"Failed to post to {endpoint}: {resp.text}")
        return None

def upload_article(article_json):
    # 1️⃣ Tạo article
    article_data = {
        "title": article_json["title"],
        "link": article_json["link"],
        "thumbnail": article_json.get("thumbnail", ""),
        "category": article_json.get("category", ""),
        "metadata": article_json.get("metadata", "")
    }
    article_resp = post_to_endpoint("articles", article_data)
    if not article_resp or "id" not in article_resp:
        print("Failed to create article")
        return
    article_id = article_resp["id"]

    # 2️⃣ Tạo headings, paragraphs, lists, tables
    for idx, item in enumerate(article_json["content"], start=1):
        if item["type"] == "h2" or item["type"].startswith("h"):
            heading_data = {
                "article_id": article_id,
                "position": idx,
                "level": item["type"],
                "text": item["text"]
            }
            post_to_endpoint("article_headings", heading_data)
        
        elif item["type"] == "paragraph":
            paragraph_data = {
                "article_id": article_id,
                "position": idx,
                "text": item["text"]
            }
            post_to_endpoint("article_paragraphs", paragraph_data)
        
        elif item["type"] in ["list-ul", "list-ol"]:
            list_data = {
                "article_id": article_id,
                "position": idx,
                "type": "ul" if item["type"]=="list-ul" else "ol"
            }
            list_resp = post_to_endpoint("article_lists", list_data)
            if not list_resp or "id" not in list_resp:
                continue
            list_id = list_resp["id"]
            for i, text in enumerate(item["items"], start=1):
                post_to_endpoint("article_list_items", {
                    "list_id": list_id,
                    "position": i,
                    "text": text
                })
        
        elif item["type"] == "table":
            table_data = {
                "article_id": article_id,
                "position": idx,
                "headers": json.dumps(item["headers"])
            }
            table_resp = post_to_endpoint("article_tables", table_data)
            if not table_resp or "id" not in table_resp:
                continue
            table_id = table_resp["id"]
            for i, row in enumerate(item["rows"], start=1):
                post_to_endpoint("article_table_rows", {
                    "table_id": table_id,
                    "position": i,
                    "row_data": json.dumps(row)
                })

    print(f"Article '{article_json['title']}' uploaded successfully!")

# ================= Example =================

upload_articles_from_folder(FOLDER_PATH)
