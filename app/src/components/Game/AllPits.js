import React from 'react';
import '../styles/AllPits.css';

function range(start, moves) {
    var res = [];
    for (let i = 1; i <= parseInt(moves); i++) {
        if ((parseInt(start) + i) == 14) {
            res.push(14);
        } else {
            res.push((parseInt(start) + i) % 14);
        }
    }
    return res;
}

const PlayingPits = (props) => {
    let position = props.position;
    let pitValue = props.pitVal;
    let pitRange = range(position, pitValue);

    function handleClick() {
        fetch('/capture_pit', {
            method: 'POST',
            body: JSON.stringify({ pitNumber: position, pitValue: pitValue, pitRange: pitRange }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server if needed
            console.log('Pit value captured: ' + data.pitValue);
            console.log('Pit values affected: ' + pitRange);
        })
        .catch(error => console.error(error));
    }

    return (
        <button className="squares" onClick={handleClick}>
            { pitValue }
        </button>
    );
};

const ScoringPits = (props) => {
    let position = props.position;

    return (
        <button className="scores" disabled>
            { 0 }
        </button>
    );
};

export { PlayingPits, ScoringPits };