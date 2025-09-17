import React, { useState } from "react";
import { startGridBot, stopGridBot } from "../Services/Api";

function TradeBotControl() {
  const [lower, setLower] = useState("");
  const [upper, setUpper] = useState("");
  const [grids, setGrids] = useState("");
  const [investment, setInvestment] = useState("");
  const [activeBot, setActiveBot] = useState(null);

  async function handleStart() {
    try {
      const res = await startGridBot(lower, upper, grids, investment);

      console.log("Backend Response:", res); // ✅ Debug log

      // ✅ Save full backend response
      setActiveBot(res);

      // ✅ Always sync backend values into inputs
      setLower(res.lower ?? "");
      setUpper(res.upper ?? "");
      setGrids(res.grids ?? "");
      setInvestment(res.investment ?? "");

    } catch (err) {
      console.error("Error starting grid bot:", err);
    }
  }

  async function handleStop() {
    try {
      await stopGridBot();
      setActiveBot(null);

      // Optional: keep last values in inputs or clear them
      setLower("");
      setUpper("");
      setGrids("");
      setInvestment("");
    } catch (err) {
      console.error("Error stopping grid bot:", err);
    }
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>Grid Bot Controls</h2>

      {/* ✅ Show backend response summary */}
      {activeBot ? (
        <div style={{ marginBottom: "15px" }}>
          <p><strong>Bot Running</strong></p>
          <p>Lower Price: ${activeBot.lower}</p>
          <p>Upper Price: ${activeBot.upper}</p>
          <p>Grids: {activeBot.grids}</p>
          <p>Investment: ${activeBot.investment}</p>
        </div>
      ) : (
        <p>No active bot</p>
      )}

      {/* ✅ Input fields bound to state */}
      <div>
        <label>Lower Price: </label>
        <input
          type="number"
          step="0.0001"
          value={lower}
          onChange={(e) => setLower(e.target.value)}
        />
      </div>
      <div>
        <label>Upper Price: </label>
        <input
          type="number"
          step="0.0001"
          value={upper}
          onChange={(e) => setUpper(e.target.value)}
        />
      </div>
      <div>
        <label>Number of Grids: </label>
        <input
          type="number"
          value={grids}
          onChange={(e) => setGrids(e.target.value)}
        />
      </div>
      <div>
        <label>Investment Amount ($): </label>
        <input
          type="number"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <button onClick={handleStart}>Start Grid Bot</button>
      <button onClick={handleStop} style={{ marginLeft: "10px" }}>
        Stop Grid Bot
      </button>
    </div>
  );
}

export default TradeBotControl;
