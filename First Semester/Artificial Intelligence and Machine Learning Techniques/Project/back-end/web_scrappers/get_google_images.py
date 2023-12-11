from bs4 import BeautifulSoup
import requests

def get_google_images(first_name, last_name, city, workspace, email, github) :
    query = f"{first_name} {last_name} AND {city}"
    print(query)
    # if github is not None and email is not None and workspace is not None:
    #     query = f"{first_name} {last_name} AND {city} AND {github} AND {email} AND {workspace}"
    # elif github is not None and email is not None:
    #     query = f"{first_name} {last_name} AND {city} AND {github} AND {email}"
    # elif github is not None and workspace is not None:
    #     query = f"{first_name} {last_name} AND {city} AND {github} AND {workspace}"
    # elif email is not None and workspace is not None:
    #     query = f"{first_name} {last_name} AND {city} AND {email} AND {workspace}"
    # elif github is not None:
    #     query = f"{first_name} {last_name} AND {city} AND {github}"
    # elif email is not None:
    #     query = f"{first_name} {last_name} AND {city} AND {email}"
    # elif workspace is not None:
    #     query = f"{first_name} {last_name} AND {city} AND {workspace}"
    # else:
    #     query = f"{first_name} {last_name} AND {city}"
    print(f"Query: {query}")
    url = f'https://www.google.com/search?q={query}&tbm=isch'
    try:
        # Send a GET request to the URL
        r = requests.get(url)
    except requests.exceptions.RequestException as e:
        return f'Error: {e}'

    # Parse the HTML content of the page with BeautifulSoup
    soup = BeautifulSoup(r.text, 'html.parser')

    # Find all img tags
    images = soup.find_all('img')
    links = []
    if not images:
        return 'No images found'
    for image in images: 
        link = image.get('src') or image.get('data-src')
        if link:
            links.append(link)
    return links