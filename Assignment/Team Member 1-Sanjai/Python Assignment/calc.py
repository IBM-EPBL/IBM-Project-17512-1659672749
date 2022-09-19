print("Please Enter the operation.")
print("a. +")
print("b. -")
print("c. *")
print("d. /")

choice = input("Please enter choice: ")

num1 = int(input("Please enter the first number: "))
num2 = int(input("Please enter the second number: "))

if choice == '+':
   print(num1, " + ", num2, " = ", num1+num2)

elif choice == '-':
   print(num1, " - ", num2, " = ", num1-num2)

elif choice == '*':
   print(num1, " * ", num2, " = ", num1*num2)

elif choice == '/':
   print(num1, " / ", num2, " = ", num1/num2)

else:
   print("This is an invalid input")