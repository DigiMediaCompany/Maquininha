import React from "react";
import StaticPageLayout from "../layouts/StaticPageLayout";

export default function Policy() {
  return (
    <StaticPageLayout title="Chính sách bảo mật" date="29/08/2024">
      <h2 className="text-3xl font-bold mb-4">1. Thông tin chúng tôi thu thập</h2>
      <p className="mb-8">
        Chúng tôi chỉ thu thập thông tin cơ bản khi bạn tự nguyện cung cấp (ví dụ:
        email trong biểu mẫu liên hệ). Bạn có thể duyệt web mà không cần cung cấp
        dữ liệu cá nhân.
      </p>

      <h2 className="text-3xl font-bold mb-4">2. An ninh</h2>
      <p className="mb-8">
        Chúng tôi sử dụng các biện pháp bảo mật kỹ thuật và quản lý phù hợp để ngăn
        chặn truy cập trái phép.
      </p>

      <h2 className="text-3xl font-bold mb-4">3. Cookie</h2>
      <ul className="list-disc list-inside mb-8 space-y-3">
        <li>
          <b>Cookie phiên</b> → Xóa khi đóng trình duyệt.
        </li>
        <li>
          <b>Cookie liên tục</b> → Lưu trong thiết bị để cá nhân hóa trải nghiệm.
        </li>
        <li>
          <b>Cookie bên thứ ba</b> → Dùng cho quảng cáo Google AdSense.
        </li>
      </ul>
      <p className="mb-8">
        Bạn có thể tắt cookie trong cài đặt trình duyệt, nhưng điều này có thể ảnh
        hưởng đến trải nghiệm người dùng.
      </p>

      <h2 className="text-3xl font-bold mb-4">4. Liên kết bên ngoài</h2>
      <p>
        Trang web có thể chứa link đến website khác. Chúng tôi không chịu trách
        nhiệm về nội dung và bảo mật khi bạn truy cập các website đó.
      </p>
    </StaticPageLayout>
  );
}
