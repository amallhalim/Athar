import { useNavigate, useLocation } from "react-router";

export default function TestRedirect() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ padding: "40px" }}>
      <h1>🔄 Redirect Test Page</h1>
      <p>This page demonstrates different redirect methods.</p>

      <div style={{ marginTop: "30px" }}>
        <h2>Current Location:</h2>
        <p style={{ backgroundColor: "#f8f9fa", padding: "10px", borderRadius: "5px" }}>
          {location.pathname}
        </p>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Programmatic Redirects (useNavigate):</h2>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "15px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Navigate to Home
          </button>
          <button
            onClick={() => navigate("/contact")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Navigate to Contact
          </button>
          <button
            onClick={() => navigate("/", { replace: true })}
            style={{
              padding: "10px 20px",
              backgroundColor: "#ffc107",
              color: "#000",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Replace (No Back Button)
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Go Back
          </button>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Route-Level Redirects:</h2>
        <div
          style={{
            marginTop: "15px",
            padding: "15px",
            backgroundColor: "#e7f3ff",
            borderRadius: "8px",
          }}
        >
          <p>
            <strong>Test Route Redirect:</strong>
          </p>
          <p>
            Visit <code>/old-path</code> - it will automatically redirect to <code>/</code>
          </p>
          <button
            onClick={() => navigate("/old-path")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#17a2b8",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Test /old-path Redirect
          </button>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          backgroundColor: "#fff3cd",
          borderRadius: "8px",
          border: "1px solid #ffc107",
        }}
      >
        <h3>Redirect Methods:</h3>
        <ul style={{ textAlign: "left", display: "inline-block" }}>
          <li>
            <strong>useNavigate()</strong> - Programmatic navigation
          </li>
          <li>
            <strong>&lt;Navigate /&gt;</strong> - Component-based redirect
          </li>
          <li>
            <strong>replace: true</strong> - Replace history instead of push
          </li>
        </ul>
      </div>
    </div>
  );
}

