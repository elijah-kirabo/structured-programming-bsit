# While loop for input validation
valid = False

while not valid:
    user_input = input("Enter 'yes' to continue: ")
    if user_input.lower() == 'yes':
        valid = True
        print("Thank you!")
    else:
        print("Invalid input. Please try again.")