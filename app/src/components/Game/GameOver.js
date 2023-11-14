import React from 'react';
import { Link, useLocation  } from 'react-router-dom';

// !! TODO !!: REFORMAT PAGE TO BETTER ILLUSTRATE WINNER
const GameOver = () => {
    let location = useLocation();
    const playerOne = location.state.player1Score;
    const playerTwo = location.state.player2Score;

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