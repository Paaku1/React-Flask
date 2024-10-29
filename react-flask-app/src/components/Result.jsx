import React from "react";
import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();
  const { result } = location.state;

  return (
    <div>
      <h1>Prediction Result</h1>
      <h2>Predicted Disease: {result.predicted_disease}</h2>
      <p>Description: {result.description}</p>
      <p>Precautions: {result.precautions.join(", ")}</p>
      <p>Medications: {result.medications.join(", ")}</p>
      <p>Diet: {result.diet.join(", ")}</p>
      <p>Workout: {result.workout.join(", ")}</p>
    </div>
  );
}

export default Result;