import { Route, Routes, Navigate } from "react-router";
import { lazy, Suspense } from "react";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "../pages/ErrorBoundary/ErrorBoundary";
import LoadingFallback from "../components/reusable/LoadingFallback";

// Lazy load all components for better performance
const Home = lazy(() => import("../pages/Home/Home"));
const ContactUs = lazy(() => import("../pages/Contact_us/ContactUs"));
const Portfolio = lazy(() => import("../pages/Portfolio/Portfolio"));
const Settings = lazy(() => import("../pages/Settings/Settings"));
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound"));
const ErrorTest = lazy(() => import("../pages/ErrorTest/ErrorTest"));
const About = lazy(() => import("../pages/About/About"));
const Redirect = lazy(() => import("../pages/Redirect/Redirect"));

// Test pages
const TestSuspense = lazy(() => import("../pages/TestSuspense/TestSuspense"));
const TestProtected = lazy(() => import("../pages/TestProtected/TestProtected"));
const TestRedirect = lazy(() => import("../pages/TestRedirect/TestRedirect"));

const RoutesApps = () => {
  // Example: Check if user is authenticated (replace with your auth logic)
  const isAuthenticated = false; // Change this based on your auth state

  return (
    <Routes>
      <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
        {/* Index route - default home page */}
        <Route
          index
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Home />
            </Suspense>
          }
        />

        {/* Regular routes */}
        <Route
          path="contact"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ContactUs />
            </Suspense>
          }
        />
        <Route
          path="settings"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Settings />
            </Suspense>
          }
        />

        {/* Error test route - demonstrates error boundary */}
        <Route
          path="error-test"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <ErrorTest />
            </Suspense>
          }
          errorElement={<ErrorBoundary />}
        />

        {/* Route with query parameters example */}
        <Route
          path="about"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <About />
            </Suspense>
          }
        />

        {/* Redirect route example */}
        <Route
          path="redirect"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Redirect />
            </Suspense>
          }
        />

        {/* Test Routes */}
        <Route
          path="test-suspense"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <TestSuspense />
            </Suspense>
          }
        />
        <Route
          path="test-protected"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <TestProtected />
            </Suspense>
          }
        />
        <Route
          path="test-redirect"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <TestRedirect />
            </Suspense>
          }
        />

        {/* Nested routes - Projects */}
        <Route path="projects">
          <Route
            index
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Portfolio />
              </Suspense>
            }
          />
          {/* Route with parameter :pid */}
          <Route
            path=":pid"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Portfolio />
              </Suspense>
            }
          />
          {/* Nested route with parameter */}
          <Route
            path=":pid/edit"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Portfolio />
              </Suspense>
            }
          />
        </Route>

        {/* Protected route example - requires authentication */}
        <Route
          path="dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Suspense fallback={<LoadingFallback />}>
                <Dashboard />
              </Suspense>
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Portfolio />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Settings />
              </Suspense>
            }
          />
        </Route>

        {/* Redirect example - old path to new path */}
        <Route path="old-path" element={<Navigate to="/" replace />} />

        {/* Admin route example (protected) */}
        <Route
          path="admin"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Suspense fallback={<LoadingFallback />}>
                <Settings />
              </Suspense>
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 - Catch all unmatched routes */}
      <Route
        path="*"
        element={
          <Suspense fallback={<LoadingFallback />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default RoutesApps;

