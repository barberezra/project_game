// Home Base

import React from "react";
import { Link } from 'react-router-dom';
import '../styles/Home.css'

const Home = () => (
    <div className="content">
        <h1>Welcome To Mancala!</h1>
        <Link to="/game">
            <button className="home">New Game</button>
        </Link>
        <br />
        <Link to="/how_to">
            <button className="home">How To Play</button>
        </Link>
        <br />
        {/* <Link to="/rankings">
            <button className="home">Rankings</button>
        </Link> */}
        {/* <br /> */}
        <Link to="/about">
            <button className="home">About</button>
        </Link>
        <br />
    </div>
  );
  
  export default Home;