import { useState } from "react";
import { useNavigate } from "react-router";

export default function TestProtected() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div style={{ padding: "40px" }}>
      <h1>🔒 Protected Route Test Page</h1>
      <p>This page demonstrates protected routes.</p>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: isAuthenticated ? "#d4edda" : "#f8d7da",
          borderRadius: "8px",
          border: `1px solid ${isAuthenticated ? "#28a745" : "#dc3545"}`,
        }}
      >
        <h2>
          Authentication Status: {isAuthenticated ? "✅ Authenticated" : "❌ Not Authenticated"}
        </h2>
        <button
          onClick={() => {
            setIsAuthenticated(!isAuthenticated);
            // In real app, you'd update auth state globally
            console.log("Auth status changed:", !isAuthenticated);
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: isAuthenticated ? "#dc3545" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "15px",
          }}
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h3>Test Protected Routes:</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "15px" }}>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Try Dashboard (Protected)
          </button>
          <button
            onClick={() => navigate("/admin")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#6f42c1",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Try Admin (Protected)
          </button>
        </div>
        <p style={{ marginTop: "15px", color: "#666" }}>
          Note: Protected routes will redirect to home if not authenticated.
          Update <code>isAuthenticated</code> in routes.tsx to test.
        </p>
      </div>
    </div>
  );
}

