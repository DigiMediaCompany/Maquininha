import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#3d4f52] to-[#0b2b31] text-white mt-10">
      <div className="container mx-auto py-8 text-center px-4">
        <h2 className="text-xl font-bold">
          Maquininha <span className="italic">Ideal</span>
        </h2>
        <nav className="flex justify-center space-x-8 mt-4 text-sm font-semibold uppercase">
          <Link to="/">Initiation</Link>
          <Link to="/sobre">Giới thiệu</Link>
          <Link to="/terms">Điều khoản sử dụng</Link>
          <Link to="/policy">Chính sách bảo mật</Link>
          <Link to="/contact">Liên hệ</Link>
        </nav>
        <hr className="border-gray-500 my-6 w-3/4 mx-auto" />
        <p className="max-w-2xl mx-auto text-sm leading-relaxed">
          Maquininha Ideal là một trang web và ứng dụng giúp bạn dễ dàng lựa chọn máy thẻ tốt
          nhất, so sánh tỷ giá và lợi ích của các lựa chọn chính trên thị trường. Nó giúp các
          doanh nhân đưa ra quyết định sáng suốt để tối đa hóa lợi nhuận.
        </p>
        <p className="mt-4 text-xs">Maquininha Ideal © Bản quyền 2025 - Bảo lưu mọi quyền.</p>
      </div>
    </footer>
  );
}
