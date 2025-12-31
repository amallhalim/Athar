import { lazy } from "react";
import type { RouteObject } from "react-router";
import { Navigate } from "react-router";
import type { ComponentType } from "react";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "../pages/ErrorBoundary/ErrorBoundary";
import SuspenseRoute from "./components/SuspenseRoute";
import type { RouteHandle } from "../types/types";

type LazyComponent = ComponentType<Record<string, never>>;

const Home = lazy(() => import("../pages/Home/Home")) as LazyComponent;
const About = lazy(() => import("../pages/About/About")) as LazyComponent;
const ContactUs = lazy(
  () => import("../pages/Contact_us/ContactUs")
) as LazyComponent;
const Portfolio = lazy(
  () => import("../pages/Portfolio/Portfolio")
) as LazyComponent;
const Settings = lazy(
  () => import("../pages/Settings/Settings")
) as LazyComponent;
const Dashboard = lazy(
  () => import("../pages/Dashboard/Dashboard")
) as LazyComponent;
const NotFound = lazy(
  () => import("../pages/NotFound/NotFound")
) as LazyComponent;

// ========== AUTHENTICATION STATE ==========
/**
 * Authentication state management
 *
 * In production, replace this with:
 * - React Context API
 * - Redux/Zustand store
 * - Auth hook (useAuth)
 * - Token-based authentication
 *
 * Example:
 * ```tsx
 * const { isAuthenticated, userRole, userPermissions } = useAuth();
 * ```
 */
const isAuthenticated = false; // Replace with actual auth state from context/store
// const userRole = "guest" as "guest" | "user" | "admin" | "superadmin"; // Get from auth
// const userPermissions = [] as string[]; // Get from auth

// ========== ROUTE CONFIGURATION ==========
/**
 * Main routes array
 *
 * Structure:
 * 1. Root route with App layout
 * 2. Public routes (Home, About, Contact, Portfolio, Settings)
 * 3. Protected routes (Dashboard, Admin)
 * 4. Nested routes (Projects with dynamic parameters)
 * 5. Special routes (Redirects, Case-sensitive, 404)
 */
export const routes: RouteObject[] = [
  // ========== ROOT ROUTE ==========
  /**
   * Root route serves as the main layout wrapper
   * - Contains Header, Footer, and main content area
   * - Has error boundary for catching route-level errors
   * - All child routes render inside <Outlet />
   */
  {
    path: "/",
    id: "root",
    caseSensitive: false,
    element: <App />,
    errorElement: <ErrorBoundary />,
    handle: {
      title: "My Portfolio",
      breadcrumb: "", // Empty - root route is just a layout wrapper, shouldn't appear in breadcrumbs
      icon: "🏠",
      description: "Professional portfolio website",
      layout: "default",
      header: true,
      footer: true,
      navbar: true,
      sidebar: false,
    } satisfies RouteHandle,
    children: [
      // ========== INDEX ROUTE (Home) ==========
      /**
       * Index route renders at the root path "/"
       * No path needed - uses index: true
       */
      {
        index: true,
        id: "home",
        caseSensitive: false,
        errorElement: <ErrorBoundary />,
        handle: {
          title: "Home",
          breadcrumb: "Home",
          icon: "🏠",
          description: "Welcome to my professional portfolio",
          order: 1,
          category: "main",
          group: "primary",
          // SEO
          metaTitle: "Home - Professional Portfolio",
          metaDescription:
            "Welcome to my professional portfolio. Explore my projects, skills, and experience.",
          keywords: ["portfolio", "developer", "web developer", "projects"],
          robots: "index, follow",
          canonical: "/",
          // Open Graph
          ogTitle: "Professional Portfolio - Home",
          ogDescription: "Welcome to my professional portfolio",
          ogImage: "/og-home.jpg",
          ogType: "website",
          ogUrl: "/",
          // Twitter Card
          twitterCard: "summary_large_image",
          twitterTitle: "Professional Portfolio",
          twitterDescription: "Welcome to my professional portfolio",
          twitterImage: "/twitter-home.jpg",

          // Layout
          layout: "default",
          sidebar: false,
          header: true,
          footer: true,
          navbar: true,
        } satisfies RouteHandle,
        element: (
          <SuspenseRoute>
            <Home />
          </SuspenseRoute>
        ),
      },

      // ========== PUBLIC ROUTES ==========

      /**
       * About Page
       * Public route with SEO optimization
       */
      {
        path: "about",
        id: "about",
        caseSensitive: false,
        errorElement: <ErrorBoundary />,
        handle: {
          title: "About Me",
          breadcrumb: "About",
          icon: "ℹ️",
          description: "Learn more about my background, skills, and experience",
        } satisfies RouteHandle,
        element: (
          <SuspenseRoute>
            <About />
          </SuspenseRoute>
        ),
      },

      /**
       * Contact Page
       * Public route with contact information
       */
      {
        path: "contact",
        id: "contact",
        caseSensitive: false,
        errorElement: <ErrorBoundary />,
        handle: {
          title: "Contact Me",
          breadcrumb: "Contact",
          icon: "📧",
          description: "Get in touch with me for collaborations and inquiries",
          order: 3,
          category: "main",
          group: "primary",
          // SEO
          metaTitle: "Contact Me - Professional Portfolio",
          metaDescription:
            "Get in touch with me for collaborations, job opportunities, or inquiries.",
          keywords: [
            "contact",
            "email",
            "get in touch",
            "hire",
            "collaboration",
          ],
          robots: "index, follow",
          canonical: "/contact",
          // Open Graph
          ogTitle: "Contact Me - Professional Portfolio",
          ogDescription: "Get in touch for collaborations and inquiries",
          ogImage: "/og-contact.jpg",
          ogType: "website",
          ogUrl: "/contact",
          // Layout
          layout: "default",
          sidebar: false,
          header: true,
          footer: true,
          navbar: true,
          // Performance
          prefetch: "intent",
          priority: "normal",
          // Analytics
          analytics: {
            pageView: "contact_page",
            category: "navigation",
            trackPageView: true,
            dimensions: {
              pageType: "contact",
              section: "main",
            },
          },
          // Accessibility
          ariaLabel: "Contact page",
          ariaDescription: "Contact information and form",
          skipToContent: true,
        } satisfies RouteHandle,
        element: (
          <SuspenseRoute>
            <ContactUs />
          </SuspenseRoute>
        ),
      },

      /**
       * Portfolio Page
       * Public route showcasing projects
       */
      {
        path: "portfolio",
        id: "portfolio",
        caseSensitive: false,
        errorElement: <ErrorBoundary />,
        handle: {
          title: "Portfolio",
          breadcrumb: "Portfolio",
          icon: "💼",
          description: "Browse my portfolio of projects and work",
          order: 4,
          category: "main",
          group: "primary",
          // SEO
          metaTitle: "Portfolio - Professional Portfolio",
          metaDescription:
            "Browse my portfolio of web development projects, applications, and creative work.",
          keywords: [
            "portfolio",
            "projects",
            "work",
            "web development",
            "applications",
          ],
          robots: "index, follow",
          canonical: "/portfolio",
          // Open Graph
          ogTitle: "Portfolio - Professional Portfolio",
          ogDescription: "Browse my portfolio of projects",
          ogImage: "/og-portfolio.jpg",
          ogType: "website",
          ogUrl: "/portfolio",
          // Schema.org
          schema: {
            "@type": "CollectionPage",
            name: "Portfolio",
            description: "Collection of projects and work",
          },
          // Layout
          layout: "default",
          sidebar: false,
          header: true,
          footer: true,
          navbar: true,
          // Performance
          prefetch: "intent",
          priority: "high",
          // Analytics
          analytics: {
            pageView: "portfolio_page",
            category: "navigation",
            trackPageView: true,
            trackScroll: true,
            dimensions: {
              pageType: "portfolio",
              section: "main",
            },
          },
          // Accessibility
          ariaLabel: "Portfolio page",
          ariaDescription: "Collection of projects and work",
          skipToContent: true,
        } satisfies RouteHandle,
        element: (
          <SuspenseRoute>
            <Portfolio />
          </SuspenseRoute>
        ),
      },

      /**
       * Settings Page
       * Public route for user settings
       */
      {
        path: "settings",
        id: "settings",
        caseSensitive: false,
        errorElement: <ErrorBoundary />,
        handle: {
          title: "Settings",
          breadcrumb: "Settings",
          icon: "⚙️",
          description: "Manage your account settings and preferences",
          order: 5,
          category: "main",
        } satisfies RouteHandle,
        element: (
          <SuspenseRoute>
            <Settings />
          </SuspenseRoute>
        ),
      },

      {
        path: "projects",
        id: "projects",
        caseSensitive: false,
        errorElement: <ErrorBoundary />,
        handle: {
          title: "Projects",
          breadcrumb: "Projects",
          icon: "📁",
          description: "View and manage all projects",
          order: 6,
          category: "main",
        } satisfies RouteHandle,
        children: [
          /**
           * Projects Index Route
           * Renders at /projects (list of all projects)
           */
          {
            index: true,
            id: "projects-index",
            caseSensitive: false,
            errorElement: <ErrorBoundary />,
            handle: {
              title: "All Projects",
              breadcrumb: "All Projects",
              icon: "📋",
            } satisfies RouteHandle,
            element: (
              <SuspenseRoute>
                <Portfolio />
              </SuspenseRoute>
            ),
          },

          /**
           * Project Detail Route (Dynamic Parameter)
           * Renders at /projects/:pid (e.g., /projects/1, /projects/2)
           *
           * Access parameter in component:
           * const { pid } = useParams();
           */
          {
            path: ":pid",
            id: "project-detail",
            caseSensitive: false,
            errorElement: <ErrorBoundary />,
            handle: {
              title: "Project Details",
              breadcrumb: "Project",
              icon: "📄",
            } satisfies RouteHandle,
            element: (
              <SuspenseRoute>
                <Portfolio />
              </SuspenseRoute>
            ),
          },

          /**
           * Project Edit Route (Nested Dynamic Parameter)
           * Renders at /projects/:pid/edit (e.g., /projects/1/edit)
           *
           * This demonstrates nested dynamic routes
           */
          {
            path: ":pid/edit",
            id: "project-edit",
            caseSensitive: false,
            errorElement: <ErrorBoundary />,
            handle: {
              title: "Edit Project",
              breadcrumb: "Edit",
              icon: "✏️",
              requiresAuth: true,
              roles: ["admin"],
            } satisfies RouteHandle,
            element: (
              <SuspenseRoute>
                <Portfolio />
              </SuspenseRoute>
            ),
          },
        ],
      },

      // ========== PROTECTED ROUTES ==========

      /**
       * Dashboard Route (Protected)
       * Requires authentication to access
       *
       * Uses ProtectedRoute wrapper to check authentication
       */
      {
        path: "dashboard",
        id: "dashboard",
        caseSensitive: false,
        errorElement: <ErrorBoundary />,
        handle: {
          title: "Dashboard",
          breadcrumb: "Dashboard",
          icon: "📊",
          description: "User dashboard with statistics and overview",
          order: 7,
          category: "dashboard",
          group: "primary",
          // Authentication
          requiresAuth: true,
          permissions: ["read:dashboard"],
          roles: ["user", "admin"],
          minRole: "user",
          // SEO
          metaTitle: "Dashboard - Professional Portfolio",
          metaDescription: "Access your personal dashboard",
          robots: "noindex, nofollow", // Protected pages shouldn't be indexed
          // Layout
          layout: "dashboard",
          sidebar: true,
          header: true,
          footer: true,
          navbar: true,
          theme: "light",
          // Performance
          prefetch: "none", // Don't prefetch protected routes
          priority: "normal",
          // Analytics
          analytics: {
            pageView: "dashboard_page",
            category: "navigation",
            trackPageView: true,
            dimensions: {
              pageType: "dashboard",
              section: "user",
            },
          },
          // Accessibility
          ariaLabel: "Dashboard page",
          ariaDescription: "User dashboard with statistics",
          skipToContent: true,
          // Responsive
          mobileLayout: "stack",
          desktopLayout: "sidebar",
        } satisfies RouteHandle,
        element: (
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <SuspenseRoute>
              <Dashboard />
            </SuspenseRoute>
          </ProtectedRoute>
        ),
        children: [
          /**
           * Dashboard Index Route
           * Renders at /dashboard (overview)
           */
          {
            index: true,
            id: "dashboard-index",
            caseSensitive: false,
            errorElement: <ErrorBoundary />,
            handle: {
              title: "Dashboard Overview",
              breadcrumb: "Overview",
              icon: "📊",
            } satisfies RouteHandle,
            element: (
              <SuspenseRoute>
                <Dashboard />
              </SuspenseRoute>
            ),
          },

          /**
           * Dashboard Settings Route
           * Renders at /dashboard/settings
           */
          {
            path: "settings",
            id: "dashboard-settings",
            caseSensitive: false,
            errorElement: <ErrorBoundary />,
            handle: {
              title: "Dashboard Settings",
              breadcrumb: "Settings",
              icon: "⚙️",
            } satisfies RouteHandle,
            element: (
              <SuspenseRoute>
                <Settings />
              </SuspenseRoute>
            ),
          },
        ],
      },

      /**
       * Admin Panel Route (Protected - Admin Only)
       * Requires admin role to access
       */
      {
        path: "admin",
        id: "admin",
        caseSensitive: false,
        errorElement: <ErrorBoundary />,
        handle: {
          title: "Admin Panel",
          breadcrumb: "Admin",
          icon: "⚙️",
          description: "Administrative controls and settings",
          order: 8,
          category: "admin",
          group: "secondary",
          // Authentication
          requiresAuth: true,
          permissions: ["admin:access", "admin:manage"],
          roles: ["admin", "superadmin"],
          minRole: "admin",
          // SEO
          metaTitle: "Admin Panel - Professional Portfolio",
          metaDescription: "Administrative dashboard",
          robots: "noindex, nofollow", // Admin pages should never be indexed
          // Layout
          layout: "admin",
          sidebar: true,
          header: true,
          footer: false,
          navbar: true,
          theme: "light",
          // Performance
          prefetch: "none",
          priority: "low",
          // Analytics
          analytics: {
            pageView: "admin_panel",
            category: "admin",
            trackPageView: false, // Don't track admin pages
          },
          // Accessibility
          ariaLabel: "Admin panel",
          ariaDescription: "Administrative controls and settings",
          skipToContent: true,
          // Feature Flags
          featureFlag: "admin-panel-v2",
          beta: false,
          // Responsive
          mobileLayout: "stack",
          desktopLayout: "sidebar",
        } satisfies RouteHandle,
        element: (
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <SuspenseRoute>
              <Dashboard />
            </SuspenseRoute>
          </ProtectedRoute>
        ),
      },

      // ========== SPECIAL ROUTES ==========

      /**
       * Case-Sensitive Route Example
       * Demonstrates case-sensitive path matching
       *
       * Only matches exact case: /CaseSensitive (not /casesensitive)
       */
      {
        path: "CaseSensitive",
        id: "case-sensitive-route",
        caseSensitive: true,
        errorElement: <ErrorBoundary />,
        handle: {
          title: "Case Sensitive Page",
          breadcrumb: "Case Sensitive",
          icon: "🔤",
          hidden: true,
        } satisfies RouteHandle,
        element: (
          <SuspenseRoute>
            <About />
          </SuspenseRoute>
        ),
      },

      /**
       * Redirect Route Example
       * Automatically redirects old paths to new paths
       */
      {
        path: "old-path",
        id: "old-path-redirect",
        caseSensitive: false,
        handle: {
          title: "Redirecting...",
          breadcrumb: "Redirect",
          icon: "↩️",
          hidden: true,
        } satisfies RouteHandle,
        element: <Navigate to="/" replace />,
      },
    ],
  },

  // ========== 404 CATCH-ALL ROUTE ==========
  /**
   * 404 Not Found Route
   *
   * IMPORTANT: Must be LAST in the routes array!
   * Matches any unmatched URL patterns
   */
  {
    path: "*",
    id: "not-found",
    caseSensitive: false,
    errorElement: <ErrorBoundary />,
    handle: {
      title: "Page Not Found",
      breadcrumb: "404",
      icon: "❌",
    } satisfies RouteHandle,
    element: (
      <SuspenseRoute>
        <NotFound />
      </SuspenseRoute>
    ),
  },
];
