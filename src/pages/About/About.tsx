import { useSearchParams } from "react-router";

export default function About() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const tab = searchParams.get("tab") || "info";

  return (
    <div style={{ padding: "20px" }}>
      <h1>About Page</h1>
      <p>This page demonstrates query parameters.</p>
      
      {name && <p>Hello, {name}!</p>}
      
      <div>
        <h2>Current Tab: {tab}</h2>
        <p>
          Try visiting: /about?name=John&tab=details
        </p>
      </div>
    </div>
  );
}

