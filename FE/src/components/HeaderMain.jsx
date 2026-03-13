import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function HeaderMain() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Trang chủ", to: "/" },
    { label: "Máy so sánh", to: "/machines" },
    { label: "Trình mô phỏng", to: "/simulator" },
    { label: "Giới thiệu", to: "/about" },
    { label: "Liên hệ", to: "/contact" },
  ];

  return (
    <header className="bg-[#0d3d3d] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold whitespace-nowrap">
          <span className="text-white">Maquininha</span>
          <span className="italic text-[#ffd166]">Ideal</span>
        </Link>

        {/* Search desktop */}
        <div className="hidden md:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm bài viết..."
            className="w-full px-3 py-2 rounded-md text-black focus:outline-none"
          />
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-6 font-medium">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Nút mở menu mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-[#0d3d3d] px-6 pb-4 space-y-4">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full px-3 py-2 rounded-md text-black focus:outline-none"
          />
          <nav className="flex flex-col space-y-3 font-medium">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className="hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
