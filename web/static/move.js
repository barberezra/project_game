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

function gameWin(pits) {
    var gameEnd = false;
        for(pitId in pits){
            if(pitId%7 == 0 ||pits[pitId] == "0"){
                gameEnd = true;
            }
            else if (pitId%7 != 0 && pits[pitId] != "0"){
                return false;     
        }    
    }
    return gameEnd;
    }

    var winCheckPits = {};
        // ADD UNIQUE GAME IDS
function welcomeMessage() {
    return "Welcome! Player 1, please click on a pit in your row to start the game.";
}
// watching page activity
document.addEventListener('DOMContentLoaded', function () {
    // welcome
    document.querySelector('h3').innerHTML = welcomeMessage();
    // tracking pit changes
    document.querySelectorAll('.pit').forEach(function (pit) {
        // Get the pit number from the data attribute
        var pitNumber = pit.getAttribute('data-pit');

        if (pitNumber !== "7" && pitNumber !== "14" && pit.textContent !== "0") {
            pit.addEventListener('click', function () {
                // Get the pit number from the data attribute
                var pitNumber = pit.getAttribute('data-pit');
                // Get list of all affected pits (from the next pit to the last pit affected)
                var pitRange = range(pitNumber, pit.textContent);

                // Send an AJAX request to the server to capture the pit value
                fetch('/capture_pit', {
                    method: 'POST',
                    body: JSON.stringify({
                        pitNumber: pitNumber,
                        pitValue: pit.textContent,
                        pitRange: pitRange
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        // Handle the response from the server if needed
                        console.log('Pit IDs affected: ' + pitRange);
                        console.log('Context: ' + pit.textContent + typeof (pit.textContent));
                        console.log(players[currentPlayerIndex]);
                        var pitResultElement = document.querySelector('.pit[data-pit="' + pitNumber + '"]');
                        pitResultElement.textContent = data.pitValue;
                        for (const pit of pitRange) {
                            var pitAffectedElement = document.querySelector('.pit[data-pit="' + pit + '"]');
                            var temp = parseInt(pitAffectedElement.textContent);
                            pitAffectedElement.textContent = parseInt(temp + 1);
                        }

                        for (const pit of document.querySelectorAll('.pit')) {
                            var pitId = pit.getAttribute('data-pit');
                            winCheckPits[pitId] = pit.textContent;
                        }
                        console.log(winCheckPits);
                        var gameEnd = gameWin(winCheckPits);
                        if (gameEnd == true) {
                            console.log('The game is over :)');
                            var player1 = winCheckPits[7];
                            var player2 = winCheckPits[14];
                            var dbString = player1 + " : " + player2;
                            var res = "Player 1 score: " + player1 + " Player 2 score: " + player2;
                            if (player1 > player2) {
                                console.log("Player 1 win");
                                var playerWhoWon: 'numWins1';
                            } else if (player2 > player1) {
                                console.log("Player 2 win");
                                var playerWhoWon: 'numWins2';
                            } else {
                                console.log("How did you manage this");
                            }
                            var incrementQuery = {query: 'SELECT MAX(%s) AS incrementWins FROM scores', playerWhoWon: playerWhoWon};
                            console.log(res);
                            fetch('/dbconnect', {
                                method: 'POST',
                                body: JSON.stringify({
                                    incrementQuery: incrementQuery
                                }),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(data => {
                                // Handle the response from the server
                                console.log('Response from server:', data);
                                if (data && data[0] && data[0].incrementWins) {
                                    var incWins = data[0].incrementWins + 1;
                                    console.log(str(incWins));
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            })
                            var insertQuery = {query: 'INSERT INTO scores (score, %s) VALUES (%s, %s)', values: [playerWhoWon, dbString, incWins];
                            fetch('/dbconnect', {
                                method: 'POST',
                                body: JSON.stringify(
                                    insertQuery: insertQuery
                                )
                            })
                        }
                    });
            });
        };
    });
});
