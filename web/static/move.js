document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.pit').forEach(function(pit) {
        var pitNumber = pit.getAttribute('data-pit');
        
        if (pitNumber !== "7" && pitNumber !== "14") {
            pit.addEventListener('click', function() {
                // Get the pit number from the data attribute
                var pitNumber = pit.getAttribute('data-pit');
                var nextPit = (pitNumber+1) % 14
                var pitRange = list(range(nextPit, nextPit + (pit.textContent-1)))
                var pitValues= []
                for (pitValue in pitRange) {
                    pitValues.append(pit.getAttribute(pitValue).textContent)
                }

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
