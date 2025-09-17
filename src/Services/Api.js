// Base URL for API calls
const API_BASE =
  process.env.NODE_ENV === "production"
    ? "https://tradingbotapi.onrender.com/trading" // ✅ Render production
    : "http://localhost:5126/api/trading";         // ✅ Local dev

// Get latest price
export async function getLatestPrice(pair = "XRPUSD") {
  const res = await fetch(`${API_BASE}/get-latest-price?pair=${pair}`);
  if (!res.ok) throw new Error("Failed to fetch latest price");
  return res.json();
}

// Get trades
export async function getTrades() {
  const res = await fetch(`${API_BASE}/trades`);
  if (!res.ok) throw new Error("Failed to fetch trades");
  return res.json();
}

// Start Grid Bot
export async function startGridBot(lower, upper, grids, investment) {
  const res = await fetch(`${API_BASE}/start-gridbot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lower, upper, grids, investment }),
  });
  if (!res.ok) throw new Error("Failed to start grid bot");
  return res.json();
}

// Stop Grid Bot
export async function stopGridBot() {
  const res = await fetch(`${API_BASE}/stop-gridbot`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to stop grid bot");
  return res.json();
}

// Get session profit
export async function getSessionProfit() {
  const res = await fetch(`${API_BASE}/session-profit`);
  if (!res.ok) throw new Error("Failed to fetch session profit");
  return res.json();
}
