CREATE TABLE User (
    RollNumber varchar(10) NOT NULL PRIMARY KEY,
    Email varchar(255) NOT NULL,
    Username varchar(255) NOT NULL UNIQUE,
    Password varchar(255) NOT NULL
);

INSERT INTO USER VALUES ('2019103529', 'samsanjai777@gmail.com', 'sanjai', 'hello@123');
SELECT * FROM USER;

INSERT INTO USER VALUES ('2019103508', 'sahasrav@gmail.com', 'saha', 'pass67');
SELECT * FROM USER;

UPDATE USER SET EMAIL='ragul@gmail.com' WHERE ROLLNUMBER='2019103529';
SELECT * FROM USER;

DELETE FROM USER WHERE ROLLNUMBER='2019103529';
SELECT * FROM USER;

DELETE FROM USER WHERE USERNAME='saha';
SELECT * FROM USER;