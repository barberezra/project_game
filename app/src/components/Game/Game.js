// Game Page Setup
// import React from 'react';
// import Board from './Board';

// const Game = () => {
//   return (
//     <div>
//       <h1>Mancala</h1>
//       <h3>Player 1, pit your first pit!</h3>
//       <Board />
//     </div>
//   );
// };

// export default Game;

import React, { useState } from 'react';
import '../styles/Game.css';
import { useNavigate } from "react-router-dom";


// top row is PLayer 1
// bottom row is Player 2
const initialBoard = [
  4, 4, 4, 4, 4, 4, 0,
  4, 4, 4, 4, 4, 4, 0
];

const Game = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const navigate = useNavigate();

  const isGameOver = (board) => {
    if (board[6] + board[13] >= 4) {
        alert("Game Over!");
        const finalScore = { player1Score: board[6], player2Score: board[13] };
        console.log(finalScore);
        navigate(`/done`, { state: { finalScore } });
    } else {
      console.log('Player1: ' + board[13] + ' & Player2: ' + board[6]);
    }
  }

  const handlePitClick = (pitIndex) => {
    if (board[pitIndex] === 0) return; // Invalid move if pit is empty
    if ((currentPlayer === 0 && pitIndex >= 6) ||
      (currentPlayer === 1 && pitIndex < 7))
      return; // Invalid move if trying to choose opponent's pit

    let updatedBoard = [...board];

    let marbles = updatedBoard[pitIndex];
    updatedBoard[pitIndex] = 0;

    while (marbles > 0) {
      pitIndex++;
      if (pitIndex === 14) pitIndex = 0; // Wrap around to the beginning

      // Skip opponent's store
      if (
        (currentPlayer === 1 && pitIndex === 6) ||
        (currentPlayer === 0 && pitIndex === 13)
      )
        continue;

      updatedBoard[pitIndex]++;
      marbles--;

      // Capture opponent's marbles
      if (marbles === 0 && updatedBoard[pitIndex] === 1) {
        if (
          (currentPlayer === 0 && pitIndex < 6) ||
          (currentPlayer === 1 && pitIndex > 6 && pitIndex < 13)
        ) {
          const oppositePitIndex = 12 - pitIndex;
          updatedBoard[pitIndex] = 0;
          updatedBoard[6] +=
            updatedBoard[oppositePitIndex] + 1;
          updatedBoard[oppositePitIndex] = 0;
        }
      }
    }

    // Switch players
    setCurrentPlayer(currentPlayer === 0 ? 1 : 0);

    console.log('AFTER: ' + board);
    console.log(updatedBoard[6]);
    console.log(updatedBoard[13]);
    setBoard(updatedBoard);
    isGameOver(updatedBoard);
  };

  const renderTopPits = () => {
    return board.map((marbles, index) => {
      if (index > 6 && index < 13) {
        return (
          <button
              key={index}
              className={`pit ${getPlayerClass(index)}`}
              onClick={() => handlePitClick(index)}
              disabled={
                (currentPlayer === 0 && index >= 6) ||
                (currentPlayer === 1 && index < 7)
              }
            >
              {marbles}
            </button>
        )
      }
    });
  };
  const renderBottomPits = () => {
    return board.map((marbles, index) => {
      if (index < 6) {
        return (
          <button
              key={index}
              className={`pit ${getPlayerClass(index)}`}
              onClick={() => handlePitClick(index)}
              disabled={
                (currentPlayer === 0 && index >= 6) ||
                (currentPlayer === 1 && index < 7)
              }
            >
              {marbles}
            </button>
        )
      }
    });
  };

  const scorePits = (player) => {
      if (player === 0) {
        return (
          <button
            key={13}
            className={`pit score`}
            disabled={true}>
            {board[13]}
          </button>
        )
      } else {
        return (
          <button
            key={6}
            className={`pit score`}
            disabled={true}>
            {board[6]}
          </button>
        )
      }
  }

  const getPlayerClass = (index) => {
    if (
      (currentPlayer === 0 && index === 13) ||
      (currentPlayer === 1 && index === 6)
    ) {
      return 'not-clickable';
    }
    return '';
  };

  return (
    <div className="Game">
      <h1>Mancala Game</h1>
      
      <div className='scores'>{scorePits(0)}</div>
      <div className='pits'>
        <div>{renderTopPits()}</div>
        <div>{renderBottomPits()}</div>
      </div>
      <div className='scores'>{scorePits(1)}</div>
      <div className="turn">
        {currentPlayer === 0 ? 'Player 1' : 'Player 2'}'s Turn
      </div>
    </div>
  );
};

export default Game;