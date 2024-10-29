
from Gemini.test import response
from dataset import datasets
from flask import Flask, jsonify, request
from flask_cors import CORS  # type: ignore
from details import symptoms_dict  # Import symptoms_dict from details.py
# Import prediction functions from model.py
from model import get_predicted_value, helper

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route("/dataset")
def get_dataset():
    return jsonify(datasets)


@app.route("/symptoms", methods=['GET'])
def get_symptoms():
    return jsonify(list(symptoms_dict.keys()))


@app.route("/questions", methods=['GET'])
def get_questions():
    symptom = request.args.get('symptom')
    if not symptom:
        return jsonify({"error": "No symptom provided"}), 400

    # Generate questions dynamically based on the symptom
    questions = [
        f"Do you have {symptom}?",
        "Do you have a fever?",
        "Do you have a cough?",
        "Do you have a sore throat?",
        "Do you have a headache?",
        "Do you have muscle pain?",
        "Do you have difficulty breathing?",
        "Do you have fatigue?",
        "Do you have a runny nose?",
        "Do you have nausea?",
        "Do you have diarrhea?"
    ]
    return jsonify(questions[:10])


@app.route("/predict", methods=['POST'])
def predict():
    data = request.json
    symptom = data.get('symptom')
    responses = data.get('responses', [])
    if not symptom or not responses:
        return jsonify({"error": "Invalid input"}), 400

    # Use responses to adjust the prediction (this is a placeholder logic)
    # You can implement a more sophisticated logic based on your model
    weight = sum(1 for response in responses if response == "yes")
    predicted_disease = get_predicted_value([symptom] * weight)
    dis_des, precautions, medications, rec_diet, workout = helper(
        predicted_disease)

    return jsonify({
        "predicted_disease": predicted_disease,
        "description": dis_des,
        "precautions": precautions,
        "medications": medications,
        "diet": rec_diet,
        "workout": workout
    })


@app.route("/gemini")
def gemini():
    return (response.text)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
