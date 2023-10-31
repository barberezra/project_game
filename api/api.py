from flask import Flask, request, jsonify

app = Flask(__name__)

# Initialize a simple game state
# Pits are numbered 1-14 from left to right from Player 1's perspective
# Pits 7 and 14 are the Mancala stores for Player 1 and Player 2 respectively
# This is just an example; in a real application, you would want to store this
# state in a database or some other persistent storage
game_state = {
    'pits': [4] * 14
}
game_state['pits'][6] = 0  # Mancala store for Player 1 starts empty
game_state['pits'][13] = 0  # Mancala store for Player 2 starts empty

@app.route('/move', methods=['POST'])
def move():
    data = request.get_json()
    pitNumber = int(data.get('pitNumber'))
    pitRange = data.get('pitRange')

    capture = False
    capturedStones = 0

    # Distribute the stones
    stones = game_state['pits'][pitNumber - 1]
    game_state['pits'][pitNumber - 1] = 0
    for pit in pitRange:
        game_state['pits'][pit - 1] += 1
        stones -= 1

    # Check for capture
    last_pit = int(pitRange[-1])
    if (1 <= last_pit <= 6 and game_state['pits'][last_pit - 1] == 1) or \
       (8 <= last_pit <= 13 and game_state['pits'][last_pit - 1] == 1):
        opposite_pit = 14 - last_pit
        capturedStones = game_state['pits'][opposite_pit - 1]
        game_state['pits'][opposite_pit - 1] = 0
        capture = True
        # Add captured stones to player's Mancala store
        if last_pit <= 6:
            game_state['pits'][6] += capturedStones + 1
        else:
            game_state['pits'][13] += capturedStones + 1

    # Add any remaining stones to the next pits in sequence
    for _ in range(stones):
        last_pit = (last_pit % 14) + 1
        game_state['pits'][last_pit - 1] += 1

    # Return the updated game state
    return jsonify({
        'pitNumber': pitNumber,
        'pitValue': 0,  # This might need to be updated depending on your game logic
        'pitRange': pitRange,
        'capture': capture,
        'capturedStones': capturedStones,
        'gameState': game_state['pits']
    })
