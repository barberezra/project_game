document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.pit').forEach(function(pit) {
        var pitNumber = pit.getAttribute('data-pit');
        
        if (pitNumber !== "7" && pitNumber !== "14") {
            pit.addEventListener('click', function() {
                // Get the pit number from the data attribute
                var pitNumber = parseInt(pit.getAttribute('data-pit'));
                var nextPit = (pitNumber + 1) % 14;
                var numPitsToCollect = parseInt(pit.textContent);
                var pitNumbers = [];
                var pitValues = [];

                for (var i = 0; i < numPitsToCollect; i++) {
                    pitNumbers.push(nextPit + i);
                }

                pitNumbers.forEach(pitIndex => {
                    var pitElement = document.querySelector('.pit[data-pit="' + pitIndex + '"]');
                    if (pitElement) {
                        pitValues.push(pitElement.textContent);
                    }
                });


                // Send an AJAX request to the server to capture the pit value
                fetch('/capture_pit', {
                    method: 'POST',
                    body: JSON.stringify({ pitNumber: pitNumber, pitValue: pit.textContent, pitValues: pitValues }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => {
                    // Handle the response from the server if needed
                    console.log('Pit value captured: ' + data.pitValue);
                    console.log('Pit values: ' + pitValues);
                    var pitResultElement = document.querySelector('.pit[data-pit="' + pitNumber + '"]');
                    pitResultElement.textContent = data.pitValue;
                });
            });
        }
    });
});
