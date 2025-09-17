// src/Services/Api.js
const BASE_URL = "https://findocscollector.onrender.com";

// Get latest price
export async function getLatestPrice(pair = "XRPUSD") {
  const res = await fetch(`${BASE_URL}/api/trading/get-latest-price?pair=${pair}`);
  return res.json();
}

// Get trades
export async function getTrades() {
  const res = await fetch(`${BASE_URL}/api/trading/get-trades`);
  return res.json();
}

// Get session profit
export async function getSessionProfit() {
  const res = await fetch(`${BASE_URL}/api/trading/session-profit`);
  return res.json();
}

// Start Grid Bot
export async function startGridBot(lower, upper, grids, investment) {
  const res = await fetch(`${BASE_URL}/api/trading/start-bot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lower, upper, grids, investment }),
  });
  return res.json();
}

// Stop Grid Bot
export async function stopGridBot() {
  const res = await fetch(`${BASE_URL}/api/trading/stop-bot`, {
    method: "POST",
  });
  return res.json();
}
