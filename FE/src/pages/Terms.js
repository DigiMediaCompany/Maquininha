import React from "react";
import StaticPageLayout from "../layouts/StaticPageLayout";

export default function Terms() {
  return (
    <StaticPageLayout title="Điều khoản sử dụng" date="29/08/2024">
      <h2 className="text-3xl font-bold mb-4">1. Mục đích thông tin</h2>
      <p className="mb-8">
        Trang web của chúng tôi chỉ cung cấp thông tin tham khảo về thiết bị đầu
        cuối thẻ tín dụng. Không phải lời khuyên chuyên môn. Chúng tôi không trực
        tiếp bán sản phẩm.
      </p>

      <h2 className="text-3xl font-bold mb-4">2. Không thương mại hóa dữ liệu</h2>
      <p className="mb-8">
        Chúng tôi không bán, chia sẻ hoặc trao đổi dữ liệu cá nhân. Mọi dữ liệu chỉ
        dùng để phân tích và cải thiện trải nghiệm.
      </p>

      <h2 className="text-3xl font-bold mb-4">3. Kiếm tiền và liên kết</h2>
      <p className="mb-8">
        Trang web sử dụng Google AdSense và các chương trình liên kết. Khi bạn nhấp
        vào link mua hàng, chúng tôi có thể nhận hoa hồng nhưng nội dung vẫn{" "}
        <b>khách quan và minh bạch</b>.
      </p>

      <h2 className="text-3xl font-bold mb-4">4. Cam kết biên tập</h2>
      <p className="mb-8">
        Nội dung luôn được biên tập cẩn thận, chính xác và độc lập. Không bị ảnh
        hưởng bởi nhà quảng cáo hay đối tác.
      </p>

      <h2 className="text-3xl font-bold mb-4">5. Miễn trừ trách nhiệm</h2>
      <p>
        Thông tin trên trang chỉ mang tính tham khảo. Người dùng nên kiểm tra trực
        tiếp với nhà cung cấp trước khi quyết định.
      </p>
    </StaticPageLayout>
  );
}
