// Instructions page on how to play Mancala

import React from "react";
import { Link } from 'react-router-dom';

const HowTo = () => (
    <div>
        <h1>Instructions:</h1>
        <Link to="/">
            <button>Go Home</button>
        </Link>
    </div>
);

export default HowTo;