import React from "react";
import StaticPageLayout from "../layouts/StaticPageLayout";

export default function Contact() {
  return (
    <StaticPageLayout title="Liên hệ">
      <p className="mb-8">
        Chúng tôi luôn sẵn sàng hỗ trợ! Nếu bạn có câu hỏi, góp ý hoặc muốn tìm
        hiểu thêm về thị trường máy đọc thẻ, hãy liên hệ với chúng tôi.
      </p>

      <h2 className="text-3xl font-bold mb-4">Làm thế nào để liên lạc?</h2>
      <p className="mb-8">
        Bạn có thể gửi email đến{" "}
        <a
          href="mailto:contato@maquininha.com.br"
          className="text-blue-600 underline"
        >
          contato@maquininha.com.br
        </a>{" "}
        và chúng tôi sẽ phản hồi sớm nhất có thể.
      </p>

      <h2 className="text-3xl font-bold mb-4">Cam kết hỗ trợ</h2>
      <p>
        Phản hồi của bạn rất quan trọng đối với chúng tôi. Mục tiêu là mang lại
        trải nghiệm tốt nhất tại <b>Maquininha.com.br</b>, giúp quá trình lựa chọn
        máy POS của bạn minh bạch và dễ dàng hơn.
      </p>
    </StaticPageLayout>
  );
}
