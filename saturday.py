
# Guessing game
secret_number = 42
guesses = 0
max_guesses = 5

print("Welcome to the guessing game!")
print("I'm thinking of a number between 1 and 100.")

while guesses < max_guesses:
    user_guess = int(input("Guess a number: "))
    guesses += 1

    if user_guess == secret_number:
        print(f"Congratulations! You guessed the number in {guesses} guesses.")
        break
    elif user_guess < secret_number:
        print("Too low! Try again.")
    else:
        print("Too high! Try again.")

if guesses == max_guesses and user_guess != secret_number:
    print(f"Sorry, you didn't guess the number. The secret number was {secret_number}.")
