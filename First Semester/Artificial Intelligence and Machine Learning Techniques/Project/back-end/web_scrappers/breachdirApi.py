import requests
import json

def get_breach_info(email):
    url = "https://breachdirectory.p.rapidapi.com/"
    querystring = {"func":"auto","term": email}
    headers = {
        "X-RapidAPI-Key": "8ec5691261msheb0aef3b5791f26p1da1bdjsnb66c6c98e060",
        "X-RapidAPI-Host": "breachdirectory.p.rapidapi.com"
    }

    # response = requests.get(url, headers=headers, params=querystring)
    # return response.json()
    return {
        "success": True,
        "found": 2,
        "result": [
            {
                "email": "littlekinnu@gmail.com",
                "hash_password": True,
                "password": "dorae*****",
                "sha1": "7629cf0eab2042879e2f9e00b481aa5e4af38c29",
                "hash": "Eol1ssS5VqwUPeP4l4bPNv2bMo1lIyT8tJAqH8bJvQ==",
                "sources": [
                    "Dubsmash.com",
                    "Mathway.com"
                ]
            },
            {
                "email": "littlekinnu@gmail.com",
                "has_password": False,
                "sources": [
                    "Wattpad.com"
                ]
            }
        ]
    }

# # Example usage:
# breach_info = get_breach_info("littlekinnu@gmail.com")
# print(json.dumps(breach_info, indent=4))