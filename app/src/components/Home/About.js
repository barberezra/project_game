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
                    Special thanks to Professor Matthew Lepinski for the mentorship and to all who 
                    provided feedback and support throughout the development process!
                </p>
            </div>
            <span>
                <button onClick={returnToHomePage}>Go Back</button>
            </span>
        </div>
    );
};

export default About;
