string = "Hello"
def addString(a):
    temp = string+" "+a
    print(temp)
def reverseString():
    temp = string[::-1]
    print(temp)
def SlicedString(start,end):
    temp = string[start:end]
    print(temp)
def printString():
    print(string)

while (True):
    print("Please select the operation.")
    print("a. Add a string")
    print("b. Reverse a string")
    print("c. Slice a string")
    print("d. Print the list")
    choice = input("Please enter choice: ")
    if choice == 'a':
        print("Enter the value to be concatenated")
        value = str(input())
        addString(value)
        

    elif choice == 'b':
        reverseString()
        

    elif choice == 'c':
        start = int(input("Enter a starting index:"))
        end = int(input("Enter a ending index:"))
        SlicedString(start,end)
        
    elif choice == 'd':
        printString()
    else:
        print("Invalid input")