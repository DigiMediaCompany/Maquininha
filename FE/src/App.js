import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/HeaderMain";
import NavBar from "./components/Navbar";
import Banner from "./components/Banner";
import Footer from "./components/Footer";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Policy from "./pages/Policy";
import Home from "./pages/Home";
import Machines from "./pages/Machines";
import MachineDetail from "./pages/MachineDetail";

function Layout({ children }) {
  const location = useLocation();
  const noNavRoutes = ["/sobre", "/contact", "/terms", "/policy"];
  const hideNav = noNavRoutes.includes(location.pathname);

  return (
    <>
      <Header />
      {!hideNav && <NavBar />}
      {!hideNav && <Banner />}
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/machines" element={<Machines />} />
          <Route path="/machine/:id" element={<MachineDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}
