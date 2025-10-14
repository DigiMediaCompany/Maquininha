# Maquininha Crawler

This is a web crawler to scrape machines and articles from [Maquininha](https://www.maquininha.com.br) website and upload the data to a specified API.

---

## Features

- Scrape list pages to get machine/article links, titles, thumbnails, categories, metadata.
- Scrape detail pages for structured content.
- Remove advertisements and unwanted elements from detail pages.
- Retry failed requests with configurable attempts and delay.
- Upload scraped data to a REST API endpoint in batch.

---

## Requirements

- Python 3.8+
- Libraries:
  - `requests`
  - `beautifulsoup4`
  - `python-dotenv`

Install dependencies via:

```bash
pip install -r requirements.txt
