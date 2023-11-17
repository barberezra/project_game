// RANKINGS PAGE FOR THE OTHER TEAM

import React from 'react';
import { useNavigate } from "react-router-dom";

const Rankings = () => {
    const navigate = useNavigate();

    // give user option to return to Home
    const returnToHomePage = () => {
        navigate("/");
    }

    return (
        <div>
            <h1>Rankings Page</h1>
            <div>
                
            </div>
            <span>
                <button onClick={returnToHomePage}>Return Home</button>
            </span>
        </div>
    );
}

export default Rankings;