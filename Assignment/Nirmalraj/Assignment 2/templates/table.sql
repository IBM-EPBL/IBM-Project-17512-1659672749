CREATE TABLE Persons (
    Username varchar(255),
    RollNumber varchar(255),
    Email varchar(255),
    Password varchar(255),
);

INSERT INTO Persons VALUES ('201912345', 'nirmal7699@gmail.com', 'nirmal', 'niru@123');
SELECT * FROM USER;

INSERT INTO Persons VALUES ('2019678910', 'raj@gmail.com', 'raj', 'raj123');
SELECT * FROM USER;

UPDATE Persons SET EMAIL='hellouser@gmail.com' WHERE ROLLNUMBER='201911121314';
SELECT * FROM Persons;

DELETE FROM Persons WHERE ROLLNUMBER='201912345';
SELECT * FROM Persons;

DELETE FROM Persons WHERE USERNAME='nirmal';
SELECT * FROM Persons;