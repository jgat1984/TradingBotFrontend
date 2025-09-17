import React from "react";
import PriceDisplay from "./Components/PriceDisplay";
import TradeViewer from "./Components/TradeViewer";
import TradeBotControl from "./Components/TradeBotControl";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Trading Bot Dashboard</h1>
      <PriceDisplay />
      <TradeViewer />
      <TradeBotControl />
    </div>
  );
}

export default App;
