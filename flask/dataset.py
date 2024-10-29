import pandas as pd

description_df = pd.read_csv(
    'D:\\Karthikyan\\SECRET\\Project Phase I\\Medicine-Recommendation-System-\\dataset\\description.csv')
symptom_severity_df = pd.read_csv(
    'D:\\Karthikyan\\SECRET\\Project Phase I\\Medicine-Recommendation-System-\\dataset\\symptom-severity.csv')
medications_df = pd.read_csv(
    'D:\\Karthikyan\\SECRET\\Project Phase I\\Medicine-Recommendation-System-\\dataset\\medications.csv')
workout_df = pd.read_csv(
    'D:\\Karthikyan\\SECRET\\Project Phase I\\Medicine-Recommendation-System-\\dataset\\workout_df.csv')
diets_df = pd.read_csv(
    'D:\\Karthikyan\\SECRET\\Project Phase I\\Medicine-Recommendation-System-\\dataset\\diets.csv')
precautions_df = pd.read_csv(
    'D:\\Karthikyan\\SECRET\\Project Phase I\\Medicine-Recommendation-System-\\dataset\\precautions_df.csv')
training_df = pd.read_csv(
    'D:\\Karthikyan\\SECRET\\Project Phase I\\Medicine-Recommendation-System-\\dataset\\training.csv')

# Replace NaN values with None
description_df = description_df.where(pd.notnull(description_df), None)
symptom_severity_df = symptom_severity_df.where(
    pd.notnull(symptom_severity_df), None)
medications_df = medications_df.where(pd.notnull(medications_df), None)
workout_df = workout_df.where(pd.notnull(workout_df), None)
diets_df = diets_df.where(pd.notnull(diets_df), None)
precautions_df = precautions_df.where(pd.notnull(precautions_df), None)
training_df = training_df.where(pd.notnull(training_df), None)

# Return only the first 5 rows of each dataset
datasets = {
    "description": description_df.head().to_dict(orient='records'),
    "symptom_severity": symptom_severity_df.head().to_dict(orient='records'),
    "medications": medications_df.head().to_dict(orient='records'),
    "workout": workout_df.head().to_dict(orient='records'),
    "diets": diets_df.head().to_dict(orient='records'),
    "precautions": precautions_df.head().to_dict(orient='records'),
    # "training": training_df.head().to_dict(orient='records')
}
