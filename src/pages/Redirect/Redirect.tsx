import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

interface RedirectProps {
  to?: string;
  delay?: number;
  message?: string;
}

export default function Redirect({
  to = "/",
  delay = 2000,
  message = "Redirecting...",
}: RedirectProps = {}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get redirect parameters from URL query params (optional)
  const redirectTo = searchParams.get("to") || to;
  const redirectDelay = searchParams.get("delay")
    ? Number.parseInt(searchParams.get("delay") || "2000", 10)
    : delay;
  const redirectMessage = searchParams.get("message") || message;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, redirectDelay);

    return () => clearTimeout(timer);
  }, [navigate, redirectTo, redirectDelay]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>{redirectMessage}</h1>
      <p>You will be redirected in {redirectDelay / 1000} seconds.</p>
      <p style={{ color: "#666", marginTop: "10px" }}>
        Redirecting to: <strong>{redirectTo}</strong>
      </p>
    </div>
  );
}
