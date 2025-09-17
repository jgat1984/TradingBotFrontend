import React, { useState } from "react";

function StrategySelector({ onSelectStrategy }) {
  const [strategy, setStrategy] = useState("");

  const handleChange = (e) => {
    const selected = e.target.value;
    setStrategy(selected);
    if (onSelectStrategy) {
      onSelectStrategy(selected);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <label htmlFor="strategy" style={{ marginRight: "10px" }}>
        Select Strategy:
      </label>
      <select id="strategy" value={strategy} onChange={handleChange}>
        <option value="">-- Select --</option>
        <option value="RSI">RSI</option>
        <option value="MeanReversion">Mean Reversion</option>
        <option value="Threshold">Threshold</option>
        <option value="Momentum">Momentum</option>
        <option value="MovingAverage">Moving Average</option>
        <option value="MeanReversionMicro">Mean Reversion Micro</option> {/* ✅ new */}
        <option value="ThresholdMicro">Threshold Micro</option>         {/* ✅ new */}
      </select>
    </div>
  );
}

export default StrategySelector;
