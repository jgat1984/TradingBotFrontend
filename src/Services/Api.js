// src/Services/Api.js

// ✅ Central API base URL logic
const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://tradingbotapi.onrender.com/api/trading" // Render backend when deployed
    : "http://localhost:5126/api/trading";             // Local dev backend

// ✅ Get latest price
export async function getLatestPrice(pair = "XRPUSD") {
  const res = await fetch(`${API_BASE}/get-latest-price?pair=${pair}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch latest price: ${res.status}`);
  }
  return res.json();
}

// ✅ Get trades
export async function getTrades() {
  const res = await fetch(`${API_BASE}/trades`);
  if (!res.ok) {
    throw new Error(`Failed to fetch trades: ${res.status}`);
  }
  return res.json();
}

// ✅ Get session profit
export async function getSessionProfit() {
  const res = await fetch(`${API_BASE}/session-profit`);
  if (!res.ok) {
    throw new Error(`Failed to fetch session profit: ${res.status}`);
  }
  return res.json();
}

// ✅ Start Grid Bot
export async function startGridBot(lower, upper, grids, investment) {
  const res = await fetch(`${API_BASE}/start-gridbot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lower, upper, grids, investment }),
  });
  if (!res.ok) {
    throw new Error(`Failed to start grid bot: ${res.status}`);
  }
  return res.json();
}

// ✅ Stop Grid Bot
export async function stopGridBot() {
  const res = await fetch(`${API_BASE}/stop-gridbot`, {
    method: "POST",
  });
  if (!res.ok) {
    throw new Error(`Failed to stop grid bot: ${res.status}`);
  }
  return res.json();
}
