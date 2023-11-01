// Game Page Setup
import React from 'react';
import Board from './Board';

const Game = () => {
  return (
    <div>
      <h1>Mancala</h1>
      <h3>Player 1, pit your first pit!</h3>
      <Board />
    </div>
  );
};

export default Game;