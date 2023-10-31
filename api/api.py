from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/move', methods=['POST'])
def move():
    data = request.get_json()
    # Perform the game logic based on the data
    pitNumber = data.get('pitNumber')
    # pitValue = data.get('pitValue') # Replace with your actual game logic
    pitRange = data.get('pitRange')

    capture = False
    capturedStones = 0

    if pitNumber <= 6:
        if pitRange[-1] <= 6 and pitRange[-1] != pitNumber:
            capture = True
    else:
        if 7 <= pitRange[-1] <= 13 and pitRange[-1] != pitNumber:
            capture = True
    
    if capture:
        opposite = 14 - pitRange[-1]
        capturedStones = 4

    # return the current values for those pits and update it
    return jsonify({'pitNumber': pitNumber, 'pitValue': 0, 'pitRange': pitRange, 'capture' : capture, 'capturedStones':capturedStones})