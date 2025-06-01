import React, { useState } from "react";

function App() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");

  // Function to handle temperature conversion
  const handleCelsiusChange = (e) => {
    const celsiusValue = e.target.value;
    setCelsius(celsiusValue);

    // Convert to Fahrenheit only if input is valid
    if (!isNaN(celsiusValue) && celsiusValue !== "") {
      const fahrenheitValue = (parseFloat(celsiusValue) * 9) / 5 + 32;
      setFahrenheit(fahrenheitValue.toFixed(2)); // Keep 2 decimal places
    } else {
      setFahrenheit(""); // Reset if invalid input
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Temperature Converter</h2>
      <input
        type="text"
        value={celsius}
        onChange={handleCelsiusChange}
        placeholder="Enter Celsius"
      />
      <p>Fahrenheit: {fahrenheit}</p>
    </div>
  );
}

export default App;
