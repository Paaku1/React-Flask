import React, { useState, useEffect } from "react";

function Dataset() {
  const [datasets, setDatasets] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/dataset")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setDatasets(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  if (!datasets) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Datasets</h1>
      {Object.keys(datasets).map((key) => (
        <div key={key}>
          <h2>{key}</h2>
          <table border="1">
            <thead>
              <tr>
                {Object.keys(datasets[key][0]).map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {datasets[key].map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Dataset;