from flask import Flask, render_template, jsonify, request
import mysql.connector
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
        pitRange = response_data.get('pitRange')
        # Return a JSON response including pitNumber and pitValue
        return jsonify({'pitNumber': pitNumber, 'pitValue': pitValue, 'pitRange': pitRange})
    else:
        # Handle the case where the external API request fails
        return jsonify({'error': 'Failed to capture pit data from the external API'}, 500)
    
@app.route('/dbconnect', methods=['POST'])
def dbconnect():
    try:
        data = request.get_json()
        conn = mysql.connector.connect(
            host='db',  # Use the service name as the host if you're using Docker Compose
            user='root',
            password='thebestgame',
            database='stuff',
            port=3306
        )

        cursor = conn.cursor()

        # Assuming the JSON data includes a SQL query
        query = data['query']
        val = data['values']
        cursor.execute(query, val) # Doesn't update anything
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({'result': query + " " + str(val)})
    except Exception as e:
        return jsonify({'error': str(e)})