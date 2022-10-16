
def add(a, b):
   return a + b

def subtract(a, b):
   return a - b

def multiply(a, b):
   return a * b

def divide(a, b):
return a / b
print("Select an operation.")
print("+")
print("-")
print("*")
print("/")

choice = input("Enter operator to use:")
A = int(input("Enter first number: "))
B = int(input("Enter second number: "))
if choice == '+':
   print(A,"+",B,"=", add(A,B))
elif choice == '-':
   print(A,"-",B,"=", subtract(A,B))
elif choice == '*':
   print(A,"*",B,"=", multiply(A,B))
elif choice == '/':
   print(A,"/",B,"=", divide(A,B))
else:
print("Invalid input")