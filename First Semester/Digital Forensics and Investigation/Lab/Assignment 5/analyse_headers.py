import email
import sys
import re
import requests

# Define the path to the email file
email_file = "email.eml"  # Replace with the path to your email file

# Read the email file
with open(email_file, "r", encoding="utf-8") as file:
    email_content = file.read()

# Parse the email
msg = email.message_from_string(email_content)

# Extract and print common header fields
print("Subject:", msg["Subject"])
print("From:", msg["From"])
print("To:", msg["To"])
print("Date:", msg["Date"])

# Extract and print additional header fields
for key, value in msg.items():
    print(key + ":", value)

# Analyze other parts of the email, such as attachments, body, etc., as needed
# For example, to extract and print the email body:
if msg.is_multipart():
    for part in msg.walk():
        content_type = part.get_content_type()
        content_disposition = str(part.get("Content-Disposition"))

        if "attachment" not in content_disposition:
            body = part.get_payload(decode=True).decode("utf-8")
            print("\nEmail Body:\n", body)

            # Perform more detailed analysis of the email body
            # You can use regular expressions to search for suspicious patterns or URLs

            # Example: Check for suspicious URLs
            urls = re.findall(r'https?://\S+', body)
            for url in urls:
                response = requests.get(url)
                if response.status_code == 200:
                    # Analyze the content of the URL for potential threats

                    # Example: Check for known malware signatures in the URL content
                    if "malware" in response.text.lower():
                        print("This email contains a suspicious URL:", url)

                    # Add more checks as needed

            # Example: Check for common spam keywords in the email body
            spam_keywords = ["buy now", "free", "limited time offer"]
            for keyword in spam_keywords:
                if keyword in body.lower():
                    print("This email may be spam due to the keyword:", keyword)

            # Add more checks as needed

# Please note that this is a simplified example, and real-world email analysis for malware and spam detection
# involves more sophisticated techniques, including machine learning, heuristics, and integration with external
# threat intelligence services.

# Additionally, consider using dedicated email security solutions or services for comprehensive email analysis.
