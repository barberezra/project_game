DROP DATABASE IF EXISTS stuff;
CREATE TABLE scores (
    gameID INT NOT NULL AUTO_INCREMENT,
    score VARCHAR(100) NOT NULL,
    numWins1 INT,
    numWins2 INT,
    PRIMARY KEY (gameID)
);
CREATE USER 'root'@'localhost' IDENTIFIED BY 'thebestgame';
CREATE USER 'leet'@'localhost' IDENTIFIED BY 'leetcode';
GRANT ALL PRIVILEGES ON *.* to 'root'@'localhost' WITH GRANT OPTION;
GRANT SELECT on stuff.scores to 'leet'@'localhost';