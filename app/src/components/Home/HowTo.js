import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/HowTo.css';

const HowTo = () => {
    const navigate = useNavigate();

    // Give user option to return to Home
    const returnToHomePage = () => {
        navigate("/");
    }

    return(
        <div className="how-to-container">
            <h1>Instructions for Mancala</h1>
            <div className="video-container">
                <h2>Watch this video for a detailed guide on how to play Mancala:</h2>
                <iframe 
                    width="560" 
                    height="315" 
                    src="https://www.youtube.com/embed/OX7rj93m6o8" 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                </iframe>
            </div>
            <div className="text-instructions">
                <h2>Alternatively, follow these text instructions:</h2>
                <ul>
                    <li>Each player owns six pits along with a larger store pit on their end of the board.</li>
                    <li>Players take turns to pick up all stones from one of their pits and distribute them, one by one, into subsequent pits in a counter-clockwise direction.</li>
                    <li>If the last stone lands in your store, you get another turn.</li>
                    <li>If the last stone lands in an empty pit on your side, you capture that stone and any stones in the pit directly opposite.</li>
                    <li>The game ends when all six pits on either side are empty.</li>
                    <li>The player with the most stones in their store at the end of the game wins.</li>
                </ul>
            </div>
            <span>
                <button onClick={returnToHomePage}>Go Back</button>
            </span>
        </div>
    );
};

export default HowTo;
