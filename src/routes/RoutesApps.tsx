import { Route, Routes, Navigate } from "react-router";
import { lazy } from "react";
import type { ComponentType } from "react";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "../pages/ErrorBoundary/ErrorBoundary";
import SuspenseRoute from "./components/SuspenseRoute";

// Type for lazy-loaded components
type LazyComponent = ComponentType<Record<string, never>>;

// Lazy load all components for better performance and code splitting
const Home = lazy(() => import("../pages/Home/Home")) as () => JSX.Element;
const ContactUs = lazy(() => import("../pages/Contact_us/ContactUs")) as LazyComponent;
const Portfolio = lazy(() => import("../pages/Portfolio/Portfolio")) as LazyComponent;
const Settings = lazy(() => import("../pages/Settings/Settings")) as LazyComponent;
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard")) as LazyComponent;
const NotFound = lazy(() => import("../pages/NotFound/NotFound")) as LazyComponent;
const ErrorTest = lazy(() => import("../pages/ErrorTest/ErrorTest")) as LazyComponent;
const About = lazy(() => import("../pages/About/About")) as LazyComponent;
const Redirect = lazy(() => import("../pages/Redirect/Redirect")) as LazyComponent;

// Test pages
const TestSuspense = lazy(() => import("../pages/TestSuspense/TestSuspense")) as LazyComponent;
const TestProtected = lazy(() => import("../pages/TestProtected/TestProtected")) as LazyComponent;
const TestRedirect = lazy(() => import("../pages/TestRedirect/TestRedirect")) as LazyComponent;

/**
 * Main routes configuration component
 * Contains all application routes with proper error handling and lazy loading
 */
const RoutesApps = () => {
  // Example: Check if user is authenticated (replace with your auth logic)
  // In production, this should come from context/store/auth hook
  const isAuthenticated = false; // Change this based on your auth state

  return (
    <Routes>
      {/* Root route with App layout and error boundary */}
      <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
        {/* Index route - default home page */}
        <Route
          index
          element={
            <SuspenseRoute>
              <Home />
            </SuspenseRoute>
          }
        />

        {/* Regular public routes */}
        <Route
          path="contact"
          element={
            <SuspenseRoute>
              <ContactUs />
            </SuspenseRoute>
          }
        />
        <Route
          path="settings"
          element={
            <SuspenseRoute>
              <Settings />
            </SuspenseRoute>
          }
        />

        {/* Route with query parameters example */}
        <Route
          path="about"
          element={
            <SuspenseRoute>
              <About />
            </SuspenseRoute>
          }
        />

        {/* Redirect route example - programmatic redirect */}
        <Route
          path="redirect"
          element={
            <SuspenseRoute>
              <Redirect />
            </SuspenseRoute>
          }
        />

        {/* Error test route - demonstrates error boundary */}
        <Route
          path="error-test"
          element={
            <SuspenseRoute>
              <ErrorTest />
            </SuspenseRoute>
          }
          errorElement={<ErrorBoundary />}
        />

        {/* Test Routes - demonstrate various features */}
        <Route
          path="test-suspense"
          element={
            <SuspenseRoute>
              <TestSuspense />
            </SuspenseRoute>
          }
        />
        <Route
          path="test-protected"
          element={
            <SuspenseRoute>
              <TestProtected />
            </SuspenseRoute>
          }
        />
        <Route
          path="test-redirect"
          element={
            <SuspenseRoute>
              <TestRedirect />
            </SuspenseRoute>
          }
        />

        {/* Nested routes - Projects with dynamic parameters */}
        <Route path="projects">
          <Route
            index
            element={
              <SuspenseRoute>
                <Portfolio />
              </SuspenseRoute>
            }
          />
          {/* Route with dynamic parameter :pid */}
          <Route
            path=":pid"
            element={
              <SuspenseRoute>
                <Portfolio />
              </SuspenseRoute>
            }
          />
          {/* Nested route with parameter and action */}
          <Route
            path=":pid/edit"
            element={
              <SuspenseRoute>
                <Portfolio />
              </SuspenseRoute>
            }
          />
        </Route>

        {/* Protected route example - requires authentication */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SuspenseRoute>
                <Dashboard />
              </SuspenseRoute>
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <SuspenseRoute>
                <Portfolio />
              </SuspenseRoute>
            }
          />
          <Route
            path="settings"
            element={
              <SuspenseRoute>
                <Settings />
              </SuspenseRoute>
            }
          />
        </Route>

        {/* Admin route example (protected) */}
        <Route
          path="admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SuspenseRoute>
                <Settings />
              </SuspenseRoute>
            </ProtectedRoute>
          }
        />

        {/* Redirect example - route-level redirect (old path to new path) */}
        <Route path="old-path" element={<Navigate to="/" replace />} />
      </Route>

      {/* 404 - Catch all unmatched routes (must be last) */}
      <Route
        path="*"
        element={
          <SuspenseRoute>
            <NotFound />
          </SuspenseRoute>
        }
      />
    </Routes>
  );
};

export default RoutesApps;
