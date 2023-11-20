import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/About.css'; 

const About = () => {
    const navigate = useNavigate();

    // Give user option to return to Home
    const returnToHomePage = () => {
        navigate("/");
    }

    return(
        <div className="about-container">
            <h1>About</h1>
            <p>
                This version of Mancala has been developed by a dedicated team of students
                for the CS347 course under the guidance of Professor Matthew Lepinski. The game is a 
                result of collaborative efforts aimed at understanding the dynamics of software
                development and user experience design.
            </p>
            <div className="creators-container">
                <h2>Creators</h2>
                <ul>
                    <p>Emilie Morocco</p>
                    <p>Ezra Barber</p>
                    <p>T'airra Champliss</p>
                    <p>Zoey La</p>
                </ul>
            </div>
            <div className="acknowledgments-container">
                <h2>Acknowledgments</h2>
                <p>
                    We would like to thank Professor Matthew Lepinski for the mentorship and to all who provided feedback and support throughout the development process! Additionally, thank you to AlgorithmArena for working on a portion of our game's database, which entails showing ranked players from db: most wins, most loses, and more!
                </p>
            </div>
            <span>
                <button onClick={returnToHomePage}>Go Back</button>
            </span>
        </div>
    );
};

export default About;
