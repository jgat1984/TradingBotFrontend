import React, { useEffect, useState } from "react";
import { getLatestPrice, startGridBot, stopGridBot } from "../Services/Api";

function GridBotControls() {
  const [lower, setLower] = useState("");
  const [upper, setUpper] = useState("");
  const [grids, setGrids] = useState(4);
  const [investment, setInvestment] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(null);

  // ✅ Fetch initial price when component loads
  useEffect(() => {
    async function fetchPrice() {
      try {
        const data = await getLatestPrice("XRPUSD");
        if (data && data.price) {
          setPrice(data.price);
          // auto-fill default lower/upper bounds around live price
          setLower((data.price - 0.02).toFixed(4));
          setUpper((data.price + 0.02).toFixed(4));
        }
      } catch (err) {
        console.error("Error fetching price:", err);
      }
    }
    fetchPrice();
  }, []);

  // ✅ Start grid bot
  async function handleStart() {
    try {
      const data = await startGridBot(
        parseFloat(lower),
        parseFloat(upper),
        parseInt(grids, 10),
        parseFloat(investment)
      );
      setStatus(
        `✅ Grid Bot started 
         Range: ${data.lower} - ${data.upper}, 
         Grids: ${data.grids}, 
         Investment: ${data.investment}`
      );
    } catch (err) {
      console.error("Error starting bot:", err);
      setStatus("❌ Error starting Grid Bot");
    }
  }

  // ✅ Stop grid bot
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
    <div
      className="gridbot-controls"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}
    >
      <h2>Grid Bot Controls</h2>

      {price && (
        <p style={{ fontWeight: "bold" }}>Current Price: ${price}</p>
      )}

      <label>
        Lower Price:
        <input
          type="number"
          value={lower}
          onChange={(e) => setLower(e.target.value)}
        />
      </label>

      <label>
        Upper Price:
        <input
          type="number"
          value={upper}
          onChange={(e) => setUpper(e.target.value)}
        />
      </label>

      <label>
        Number of Grids:
        <input
          type="number"
          value={grids}
          onChange={(e) => setGrids(e.target.value)}
        />
      </label>

      <label>
        Investment Amount ($):
        <input
          type="number"
          step="0.01"
          value={investment}
          onChange={(e) => setInvestment(e.target.value)}
        />
      </label>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handleStart} style={{ marginRight: "10px" }}>
          ▶️ Start Grid Bot
        </button>
        <button onClick={handleStop}>⏹ Stop Grid Bot</button>
      </div>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}
    </div>
  );
}

export default GridBotControls;
