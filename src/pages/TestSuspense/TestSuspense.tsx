import { useState } from "react";

export default function TestSuspense() {
  const [showContent, setShowContent] = useState(false);

  // Simulate slow loading
  if (!showContent) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>🧪 Suspense Test Page</h1>
        <p>This page tests React Suspense with lazy loading.</p>
        <button
          onClick={() => {
            // Simulate loading delay
            setTimeout(() => setShowContent(true), 2000);
          }}
          style={{
            padding: "15px 30px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "20px",
          }}
        >
          Load Lazy Component (2s delay)
        </button>
        <p style={{ marginTop: "20px", color: "#666" }}>
          Click the button to simulate lazy loading with Suspense.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>✅ Content Loaded!</h1>
      <p>This content was loaded lazily using Suspense.</p>
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#d4edda",
          borderRadius: "8px",
          border: "1px solid #28a745",
        }}
      >
        <h2>How Suspense Works:</h2>
        <ul style={{ textAlign: "left", display: "inline-block" }}>
          <li>Components are loaded only when needed</li>
          <li>Shows loading fallback while component loads</li>
          <li>Reduces initial bundle size</li>
          <li>Improves app performance</li>
        </ul>
      </div>
    </div>
  );
}

