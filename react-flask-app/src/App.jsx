import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Details from "./components/Details";

function App() {
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [count, setCount] = useState(1);
  useEffect(() => {
    fetch("http://localhost:5000/time")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setCurrentTime(data.time);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>The current time is {currentTime}.</p>
        <h1>{count}</h1>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <Link to="/details">
          <button>Show Details</button>
        </Link>
      </header>
    </div>
  );
}
export default App;