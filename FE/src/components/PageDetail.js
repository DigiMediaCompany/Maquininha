import React from "react";
import { useParams, Link } from "react-router-dom";

function PageDetail() {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Chi tiết trang #{id}</h1>
      <p className="text-lg text-gray-700 mb-6">
        Đây là nội dung chi tiết cho mục có ID = {id}. Bạn có thể chỉnh sửa để
        hiển thị thông tin cụ thể hơn.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Quay lại Trang chủ
      </Link>
    </div>
  );
}

export default PageDetail;
