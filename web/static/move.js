// Functionality for Game Moves

// player turns
const players = ["Player 1", "Player 2"];
let currentPlayerIndex = 0;

// Board state
let board = Array(14).fill(4);
board[7] = 0;  // Player 1's Mancala
board[14] = 0; // Player 2's Mancala

// switch player turns
function switchTurn() {
    currentPlayerIndex = (currentPlayerIndex + 1) % 2;
    document.querySelector('h3').innerHTML = `Welcome! ${players[currentPlayerIndex]}, it's your turn.`;
}

function welcomeMessage() {
    return "Welcome! Player 1, please click on a pit in your row to start the game.";
}

// watching page activity
document.addEventListener('DOMContentLoaded', function() {
    // welcome
    document.querySelector('h3').innerHTML = welcomeMessage();

    // tracking pit changes
    document.querySelectorAll('.pit').forEach(function(pit) {
        // Get the pit number from the data attribute
        let pitNumber = parseInt(pit.getAttribute('data-pit'));

        // Ensure player cannot click on the Mancala pits or empty pits
        if (pitNumber !== 7 && pitNumber !== 14 && board[pitNumber] !== 0) {
            pit.addEventListener('click', function() {
                if ((currentPlayerIndex === 0 && pitNumber > 6) || (currentPlayerIndex === 1 && pitNumber < 7)) {
                    alert("Be patient! It's not your turn! :)");
                    return;
                }
                
                // Send an AJAX request to the server to capture the pit value
                fetch('/move', {
                    method: 'POST',
                    body: JSON.stringify({ pitNumber: pitNumber }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    board = data.board;

                    // Update the board
                    for (let i = 1; i <= 14; i++) {
                        const pitElement = document.querySelector('.pit[data-pit="' + i + '"]');
                        pitElement.textContent = board[i];
                    }

                    if (data.additionalTurn) {
                        alert("Nice! You get an additional turn!");
                    } else {
                        // Switch turns after a move
                        switchTurn();
                    }

                    // Capture mechanism
                    if (data.capture) {
                        alert("Capture! You captured " + data.capturedStones + " stones!");
                    }
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
            });
        }
    });
});
