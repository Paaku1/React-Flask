import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Details from "./components/Details";
import Dataset from "./components/Dataset";
import Questionnaire from "./components/Questionnaire";
import Result from "./components/Result";

function App() {
  
  const [symptom, setSymptom] = useState("");
  const [change, setChange] = useState(false);
  const [symptomsList, setSymptomsList] = useState([]);
  const [noResults, setNoResults] = useState(false); // State to track if no results are found
  const navigate = useNavigate();


  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const res = await fetch("http://localhost:5000/symptoms");
        if (!res.ok) throw new Error("Failed to fetch symptoms");
        const data = await res.json();
        setSymptomsList(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchSymptoms();
  }, []);

  const handleSymptomChange = useCallback((event) => {
    setSymptom(event.target.value);
    setNoResults(false); // Reset no results state when input changes
  }, []);

  const handleSymptomSubmit = useCallback(() => {
    if (symptomsList.includes(symptom)) {
      setChange(true);
      setNoResults(false);
      console.log("Symptom submitted:", symptom);
      navigate("/questionnaire", { state: { symptom } });
    } else {
      setChange(false);
      setNoResults(true);
    }
  }, [symptom, symptomsList, navigate]);

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/details">
          <button>Show Details</button>
        </Link>
        <Link to="/dataset">
          <button>Dataset</button>
        </Link>
        <div>
          <input
            type="text"
            list="symptoms"
            value={symptom}
            onChange={handleSymptomChange}
            placeholder="Enter symptom"
          />
          <datalist id="symptoms">
            {symptomsList.map((symptom, index) => (
              <option key={index} value={symptom} />
            ))}
          </datalist>
          <button onClick={handleSymptomSubmit}>Submit Symptom</button>
          {change && <p>{symptom}</p>}
          {noResults && <p>No results found</p>}
        </div>
      </header>
    </div>
  );
}

export default App;