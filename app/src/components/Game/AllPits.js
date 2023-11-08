import React, { useEffect, useState } from 'react';
import '../styles/AllPits.css';

// finds the range of affected pits
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

// checks to see if the game is over
function isGameOver() {
    let total = 0;
    document.querySelectorAll('.scores').forEach(function(scoringPit) {
        total += parseInt(scoringPit.innerHTML);
    });
    if (total === 48) {
        alert('GAME OVER!');
    } else {
        console.log('CURRENT COUNT: ' + total);
    }
}

// clickable player pits
class PlayingPits extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = ({pitPosition: props.position,
            pitValue: props.pitVal,
            pitGroup: props.group,
            isDisabled: false
        });
    };

    handleClick = () => {
        var pitRange = range(this.state.pitPosition, this.state.pitValue);
        this.setState({
            isDisabled: !this.state.isDisabled,
            pitValue: 0,
        });

        document.querySelectorAll('.all').forEach(function(pit) {
            for (const pitNum of pitRange) {
                
            }
        });

        // isGameOver();
        console.log('pos ' + this.state.pitPosition);
        console.log('val ' + this.state.pitValue);
        console.log('group ' + this.state.pitGroup);
    }

    render() {
        if (this.state.pitGroup === 1) {
            return (
                <button id={this.state.pitPosition}  className="squares all" onClick={this.handleClick}>
                    { this.state.pitValue }
                </button>
            );
        } else {
            return (
                <button id={this.state.pitPosition}  className="squares all" onClick={this.handleClick}>
                    { this.state.pitValue }
                </button>
            );
        }
    }
};

// scoring pits (unclickable)
const ScoringPits = (props) => {
    let pitPosition = props.position;
    let pitValue = props.pitVal;

    return (
        <button id={pitPosition} className="scores all">
            { pitValue }
        </button>
    );
};

export { PlayingPits, ScoringPits };