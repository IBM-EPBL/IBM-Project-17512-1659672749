CREATE TABLE User (
    RollNumber varchar(10) NOT NULL PRIMARY KEY,
    Email varchar(255) NOT NULL,
    Username varchar(255) NOT NULL UNIQUE,
    Password varchar(255) NOT NULL
);

INSERT INTO USER VALUES ('19ecr155', 'samsanjai777@gmail.com', 'sanjai', 'hello@123');
UPDATE USER SET EMAIL='ragul@gmail.com' WHERE ROLLNUMBER='19ecr155';
DELETE FROM USER WHERE ROLLNUMBER='19ecr155';
SELECT * FROM USER;
