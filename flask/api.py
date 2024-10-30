from flask import Flask, jsonify
from flask_cors import CORS
from datetime import datetime


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/time', methods=['GET'])
def get_current_time():
    current_time = datetime.now().strftime("%H:%M:%S")
    return jsonify({"time": current_time})

@app.route('/details', methods=['GET'])
def get_details():
    
    return {'name':"Karthi",
                    'age':21,
                    'DOB':2003}

if __name__ == "__main__":
    app.run(debug=True, port=5000)
