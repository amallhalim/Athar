import { Link, useMatches, useLocation } from "react-router";

// Type for route handle - Professional properties
interface RouteHandle {
  // Basic Info (Required)
  title?: string;
  breadcrumb?: string;
  icon?: string;
  description?: string;

  // Authentication & Authorization
  requiresAuth?: boolean;
  permissions?: string[];
  roles?: string[];
  minRole?: string;

  // Navigation & UI
  hidden?: boolean;
  hiddenInMobile?: boolean;
  hiddenInDesktop?: boolean;
  order?: number;
  category?: string;
  group?: string;
  badge?: string | number;
  badgeColor?: string;
  tooltip?: string;
  shortcut?: string;
  highlight?: boolean;

  // SEO & Meta Tags
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  author?: string;
  robots?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  schema?: Record<string, unknown>;

  // Analytics & Tracking
  analytics?: {
    pageView?: string;
    category?: string;
    trackPageView?: boolean;
    eventName?: string;
    dimensions?: Record<string, unknown>;
    trackTime?: boolean;
    trackScroll?: boolean;
  };

  // Layout & Theming
  layout?: string;
  sidebar?: boolean;
  header?: boolean;
  footer?: boolean;
  navbar?: boolean;
  theme?: string;
  backgroundColor?: string;
  container?: boolean;
  containerMaxWidth?: string;
  fullWidth?: boolean;
  padding?: boolean;

  // Performance & Optimization
  prefetch?: string;
  priority?: string;
  cache?: string;
  cacheTime?: number;

  // Internationalization
  i18nKey?: string;
  locale?: string;
  availableLocales?: string[];

  // Accessibility
  ariaLabel?: string;
  ariaDescription?: string;
  skipToContent?: boolean;

  // Feature Flags & Development
  featureFlag?: string;
  beta?: boolean;
  experimental?: boolean;
  version?: string;
  deprecated?: boolean;

  // Responsive & Device
  mobileLayout?: string;
  tabletLayout?: string;
  desktopLayout?: string;
  breakpoint?: string;

  // Notifications & Alerts
  showNotification?: boolean;
  notificationMessage?: string;
  notificationType?: string;
}

export default function Header() {
  const matches = useMatches();
  console.log("🚀 ~ Header ~ matches:", matches);
  console.log("🚀 ~ Header ~ matches:", matches[1].handle);

  const location = useLocation();
  console.log("🚀 ~ Header ~ location:", location);

  // Get current route handle (last match is current route)
  const currentMatch = matches.at(-1);
  const currentHandle = currentMatch?.handle as RouteHandle | undefined;

  // Build breadcrumbs from matches
  const breadcrumbs = matches
    .filter((match) => {
      const handle = match.handle as RouteHandle | undefined;
      return handle?.breadcrumb; // Only include routes with breadcrumb
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
          flexDirection: "column",
          gap: "15px",
        }}
      >
        {/* Top Row: Logo and Navigation */}
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

          {/* Current Page Title from handle */}
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

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              width: "100%",
            }}
          >
            {/* Basic Routes */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <strong style={{ color: "#495057", marginRight: "10px" }}>
                📄 Basic:
              </strong>
              <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
                Home (Index)
              </Link>
              <Link
                to="/contact"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                Contact
              </Link>
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                About
              </Link>
              <Link
                to="/settings"
                style={{ textDecoration: "none", color: "#007bff" }}
              >
                Settings
              </Link>
            </div>

            {/* Dynamic Routes */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <strong style={{ color: "#495057", marginRight: "10px" }}>
                🔢 Dynamic:
              </strong>
              <Link
                to="/projects"
                style={{ textDecoration: "none", color: "#28a745" }}
              >
                Projects (List)
              </Link>
              <Link
                to="/projects/1"
                style={{ textDecoration: "none", color: "#28a745" }}
              >
                Project 1 (:pid)
              </Link>
              <Link
                to="/projects/2"
                style={{ textDecoration: "none", color: "#28a745" }}
              >
                Project 2 (:pid)
              </Link>
              <Link
                to="/projects/1/edit"
                style={{ textDecoration: "none", color: "#28a745" }}
              >
                Edit Project (:pid/edit)
              </Link>
            </div>

            {/* Nested Routes */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <strong style={{ color: "#495057", marginRight: "10px" }}>
                📁 Nested:
              </strong>
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "#17a2b8" }}
              >
                Dashboard (Parent)
              </Link>
              <Link
                to="/dashboard/settings"
                style={{ textDecoration: "none", color: "#17a2b8" }}
              >
                Dashboard Settings (Child)
              </Link>
            </div>

            {/* Protected Routes */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <strong style={{ color: "#495057", marginRight: "10px" }}>
                🔒 Protected:
              </strong>
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "#dc3545" }}
              >
                Dashboard (Auth)
              </Link>
              <Link
                to="/admin"
                style={{ textDecoration: "none", color: "#dc3545" }}
              >
                Admin (Auth)
              </Link>
            </div>

            {/* Query Parameters */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <strong style={{ color: "#495057", marginRight: "10px" }}>
                🔍 Query Params:
              </strong>
              <Link
                to="/about?name=Visitor&tab=info"
                style={{ textDecoration: "none", color: "#ffc107" }}
              >
                About (?name=Visitor&tab=info)
              </Link>
            </div>

            {/* Special Routes */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <strong style={{ color: "#495057", marginRight: "10px" }}>
                ⚡ Special:
              </strong>
              <Link
                to="/CaseSensitive"
                style={{ textDecoration: "none", color: "#6f42c1" }}
              >
                Case Sensitive
              </Link>
              <Link
                to="/redirect"
                style={{ textDecoration: "none", color: "#6f42c1" }}
              >
                Redirect
              </Link>
              <Link
                to="/old-path"
                style={{ textDecoration: "none", color: "#6f42c1" }}
              >
                Old Path (Auto Redirect)
              </Link>
              <Link
                to="/error-test"
                style={{ textDecoration: "none", color: "#dc3545" }}
              >
                Error Test
              </Link>
              <Link
                to="/cache-example"
                style={{ textDecoration: "none", color: "#6f42c1" }}
              >
                Cache Example
              </Link>
            </div>

            {/* Test Routes */}
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <strong style={{ color: "#495057", marginRight: "10px" }}>
                🧪 Tests:
              </strong>
              <Link
                to="/test-suspense"
                style={{ textDecoration: "none", color: "#17a2b8" }}
              >
                Test Suspense
              </Link>
              <Link
                to="/test-protected"
                style={{ textDecoration: "none", color: "#6f42c1" }}
              >
                Test Protected
              </Link>
              <Link
                to="/test-redirect"
                style={{ textDecoration: "none", color: "#ffc107" }}
              >
                Test Redirect
              </Link>
              <Link
                to="/loader-comparison"
                style={{ textDecoration: "none", color: "#6f42c1" }}
              >
                Loader Comparison
              </Link>
            </div>
          </div>
        </div>

        {/* Breadcrumbs from handle */}
        {breadcrumbs.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.9em",
              color: "#6c757d",
            }}
          >
            <span>📍 Breadcrumbs:</span>
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.id}>
                {index > 0 && <span style={{ margin: "0 8px" }}>/</span>}
                <Link
                  to={crumb.path}
                  style={{
                    textDecoration: "none",
                    color:
                      index === breadcrumbs.length - 1 ? "#007bff" : "#6c757d",
                    fontWeight:
                      index === breadcrumbs.length - 1 ? "bold" : "normal",
                  }}
                >
                  {crumb.icon && <span>{crumb.icon} </span>}
                  {crumb.label}
                </Link>
              </span>
            ))}
          </div>
        )}

        {/* Route Info (for debugging - shows handle data) */}
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
            <strong>🔍 Current Route Handle:</strong>
            <pre style={{ margin: "5px 0 0 0", fontSize: "0.8em" }}>
              {JSON.stringify(currentHandle, null, 2)}
            </pre>
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
