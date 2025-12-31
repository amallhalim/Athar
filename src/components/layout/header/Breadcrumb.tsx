import { Link, useMatches } from "react-router";
import type { RouteHandle } from "../../../types/types";

export default function Breadcrumb() {
  const matches = useMatches();

  const breadcrumbs = matches
    .filter((match) => {
      const handle = match.handle as RouteHandle | undefined;
      return handle?.breadcrumb;
    })
    .map((match) => {
      const handle = match.handle as RouteHandle | undefined;
      return {
        id: match.id,
        path: match.pathname,
        label: handle?.breadcrumb || match.id,
        icon: handle?.icon,
      };
    });

  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "0.9em",
        color: "#6c757d",
      }}
    >
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.id}>
          {index > 0 && <span style={{ margin: "0 8px" }}>/</span>}
          <Link
            to={crumb.path}
            style={{
              textDecoration: "none",
              color: index === breadcrumbs.length - 1 ? "#007bff" : "#6c757d",
              fontWeight: index === breadcrumbs.length - 1 ? "bold" : "normal",
            }}
          >
            {crumb.icon && <span>{crumb.icon} </span>}
            {crumb.label}
          </Link>
        </span>
      ))}
    </div>
  );
}
