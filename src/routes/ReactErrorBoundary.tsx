import { Component } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ReactErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            padding: "40px",
            backgroundColor: "#ffffff",
            color: "#000000",
            minHeight: "400px",
          }}
        >
          <h1 style={{ color: "#dc3545", marginBottom: "20px" }}>
            ⚠️ Something went wrong!
          </h1>
          <p style={{ color: "#333333", marginBottom: "15px" }}>
            An error occurred in this component.
          </p>
          {this.state.error && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                backgroundColor: "#f8d7da",
                borderRadius: "8px",
                border: "1px solid #dc3545",
              }}
            >
              <p
                style={{
                  color: "#000000",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Error Message:
              </p>
              <p style={{ color: "#000000", marginBottom: "15px" }}>
                {this.state.error.message}
              </p>
              {this.state.error.stack && (
                <details style={{ marginTop: "10px" }}>
                  <summary style={{ cursor: "pointer", color: "#000000" }}>
                    Stack Trace
                  </summary>
                  <pre
                    style={{
                      marginTop: "10px",
                      fontSize: "12px",
                      overflow: "auto",
                      backgroundColor: "#ffffff",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
