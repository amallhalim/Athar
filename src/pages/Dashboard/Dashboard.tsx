import React from "react";
import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid red",
        marginBottom: "20px",
      }}
    >
      Dashboard
      <p>Dashboard content</p>
      <Outlet />
      <p>This is the Dashboard page content.</p>
    </div>
  );
}
