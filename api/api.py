from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/move', methods=['POST'])
def move():
    data = request.get_json()
    # Perform the game logic based on the data
    pitNumber = data.get('pitNumber')
    pitValue = data.get('pitValue') # Replace with your actual game logic
    
    pitValue = "1"

    # get the ids of the pits affected by the number of the current pit clicked
    pitValues = list(range(pitNumber))

    # get the current value of each of those pits and add one to each of them

    # return the current values for those pits and update it
    return jsonify({'pitNumber': pitNumber, 'pitValue': pitValue})