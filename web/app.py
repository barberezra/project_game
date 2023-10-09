from flask import Flask, render_template, send_from_directory
import os
app = Flask(__name__, template_folder='./templates')

@app.route('/')
def load():
    return render_template('index.html')