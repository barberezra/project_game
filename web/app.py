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
        result = None
        if "insertQuery" in data: 
            insertQuery = data['insertQuery']
            cursor.execute(insertQuery['query'], insertQuery['values'])
            conn.commit()
            result = cursor.lastrowid
            
        if "incrementQuery" in data:
            incrementQuery = data['incrementQuery']
            query = incrementQuery['query']
            cursor.execute(query)
            result = cursor.fetchall()
        
        cursor.close()
        conn.close()
        return jsonify({"result": result})
    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/display_database')
def display_database():
    try:
        # Connect to the database
        conn = mysql.connector.connect(
            host='db',
            user='root',
            password='thebestgame',
            database='stuff',
            port=3306
        )

        cursor = conn.cursor()

        # Get the list of tables in the database
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()

        # Assuming there is at least one table in the database
        if tables:
            # Select the first table from the list
            table_name = tables[0][0]

            # Fetch all rows from the selected table
            query = f"SELECT * FROM {table_name}"
            cursor.execute(query)
            rows = cursor.fetchall()

            # Get column names
            cursor.execute(f"SHOW COLUMNS FROM {table_name}")
            columns = [column[0] for column in cursor.fetchall()]

            cursor.close()
            conn.close()

            # Render the template with the retrieved rows and columns
            return render_template('display_database.html', table_name=table_name, rows=rows, columns=columns)

        else:
            return jsonify({'error': 'No tables found in the database'})

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/clear_database', methods=['GET', 'POST'])
def clear_database():
    try:
        if request.method == 'GET':
            # Render the clear_database.html template for GET requests
            return render_template('clear_database.html')

        elif request.method == 'POST':
            # Connect to the database
            conn = mysql.connector.connect(
                host='db',
                user='root',
                password='thebestgame',
                database='stuff',
                port=3306
            )

            cursor = conn.cursor()

            # Assuming you have a table named 'your_table'
            table_name = 'scores'

            # Clear all rows from the table
            cursor.execute(f"DELETE FROM {table_name}")

            conn.commit()
            cursor.close()
            conn.close()

            return jsonify({'message': 'Database cleared successfully'})

    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.route('/winner')
def winner():
    try:
        # Connect to the database
        conn = mysql.connector.connect(
            host='db',
            user='root',
            password='thebestgame',
            database='stuff',
            port=3306
        )

        cursor = conn.cursor()

        # Assuming you have a table named 'scores'
        table_name = 'scores'

        # Fetch the number of games player 1 and player 2 have won
        cursor.execute(f"SELECT COALESCE(SUM(numWins1), 0) AS totalWins1, COALESCE(SUM(numWins2), 0) AS totalWins2 FROM {table_name}")
        result = cursor.fetchone()
        
        total_wins1 = result[0]
        total_wins2 = result[1]

        # Determine the winner
        if total_wins1 > total_wins2:
            winner_message = f"Player 1 wins the most games! ({total_wins1} games)"
        elif total_wins1 < total_wins2:
            winner_message = f"Player 2 wins the most games! ({total_wins2} games)"
        else:
            winner_message = f"Player 1 and Player 2 have won the same number of games! ({total_wins1} games)"

        cursor.close()
        conn.close()

        # Render the template with the winner message and the number of games won
        return render_template('winner.html', winner_message=winner_message, total_wins1=total_wins1, total_wins2=total_wins2)

    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/display_all_tables')
def display_all_tables():
    try:
        # Connect to the database
        conn = mysql.connector.connect(
            host='db',
            user='root',
            password='thebestgame',
            database='stuff',
            port=3306
        )

        cursor = conn.cursor()

        # Get the list of tables in the database
        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()

        cursor.close()
        conn.close()

        # Render the template with the list of tables
        return render_template('display_all_tables.html', tables=tables)

    except Exception as e:
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)