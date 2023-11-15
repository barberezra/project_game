import React from 'react';
import { Link, useLocation  } from 'react-router-dom';

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