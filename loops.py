#allow a user to enter their user name and authetiate their password
print("enter your username")
user_name = input()
print("enter your passcode")
passcode = input()
if user_name =="admin" and passcode == "passcode":
    print("Authentication successful")
else:
    print("Authentication failed")    
# while loop with authenication
while user_name != "admin" or passcode != "passcode":
    print("Authenication failed,please try again") 
    print("enter your user_name") 
    user_name = input()
    print("enter your passcode") 
    passcode = input()
pass




def main():
    print("Welcome to the Indentation Race!")
    for i in range(5):
        print("Current number:", i)
        if i % 2 == 0:
            print("Even number.")
        else:
            print("Odd number.")
    print("Race completed!")

main()


