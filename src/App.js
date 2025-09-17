// src/App.js
import React from "react";
import PriceDisplay from "./Components/PriceDisplay";
import TradeViewer from "./Components/TradeViewer";
import GridBotControls from "./Components/GridBotControls";

function App() {
  return (
    <div
      className="dashboard"
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "900px",
        margin: "0 auto"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Trading Dashboard
      </h1>

      {/* ✅ Live Price */}
      <section
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#f9f9f9"
        }}
      >
        <PriceDisplay />
      </section>

      {/* ✅ Trade Log */}
      <section
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#f9f9f9"
        }}
      >
        <TradeViewer />
      </section>

      {/* ✅ Grid Bot Controls */}
      <section
        style={{
          marginBottom: "30px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#f9f9f9"
        }}
      >
        <GridBotControls />
      </section>
    </div>
  );
}

export default App;
