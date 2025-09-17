import React, { useState, useEffect } from "react";
import { startGridBot, stopGridBot, getLatestPrice } from "../Services/Api";

function TradeBotControl() {
  const [lower, setLower] = useState("");
  const [upper, setUpper] = useState("");
  const [grids, setGrids] = useState("");
  const [investment, setInvestment] = useState("");
  const [status, setStatus] = useState("");
  const [currentPrice, setCurrentPrice] = useState(null);

  // Fetch current price
  useEffect(() => {
    async function fetchPrice() {
      try {
        const data = await getLatestPrice();
        setCurrentPrice(data.price);
      } catch (err) {
        console.error("Error fetching price:", err);
        setCurrentPrice(null);
      }
    }

    fetchPrice();
    const interval = setInterval(fetchPrice, 5000);
    return () => clearInterval(interval);
  }, []);

  async function handleStart() {
    try {
      const res = await startGridBot(
        parseFloat(lower),
        parseFloat(upper),
        parseInt(grids),
        parseFloat(investment)
      );
      setStatus(res?.message ? `✅ ${res.message}` : "✅ Bot started");
      console.log("Bot started:", res);
    } catch (err) {
      setStatus("❌ Error starting bot");
      console.error("Error starting grid bot:", err);
    }
  }

  async function handleStop() {
    try {
      const res = await stopGridBot();
      setStatus(res?.message ? `🛑 ${res.message}` : "🛑 Bot stopped");
      console.log("Bot stopped:", res);
    } catch (err) {
      setStatus("❌ Error stopping bot");
      console.error("Error stopping grid bot:", err);
    }
  }

  return (
    <div>
      <h2>Grid Bot Controls</h2>
      {currentPrice !== null && (
        <p>
          Current Price: <strong>${currentPrice.toFixed(5)}</strong>
        </p>
      )}

      <label>Lower Price:</label>
      <input
        type="number"
        step="0.0001"
        value={lower}
        onChange={(e) => setLower(e.target.value)}
      />
      <br />

      <label>Upper Price:</label>
      <input
        type="number"
        step="0.0001"
        value={upper}
        onChange={(e) => setUpper(e.target.value)}
      />
      <br />

      <label>Number of Grids:</label>
      <input
        type="number"
        value={grids}
        onChange={(e) => setGrids(e.target.value)}
      />
      <br />

      <label>Investment Amount ($):</label>
      <input
        type="number"
        step="0.01"
        value={investment}
        onChange={(e) => setInvestment(e.target.value)}
      />
      <br />

      <button onClick={handleStart}>Start Grid Bot</button>
      <button onClick={handleStop}>Stop Grid Bot</button>
      {status && <p>{status}</p>}
    </div>
  );
}

export default TradeBotControl;
