from flask import Flask, render_template, jsonify, request
import os
import requests
app = Flask(__name__, template_folder='./templates')

@app.route('/')
def load():
    return render_template('index.html')

@app.route('/capture_pit', methods=['POST'])
def capture_pit():
    api_url = 'http://api:5000/move'
    data = request.get_json()

    response = requests.post(api_url, json=data)

    if response.status_code == 200:
        # If the API request is successful, parse the JSON response
        response_data = response.json()
        pitNumber = response_data.get('pitNumber')
        pitValue = response_data.get('pitValue')
        # Return a JSON response including pitNumber and pitValue
        return jsonify({'pitNumber': pitNumber, 'pitValue': pitValue})
    else:
        # Handle the case where the external API request fails
        return jsonify({'error': 'Failed to capture pit data from the external API'}, 500)
