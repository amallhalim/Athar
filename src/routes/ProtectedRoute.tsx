import { Navigate } from "react-router";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  readonly children: ReactNode;
  readonly isAuthenticated?: boolean;
}

export default function ProtectedRoute({
  children,
  isAuthenticated = false, // Default to false, change based on your auth logic
}: ProtectedRouteProps) {
  if (!isAuthenticated) {
    // Redirect to login/home if not authenticated
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
