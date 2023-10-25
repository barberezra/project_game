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
    var gameEnd = true;
    while (gameEnd == true){
        for(pitId in pits){
            if(pitId%7 == 0 ||pits[pitId] == "0"){
                gameEnd = true; // just because it will only exit end checking if gameEnd is explicitly false
            }
            else if (pits[pitId] != "0"){
                gameEnd =  false;
                break;
                
            }
        }    
    }

    return gameEnd;
    }

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
                    var pitResultElement = document.querySelector('.pit[data-pit="' + pitNumber + '"]');
                    pitResultElement.textContent = data.pitValue;
                    for (const pit of pitRange) {
                        var pitAffectedElement = document.querySelector('.pit[data-pit="' + pit + '"]');
                        var temp = parseInt(pitAffectedElement.textContent);
                        pitAffectedElement.textContent = parseInt(temp + 1);
                    }
                });
            });
        }
    });
    var winCheckPits = {};
    // afaik this is where this should be but let me know if im wrong. i thought it should go in the event listener thing (um im not
    //sure exactly what that does???) but like it's in its own separate loop?
    document.querySelectorAll('.pit').every(function(pit) {
        var pitId = pit.getAttribute('data-pit');
        var pitValue = pit.textContent;
        winCheckPits.push(JSON.stringify({pitId: pitValue}));
    });
    
});
