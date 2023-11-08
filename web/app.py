from flask import Flask, render_template, jsonify, request
import requests

app = Flask(__name__, template_folder='./templates')

@app.route('/')
def load():
    return render_template('index.html')

@app.route('/move', methods=['POST'])
def move():
    api_url = 'http://api:5000/move' 
    data = request.get_json()

    # forward the request to the actual game logic API
    response = requests.post(api_url, json=data)

    if response.status_code == 200:
        # if the API request is successful, pass through the JSON response
        return jsonify(response.json())
    else:
        # if there's an error, return an appropriate message and status code
        return jsonify({'error': 'Failed to process move'}), response.status_code

if __name__ == '__main__':
    # set the port to your frontend's port if different from 5000
    app.run(debug=True, port=5000)
