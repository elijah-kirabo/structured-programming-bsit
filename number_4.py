def greet_user(name):
    """
    This function greets the user by name.
    If no name is provided, it greets a default "Guest".
    """
    if name:
        print(f"Hello, {name}!")
    else:
        print("Hello, Guest!")

# --- How to use the function ---

# Call the function with a name
greet_user("Alice")

# Call the function without a name (or with an empty string)
greet_user("")
greet_user(None)