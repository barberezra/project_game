from flask import Flask, render_template, jsonify
import os
import requests
app = Flask(__name__, template_folder='./templates')

@app.route('/')
def load():
    return render_template('index.html')

@app.route('/capture_pit', methods=['POST'])
def capture_pit():
    api_url = 'http://api:5000/move'
    response = requests.get(api_url)
    response_data = response.json()  # Use .json() if the response is in JSON format
    pit = response_data.get('pit')
    # GAME LOGIC GOES HERE
    return jsonify({'pit': pit})