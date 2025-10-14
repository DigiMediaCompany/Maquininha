import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/HeaderMain";
import NavBar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function Layout() {
  const location = useLocation();
  const noNavRoutes = ["/sobre", "/contact", "/terms", "/policy"];
  const hideNav = noNavRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {!hideNav && <NavBar />}
      {!hideNav && <Banner />}
      <main className="flex-grow bg-gray-50">
        {/* 👇 Đây là nơi nội dung từng trang hiển thị */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
