import React, { useState } from "react";

function CoinSelector({ onSelectCoin }) {
  const [coin, setCoin] = useState("BTCUSD");

  const handleChange = async (e) => {
    const selectedCoin = e.target.value;
    setCoin(selectedCoin);

    if (onSelectCoin) {
      onSelectCoin(selectedCoin);
    }

    try {
      await fetch("http://localhost:5000/api/trading/set-coin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol: selectedCoin }),
      });
      console.log(`✅ Coin switched to ${selectedCoin}`);
    } catch (error) {
      console.error("❌ Error setting coin:", error);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label htmlFor="coin" style={{ marginRight: "10px" }}>
        Select Coin:
      </label>
      <select id="coin" value={coin} onChange={handleChange}>
        <option value="BTCUSD">BTC/USD</option>
        <option value="ETHUSD">ETH/USD</option>
        <option value="XRPUSD">XRP/USD</option>
      </select>
    </div>
  );
}

export default CoinSelector;
