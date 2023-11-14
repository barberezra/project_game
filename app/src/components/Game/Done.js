import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Done = () => {
    return (
        <div>
            <h1>Final Score: { 555 }</h1>
            <Link to="/">
                <button className="home">Go Home</button>
            </Link>
        </div>
    );
}

export default Done;