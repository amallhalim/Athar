import { useRouteError, isRouteErrorResponse } from "react-router";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", color: "red" }}>
      <h1>Something went wrong!</h1>
      <p>An unexpected error occurred.</p>
      {error instanceof Error && (
        <div
          style={{
            marginTop: "15px",
            padding: "10px",
            backgroundColor: "#f8d7da",
            borderRadius: "5px",
          }}
        >
          <p>
            <strong>Error Message:</strong> {error.message}
          </p>
          {error.stack && (
            <details style={{ marginTop: "10px" }}>
              <summary style={{ cursor: "pointer" }}>Stack Trace</summary>
              <pre
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  overflow: "auto",
                }}
              >
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
