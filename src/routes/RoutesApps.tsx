import { lazy } from "react";
import type { RouteObject } from "react-router";
import { Navigate } from "react-router";
import type { ComponentType } from "react";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "../pages/ErrorBoundary/ErrorBoundary";
import SuspenseRoute from "./components/SuspenseRoute";

// Type for lazy-loaded components
type LazyComponent = ComponentType<Record<string, never>>;

// Lazy load all components for better performance and code splitting
const Home = lazy(() => import("../pages/Home/Home")) as LazyComponent;
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
const ErrorTest = lazy(
  () => import("../pages/ErrorTest/ErrorTest")
) as LazyComponent;
const About = lazy(() => import("../pages/About/About")) as LazyComponent;
const Redirect = lazy(
  () => import("../pages/Redirect/Redirect")
) as LazyComponent;

// Test pages
const TestSuspense = lazy(
  () => import("../pages/TestSuspense/TestSuspense")
) as LazyComponent;
const TestProtected = lazy(
  () => import("../pages/TestProtected/TestProtected")
) as LazyComponent;
const TestRedirect = lazy(
  () => import("../pages/TestRedirect/TestRedirect")
) as LazyComponent;
const LoaderComparison = lazy(
  () => import("../pages/LoaderComparison/LoaderComparison")
) as LazyComponent;

/**
 * Authentication state
 * In production, get this from context/store/auth hook
 */
const isAuthenticated = false; // Change this based on your auth state

export const routes: RouteObject[] = [
  {
    // Root route with App layout and error boundary
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      // Index route - default home page
      {
        index: true,
        element: (
          <SuspenseRoute>
            <Home />
          </SuspenseRoute>
        ),
      },

      // Regular public routes
      {
        path: "contact",
        element: (
          <SuspenseRoute>
            <ContactUs />
          </SuspenseRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <SuspenseRoute>
            <Settings />
          </SuspenseRoute>
        ),
      },

      // Route with query parameters example
      {
        path: "about",
        element: (
          <SuspenseRoute>
            <About />
          </SuspenseRoute>
        ),
      },

      // Redirect route example - programmatic redirect
      {
        path: "redirect",
        element: (
          <SuspenseRoute>
            <Redirect />
          </SuspenseRoute>
        ),
      },

      // Error test route - demonstrates error boundary
      {
        path: "error-test",
        element: (
          <SuspenseRoute>
            <ErrorTest />
          </SuspenseRoute>
        ),
        errorElement: <ErrorBoundary />,
      },

      // Test Routes - demonstrate various features
      {
        path: "test-suspense",
        element: (
          <SuspenseRoute>
            <TestSuspense />
          </SuspenseRoute>
        ),
      },
      {
        path: "test-protected",
        element: (
          <SuspenseRoute>
            <TestProtected />
          </SuspenseRoute>
        ),
      },
      {
        path: "test-redirect",
        element: (
          <SuspenseRoute>
            <TestRedirect />
          </SuspenseRoute>
        ),
      },
      {
        path: "loader-comparison",
        element: (
          <SuspenseRoute>
            <LoaderComparison />
          </SuspenseRoute>
        ),
      },

      // Nested routes - Projects with dynamic parameters
      {
        path: "projects",
        children: [
          {
            index: true,
            element: (
              <SuspenseRoute>
                <Portfolio />
              </SuspenseRoute>
            ),
          },
          // Route with dynamic parameter :pid
          {
            path: ":pid",
            element: (
              <SuspenseRoute>
                <Portfolio />
              </SuspenseRoute>
            ),
          },
          // Nested route with parameter
          {
            path: ":pid/edit",
            element: (
              <SuspenseRoute>
                <Portfolio />
              </SuspenseRoute>
            ),
          },
        ],
      },

      // Protected route example - requires authentication
      {
        path: "dashboard",
        element: (
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <SuspenseRoute>
              <Dashboard />
            </SuspenseRoute>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <SuspenseRoute>
                <Portfolio />
              </SuspenseRoute>
            ),
          },
          {
            path: "settings",
            element: (
              <SuspenseRoute>
                <Settings />
              </SuspenseRoute>
            ),
          },
        ],
      },

      // Admin route example (protected)
      {
        path: "admin",
        element: (
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <SuspenseRoute>
              <Settings />
            </SuspenseRoute>
          </ProtectedRoute>
        ),
      },

      // Redirect example - route-level redirect (old path to new path)
      {
        path: "old-path",
        element: <Navigate to="/" replace />,
      },
    ],
  },

  // 404 - Catch all unmatched routes (must be last)
  {
    path: "*",
    element: (
      <SuspenseRoute>
        <NotFound />
      </SuspenseRoute>
    ),
  },
];
