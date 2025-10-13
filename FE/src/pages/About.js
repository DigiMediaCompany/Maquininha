import React from "react";
import StaticPageLayout from "../layouts/StaticPageLayout";

export default function About() {
  return (
    <StaticPageLayout title="Giới thiệu">
      <p className="mb-8">
        Chào mừng bạn đến <b>Maquininha.com.br</b>, cổng thông tin chính thức về
        máy thẻ, công nghệ tài chính và nhiều hơn nữa. Dự án của chúng tôi bắt
        đầu vào năm 2010 với mục đích cung cấp thông tin{" "}
        <span className="font-semibold">rõ ràng, khách quan và dễ tiếp cận</span>
        , giúp các doanh nhân, thương gia và người tiêu dùng kỹ thuật số đưa ra
        những quyết định tốt nhất.
      </p>

      <h2 className="text-3xl font-bold mb-4">Nhiệm vụ của chúng tôi</h2>
      <p className="mb-8">
        Máy thẻ đã trở thành thiết yếu cho bất kỳ doanh nghiệp nào. Tuy nhiên, sự
        đa dạng về tùy chọn, mức phí và tính năng có thể gây nhầm lẫn. Sứ mệnh của
        chúng tôi là <i>đơn giản hóa</i> vũ trụ này, cung cấp sự minh bạch hoàn toàn
        về phí, ưu điểm và nhược điểm của từng lựa chọn.
      </p>

      <h2 className="text-3xl font-bold mb-4">Mô hình kinh doanh</h2>
      <p className="mb-8">
        Chúng tôi hoạt động dựa trên{" "}
        <span className="font-semibold">quan hệ đối tác và liên kết</span>. Khi bạn
        chọn máy, khóa học hoặc dịch vụ qua các liên kết trên trang, chúng tôi có
        thể nhận hoa hồng <b>mà không mất thêm chi phí nào cho bạn</b>. Nhờ đó nội
        dung của chúng tôi luôn <b>miễn phí, khách quan, bền vững</b>.
      </p>

      <h2 className="text-3xl font-bold mb-4">Nội dung của chúng tôi</h2>
      <ul className="list-disc list-inside mb-8 space-y-3">
        <li>
          <b>Máy thẻ</b> → So sánh, phân tích, đánh giá toàn diện.
        </li>
        <li>
          <b>Trò chơi điện tử</b> → Nội dung về ROBLOX và trò chơi khác, kèm mẹo
          hữu ích.
        </li>
        <li>
          <b>Khóa học và đào tạo</b> → Tài chính, công nghệ, kinh doanh, tiếp thị
          số.
        </li>
        <li>
          <b>Hướng dẫn thực hành</b> → Các bước dễ hiểu, từ máy POS đến cơ hội số.
        </li>
        <li>
          <b>Tin tức và xu hướng</b> → Cập nhật thanh toán, công nghệ, thị trường.
        </li>
      </ul>

      <h2 className="text-3xl font-bold mb-4">Cam kết biên tập</h2>
      <p className="mb-8">
        Chúng tôi cung cấp nội dung <b>chất lượng, minh bạch và cập nhật</b>, với đội
        ngũ chuyên gia luôn theo sát xu hướng thị trường để đảm bảo thông tin đáng
        tin cậy.
      </p>

      <h2 className="text-3xl font-bold mb-4">Một khởi đầu mới</h2>
      <p className="mb-8">
        Từ năm 2010 đến nay, chúng tôi không ngừng phát triển. Từ 2024,{" "}
        <b>Maquininha.com.br</b> định hướng trở thành cổng thông tin{" "}
        <span className="font-semibold">lớn nhất và đáng tin cậy nhất tại Brazil</span>{" "}
        về máy thẻ, công nghệ tài chính và nội dung số.
      </p>

      <h2 className="text-3xl font-bold mb-4">Tham gia với chúng tôi</h2>
      <p>
        Nếu bạn muốn có{" "}
        <b>so sánh trung thực, thông tin đáng tin cậy và nội dung giáo dục</b> về
        máy móc, trò chơi, khóa học và nhiều hơn nữa, bạn đã đến đúng nơi. Cảm ơn
        bạn đã đồng hành!
      </p>
    </StaticPageLayout>
  );
}
