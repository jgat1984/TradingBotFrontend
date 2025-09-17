// src/Services/Api.js

// ✅ Switch between local backend (development) and Render (production)
const API_BASE =
  process.env.NODE_ENV === "development"
    ? "https://localhost:5126/api/trading" // local backend
    : "https://tradingbotapi.onrender.com/api/trading"; // Render backend

// ----------------------
// Latest Price
// ----------------------
export async function getLatestPrice(pair = "XRPUSD") {
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
      lower: parseFloat(lower) || 0,
      upper: parseFloat(upper) || 0,
      grids: parseInt(grids) || 0,
      investment: parseFloat(investment) || 0,
    }),
  });

  if (!res.ok) throw new Error("Failed to start grid bot");
  return res.json();
}

export async function stopGridBot() {
  const res = await fetch(`${API_BASE}/stop-gridbot`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Failed to stop grid bot");
  return res.json();
}

// ----------------------
// Preview Grid Bot (optional defaults preview)
// ----------------------
export async function previewGridBot(investment = 0) {
  const res = await fetch(`${API_BASE}/preview-gridbot?investment=${investment}`);
  if (!res.ok) throw new Error("Failed to preview grid bot");
  return res.json();
}
