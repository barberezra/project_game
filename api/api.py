from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/move', methods=['POST'])
def move():
    data = request.get_json()
    # Perform the game logic based on the data
    pitNumber = data.get('pitNumber')
    # pitValue = data.get('pitValue') 
    pitRange = data.get('pitRange')

    capture = False
    capturedStones = 0

    # Check if the last stone lands in an empty pit on the player's side
    if pitNumber <= 6:  # Player 1's side
        if pitRange[-1] <= 6 and pitRange[-1] != pitNumber:  # Exclude the starting pit
            capture = True
    else:  # Player 2's side
        if 7 <= pitRange[-1] <= 13 and pitRange[-1] != pitNumber:  # Exclude the starting pit
            capture = True

    if capture:
        oppositePit = 14 - pitRange[-1]
        capturedStones = 4  # This is a placeholder


    # return the current values for those pits and update it
    return jsonify({'pitNumber': pitNumber, 'pitValue': 0, 'pitRange': pitRange, 'capture': capture,'capturedStones': capturedStones})