// Functionality for Game Moves

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
    var gameContinue = true;
        for(pitId in pits){
            if(pitId%7 == 0 ||pits[pitId] == "0"){

            }
            else if (pits[pitId] != "0"){
                gameContinue =  false;
                break;
                
        }    
    }
    var gameEnd = false;
    if (gameContinue == false){
        gameEnd = true;
    }
    return gameEnd;
    }
    var winCheckPits = {};
        // ADD UNIQUE GAME IDS
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.pit').forEach(function(pit) {
        // Get the pit number from the data attribute
        var pitNumber = pit.getAttribute('data-pit');
        
        if (pitNumber !== "7" && pitNumber !== "14" && pit.textContent !== "0") {
            pit.addEventListener('click', function() {
                // Get the pit number from the data attribute
                var pitNumber = pit.getAttribute('data-pit');
                // Get list of all affected pits (from next pit to the last pit affected)
                var pitRange = range(pitNumber, pit.textContent);

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
                    var pitResultElement = document.querySelector('.pit[data-pit="' + pitNumber + '"]');
                    pitResultElement.textContent = data.pitValue;
                    for (const pit of pitRange) {
                        var pitAffectedElement = document.querySelector('.pit[data-pit="' + pit + '"]');
                        var temp = parseInt(pitAffectedElement.textContent);
                        pitAffectedElement.textContent = parseInt(temp + 1);
                    }
                    //moved inside loop
                    //Just pushing the pit ID and then setting the dictionary value manually, will this work?
 
                });
                winCheckPits[pitNumber] = pit.textContent; // Make winCheckPits add all other board pits.
                console.log(winCheckPits);
            });
        }
    });
    

    var gameEnd = gameWin(winCheckPits);
    if(gameEnd == true){
        console.log('The game is over :)');
    }
});