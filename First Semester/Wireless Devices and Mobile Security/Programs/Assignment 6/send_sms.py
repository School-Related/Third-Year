from twilio.rest import Client
import time
account_sid = 'AC2729594588fa8c7cd37d00283acdd58e'
auth_token = 'c88cb19255f4c77cce0baebc73c72df4'
client = Client(account_sid, auth_token)

def make_otp():
    import random
    otp = ""
    for i in range(6):
        otp += str(random.randint(0,9))
    return otp


if __name__ == "__main__":
    otp = make_otp()

    body_string = "Your OTP for WMDS Assignment 6 is " + otp
    send_phone_number = '9834312135'
    try: 
            
        send_phone_number = int(input("Enter the phone number you want to send sms to: "))
        # verify the validity of the phone number 
        while len(str(send_phone_number)) != 10:
            print("Invalid phone number. Please try again.")
            send_phone_number = int(input("Enter the phone number you want to send sms to: "))
    except ValueError:
        print("Invalid phone number. Please try again.")
        send_phone_number = int(input("Enter the phone number you want to send sms to: "))

    message = client.messages.create(
    from_='+12165034403',
    body=body_string,
    to='+91'+str(send_phone_number)
    )
    print(message.sid)

    # start timer here. 
    start_time = time.time()
    # wait for user to enter the otp
    user_otp = input("Enter the otp: ")
    # if it is correct, print the time taken to enter the otp.
    if user_otp == otp:
        end_time = time.time()
        time_taken = end_time - start_time
        print("Time taken to enter the OTP is " + str(time_taken) + " seconds.")

        # if the time taken is more than 60 seconds, stop the program.
        if time_taken > 60:
            print("Time taken to enter the OTP is more than 60 seconds. Please try again.")
            user_otp = input("Enter the otp: ")
    # if it is wrong, stop the program.  
    if user_otp != otp:
        print("Wrong OTP. Please try again.")
        user_otp = input("Enter the otp: ")


