// src/App.js
import React from "react";
import PriceDisplay from "./Components/PriceDisplay";
import TradeViewer from "./Components/TradeViewer";
import GridBotControls from "./Components/GridBotControls";

function App() {
  return (
    <div className="dashboard" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Trading Dashboard</h1>

      {/* ✅ Live Price */}
      <section style={{ marginBottom: "20px" }}>
        <PriceDisplay />
      </section>

      {/* ✅ Trade Log */}
      <section style={{ marginBottom: "20px" }}>
        <TradeViewer />
      </section>

      {/* ✅ Grid Bot Controls */}
      <section style={{ marginBottom: "20px" }}>
        <GridBotControls />
      </section>
    </div>
  );
}

export default App;
