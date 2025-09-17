// Get latest price
export async function getLatestPrice(pair = "XRPUSD") {
  const res = await fetch(
    `http://localhost:5126/api/trading/get-latest-price?pair=${pair}`
  );
  return res.json();
}

// Get trades
export async function getTrades() {
  const res = await fetch("http://localhost:5126/api/trading/trades");
  return res.json();
}

// Start Grid Bot
export async function startGridBot(lower, upper, grids, investment) {
  const res = await fetch("http://localhost:5126/api/trading/start-gridbot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lower, upper, grids, investment }),
  });
  return res.json();
}

// Stop Grid Bot
export async function stopGridBot() {
  const res = await fetch("http://localhost:5126/api/trading/stop-gridbot", {
    method: "POST",
  });
  return res.json();
}
