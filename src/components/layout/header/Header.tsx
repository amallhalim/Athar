import { Link, useMatches, useLocation } from "react-router";
import type { RouteHandle } from "../../../types/types";
import Breadcrumb from "./Breadcrumb";

// Navigation link groups
const navGroups = [
  {
    label: "Basic",
    icon: "📄",
    color: "#007bff",
    links: [
      { to: "/", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/settings", label: "Settings" },
      { to: "/portfolio", label: "Portfolio" },
    ],
  },
  {
    label: "Dynamic",
    icon: "🔢",
    color: "#28a745",
    links: [
      { to: "/projects", label: "Projects" },
      { to: "/projects/1", label: "Project 1" },
      { to: "/projects/2", label: "Project 2" },
      { to: "/projects/1/edit", label: "Edit Project" },
    ],
  },
  {
    label: "Nested",
    icon: "📁",
    color: "#17a2b8",
    links: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/dashboard/settings", label: "Dashboard Settings" },
    ],
  },
  {
    label: "Protected",
    icon: "🔒",
    color: "#dc3545",
    links: [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/admin", label: "Admin" },
    ],
  },
  {
    label: "Special",
    icon: "⚡",
    color: "#6f42c1",
    links: [
      { to: "/CaseSensitive", label: "Case Sensitive" },
      { to: "/old-path", label: "Redirect" },
      { to: "/about?name=Visitor&tab=info", label: "Query Params" },
    ],
  },
];

export default function Header() {
  const matches = useMatches();
  const location = useLocation();

  const currentMatch = matches.at(-1);
  const currentHandle = currentMatch?.handle as RouteHandle | undefined;

  return (
    <header
      style={{
        padding: "20px",
        backgroundColor: "#f8f9fa",
        borderBottom: "1px solid #dee2e6",
        marginBottom: "20px",
      }}
    >
      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Header Top */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <h1 style={{ margin: 0 }}>{currentHandle?.icon} My App</h1>

          {currentHandle?.title && (
            <div
              style={{
                fontSize: "1.2em",
                fontWeight: "bold",
                color: "#007bff",
              }}
            >
              {currentHandle.icon} {currentHandle.title}
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {navGroups.map((group) => (
            <div
              key={group.label}
              style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
            >
              <strong style={{ color: "#495057", marginRight: "10px" }}>
                {group.icon} {group.label}:
              </strong>
              {group.links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{ textDecoration: "none", color: group.color }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Breadcrumbs */}
        <Breadcrumb />

        {/* Debug Info (Development Only) */}
        {import.meta.env.DEV && currentHandle && (
          <div
            style={{
              padding: "10px",
              backgroundColor: "#e9ecef",
              borderRadius: "4px",
              fontSize: "0.85em",
              color: "#495057",
            }}
          >
            {/* <strong>🔍 Current Route Handle:</strong>
            <pre style={{ margin: "5px 0 0 0", fontSize: "0.8em" }}>
              {JSON.stringify(currentHandle, null, 2)}
            </pre> */}
            <div style={{ marginTop: "5px" }}>
              <strong>Route ID:</strong> {currentMatch?.id || "No ID"} |{" "}
              <strong>Path:</strong> {location.pathname}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
