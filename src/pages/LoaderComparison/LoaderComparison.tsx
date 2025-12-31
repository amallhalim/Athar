import { ReactErrorBoundary } from "../../routes/ReactErrorBoundary";

/**
 * This page explains the difference between:
 * 1. Route-level loader (in route config)
 * 2. Component-level data fetching (useEffect inside component)
 * 3. SuspenseRoute (only for lazy loading, NOT for loaders)
 */
export default function LoaderComparison() {
  return (
    <ReactErrorBoundary>
      <div
        style={{
          padding: "40px",
          backgroundColor: "#f9f9f9",
          color: "#333",
          minHeight: "600px",
        }}
      >
        <h1
          style={{ color: "#007bff", marginBottom: "25px", fontSize: "2.5em" }}
        >
          🔄 Loader: Route-Level vs Component-Level
        </h1>

        {/* Key Point */}
        <div
          style={{
            marginBottom: "40px",
            padding: "20px",
            backgroundColor: "#fff3cd",
            borderRadius: "8px",
            border: "2px solid #ffc107",
          }}
        >
          <h2 style={{ color: "#856404", marginBottom: "15px" }}>
            ⚠️ Important: Loaders CANNOT be added inside SuspenseRoute!
          </h2>
          <p style={{ color: "#856404", fontSize: "1.1em" }}>
            <strong>SuspenseRoute</strong> is ONLY for lazy loading (code
            splitting).
            <br />
            <strong>Loaders</strong> are ALWAYS added at the route level in
            route configuration.
          </p>
        </div>

        {/* Comparison Table */}
        <div
          style={{
            marginBottom: "40px",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}
        >
          <h2 style={{ color: "#28a745", marginBottom: "20px" }}>
            📋 Comparison: Route-Level Loader vs Component-Level Fetching
          </h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "15px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    border: "1px solid #dee2e6",
                    fontWeight: "bold",
                  }}
                >
                  Feature
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    border: "1px solid #dee2e6",
                    fontWeight: "bold",
                    backgroundColor: "#d4edda",
                  }}
                >
                  Route-Level Loader
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    border: "1px solid #dee2e6",
                    fontWeight: "bold",
                    backgroundColor: "#fff3cd",
                  }}
                >
                  Component-Level (useEffect)
                </th>
                <th
                  style={{
                    padding: "12px",
                    textAlign: "left",
                    border: "1px solid #dee2e6",
                    fontWeight: "bold",
                    backgroundColor: "#d1ecf1",
                  }}
                >
                  SuspenseRoute
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #dee2e6",
                    fontWeight: "bold",
                  }}
                >
                  Where it goes
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Route configuration (RoutesApps.tsx)
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Inside component (Home.tsx)
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Route configuration (wraps element)
                </td>
              </tr>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #dee2e6",
                    fontWeight: "bold",
                  }}
                >
                  Purpose
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Fetch data BEFORE component renders
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Fetch data AFTER component mounts
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Show loading state for lazy-loaded components
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #dee2e6",
                    fontWeight: "bold",
                  }}
                >
                  When it runs
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Before route component renders
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  After component mounts
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  While lazy component loads
                </td>
              </tr>
              <tr style={{ backgroundColor: "#f8f9fa" }}>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #dee2e6",
                    fontWeight: "bold",
                  }}
                >
                  Router type required
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Data Router (createBrowserRouter)
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Any router (BrowserRouter or createBrowserRouter)
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  Any router
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "12px",
                    border: "1px solid #dee2e6",
                    fontWeight: "bold",
                  }}
                >
                  Access data via
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  useLoaderData() hook
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  useState + useEffect
                </td>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  N/A (just shows loading)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Code Examples */}
        <div
          style={{
            marginBottom: "40px",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
          }}
        >
          <h2 style={{ color: "#6f42c1", marginBottom: "20px" }}>
            💻 Code Examples
          </h2>

          {/* Example 1: Route-Level Loader */}
          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ color: "#28a745", marginBottom: "15px" }}>
              Example 1: Route-Level Loader (CORRECT ✅)
            </h3>
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "5px",
                fontFamily: "monospace",
                fontSize: "14px",
                overflow: "auto",
              }}
            >
              <div style={{ marginBottom: "15px" }}>
                <strong>RoutesApps.tsx (Route Config):</strong>
                <pre style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>
                  {`<Route
  path="home"
  loader={homeLoader}  // ✅ Loader at route level
  element={
    <SuspenseRoute>    // ✅ SuspenseRoute for lazy loading
      <Home />
    </SuspenseRoute>
  }
/>`}
                </pre>
              </div>
              <div>
                <strong>Home.tsx (Component):</strong>
                <pre style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>
                  {`function Home() {
  const data = useLoaderData(); // ✅ Access loader data
  return <div>{data.message}</div>;
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Example 2: Component-Level Fetching */}
          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ color: "#ffc107", marginBottom: "15px" }}>
              Example 2: Component-Level Fetching (Alternative)
            </h3>
            <div
              style={{
                backgroundColor: "#f8f9fa",
                padding: "15px",
                borderRadius: "5px",
                fontFamily: "monospace",
                fontSize: "14px",
                overflow: "auto",
              }}
            >
              <div>
                <strong>RoutesApps.tsx (Route Config):</strong>
                <pre style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>
                  {`<Route
  path="home"
  element={
    <SuspenseRoute>    // ✅ SuspenseRoute for lazy loading
      <Home />
    </SuspenseRoute>
  }
  // ❌ NO loader here
/>`}
                </pre>
              </div>
              <div style={{ marginTop: "15px" }}>
                <strong>Home.tsx (Component):</strong>
                <pre style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>
                  {`function Home() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // ✅ Fetch data inside component
    fetchData().then(setData);
  }, []);
  
  return <div>{data?.message}</div>;
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Example 3: WRONG - Loader inside SuspenseRoute */}
          <div style={{ marginBottom: "30px" }}>
            <h3 style={{ color: "#dc3545", marginBottom: "15px" }}>
              Example 3: WRONG ❌ - Cannot add loader inside SuspenseRoute
            </h3>
            <div
              style={{
                backgroundColor: "#f8d7da",
                padding: "15px",
                borderRadius: "5px",
                fontFamily: "monospace",
                fontSize: "14px",
                overflow: "auto",
                border: "1px solid #dc3545",
              }}
            >
              <pre style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>
                {`<Route
  path="home"
  element={
    <SuspenseRoute loader={homeLoader}>  {/* ❌ WRONG! */}
      <Home />
    </SuspenseRoute>
  }
/>`}
              </pre>
              <p style={{ marginTop: "10px", color: "#721c24" }}>
                ❌ This doesn't work! SuspenseRoute doesn't accept a loader
                prop.
                <br />✅ Loaders must be at the Route level, not inside
                SuspenseRoute.
              </p>
            </div>
          </div>
        </div>

        {/* Key Differences */}
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#e7f3ff",
            borderRadius: "8px",
          }}
        >
          <h3 style={{ color: "#007bff", marginBottom: "15px" }}>
            🎯 Key Takeaways
          </h3>
          <ul style={{ textAlign: "left", display: "inline-block" }}>
            <li style={{ marginBottom: "10px" }}>
              <strong>Loaders go in route config:</strong> They're part of the
              Route definition, not inside SuspenseRoute
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>SuspenseRoute is for lazy loading:</strong> It wraps
              lazy-loaded components with Suspense to show loading states
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>You can use BOTH:</strong> Route-level loader +
              SuspenseRoute for lazy loading work together perfectly
            </li>
            <li style={{ marginBottom: "10px" }}>
              <strong>Data Router required:</strong> Loaders only work with
              createBrowserRouter, not BrowserRouter
            </li>
            <li>
              <strong>Component-level fetching:</strong> Use useEffect if you
              prefer fetching data after component mounts (but loader is better
              for SEO)
            </li>
          </ul>
        </div>
      </div>
    </ReactErrorBoundary>
  );
}
