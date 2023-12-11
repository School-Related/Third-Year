import requests
from dateutil.parser import parse
from datetime import datetime

def get_github_info(username):
    print("trying username: ", username)
    base_url = "https://api.github.com/users/"
    
    # Get user info
    user_url = base_url + username
    user_response = requests.get(user_url)
    user_info = user_response.json()
    print(user_info)
    join_year = parse(user_info['created_at']).year
    
    # Get followers
    followers_url = base_url + username + "/followers"
    followers_response = requests.get(followers_url)
    followers = [user['login'] for user in followers_response.json()]
    
    # Get following
    following_url = base_url + username + "/following"
    following_response = requests.get(following_url)
    following = [user['login'] for user in following_response.json()]
    
    # Get activity dates
    events_url = base_url + username + "/events"
    events_response = requests.get(events_url)
    dates = [parse(event['created_at']).date() for event in events_response.json()]
    active_years = min(dates).year, max(dates).year
    
    return [followers, following, join_year, active_years]

def get_github_people_images(people):
    
    # edge case handling
    if not people:
        return []
    
    images = []
    for person in people:
        base_url = "https://api.github.com/users/"

        # Get user info
        user_url = base_url + person
        user_response = requests.get(user_url)
        user_info = user_response.json()
        images.append(user_info['avatar_url'])
    
    return images
# # Example usage:
# followers, following, join_year, active_years = get_github_info('KrishnarajT')
# print("Followers:", followers)
# print("Following:", following)
# print("Joined GitHub in:", join_year)
# print("Active from:", active_years[0], "to", active_years[1])