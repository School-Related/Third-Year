from googlesearch import search
results = search('yogita hande AND pune', advanced=True, num_results=5)
blob = ""
urls = []
for i in results:
    blob += i.title + " " + i.description + " "
    urls.append(i.url)
print(blob)
print(urls)