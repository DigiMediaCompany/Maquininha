import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

function HeaderMain() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#0d3d3d] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold whitespace-nowrap">
          <span className="text-white">Maquininha</span>
          <span className="italic">Ideal</span>
        </Link>

        {/* Ô tìm kiếm - ẩn trên mobile */}
        <div className="hidden md:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            className="w-full px-3 py-2 rounded-md text-black focus:outline-none"
          />
        </div>

        {/* Menu desktop */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:underline">Trang chủ</Link>
          <Link to="/machines" className="hover:underline">Máy so sánh</Link>
          <Link to="/simulator" className="hover:underline">Trình mô phỏng</Link>
          <Link to="/sobre" className="hover:underline">Giới thiệu</Link>
          <Link to="/contact" className="hover:underline">Liên hệ</Link>
        </nav>

        {/* Nút menu mobile */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Menu mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0d3d3d] px-6 pb-4 space-y-4">
          {/* Ô tìm kiếm */}
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full px-3 py-2 rounded-md text-black focus:outline-none"
          />
          {/* Link menu */}
          <nav className="flex flex-col space-y-3 font-medium">
            <Link to="/" className="hover:underline" onClick={() => setIsOpen(false)}>Trang chủ</Link>
            <Link to="/machines" className="hover:underline" onClick={() => setIsOpen(false)}>Máy so sánh</Link>
            <Link to="/simulator" className="hover:underline" onClick={() => setIsOpen(false)}>Trình mô phỏng</Link>
            <Link to="/sobre" className="hover:underline" onClick={() => setIsOpen(false)}>Giới thiệu</Link>
            <Link to="/contact" className="hover:underline" onClick={() => setIsOpen(false)}>Liên hệ</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default HeaderMain;
