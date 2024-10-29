# model.py

import numpy as np
import pandas as pd
import pickle
from details import symptoms_dict,diseases_list # Import symptoms_dict from details.py

# Load the model
svc = pickle.load(open('D:/Karthikyan/SECRET/Project Phase I/Medicine-Recommendation-System-/model/svc.pkl', 'rb'))

# Load datasets
description = pd.read_csv("D:/Karthikyan/SECRET/Project Phase I/Medicine-Recommendation-System-/dataset/description.csv")
precautions = pd.read_csv("D:/Karthikyan/SECRET/Project Phase I/Medicine-Recommendation-System-/dataset/precautions_df.csv")
medications = pd.read_csv('D:/Karthikyan/SECRET/Project Phase I/Medicine-Recommendation-System-/dataset/medications.csv')
diets = pd.read_csv("D:/Karthikyan/SECRET/Project Phase I/Medicine-Recommendation-System-/dataset/diets.csv")
workout = pd.read_csv("D:/Karthikyan/SECRET/Project Phase I/Medicine-Recommendation-System-/dataset/workout_df.csv")

# Helper function
def helper(dis):
    desc = description[description['Disease'] == dis]['Description']
    desc = " ".join([w for w in desc])

    pre = precautions[precautions['Disease'] == dis][[
        'Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']]
    pre = [col.tolist() for col in pre.values]

    med = medications[medications['Disease'] == dis]['Medication']
    med = [med for med in med.values]

    die = diets[diets['Disease'] == dis]['Diet']
    die = [die for die in die.values]

    wrkout = workout[workout['disease'] == dis]['workout'].tolist()

    return desc, pre, med, die, wrkout

# Model Prediction function
def get_predicted_value(patient_symptoms):
    input_vector = np.zeros(len(symptoms_dict))
    for item in patient_symptoms:
        input_vector[symptoms_dict[item]] = 1
    return diseases_list[svc.predict([input_vector])[0]]