import { ErrorBoundary } from "react-error-boundary";
import type { ReactNode, ErrorInfo } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

interface ReactErrorBoundaryProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
  readonly onError?: (error: Error, errorInfo: ErrorInfo) => void;
  readonly onReset?: () => void;
}

interface ErrorFallbackProps {
  readonly error: Error;
  readonly resetErrorBoundary: () => void;
}

/**
 * Default error fallback component
 *
 * Displays a user-friendly error message with options to:
 * - Reset the error boundary (try again)
 * - Navigate home
 * - View error details
 */
function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div
      style={{
        padding: "40px",
        backgroundColor: "#ffffff",
        color: "#000000",
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AlertCircle size={64} color="#dc3545" style={{ marginBottom: "20px" }} />

      <h1
        style={{
          color: "#dc3545",
          marginBottom: "20px",
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        ⚠️ Something went wrong!
      </h1>

      <p
        style={{
          color: "#333333",
          marginBottom: "30px",
          fontSize: "1.1rem",
          textAlign: "center",
          maxWidth: "600px",
        }}
      >
        An unexpected error occurred. Don't worry, your data is safe. You can
        try again or return to the home page.
      </p>

      {error && (
        <div
          style={{
            marginTop: "20px",
            marginBottom: "30px",
            padding: "20px",
            backgroundColor: "#f8d7da",
            borderRadius: "8px",
            border: "1px solid #dc3545",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          <p
            style={{
              color: "#000000",
              fontWeight: "bold",
              marginBottom: "10px",
              fontSize: "1rem",
            }}
          >
            Error Message:
          </p>
          <p
            style={{
              color: "#000000",
              marginBottom: "15px",
              fontSize: "0.95rem",
              wordBreak: "break-word",
            }}
          >
            {error.message}
          </p>
          {error.stack && (
            <details style={{ marginTop: "10px" }}>
              <summary
                style={{
                  cursor: "pointer",
                  color: "#000000",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Stack Trace (for developers)
              </summary>
              <pre
                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  overflow: "auto",
                  backgroundColor: "#ffffff",
                  padding: "15px",
                  borderRadius: "4px",
                  border: "1px solid #dc3545",
                  maxHeight: "300px",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <button
          onClick={resetErrorBoundary}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#0056b3";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#007bff";
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = "#0056b3";
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = "#007bff";
          }}
        >
          <RefreshCw size={20} />
          Try Again
        </button>

        <button
          onClick={() => {
            globalThis.location.href = "/";
          }}
          style={{
            padding: "12px 24px",
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#5a6268";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#6c757d";
          }}
          onFocus={(e) => {
            e.currentTarget.style.backgroundColor = "#5a6268";
          }}
          onBlur={(e) => {
            e.currentTarget.style.backgroundColor = "#6c757d";
          }}
        >
          <Home size={20} />
          Go Home
        </button>
      </div>
    </div>
  );
}

/**
 * React Error Boundary using react-error-boundary library
 *
 * Features:
 * - Better error handling with reset capability
 * - Customizable fallback UI
 * - Error logging support
 * - Reset error state without page reload
 * - Built-in error fallback component
 */
export default function ReactErrorBoundary({
  children,
  fallback,
  onError,
  onReset,
}: ReactErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    // Log error to console
    console.error("Error caught by boundary:", error, errorInfo);

    // Call custom error handler if provided
    onError?.(error, errorInfo);

    // In production, you might want to log to an error tracking service
    // Example: logErrorToService(error, errorInfo);
  };

  const handleReset = () => {
    // Call custom reset handler if provided
    onReset?.();
  };

  // Use custom fallback if provided, otherwise use default ErrorFallback
  const FallbackComponent = fallback ? () => <>{fallback}</> : ErrorFallback;

  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={handleError}
      onReset={handleReset}
    >
      {children}
    </ErrorBoundary>
  );
}
