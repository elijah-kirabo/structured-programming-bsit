# girls = []
# girls.append("alice")
# girls.append("clarice")
# girls.append("daphne")
# girls.append("eve")

# print(girls)

# number = int(input("Enter the number of girls: "))
# i = 1
# while i <= number:
#     girl = input("enter the name:")
#     girls.append(girl)
#     i = i + 1 
# print(girls)

girl = ["Joan", "Jane", "Josephine", "Martha", "Frida"]
girl[0] = "Joanitah"
girl.insert(2, "Johann")
girl.pop()
girl.remove("Martha")
print(girl)

for girl in girl:
    print(girl)

###liist slicing
print(girl[2:4])



