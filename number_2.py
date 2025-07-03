#prompt the user to input a numeric score
score = float(input("Enter your score"))

#Determine the grade using the given grading scale
if score >= 80 and score <= 100:
    grade = "A"
elif score >= 70 and score < 80:
    grade = "B"
else:
    grade = "Below B"

#Display the grade
print(f"Grade: {grade}")
            