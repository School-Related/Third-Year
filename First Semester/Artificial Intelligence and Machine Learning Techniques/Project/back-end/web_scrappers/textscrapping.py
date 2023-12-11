import requests
import json
import re
import os
from bs4 import BeautifulSoup


def clean_text(text):
    # Replace newlines with a space
    text = re.sub('\n', ' ', text)
    # Replace multiple spaces with a single space
    text = re.sub(' +', ' ', text)
    # Remove leading and trailing whitespace
    text = text.strip()
    return text

def scrape_text_from_search_query(api_key, cx, first_name, last_name, city, work_place):
    query = f'"{first_name} {last_name}" AND "{city}" AND "{work_place}"'
    url = f"https://www.googleapis.com/customsearch/v1?key={api_key}&cx={cx}&q={query}"
    print(url)
    data = requests.get(url).json()

    if 'items' not in data:
        print('No items in data. Data:', data)
        return []

    texts = []
    for item in data['items'][:2]:
        response = requests.get(item['link'])
        # if link has the word scholar, continue
        if 'scholar' in item['link']:
            continue
        soup = BeautifulSoup(response.text, 'html.parser')
        print(response)
        # Extract all text from the page
        text = soup.get_text()
        print(text)
        # Clean the text
        cleaned_text = clean_text(text)
        print(cleaned_text)
        texts.append(cleaned_text)

    return texts

# # Example usage:
# api_key = os.getenv("google_api_key")
# cx = os.getenv("google_cx")
# texts = scrape_text_from_search_query(api_key, cx, 'Umesh', 'Raut', 'Pune', 'MIT-WPU')
# for text in texts:
#     print(text)