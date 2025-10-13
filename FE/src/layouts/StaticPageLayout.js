// src/layouts/StaticPageLayout.js
import React from "react";

export default function StaticPageLayout({ title, date, children }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 leading-relaxed text-gray-800">
      {/* Tiêu đề chính */}
      <h1 className="text-5xl font-bold mb-10 text-center">{title}</h1>

      {/* Ngày hiệu lực (nếu có) */}
      {date && (
        <p className="text-sm text-gray-500 mb-10 text-center">
          Ngày có hiệu lực: {date}
        </p>
      )}

      {/* Nội dung trang */}
      <div className="text-lg">{children}</div>
    </div>
  );
}
