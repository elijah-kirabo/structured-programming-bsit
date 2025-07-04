def sum_even_numbers():
    # Prompt the user to enter a posistive number 
    n = int(input("Enter a number "))

    #Calculate sum variable
    sum_even = 0

    #Loop through numbers from 1 to n
    for i in range(1, n+1):
        #check if the number is even
        if i % 2 == 0:
            #Add the even number to the sum
            sum_even += i
    #Display the sum of even         