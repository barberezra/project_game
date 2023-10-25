// Functionality for Game Moves

// player turns
const players = ["Player 1", "Player 2"];
let currentPlayerIndex = 0;

// switch player turns
function switchTurn() {
  currentPlayerIndex = (currentPlayerIndex + 1) % 2;
}

// finds the range of affected pits from click dispersal
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
        var pitNumber = pit.getAttribute('data-pit');
        
        if (pitNumber !== "7" && pitNumber !== "14" && pit.textContent !== "0") {
            pit.addEventListener('click', function() {
                // Get the pit number from the data attribute
                var pitNumber = pit.getAttribute('data-pit');
                // Get list of all affected pits (from next pit to the last pit affected)
                var pitRange = range(pitNumber, pit.textContent);

                pitNumbers.forEach(pitIndex => {
                    var pitElement = document.querySelector('.pit[data-pit="' + pitIndex + '"]');
                    if (pitElement) {
                        pitValues.push(pitElement.textContent);
                    }
                });


                // Send an AJAX request to the server to capture the pit value
                fetch('/capture_pit', {
                    method: 'POST',
                    body: JSON.stringify({ pitNumber: pitNumber, pitValue: pit.textContent, pitRange: pitRange }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    // Handle the response from the server if needed
                    console.log('Pit value captured: ' + data.pitValue);
                    console.log('Pit values affected: ' + pitRange);
                    console.log('Context: ' + pit.textContent + typeof(pit.textContent));
                    console.log(players[currentPlayerIndex]);
                    var pitResultElement = document.querySelector('.pit[data-pit="' + pitNumber + '"]');
                    pitResultElement.textContent = data.pitValue;
                    for (const pit of pitRange) {
                        var pitAffectedElement = document.querySelector('.pit[data-pit="' + pit + '"]');
                        var temp = parseInt(pitAffectedElement.textContent);
                        pitAffectedElement.textContent = parseInt(temp + 1);
                    }
                });

                switchTurn();
                // notifying users of player turn
                document.querySelector('h3').innerHTML = players[currentPlayerIndex]+"'s turn:";
            });
        }
    });
});