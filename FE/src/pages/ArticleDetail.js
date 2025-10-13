import React from "react";
import { useParams } from "react-router-dom";
import StaticPageLayout from "../layouts/StaticPageLayout";

// Demo data giả lập
const articles = [
  {
    id: "1",
    title: "So sánh các loại máy POS tốt nhất 2024",
    date: "01/09/2024",
    content: `
      Đây là nội dung bài viết chi tiết về việc lựa chọn máy POS tốt nhất năm 2024.
      Chúng tôi phân tích phí giao dịch, ưu nhược điểm và gợi ý phù hợp cho từng loại hình doanh nghiệp.
    `,
  },
  {
    id: "2",
    title: "Cập nhật xu hướng thanh toán không tiền mặt",
    date: "15/09/2024",
    content: `
      Xu hướng thanh toán số tại Brazil và Việt Nam đang tăng mạnh.
      Bài viết này cung cấp số liệu, dự đoán và lời khuyên cho doanh nghiệp nhỏ.
    `,
  },
];

export default function ArticleDetail() {
  const { id } = useParams();
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return (
      <StaticPageLayout title="Bài viết không tồn tại">
        <p className="text-lg text-red-600">Không tìm thấy bài viết.</p>
      </StaticPageLayout>
    );
  }

  return (
    <StaticPageLayout title={article.title} date={article.date}>
      <div className="prose max-w-none">
        {article.content.split("\n").map((p, i) => (
          <p key={i} className="mb-6 text-lg leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </StaticPageLayout>
  );
}
