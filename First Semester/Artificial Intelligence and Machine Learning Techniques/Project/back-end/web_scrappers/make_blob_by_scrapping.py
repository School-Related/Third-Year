import requests
from bs4 import BeautifulSoup
from googlesearch import search

def get_blob( link ) :
    # get blob from link
    return "This is a blob from a link"

def make_blob_by_scrapping( first_name, last_name, city ) :
    query = f"{first_name} {last_name} AND {city}"
    # get blob from links
    results = search(query, advanced=True, num_results=5)
    blob = ""
    urls = []
    for i in results:
        blob += i.title + " " + i.description + " "
        urls.append(i.url)
    return blob, urls

# example links
links = [ 'https://mitwpu.edu.in/faculty/yogita-shivaji-hande', 'https://in.linkedin.com/in/yogita-hande-a606b245',
          'https://www.healyos.com/team/dr-yogita-hande/', 'https://in.linkedin.com/in/yogitahande/en',
          'https://scholar.google.co.in/citations?user=YqzWWdEAAAAJ&hl=en', 'https://www.facebook.com/yogita.hande.921/',
          'https://twitter.com/HandeYogita', 'https://m.facebook.com/yogita.hande.779/?locale=hi_IN',
          'https://www.coursehero.com/file/101639645/SEMDisplay-LP-Yogitapdf/',
          'https://www.flipkart.com/information-cyber-security-savitribai-phule-pune-university-it-sem-7/p/itmdf88ba4308692',
          'https://moderncoe.edu.in/computer-engineering/faculty-details.aspx' ]


def scrape_linkedin(url):
    # Send a GET request to the URL
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the HTML content of the page
        soup = BeautifulSoup(response.content, 'html.parser')

        # Extract relevant text
        relevant_text = soup.get_text()

        return relevant_text
    else:
        # If the request was not successful, print an error message
        print(f"Error: {response.status_code}")
        return None

# Example usage
url = "https://www.linkedin.com/example"
output = scrape_linkedin(url)

if output:
    print(output)
