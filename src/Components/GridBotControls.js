import React, { useEffect, useState } from "react";
import { getLatestPrice, startGridBot, stopGridBot } from "../Services/Api";

function GridBotControls() {
  const [lower, setLower] = useState("");
  const [upper, setUpper] = useState("");
  const [grids, setGrids] = useState(4);
  const [investment, setInvestment] = useState(""); // ✅ NEW
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(null);

  useEffect(() => {
    async function fetchPrice() {
      try {
        const data = await getLatestPrice("XRPUSD");
        if (data && data.price) {
          setPrice(data.price);
          setLower((data.price - 0.02).toFixed(4));
          setUpper((data.price + 0.02).toFixed(4));
        }
      } catch (err) {
        console.error("Error fetching price:", err);
      }
    }
    fetchPrice();
  }, []);

  async function handleStart() {
    try {
      const data = await startGridBot(
        parseFloat(lower),
        parseFloat(upper),
        parseInt(grids, 10),
        parseFloat(investment) // ✅ send investment
      );
      setStatus(
        `✅ Grid Bot started (${data.lower} - ${data.upper}, grids: ${data.grids}, investment: ${data.investment})`
      );
    } catch (err) {
      console.error("Error starting bot:", err);
      setStatus("❌ Error starting Grid Bot");
    }
  }

  async function handleStop() {
    try {
      await stopGridBot();
      setStatus("🛑 Grid Bot stopped");
    } catch (err) {
      console.error("Error stopping bot:", err);
      setStatus("❌ Error stopping Grid Bot");
    }
  }

  return (
    <div className="gridbot-controls">
      <h2>Grid Bot Controls</h2>
      {price && <p>Current Price: ${price}</p>}

      <div>
        <label>Lower Price:</label>
        <input
          type="number"
          value={lower}
          onChange={(e) => setLower(e.target.value)}
        />
      </div>

      <div>
        <label>Upper Price:</label>
        <input
          type="number"
          value={upper}
          onChange={(e) => setUpper(e.target.value)}
        />
      </div>

      <div>
        <label>Number of Grids:</label>
        <input
          type="number"
          value={grids}
          onChange={(e) => setGrids(e.target.value)}
        />
      </div>

      <div>
        <label>Investment Amount ($):</label>
        <input
          type="number"
          step="0.01"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
        />
      </div>

      <button onClick={handleStart}>Start Grid Bot</button>
      <button onClick={handleStop}>Stop Grid Bot</button>

      {status && <p>{status}</p>}
    </div>
  );
}

export default GridBotControls;
