function range(start, end) {
    var result = [];
    for (let i = start; i <= end; i++) {
        result.push(i)
    }
    return result;
}




document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.pit').forEach(function(pit) {
        var pitNumber = pit.getAttribute('data-pit');
        
        if (pitNumber !== "7" && pitNumber !== "14") {
            pit.addEventListener('click', function() {
                // Get the pit number from the data attribute
                var pitNumber = pit.getAttribute('data-pit'); // FIX DATA GATHERING (LIST LOGIC)
                var nextPit = (pitNumber+1) % 14
                const pitRange = range(nextPit, nextPit + (pit.textContent-1))
                var pitValues= []
                for (pitValue in pitRange) {
                    pitValues.push(pit.textContent)
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
