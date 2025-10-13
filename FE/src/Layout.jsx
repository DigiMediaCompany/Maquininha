import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header className="bg-[#133236] text-white">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">
            Maquininha<span className="italic font-light">Ideal</span>
          </h1>
          <nav className="hidden md:flex space-x-6 text-sm uppercase font-medium">
            <a href="/" className="hover:text-gray-300">Initiation</a>
            <a href="/compare" className="hover:text-gray-300">Máy so sánh</a>
            <a href="/simulator" className="hover:text-gray-300">Trình mô phỏng</a>
            <a href="/about" className="hover:text-gray-300">Giới thiệu</a>
            <a href="/contact" className="hover:text-gray-300">Liên hệ</a>
          </nav>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết.."
              className="px-3 py-1 rounded-md text-black"
            />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow">{children}</main>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-[#3d4f52] to-[#0b2b31] text-white mt-10">
        <div className="container mx-auto py-8 text-center">
          <h2 className="text-xl font-bold">
            Maquininha<span className="italic font-light">Ideal</span>
          </h2>
          <nav className="flex justify-center space-x-8 mt-4 text-sm font-semibold uppercase">
            <a href="/initiation" className="hover:text-gray-300">Initiation</a>
            <a href="/about" className="hover:text-gray-300">Giới thiệu</a>
            <a href="/terms" className="hover:text-gray-300">Điều khoản sử dụng</a>
            <a href="/privacy" className="hover:text-gray-300">Chính sách bảo mật</a>
            <a href="/contact" className="hover:text-gray-300">Liên hệ</a>
          </nav>
          <hr className="border-gray-500 my-6 w-3/4 mx-auto" />
          <p className="max-w-2xl mx-auto text-sm leading-relaxed">
            Maquininha Ideal là một trang web và ứng dụng giúp bạn dễ dàng lựa chọn máy thẻ tốt nhất,
            so sánh tỷ giá và lợi ích của các lựa chọn chính trên thị trường.  
            Nó giúp các doanh nhân đưa ra quyết định sáng suốt để tối đa hóa lợi nhuận.
          </p>
          <p className="mt-4 text-xs">
            Maquininha Ideal © Bản quyền 2025 - Bảo lưu mọi quyền.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
