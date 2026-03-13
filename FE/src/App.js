import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import ArticleList from "./pages/ArticleList";
import ArticleDetail from "./pages/ArticleDetail";
import MachineList from "./pages/MachineList";
import MachineDetail from "./pages/MachineDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TermsOfUse from "./pages/TermsOfUse";
import Policy from "./pages/PrivacyPolicy";
import Simulator from "./components/Simulator";

function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-gray-800">404 - Trang không tồn tại</h1>
      <p className="mt-4 text-gray-600">Trang bạn tìm không tồn tại hoặc đã bị xóa.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<ArticleList />} />
          <Route path="article/:slug" element={<ArticleDetail />} />
          <Route path="machines" element={<MachineList />} />
          <Route path="machine/:slug" element={<MachineDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms" element={<TermsOfUse />} />
          <Route path="policy" element={<Policy />} />
          <Route path="simulator" element={<Simulator />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
