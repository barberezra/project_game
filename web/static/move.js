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

                    // CAPTURING 
                    if (data.capture) {
                        console.log("Capture occurred on pit: " + pitNumber);
       
                        var oppositePit = 14 - pitNumber;
                        var oppositePitElement = document.querySelector('.pit[data-pit="' + oppositePit + '"]');
       
                        // Capture stones from the opposite pit
                        var capturedStones = parseInt(oppositePitElement.textContent);
                        oppositePitElement.textContent = "0";
       
                        // Determine which Mancala store to add captured stones to. 
                        var mancalaStorePit = (pitNumber <= 6) ? "7" : "14";
                        var mancalaStoreElement = document.querySelector('.pit[data-pit="' + mancalaStorePit + '"]');
       
                        // Add captured stones to the Mancala store
                        mancalaStoreElement.textContent = parseInt(mancalaStoreElement.textContent) + capturedStones + 1; // +1 for the last stone that caused the capture
                    }                    

                });
            });
        }
    });
});
