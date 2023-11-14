from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/move', methods=['POST'])
def move():
    data = request.get_json()
    board_state = data['board_state']  # current state of the game board
    pit_index = data['pit_index']  # index of the pit selected for the move
    current_player = data['current_player']  # current player making move

    # retrieving the number of stones to distribute from the selected pit
    stones_to_distribute = board_state[pit_index]
    board_state[pit_index] = 0  # emptying the selected pit
    index = pit_index  # start distributing stones from the selected pit
    last_pit_index = None  

    # distributing stones across the pits in a loop
    while stones_to_distribute > 0:
        index = (index + 1) % 14  # determing the next pit index
        # skip placing a stone in the opponent's big pit
        if (current_player == 1 and index != 13) or (current_player == 2 and index != 6):
            board_state[index] += 1  
            stones_to_distribute -= 1  
            last_pit_index = index  

    another_turn = False  # to determine if the current player gets another turn

    # check if the last stone landed in the current player's big pit
    if (current_player == 1 and last_pit_index == 6) or (current_player == 2 and last_pit_index == 13):
        another_turn = True

    # check if the last stone landed in an empty pit on the player's side
    captured_stones = 0  # initialize the count of captured stones
    if board_state[last_pit_index] == 1 and ((current_player == 1 and 0 <= last_pit_index < 6) or (current_player == 2 and 7 <= last_pit_index < 13)):
        opposite_index = 12 - last_pit_index  # calculating the index of the pit opposite to the last pit
        captured_stones = board_state[opposite_index]  # capturing the stones from the opposite pit
        # adding the captured stones to the player's big pit
        board_state[current_player * 7 - 1] += board_state[opposite_index] + 1
        board_state[last_pit_index] = board_state[opposite_index] = 0  # clear the last pit and the opposite pit

    # check if the game is over by checking if one side of the board is empty (this is NOT accurate)
    player_one_side_empty = all(stone == 0 for stone in board_state[0:6])
    player_two_side_empty = all(stone == 0 for stone in board_state[7:13])
    game_over = player_one_side_empty or player_two_side_empty

    if game_over:
        # if the game is over, move remaining stones to the respective big pits
        if player_one_side_empty:
            board_state[13] += sum(board_state[7:13])  # moving player 2's stones to their big pit
            for i in range(7, 13):
                board_state[i] = 0
        else:
            board_state[6] += sum(board_state[0:6])  # moving player 1's stones to their big pit
            for i in range(0, 6):
                board_state[i] = 0

    return jsonify({
        'board_state': board_state,
        'game_over': game_over,
        'another_turn': another_turn,
        'captured_stones': captured_stones
    })

if __name__ == '__main__':
    app.run(debug=True)
