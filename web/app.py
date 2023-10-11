from flask import Flask, render_template, request, jsonify
import os
app = Flask(__name__, template_folder='./templates')

@app.route('/')
def load():
    return render_template('index.html')

@app.route('/capture_pit', methods=['POST'])
def capture_pit():
    data = request.get_json()
    pit = data.get('pit')
    # GAME LOGIC GOES HERE
    return jsonify({'pit': pit})