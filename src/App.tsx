import { useState } from "react";

import "./App.scss";
import { Outlet } from "react-router";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
