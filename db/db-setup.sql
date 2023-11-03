CREATE DATABASE IF NOT EXISTS stuff;
USE stuff;
CREATE TABLE IF NOT EXISTS scores (
    gameID INT NOT NULL AUTO_INCREMENT,
    score VARCHAR(100) NOT NULL,
    numWins1 INT,
    numWins2 INT,
    PRIMARY KEY (gameID)
);
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'thebestgame';
CREATE USER IF NOT EXISTS 'leet'@'localhost' IDENTIFIED BY 'leetcode';
GRANT ALL PRIVILEGES ON stuff.* to 'root'@'localhost' WITH GRANT OPTION;
GRANT SELECT on stuff.scores to 'leet'@'localhost';