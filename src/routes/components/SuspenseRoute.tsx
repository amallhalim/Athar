import { Suspense, type ReactNode } from "react";
import LoadingFallback from "../../components/reusable/LoadingFallback";

interface SuspenseRouteProps {
  readonly children: ReactNode;
  readonly fallback?: ReactNode;
}

export default function SuspenseRoute({
  children,
  fallback = <LoadingFallback />,
}: SuspenseRouteProps) {
  return <Suspense fallback={fallback}>{children}</Suspense>;
}
