import React from 'react';
import { Link, useLocation  } from 'react-router-dom';
const mysql = require('mysql');

// !! TODO !!: REFORMAT PAGE TO BETTER ILLUSTRATE WINNER
const GameOver = () => {
    let location = useLocation();
    const playerOne = location.state.player1Score;
    const playerTwo = location.state.player2Score;
    
    if (playerOne > playerTwo) {
        console.log("Player 1 wins");
        winner = "Player 1";
        loser = 'Player 2';
    } else if (playerTwo > playerOne) {
        console.log("Player 2 wins");
        winner = 'Player 2';
        loser = 'Player 1';
    } else {
        console.log("It's a tie");
        var tie = true; // Handle a tie situation appropriately
    }

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'thebestgame',
        database: 'stuff'
    });

    connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL:', err);
          return;
        }
        console.log('Connected to MySQL');
      });

      var incrementQuery = {query: `SELECT MAX(${winner}) AS maxWins, MAX(${loser}) AS maxLoserWins FROM scores`};
      console.log(res);
      fetch('/dbconnect', {
          method: 'POST',
          body: JSON.stringify({
              incrementQuery: incrementQuery
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => response.json())
      .then(findResult => {
          console.log('Response from server:', findResult);
          if (findResult && findResult.result !== undefined) {
              incWins = parseInt(findResult.result[0][0]) + 1;
              sameVal = parseInt(findResult.result[0][1]);
          }
          var insertQuery = {query: `INSERT INTO scores (score, ${winner}, ${loser}) VALUES (%s, %s, %s)`, values: [dbString, incWins, sameVal]};
          fetch('/dbconnect', {
              method: 'POST',
              body: JSON.stringify({
                  insertQuery: insertQuery
              }), 
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          .then(response => response.json())
          .then(insertResult => {
              console.log(insertQuery);
              console.log('Response from server:', insertResult);
              
          })
          .catch(error => {
              console.error('Error:', error);
          })
      })
      .catch(error => {
          console.error('Error:', error);
      })

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