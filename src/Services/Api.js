// src/Services/Api.js

// Base URL points to your Render backend
const API_BASE_URL = "https://tradingbotapi.onrender.com/api/trading";

// ---------------------------
// Get latest price
// ---------------------------
export async function getLatestPrice(pair = "XRPUSD") {
  const res = await fetch(`${API_BASE_URL}/get-latest-price?pair=${pair}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch latest price: ${res.status}`);
  }
  return res.json();
}

// ---------------------------
// Get trades
// ---------------------------
export async function getTrades() {
  const res = await fetch(`${API_BASE_URL}/trades`);
  if (!res.ok) {
    throw new Error(`Failed to fetch trades: ${res.status}`);
  }
  return res.json();
}

// ---------------------------
// Get session profit
// ---------------------------
export async function getSessionProfit() {
  const res = await fetch(`${API_BASE_URL}/session-profit`);
  if (!res.ok) {
    throw new Error(`Failed to fetch session profit: ${res.status}`);
  }
  return res.json();
}

// ---------------------------
// Start Grid Bot
// ---------------------------
export async function startGridBot(lower, upper, grids, investment) {
  const res = await fetch(`${API_BASE_URL}/start-grid-bot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lower,
      upper,
      grids,
      investment,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to start grid bot: ${res.status}`);
  }
  return res.json();
}

// ---------------------------
// Stop Grid Bot
// ---------------------------
export async function stopGridBot() {
  const res = await fetch(`${API_BASE_URL}/stop-grid-bot`, {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error(`Failed to stop grid bot: ${res.status}`);
  }
  return res.json();
}
