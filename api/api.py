from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/move', methods=['GET'])
def move():
    data = request.get_json()
    # Perform the game logic based on the data
    pit = data.get('pit')  # Replace with your actual game logic
    return jsonify({'pit': pit})