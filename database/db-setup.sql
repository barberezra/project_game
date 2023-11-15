CREATE DATABASE IF NOT EXISTS stuff;
USE stuff;
CREATE TABLE IF NOT EXISTS scores (
    gameID INT NOT NULL AUTO_INCREMENT,
    player1Name VARCHAR(30) NOT NULL DEFAULT 'Player One',
    player2Name VARCHAR(30) NOT NULL DEFAULT "Player Two",
    score VARCHAR(30),
    numWins1 INT,
    numWins2 INT,
    tie INT,
    PRIMARY KEY (gameID)
);
CREATE USER IF NOT EXISTS 'root'@'localhost' IDENTIFIED BY 'thebestgame';
CREATE USER IF NOT EXISTS 'leet'@'localhost' IDENTIFIED BY 'leetcode';
GRANT ALL PRIVILEGES ON stuff.* to 'root'@'localhost' WITH GRANT OPTION;
GRANT SELECT on stuff.scores to 'leet'@'localhost';
INSERT INTO scores (score, numWins1, numWins2) VALUES ('0 : 0', 0, 0);