import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/banner.css"; // import file css riêng

const slides = [
  {
    title: "Đồng hành cùng bạn",
    desc: "Từ năm 2010, Maquininha luôn hỗ trợ doanh nhân và người tiêu dùng kỹ thuật số.",
    button: "Xem máy nổi bật →",
  },
  {
    title: "Chọn máy tốt nhất cho bạn",
    desc: "So sánh - Đánh giá - Tư vấn miễn phí",
    button: "Khám phá ngay →",
  },
  {
    title: "Minh bạch và khách quan",
    desc: "Cung cấp thông tin rõ ràng để bạn đưa ra quyết định tốt nhất.",
    button: "Xem chi tiết →",
  },
];

export default function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="banner-container">
      <Slider {...settings}>
        {slides.map((slide, i) => (
          <div key={i}>
            <div className="banner-slide">
              <h2>{slide.title}</h2>
              <p>{slide.desc}</p>
              <button>{slide.button}</button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
