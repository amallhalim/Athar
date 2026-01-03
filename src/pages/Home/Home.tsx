import React from "react";
import useBear from "../../store/bear.store";
import {
  FolderLock,
  FolderLockIcon,
  PartyPopper,
  Smile,
  ThumbsUp,
} from "lucide-react";

export default function Home() {
  const bears = useBear((state) => state.bears);
  const removeAllBears = useBear((state) => state.removeAllBears);
  const increasePopulation = useBear((state) => state.increasePopulation);

  return (
    <div>
      <div className="app">
        <Smile color="#3e9392" />
      </div>

      <button style={{ color: "#fff" }}>
        <ThumbsUp size={64} />
        Like
      </button>
      <div>
        <PartyPopper className="w-24 h-144" color="red" />
      </div>
      <div className="app">
        <FolderLockIcon strokeWidth={2} absoluteStrokeWidth={true} />
      </div>

      <div>
        <i data-lucide="phone" aria-hidden="true"></i>
        <span className="visually-hidden">Phone number</span>
      </div>
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
