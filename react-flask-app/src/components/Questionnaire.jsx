import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Questionnaire() {
  const navigate = useNavigate();
  const location = useLocation();
  const { symptom } = location.state; // Get the symptom from the state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    // Fetch questions based on the symptom
    fetch(`http://localhost:5000/questions?symptom=${symptom}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error:", error));
  }, [symptom]);

  const handleResponse = (response) => {
    setResponses([...responses, response]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Submit responses to the backend for prediction
      fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ symptom, responses }),
      })
        .then((res) => res.json())
        .then((data) => {
          navigate("/result", { state: { result: data } });
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <div>
      <h1>Questionnaire</h1>
      <p>{questions[currentQuestionIndex]}</p>
      <button onClick={() => handleResponse("yes")}>Yes</button>
      <button onClick={() => handleResponse("no")}>No</button>
    </div>
  );
}

export default Questionnaire;