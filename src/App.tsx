import "./App.scss";
import { Outlet } from "react-router";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "calc(100vh - 200px)", width: "100%" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
