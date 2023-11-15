import React from 'react';
import { Link, useLocation  } from 'react-router-dom';
const mysql = require('mysql');

// !! TODO !!: REFORMAT PAGE TO BETTER ILLUSTRATE WINNER
const GameOver = () => {
    let location = useLocation();
    const playerOne = location.state.player1Score;
    const playerTwo = location.state.player2Score;
    const dbString = playerOne + ' : ' + playerTwo;
    let tie;
    let winner;
    let loser;
    let incWins;
    let sameVal;

    if (playerOne > playerTwo) {
        console.log("Player 1 wins");
        winner = "numWins1";
        loser = 'numWins2';
        tie = false;
    } else if (playerTwo > playerOne) {
        console.log("Player 2 wins");
        winner = 'numWins2';
        loser = 'numWins1';
        tie = false;
    } else {
        console.log("It's a tie");
        tie = true; // Handle a tie situation appropriately
    }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'thebestgame',
        database: 'stuff'
    });

    try {
        connection.connect((err) => {
            if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
            }
            console.log('Connected to MySQL');
        });

        var incrementQuery = {query: `SELECT MAX(${winner}) AS maxWins, MAX(${loser}) AS maxLoserWins FROM scores`};
        const [rows, fields] = connection.execute(incrementQuery);

        if (rows && rows.length > 0) {
        incWins = parseInt(rows[0].maxWins) + 1;
        sameVal = parseInt(rows[0].maxLoserWins);
        }
        let insertQuery;
        if (!tie) {
            insertQuery = `INSERT INTO scores (score, %s, %s) VALUES (%s, %s, %s)`;
            const [insertRows, insertFields] = connection.execute(insertQuery, [
                winner,
                loser,
                dbString,
                incWins,
                sameVal
            ]);
            console.log('Query executed successfully:', insertRows);
        } 
        else {
            insertQuery = 'INSERT INTO scores (score, tie) VALUES (%s, 1)';
            const [insertRows, insertFields] = connection.execute(insertQuery, [
                dbString
            ]);
            console.log('Query executed successfully:', insertRows);
        }
    } 
        catch (err) {
        console.error('Error executing SQL queries:', err);
    } 

    connection.end((err) => {
    if (err) {
        console.error('Error closing MySQL connection:', err);
        return;
    }
    console.log('MySQL connection closed');
    });
    return (
        <div>
            <h1>Player One Score: { playerOne }</h1>
            <h1>Player Two Score: { playerTwo }</h1>
            <Link to="/">
                <button className="home">Go Home</button>
            </Link>
        </div>
    );
}

export default GameOver;