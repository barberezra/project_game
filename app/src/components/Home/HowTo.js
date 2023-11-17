// Instructions page on how to play Mancala

import React from "react";
import { useNavigate } from "react-router-dom";

const HowTo = () => {
    const navigate = useNavigate();

    // give user option to return to Home
    const returnToHomePage = () => {
        navigate("/");
    }
    return(
        <div>
            <h1>Instructions:</h1>
            <div>
                
            </div>
            <span>
                <button onClick={returnToHomePage}>Go Back</button>
            </span>
        </div>
    );
};

export default HowTo;