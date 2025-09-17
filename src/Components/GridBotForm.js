import React, { useState } from "react";

function GridBotForm({ onStart, onStop }) {
  const [symbol, setSymbol] = useState("XRPUSD");
  const [lower, setLower] = useState(0.45);
  const [upper, setUpper] = useState(0.55);
  const [grids, setGrids] = useState(10);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleStart = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("http://localhost:5126/api/trading/start-gridbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lower: parseFloat(lower),
          upper: parseFloat(upper),
          grids: parseInt(grids),
        }),
      });

      const data = await res.json();
      setResponse(data);
      onStart({ symbol, lower, upper, grids });
    } catch (err) {
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    try {
      const res = await fetch("http://localhost:5126/api/trading/stop-gridbot", {
        method: "POST",
      });
      const data = await res.json();
      setResponse(data);
      onStop();
    } catch (err) {
      setResponse({ error: err.message });
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-xl mt-6">
      <form onSubmit={handleStart}>
        <h2 className="text-xl font-bold mb-3">Grid Bot Settings</h2>

        <label>Trading Pair:</label>
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="w-full p-2 mb-2 text-black rounded"
        />

        <label>Lower Price:</label>
        <input
          type="number"
          step="0.0001"
          value={lower}
          onChange={(e) => setLower(e.target.value)}
          className="w-full p-2 mb-2 text-black rounded"
        />

        <label>Upper Price:</label>
        <input
          type="number"
          step="0.0001"
          value={upper}
          onChange={(e) => setUpper(e.target.value)}
          className="w-full p-2 mb-2 text-black rounded"
        />

        <label>Number of Grids:</label>
        <input
          type="number"
          value={grids}
          onChange={(e) => setGrids(e.target.value)}
          className="w-full p-2 mb-2 text-black rounded"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-xl font-semibold"
          >
            {loading ? "Starting..." : "Start Grid Bot"}
          </button>

          <button
            type="button"
            onClick={handleStop}
            className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl font-semibold"
          >
            Stop Grid Bot
          </button>
        </div>
      </form>

      {response && (
        <pre className="bg-gray-800 p-2 rounded mt-4 text-sm">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default GridBotForm;
