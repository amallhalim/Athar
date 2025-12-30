import { Link } from "react-router";

export default function Header() {
  return (
    <header
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #dee2e6",
        marginBottom: "20px",
      }}
    >
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <h1 style={{ margin: 0 }}>My App</h1>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
            Home
          </Link>
          <Link
            to="/contact"
            style={{ textDecoration: "none", color: "#007bff" }}
          >
            Contact
          </Link>
          <Link
            to="/projects"
            style={{ textDecoration: "none", color: "#007bff" }}
          >
            Projects
          </Link>
          <Link
            to="/projects/1"
            style={{ textDecoration: "none", color: "#007bff" }}
          >
            Project 1
          </Link>
          <Link
            to="/projects/2"
            style={{ textDecoration: "none", color: "#007bff" }}
          >
            Project 2
          </Link>
          <Link
            to="/settings"
            style={{ textDecoration: "none", color: "#007bff" }}
          >
            Settings
          </Link>
          <Link
            to="/dashboard"
            style={{ textDecoration: "none", color: "#007bff" }}
          >
            Dashboard
          </Link>
          <Link
            to="/dashboard/settings"
            style={{ textDecoration: "none", color: "#007bff" }}
          >
            Dashboard Settings
          </Link>
        </div>
      </nav>
    </header>
  );
}
