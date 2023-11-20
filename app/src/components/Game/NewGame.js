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
//   0, 1, 0, 0, 2, 0, 0,
//   0, 0, 3, 0, 2, 1, 0
// ];

const NewGame = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [emptyRow, setEmptyRow] = useState(false);
  const [showSpecialMove, setSpecialMove] = useState(0);
  const [lastMoveCapturedMarbles, setLastMoveCapturedMarbles] = useState(0);
  const [lastMovePlayer, setLastMovePlayer] = useState(null);
  // names
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [namesEntered, setNamesEntered] = useState(false);
  const navigate = useNavigate();

  // checks to see if the game is over
  // updated board will not show the final score because the state
  // doesn't update until after the next (a React thing)
  const isGameOver = (updatedBoard) => {
    // Check if all pits are empty on one side
    const topRowEmpty = updatedBoard.slice(0, 6).every(pit => pit === 0);
    const bottomRowEmpty = updatedBoard.slice(7, 13).every(pit => pit === 0);

    if (topRowEmpty || bottomRowEmpty) {
      // Calculate the final score by summing all stones
      const p1Score = updatedBoard.slice(0, 7).reduce((a, b) => a + b, 0);
      const p2Score = updatedBoard.slice(7).reduce((a, b) => a + b, 0);
      const finalScore = { player1Score: p1Score, player2Score: p2Score };
      navigate("/game_over", {
        state: {
          player1Score: p1Score,
          player2Score: p2Score,
          player1Name: player1Name,
          player2Name: player2Name
        }
      });
    }
  }

  // // handles whenever a player clicks on a pit in their own section
  const handlePitClick = (pitIndex) => {
    // Invalid move if pit is empty or if it's not the player's own pit
    if (board[pitIndex] === 0 || 
        (currentPlayer === 0 && pitIndex > 5) || 
        (currentPlayer === 1 && pitIndex < 7)) {
      return;
    }
  
    let updatedBoard = [...board];
    let marbles = updatedBoard[pitIndex];
    updatedBoard[pitIndex] = 0;
    let lastPitIndex = pitIndex;
    
    // Distribute marbles
    while (marbles > 0) {
      lastPitIndex = (lastPitIndex + 1) % 14;
  
      // Skip opponent's store
      if ((currentPlayer === 0 && lastPitIndex === 13) || 
          (currentPlayer === 1 && lastPitIndex === 6)) {
        continue;
      }
  
      updatedBoard[lastPitIndex]++;
      marbles--;
    }
  
    // Capture logic, only if the last marble lands in an empty pit on the current player's side
    if ((currentPlayer === 0 && lastPitIndex < 6 && updatedBoard[lastPitIndex] === 1 && updatedBoard[12 - lastPitIndex] > 0) ||
        (currentPlayer === 1 && lastPitIndex > 6 && lastPitIndex < 13 && updatedBoard[lastPitIndex] === 1 && updatedBoard[12 - lastPitIndex] > 0)) {
      let capturedStones = updatedBoard[12 - lastPitIndex];
      updatedBoard[lastPitIndex] = 0;
      updatedBoard[12 - lastPitIndex] = 0;
      updatedBoard[currentPlayer === 0 ? 6 : 13] += capturedStones + 1;
      setSpecialMove(1); // Notify user of captured pit move
      setLastMovePlayer(currentPlayer);
      setLastMoveCapturedMarbles(capturedStones); 
    } else {
      setSpecialMove(0); // Reset special move notification
      setLastMoveCapturedMarbles(0);
    }
  
    // Check if the last marble lands in the player's store for an extra turn
    if ((currentPlayer === 0 && lastPitIndex === 6) || 
        (currentPlayer === 1 && lastPitIndex === 13)) {
      setSpecialMove(2); // Player gets another turn
    } else {
      setCurrentPlayer(currentPlayer === 0 ? 1 : 0); // Change turn
    }
  
    setBoard(updatedBoard); // Update the board state
  
    // Check if the game is over
    isGameOver(updatedBoard);
  
    // Check if there are any empty rows; if so, open up all pits
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
              <p>{marbles}</p>
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
              <p>{marbles}</p>
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
            <p>{board[13]}</p>
          </button>
        )
      } else {
        return (
          <button
            key={6}
            className={`score`}
            disabled={true}>
            <p>{board[6]}</p>
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

  // give user option to return to Home
  const returnToHomePage = () => {
    navigate("/");
  }

  // determines which row highlight to turn on/off depending on the player
  const getPlayerClass = (index) => {
    if (((currentPlayer === 0 && index > 6) || (currentPlayer === 1 && index < 6)) && emptyRow === false) {
      return 'not-clickable';
    }
    return '';
  };

  // notifies player if they completed a special move
  const displaySpecialMove = (move) => {
    const movePlayerName = move === 1 ? (lastMovePlayer === 0 ? player1Name : player2Name) : (currentPlayer === 0 ? player1Name : player2Name);
    const opponentPlayerName = move === 1 ? (lastMovePlayer === 0 ? player2Name : player1Name) : (currentPlayer === 0 ? player2Name : player1Name);
  
    if (move === 1) {
      return `${movePlayerName} landed on their empty pit and captured ${lastMoveCapturedMarbles} of ${opponentPlayerName}'s marbles, capturing ${lastMoveCapturedMarbles + 1} marbles in total!`;
    } else if (move === 2) {
      return `${movePlayerName} landed in their Mancala and gets another turn!`;
    } else {
      return '';
    }
  };
  
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (player1Name && player2Name) {
      setNamesEntered(true);
    } else {
      alert("Please enter names for both players!");
    }
  };
  
  return (
    <div className='Game'>
      <h1>Mancala</h1>
      {!namesEntered ? (
        <div className="name-entry-form">
          <form onSubmit={handleNameSubmit}>

            {/* Player 1 Name Input */}
            <div className="input-group">
              <label htmlFor="player1Name">Player 1 Name:</label>
              <input
                type="text"
                id="player1Name"
                placeholder="Enter Player 1 Name"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
              />
            </div>
  
            {/* Player 2 Name Input */}
            <div className="input-group">
              <label htmlFor="player2Name">Player 2 Name:</label>
              <input
                type="text"
                id="player2Name"
                placeholder="Enter Player 2 Name"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
              />
            </div> 
            <button type="submit" className="start-game-button">Start Game</button>
          </form>
        </div>
      ) : (
        <>
          <div className='turn'>
            {currentPlayer === 0 ? `${player1Name}'s Turn` : `${player2Name}'s Turn`}
          </div>
          <p className='noti-box'> {displaySpecialMove(showSpecialMove)} </p>
          <div className='board'>
            <div className='scores'>{scorePits(0)}</div>
            <div className='pits-box'>
              <div>{renderTopPits()}</div>
              <div>{renderBottomPits()}</div>
            </div>
            <div className='scores'>{scorePits(1)}</div>
          </div>
          <span>
            <button onClick={returnToHomePage}>Return to Home</button>
          </span>
        </>
      )}
    </div>
  );
  
};

export default NewGame;