import hashlib

def hash_file(filename):
   """"This function returns the SHA-1 hash
   of the file passed into it"""

   # make a hash object
   h = hashlib.sha1()

   # open file for reading in binary mode
   with open(filename,'rb') as file:

       # loop till the end of the file
       chunk = 0
       while chunk != b'':
           # read only 1024 bytes at a time
           chunk = file.read(1024)
           h.update(chunk)

   # return the hex representation of digest
   return h.hexdigest()

print("Welcome to DFI Assignment 5, Krishnaraj PT. PA10. CSF")
print("File Modified Detection")

file_name = "classical_guitar.mp3"
file_name_modified = "classical_guitar_modified.mp3"

print("First Music File without Tampering: ")
print(file_name)
print("Hash is: ", hash_file(file_name))

print("Music File after deleting portion of it : ")
print("Hash is: ", hash_file(file_name_modified))
print(file_name_modified)


print("====" * 21)

print("Image File")

from hashlib import sha256
import os

file_location = os.path.join(os.path.dirname(__file__), "tony.jpg") 
# Read image file

print("Hash of the file is: ")
# Convert to byte array
with open(file_location, "rb") as image_file:
    f = image_file.read()
    b = bytearray(f)

# Print the result
print(sha256(b).hexdigest())

print("Modified the File, added hidden data to it.")
print("Hash of the file now is: ")

# run this command to modify the file

file_location = os.path.join(os.path.dirname(__file__), "tony_changed.jpg")
# Read image file

# Convert to byte array
with open(file_location, "rb") as image_file:
    f = image_file.read()
    b = bytearray(f)

# Print the result
print(sha256(b).hexdigest())


