from googlesearch import search

def get_google_links(first_name, last_name, city, workspace, email, github, num_results=10):
    try:
        # Construct the query
        query = f"{first_name} {last_name} AND {city}"
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
        # Perform a Google search and get the first 'num_results' links
        links = list(search(query, num_results=num_results))
        return links
    except Exception as e:
        print(f"An error occurred: {e}")
        return []