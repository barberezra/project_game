from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/move', methods=['POST'])
def move():
    data = request.get_json()
    # Perform the game logic based on the data
    pitNumber = data.get('pitNumber')
    # pitValue = data.get('pitValue') # Replace with your actual game logic
    pitRange = data.get('pitRange')

    # return the current values for those pits and update it
    return jsonify({'pitNumber': pitNumber, 'pitValue': 0, 'pitRange': pitRange})