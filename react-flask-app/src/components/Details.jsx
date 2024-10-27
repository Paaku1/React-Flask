import React, { useState, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";

function Details() {
  const [detailsData, setDetailsData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/details")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setDetailsData(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Details Page</h1>
      {detailsData ? (
        <div>
          <p>Name: {detailsData.name}</p>
          <p>Age: {detailsData.age}</p>
          <p>DOB: {detailsData.DOB}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/">
        <button>Go Back</button>
      </Link>
    </div>
  );
}

export default Details;
