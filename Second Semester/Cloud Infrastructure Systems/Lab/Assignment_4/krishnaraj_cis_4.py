import boto3
s3 = boto3.client('s3')

import json

def put(key, value):
    # store something
    s3.put_object(
        Body=json.dumps({key: value}),
        Bucket="cyclic-tame-red-seagull-shoe-us-east-1",
        Key=f"some_files/{key}.json"
    )
    print("Stored successfully")

def get(key):
    # get it back
    my_file = s3.get_object(
        Bucket="cyclic-tame-red-seagull-shoe-us-east-1",
        Key=f"some_files/{key}.json"
    )
    return json.loads(my_file['Body'].read())

def delete(key):
    # delete the key
    s3.delete_object(
        Bucket="cyclic-tame-red-seagull-shoe-us-east-1",
        Key=f"some_files/{key}.json"
    )

def listbucket():
    # list all keys
    my_bucket = s3.list_objects(
        Bucket="cyclic-tame-red-seagull-shoe-us-east-1"
    )
    return my_bucket


if __name__ == "__main__":
    print("Welcome to CIS assignment 4")
    print("What do you want to do: ")
    print("1. Store a key value pair")
    print("2. Retrieve a value for a key")
    print("3. Delete a key value pair")
    print("4. List all keys in the bucket")
    print("5. Exit")

    choice = input("Enter your choice: ")

    if choice == "1":
        key = input("Enter the key: ")
        value = input("Enter the value: ")
        put(key, value)

    elif choice == "2":
        key = input("Enter the key: ")
        print(get(key))

    elif choice == "3":
        key = input("Enter the key: ")
        delete(key)

    elif choice == "4":
        print(listbucket())

    else:
        print("Invalid choice. Exiting...")

