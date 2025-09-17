// src/Services/Api.js

// ✅ Make sure this matches your Render backend URL
const API_BASE = "https://tradingbotapi.onrender.com/api/trading"; 

// ----------------------
// Price
// ----------------------
export async function getPrice(pair = "XRPUSD") {
  const res = await fetch(`${API_BASE}/get-latest-price?pair=${pair}`);
  if (!res.ok) throw new Error("Failed to fetch price");
  return res.json();
}

// ----------------------
// Trades
// ----------------------
export async function getTrades() {
  const res = await fetch(`${API_BASE}/trades`);
  if (!res.ok) throw new Error("Failed to fetch trades");
  return res.json();
}

// ----------------------
// Session Profit
// ----------------------
export async function getSessionProfit() {
  const res = await fetch(`${API_BASE}/session-profit`);
  if (!res.ok) throw new Error("Failed to fetch profit");
  return res.json();
}

// ----------------------
// Grid Bot Control
// ----------------------
export async function startGridBot(lower, upper, grids, investment) {
  const res = await fetch(`${API_BASE}/start-gridbot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lower: parseFloat(lower),
      upper: parseFloat(upper),
      grids: parseInt(grids),
      investment: parseFloat(investment),
    }),
  });

  if (!res.ok) throw new Error("Failed to start grid bot");
  return res.json(); // ✅ contains {lower, upper, grids, investment, message}
}

export async function stopGridBot() {
  const res = await fetch(`${API_BASE}/stop-gridbot`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to stop grid bot");
  return res.json();
}

// ----------------------
// (Optional) Active Bot Config
// ----------------------
// Only works if you add /active-bot endpoint in TradingController
export async function getActiveBot() {
  const res = await fetch(`${API_BASE}/active-bot`);
  if (!res.ok) throw new Error("Failed to fetch active bot");
  return res.json();
}
