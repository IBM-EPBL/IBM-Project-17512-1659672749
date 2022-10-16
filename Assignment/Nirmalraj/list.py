l = [35, 30, 52, 30, 112, 38, 99]

def insertIntoList(value, ind):
    l.insert(ind, value)

def removeFromList(value):
    l.remove(value);

def appendToList(value):
    l.append(value)

def sortList():
    l.sort();

def popFromList():
    l.pop();

def reverseList():
    l.reverse();

def printList():
    print(l);

print("Please select the operation.")
print("a. Insert an interger")
print("b. Delete an interger")
print("c. Insert an integer at end")
print("d. Sort the list")
print("e. Reverse the list")
print("f. Delete last integer")
print("g. Print the list")

choice = input("Please enter choice: ")

if choice == 'a':
    print("Enter the value to be inserted")
    value = int(input())
    print("Enter the index")
    ind = int(input())
    insertIntoList(value, ind);
    printList();

elif choice == 'b':
   print("Enter the value to be deleted");
   value = int(input())
   removeFromList(value)
   printList()

elif choice == 'c':
    print("Enter the value to be added at last")
    value = int(input())
    appendToList(value);
    printList();
   
elif choice == 'd':
    sortList();
    printList();

elif choice == 'e':
    reverseList();
    printList();

elif choice == 'f':
    popFromList();
    printList();

elif choice == 'g':
    printList();

else:
   print("This is an invalid input")