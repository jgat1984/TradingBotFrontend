import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

function GridChart({ lower, upper, grids, coin, strategy }) {
  const [priceData, setPriceData] = useState([]);
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        let url = "http://localhost:5126/api/trading/trades";
        const params = [];
        if (coin) params.push(`coin=${coin}`);
        if (strategy) params.push(`strategy=${strategy}`);
        if (params.length > 0) url += "?" + params.join("&");

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch trades");

        const data = await res.json();

        setTrades(data);
        setPriceData(
          data.map((t) => ({
            time: new Date(t.timestamp).toLocaleTimeString(),
            price: t.price,
          }))
        );
      } catch (err) {
        console.error("Error fetching trades:", err);
      }
    };

    fetchTrades();
    const interval = setInterval(fetchTrades, 5000);
    return () => clearInterval(interval);
  }, [coin, strategy]);

  const gridLevels = [];
  if (grids > 1) {
    const step = (upper - lower) / (grids - 1);
    for (let i = 0; i < grids; i++) {
      gridLevels.push(lower + step * i);
    }
  }

  return (
    <LineChart
      width={800}
      height={400}
      data={priceData}
      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
      <XAxis dataKey="time" />
      <YAxis domain={[lower * 0.95, upper * 1.05]} />
      <Tooltip />
      <Line type="monotone" dataKey="price" stroke="#00ffcc" dot={false} />

      {/* Grid lines */}
      {gridLevels.map((level, idx) => (
        <ReferenceLine key={idx} y={level} stroke="#8884d8" strokeDasharray="3 3" />
      ))}

      {/* Trade markers */}
      {trades.map((trade, idx) => (
        <ReferenceLine
          key={idx}
          y={trade.price}
          label={{
            value: trade.action,
            fill: trade.action === "BUY" ? "lime" : "red",
          }}
          stroke={trade.action === "BUY" ? "lime" : "red"}
        />
      ))}
    </LineChart>
  );
}

export default GridChart;
