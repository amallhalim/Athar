import { useState } from "react";
import { ReactErrorBoundary } from "../../routes/ReactErrorBoundary";

function ErrorTestContent() {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  // This will trigger the error boundary when rendered
  if (shouldThrowError) {
    throw new Error("This is a test error to demonstrate the Error Boundary!");
  }

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "500px",
        backgroundColor: "#ffffff",
        color: "#000000",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <h1 style={{ color: "#000000", marginBottom: "20px", fontSize: "2em" }}>
        🧪 Error Test Page
      </h1>
      <p style={{ color: "#333333", marginBottom: "30px", fontSize: "1.1em" }}>
        This page is used to test the Error Boundary component.
      </p>

      <div style={{ marginTop: "30px", marginBottom: "30px" }}>
        <button
          onClick={() => setShouldThrowError(true)}
          style={{
            padding: "15px 30px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#c82333";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#dc3545";
          }}
        >
          ⚠️ Trigger Error
        </button>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#fff3cd",
          borderRadius: "8px",
          border: "2px solid #ffc107",
          maxWidth: "800px",
        }}
      >
        <p
          style={{
            color: "#000000",
            fontWeight: "bold",
            fontSize: "1.1em",
            marginBottom: "10px",
          }}
        >
          📋 Instructions:
        </p>
        <p
          style={{ color: "#000000", marginBottom: "10px", lineHeight: "1.6" }}
        >
          Click the "Trigger Error" button above to throw an error and see the
          Error Boundary in action.
        </p>
        <p style={{ color: "#000000", lineHeight: "1.6" }}>
          The Error Boundary will catch the error and display a user-friendly
          error message instead of crashing the app.
        </p>
      </div>
    </div>
  );
}

export default function ErrorTest() {
  return (
    <ReactErrorBoundary>
      <ErrorTestContent />
    </ReactErrorBoundary>
  );
}
