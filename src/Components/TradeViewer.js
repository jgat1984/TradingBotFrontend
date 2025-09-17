import React, { useEffect, useState } from "react";
import { getTrades, getSessionProfit } from "../Services/Api";

function TradeViewer() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionProfit, setSessionProfit] = useState(0);

  // Fetch trades
  async function fetchTrades() {
    try {
      const data = await getTrades();
      if (Array.isArray(data)) {
        setTrades(data);
      } else {
        setTrades([]);
      }
    } catch (err) {
      console.error("Error fetching trades:", err);
      setTrades([]);
    } finally {
      setLoading(false);
    }
  }

  // Fetch session profit
  async function fetchSessionProfitData() {
    try {
      const data = await getSessionProfit();
      setSessionProfit(data.sessionProfit || 0);
    } catch (err) {
      console.error("Error fetching session profit:", err);
    }
  }

  useEffect(() => {
    async function fetchAll() {
      await fetchTrades();
      await fetchSessionProfitData();
    }

    fetchAll();
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchAll, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p>Loading trades...</p>;

  return (
    <div>
      <h2>Trade Log</h2>

      {/* ✅ Show session profit above the table */}
      <h3
        style={{
          color: sessionProfit > 0 ? "green" : sessionProfit < 0 ? "red" : "black",
        }}
      >
        Session Profit: ${sessionProfit.toFixed(6)}
      </h3>

      {trades.length === 0 ? (
        <p>No trades yet...</p>
      ) : (
        <table border="1" cellPadding="6" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Timestamp</th>
              <th>Symbol</th>
              <th>Action</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Investment</th>
              <th>Profit</th>
              <th>Strategy</th>
            </tr>
          </thead>
          <tbody>
            {trades.map((t) => (
              <tr key={t.id}>
                <td>{t.id}</td>
                <td>{new Date(t.timestamp).toLocaleString()}</td>
                <td>{t.symbol}</td>
                <td>{t.action}</td>
                <td>{t.price.toFixed(6)}</td>
                <td>{t.quantity.toFixed(8)}</td>
                <td>${t.investment.toFixed(6)}</td>
                <td
                  style={{
                    color: t.profit > 0 ? "green" : t.profit < 0 ? "red" : "black",
                  }}
                >
                  ${t.profit.toFixed(6)}
                </td>
                <td>{t.strategy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TradeViewer;
