import React, { useEffect, useState } from "react";
import { getLatestPrice } from "../Services/Api";

function PriceDisplay() {
  const [price, setPrice] = useState(null);
  const [pair, setPair] = useState("XRPUSD");
  const [loading, setLoading] = useState(true);

  async function fetchPriceData() {
    try {
      const data = await getLatestPrice(pair);
      setPrice(data.price);
    } catch (err) {
      console.error("Error fetching price:", err);
      setPrice(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPriceData();
    const interval = setInterval(fetchPriceData, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, [pair]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Live Price</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {pair}: <strong>{price !== null ? `$${price}` : "N/A"}</strong>
        </p>
      )}
    </div>
  );
}

export default PriceDisplay;
