import { useEffect } from "react";
import { useNavigate } from "react-router";

interface ReusableRedirectProps {
  to: string;
  delay?: number; // Delay in milliseconds (default: 2000)
  message?: string; // Custom message to show
  replace?: boolean; // Replace history or push (default: true)
}

export default function ReusableRedirect({
  to,
  delay = 2000,
  message = "Redirecting...",
  replace = true,
}: ReusableRedirectProps) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(to, { replace });
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate, to, delay, replace]);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>{message}</h1>
      <p>You will be redirected in {delay / 1000} seconds.</p>
      <div
        style={{
          marginTop: "20px",
          width: "200px",
          height: "4px",
          backgroundColor: "#e0e0e0",
          borderRadius: "2px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#007bff",
            borderRadius: "2px",
            animation: `shrink ${delay}ms linear forwards`,
          }}
        />
      </div>
      <style>
        {`
          @keyframes shrink {
            from { width: 100%; }
            to { width: 0%; }
          }
        `}
      </style>
    </div>
  );
}

