// Game board and game logic page

import React, { useState } from 'react';
import '../styles/NewGame.css';
import { useNavigate } from "react-router-dom";


// bottom row is Player 1 with index 6
// top row is PLayer 2 with index 13
const initialBoard = [
  4, 4, 4, 4, 4, 4, 0,
  4, 4, 4, 4, 4, 4, 0
];

// DEMO BOARD
// const initialBoard = [
//   1, 0, 0, 0, 0, 1, 0,
//   0, 1, 0, 0, 1, 0, 0
// ];

const NewGame = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [emptyRow, setEmptyRow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  // checks to see if the game is over
  // updated board will not show the final score because the state
  // doesn't update until after the next (a React thing)
  const isGameOver = (board) => {
    let p1Score = board[6];
    let p2Score = board[13];
    // alerts user of Game Over and redirects to Game Over Page
    if (p1Score + p2Score == 48) {
        // setShowAlert(true);
        console.log(showAlert);
        const finalScore = { player1Score: p1Score, player2Score: p2Score };
        navigate("/game_over", { state : finalScore });
    } else {
      console.log('Player1: ' + board[6] + ' & Player2: ' + board[13]);
    }
  }

  // display game over and go to winners page with final score
  const displayGameOver = () => {
      setShowAlert(true);
        console.log(showAlert);
  }

  // handles whenever a player clicks on a pit in their own section
  const handlePitClick = (pitIndex) => {
    // Invalid move if pit is empty
    if (board[pitIndex] === 0)
      return;

    // Invalid move if trying to choose opponent's pit
    // turns this off if there is an empty row to allow players to click on open pits
    if (((currentPlayer === 0 && pitIndex >= 6) || (currentPlayer === 1 && pitIndex < 7)) && emptyRow === false)
      return;

    // updates board setting current pit to zero and storing marbles value from that pit
    let updatedBoard = [...board];
    let marbles = updatedBoard[pitIndex];
    updatedBoard[pitIndex] = 0;


    // distribute marbles to pits
    while (marbles > 0) {
      pitIndex++;
       // Wrap around to the beginning
      if (pitIndex === 14) pitIndex = 0;

      // Skip opponent's store
      if ((currentPlayer === 1 && pitIndex === 6) || (currentPlayer === 0 && pitIndex === 13))
        continue;

      updatedBoard[pitIndex]++;
      marbles--;
    }

    // SPECIAL MOVE: Lands on Mancala Logic
    // gives current player another turn if they land in their own mancala
    if (pitIndex !== 6 && pitIndex !== 13) {
      // SPECIAL MOVE: Capture other player's pit logic
      // ONLY if player lands on an empty pit that is across from a non-empty pit
      if (updatedBoard[pitIndex] === 1) {
        const oppositePitIndex = 12 - pitIndex;
        if (updatedBoard[oppositePitIndex] > 0) {
          const capturedPit = updatedBoard[oppositePitIndex] + 1;
          // set current and opposite pits to zero
          updatedBoard[oppositePitIndex] = 0;
          updatedBoard[pitIndex] = 0;
          // give captured pits to the current player
          if (currentPlayer === 0) {
            updatedBoard[6] += capturedPit;
          } else {
            updatedBoard[13] += capturedPit;
          }
        }
      }
      // Switch players
      setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
    }

    //update the board
    setBoard(updatedBoard);

    // check if the Game is Over
    isGameOver(updatedBoard);

    // check if there are any empty rows; if so, open up all pits
    isRowEmpty(updatedBoard);
  };

// makes pits for Player 2
  const renderTopPits = () => {
    const reversedBoard = Array.from(board);

    return reversedBoard.reverse().map((marbles, index) => {
      if (index > 0 && index < 7) {
        const realindex = (13-index);
        return (
          <button
              key={realindex}
              className={`pit ${getPlayerClass(realindex)}`}
              onClick={() => handlePitClick(realindex)}
              disabled={
                ((currentPlayer === 0 && realindex >= 6) ||
                (currentPlayer === 1 && realindex < 7)) && 
                emptyRow === false
              }
            >
              {marbles}
            </button>
        )
      }
    });
  };

// makes pits for Player 1
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
                (currentPlayer === 1 && index < 7) && 
                emptyRow === false
              }
            >
              {marbles}
            </button>
        )
      }
    });
  };

  // makes score pits and disables them so users cannot choose them
  const scorePits = (player) => {
      if (player === 0) {
        return (
          <button
            key={13}
            className={`score`}
            disabled={true}>
            {board[13]}
          </button>
        )
      } else {
        return (
          <button
            key={6}
            className={`score`}
            disabled={true}>
            {board[6]}
          </button>
        )
      }
  }

  // checks if either row is completely empty so the other pits can be opened up
  const isRowEmpty = (board) => {
    const topRow = (
      board[0] === 0 &&
      board[1] === 0 &&
      board[2] === 0 &&
      board[3] === 0 &&
      board[4] === 0 &&
      board[5] === 0
      );
      const botRow = (
        board[7] === 0 &&
        board[8] === 0 &&
        board[9] === 0 &&
        board[10] === 0 &&
        board[11] === 0 &&
        board[12] === 0
        );
    if (topRow || botRow) {
        setEmptyRow(true);
    } else {
        setEmptyRow(false);
    }
  }

  // const returnToHomePage = () => {
  //   navigate("/");
  // }

  // determines which row to turn on depending on the player
  const getPlayerClass = (index) => {
    if (((currentPlayer === 0 && index === 13) || (currentPlayer === 1 && index === 6))) {
      return 'not-clickable';
    }
    return '';
  };

  return (
    <div className="Game">
      {/* {showAlert && (
        <div className="modal">
          <div className="alert">
            <h1>Game Over</h1>
            <button onClick={isGameOver}>OK</button>
          </div>
        </div>
      )} */}
      <h1>Mancala Game </h1>
      <div className="turn">
        {currentPlayer === 0 ? 'Player 1' : 'Player 2'}'s Turn:
      </div>
      
      <div className='board'>
        <div className='scores'>{scorePits(0)}</div>
        <div className='pits-box'>
          <div>{renderTopPits()}</div>
          <div>{renderBottomPits()}</div>
        </div>
        <div className='scores'>{scorePits(1)}</div>
      </div>
      <span>
        {/* <button onClick={returnToHomePage}>Return to Home</button> */}
      </span>
    </div>
  );
};

export default NewGame;