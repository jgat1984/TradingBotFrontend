// src/Services/Api.js

const API_BASE = "https://tradingbotapi.onrender.com/api/trading"; 
// ✅ Make sure this matches your Render backend URL

// Get latest price
export async function getPrice(pair = "XRPUSD") {
  const res = await fetch(`${API_BASE}/get-latest-price?pair=${pair}`);
  if (!res.ok) throw new Error("Failed to fetch price");
  return res.json();
}

// Get all trades
export async function getTrades() {
  const res = await fetch(`${API_BASE}/trades`);
  if (!res.ok) throw new Error("Failed to fetch trades");
  return res.json();
}

// Get session profit
export async function getSessionProfit() {
  const res = await fetch(`${API_BASE}/session-profit`);
  if (!res.ok) throw new Error("Failed to fetch profit");
  return res.json();
}

// Start grid bot
export async function startGridBot(lower, upper, grids, investment) {
  const res = await fetch(`${API_BASE}/start-gridbot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lower,
      upper,
      grids,
      investment,
    }),
  });
  if (!res.ok) throw new Error("Failed to start grid bot");
  return res.json();
}

// Stop grid bot
export async function stopGridBot() {
  const res = await fetch(`${API_BASE}/stop-gridbot`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to stop grid bot");
  return res.json();
}
