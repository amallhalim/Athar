const LoadingFallback = () => (
  <div
    style={{
      padding: "40px",
      textAlign: "center",
      minHeight: "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        width: "50px",
        height: "50px",
        border: "4px solid #f3f3f3",
        borderTop: "4px solid #007bff",
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
    <p style={{ marginTop: "20px", color: "#666" }}>Loading...</p>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

export default LoadingFallback;

