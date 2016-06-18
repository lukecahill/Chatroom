CREATE DATABASE chat_application;

USE chat_application;

CREATE TABLE Messages (
    MessageId INT(6) AUTO_INCREMENT PRIMARY KEY,
    Message VARCHAR(6000),
    SenderName VARCHAR(50),
    MessageSentTime DATETIME DEFAULT CURRENT_TIMESTAMP
);
