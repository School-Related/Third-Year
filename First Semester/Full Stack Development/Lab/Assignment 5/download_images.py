import os
import sys
from googlesearch import search
import requests
from bs4 import BeautifulSoup
import urllib.parse

# Check for the required argument (search term)
if len(sys.argv) != 2:
    print("Usage: python download_mixed_resolution_images.py <search_term>")
    sys.exit(1)

# Define the search term and the number of images to download
search_term = sys.argv[1]
num_images_high_resolution = 2  # Number of high-resolution images
num_images_normal_resolution = 2  # Number of normal-resolution images
min_width_high_resolution = 800  # Minimum width for high-resolution images (adjust as needed)

# Create a directory for the downloaded images
output_dir = search_term
os.makedirs(output_dir, exist_ok=True)

# Perform a Google Images search and get all results
search_url = f"https://www.google.com/search?q={urllib.parse.quote(search_term)}&tbm=isch"
search_results = list(search(search_term, num_results=num_images_high_resolution + num_images_normal_resolution, sleep_interval=0.1))

# Download a mix of high-resolution and normal-resolution images
count_high_resolution = 0
count_normal_resolution = 0

for url in search_results:
    # Parse the image page to find the direct image URL
    page = requests.get(url)
    soup = BeautifulSoup(page.text, "html.parser")
    img_tags = soup.find_all("img")
    
    for img_tag in img_tags:
        img_url = img_tag.get("src")
        if img_url and img_url.startswith("http"):
            # Download the image
            img_response = requests.get(img_url)
            img_width = int(img_response.headers.get('content-length', 0))
            
            if img_width >= min_width_high_resolution and count_high_resolution < num_images_high_resolution:
                # Download as high-resolution
                img_filename = os.path.join(output_dir, f"high_resolution_{search_term}_{count_high_resolution + 1}.jpg")
                count_high_resolution += 1
            elif count_normal_resolution < num_images_normal_resolution:
                # Download as normal-resolution
                img_filename = os.path.join(output_dir, f"normal_resolution_{search_term}_{count_normal_resolution + 1}.jpg")
                count_normal_resolution += 1
            else:
                # Skip if we have downloaded the required number of images
                continue

            img_data = img_response.content
            with open(img_filename, "wb") as img_file:
                img_file.write(img_data)
            
            print(f"Downloaded image to '{img_filename}'")

            if count_high_resolution == num_images_high_resolution and count_normal_resolution == num_images_normal_resolution:
                # Break if we have downloaded the required number of images
                break

    if count_high_resolution == num_images_high_resolution and count_normal_resolution == num_images_normal_resolution:
        # Break if we have downloaded the required number of images
        break

print("Download completed.")
