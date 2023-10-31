from flask import Flask, request, jsonify

app = Flask(__name__)

# Initialize the board state
# 6 pits for each player + 1 mancala/store for each player
board = [4] * 6 + [0] + [4] * 6 + [0]

@app.route('/move', methods=['POST'])
def move():
    data = request.get_json()
    pitNumber = data.get('pitNumber')
    stones = board[pitNumber]
    board[pitNumber] = 0

    additional_turn = False
    capture = False
    captured_stones = 0

    # Distribute the stones
    for i in range(1, stones + 1):
        next_pit = (pitNumber + i) % 14
        board[next_pit] += 1

        # Last stone conditions
        if i == stones:
            # Additional turn condition
            if next_pit == 6 or next_pit == 13:
                additional_turn = True

            # Capture condition
            if board[next_pit] == 1 and ((pitNumber <= 6 and next_pit <= 6) or (pitNumber >= 7 and next_pit >= 7)):
                opposite_pit = 12 - next_pit
                captured_stones = board[opposite_pit]
                board[opposite_pit] = 0
                board[next_pit] = 0
                board[6 if pitNumber <= 6 else 13] += captured_stones + 1
                capture = True

    # Return updated board state and other game data
    return jsonify({
        'board': board,
        'pitNumber': pitNumber,
        'pitValue': board[pitNumber],
        'additionalTurn': additional_turn,
        'capture': capture,
        'capturedStones': captured_stones
    })

if __name__ == '__main__':
    app.run(debug=True)
