import React from "react";
import useBear from "../../store/bear.store";

export default function Home() {
  const bears = useBear((state) => state.bears);
  const removeAllBears = useBear((state) => state.removeAllBears);
  const increasePopulation = useBear((state) => state.increasePopulation);

  return (
    <div>
      <h1 style={{ color: "red", fontSize: "2rem" }}>
        {bears} bears around here...
      </h1>

      <button
        style={{
          backgroundColor: "blue",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={increasePopulation}
      >
        Increase Population
      </button>
      <button
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={removeAllBears}
      >
        Remove All Bears
      </button>
    </div>
  );
}
