# credentials ={
#       "username" : "kiraboelijah151@gmail.com"
#      ,"password" : "123456"
# }

# print("Welcome to the login syystem")
# username = input("Enter your username: ")
# password = input("Enter your password: ") 

# if username == credentials["username"] and password == credentials["password"]:
#     print("Login successful")
# else:
#     print("Login failed")

# if username == credentials["username"]:
#    if password == credentials["password"]:
#       print("Login successful")
#    else:
#       print("Login failed")
# else:
#    print("Login failed")

# ###extract data from the dictionary
# credentials["username"]   ##username is the key
# print(credentials["username"])

credentials ={
      "username" : "kiraboelijah151@gmail.com"
     ,"password" : "123456"
}
credentials["username"] = "elijah2004"
print("Original dictionary : credentials")


## adding another line to the dictionary
credentials["personal_email"] = "elijah2004@gmail.com"

print("Updated dictionary : (credentials)")
print(credentials)


## lists and dictionaries

# students ={
#  [  "username": "mark@gmail.com"
#      ,"password": "1256"
# ],
#   [  "username": "flavia1@gmail.com"
#      ,"password": "199956"
# ],
#    [  "username": "n.rapheal1@gmail.com"
#      ,"password": "mum246"
#    ]
# }

# print(students) 

students = {
    "student1": {
        "username": "mark@gmail.com",
        "password": "1256"
    },
    "student2": {
        "username": "flavia1@gmail.com",
        "password": "199956"
    },
    "student3": {
        "username": "n.rapheal1@gmail.com",
        "password": "mum246"
    }
}

print(students)


