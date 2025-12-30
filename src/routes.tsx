import { Route, Routes } from "react-router";
import App from "./App";
import Home from "./pages/Home/Home";
import ContactUs from "./pages/Contact_us/ContactUs";
import Portfolio from "./pages/Portfolio/Portfolio";
import Settings from "./pages/Settings/Settings";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";

const RoutesApps = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<ContactUs />} />
        <Route path="projects">
          <Route index element={<Portfolio />} />
          <Route path=":pid" element={<Portfolio />} />
          <Route path=":pid/edit" element={<Portfolio />} />
        </Route>
        <Route path="settings" element={<Settings />} />
        <Route path="dashboard" element={<Dashboard />}>
          {/* renders into the outlet in <Portfolio> at "/dashboard" */}
          <Route index element={<Portfolio />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />{" "}
    </Routes>
  );
};

export default RoutesApps;
