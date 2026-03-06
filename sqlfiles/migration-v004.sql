USE ynov_ci;
CREATE TABLE admin
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(255),
    password VARCHAR(255)
);
INSERT INTO admin (email, password) VALUES ("manon.audibert@ynov.com", "PvdrTAzTeR247sDnAZBr");
DESCRIBE admin;