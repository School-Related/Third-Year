import hashlib


def hash_password(password):
    # Hash the password using SHA-1
    hashed_password = hashlib.sha1(password.encode()).hexdigest()
    return hashed_password


# List of common passwords (for educational purposes only)
common_passwords = [
    "password",
    "123456",
    "qwerty",
    "letmein",
    "admin",
    "1234",
    "welcome",
    "tigger",
    "sunshine",
    "chocolate",
    "password1",
    "soccer",
    "anthony",
    "friends",
    "butterfly",
    "purple",
    "shadow",
    "melissa",
    "eminem",
    "matthew",
    "robert",
    "danielle",
    "forever",
    "family",
    "jonathan",
    "987654321",
    "computer",
    "whatever",
    "dragon",
    "vanessa",
    "cookie",
    "naruto",
    "summer",
    "sweety",
    "spongebob",
    "joseph",
    "junior",
    "softball",
    "taylor",
    "yellow",
    "daniela",
    "lauren",
    "mickey",
    "princesa",
    "alexandra",
    "alexis",
    "estrella",
    "miguel",
    "william",
    "thomas",
    "beautiful",
    "mylove",
    "angela",
    "poohbear",
    "patrick",
    "iloveme",
    "sakura",
    "adrian",
    "alexander",
    "destiny",
    "christian",
    "121212",
    "sayang",
    "america",
    "dancer",
    "monica",
    "richard",
    "112233",
    "princess1",
    "555555",
    "diamond",
    "carolina",
    "steven",
    "rangers",
    "louise",
    "orange",
    "789456",
    "999999",
    "shorty",
    "nathan",
    "snoopy",
    "gabriel",
    "hunter",
    "cherry",
    "killer",
    "sandra",
    "alejandro",
    "buster",
    "george",
    "brittany",
    "alejandra",
    "patricia",
    "rachel",
    "tequiero",
    "7777777",
    "cheese",
    "159753",
    "arsenal",
    "dolphin",
    "antonio",
    "heather",
    "ginger",
]

# Create a text file to store hashed passwords
with open("hashed_passwords.txt", "w") as file:
    for password in common_passwords:
        # Hash each password and write it to the file
        hashed_password = hash_password(password)
        file.write(f"{password}: {hashed_password}\n")

print("Hashed passwords are stored in 'hashed_passwords.txt'")
