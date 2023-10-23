from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/move', methods=['POST'])
def move():
    data = request.get_json()
    # Perform the game logic based on the data
    pitNumber = data.get('pitNumber')
    # pitValue = data.get('pitValue') # Replace with your actual game logic
    pitRange = data.get('pitRange')

    lastPit = pitRange[-1] #determine if the last stone ends up in an empty pit on the player's side

    capture = False
    if (1 <= lastPit <= 6 or 8 <= lastPit <= 13) and int(data['pitValue']) == 1:
        capture = True

    if capture:
        oppositePit = 14 - lastPit
    
    # return the current values for those pits and update it
    return jsonify({'pitNumber': pitNumber, 'pitValue': 0, 'pitRange': pitRange})