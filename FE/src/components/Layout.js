import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/HeaderMain";
import NavBar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

export default function Layout() {
  const location = useLocation();
  
  // ✅ FIX: Bỏ dấu phẩy thừa + thêm detail pages
  const noNavRoutes = [
    "/about", 
    "/contact", 
    "/terms", 
    "/policy",
    // ✅ Detail pages
    "/article/", 
    "/machine/",
    // ✅ Simulator
    "/simulator"
  ];
  
  const hideNav = noNavRoutes.some(path => 
    location.pathname === path || 
    location.pathname.startsWith(path)
  );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header luôn hiện */}
      <Header />
      
      {/* Navbar + Banner chỉ hiện khi KHÔNG phải detail page */}
      {!hideNav && <NavBar />}
      {!hideNav && <Banner />}
      
      <main className={`flex-grow ${hideNav ? 'bg-white' : 'bg-gray-50'}`}>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}