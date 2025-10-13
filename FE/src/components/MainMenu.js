import React, { useState } from "react";
import "../styles/mainmenu.css";

const articles = [
  {
    id: 1,
    title: "Cách nhận Robux trên Roblox",
    category: "Ứng dụng",
    date: "19 Tháng 9, 2025",
    readTime: "3 phút",
    image: "https://i.imgur.com/dYcYQ7E.png",
  },
  {
    id: 2,
    title: "Cách kiếm Robux một cách an toàn và chính thức",
    category: "Ứng dụng",
    date: "16 Tháng 9, 2025",
    readTime: "5 phút",
    image: "https://i.imgur.com/rW0q5qg.png",
  },
  {
    id: 3,
    title: "Tìm hiểu cách tạo và chơi Roblox an toàn",
    category: "Ứng dụng",
    date: "16 Tháng 9, 2025",
    readTime: "4 phút",
    image: "https://i.imgur.com/hP9RjvR.png",
  },
  {
    id: 4,
    title: "Cách mua thẻ game bằng Maquininha",
    category: "Công nghệ",
    date: "12 Tháng 9, 2025",
    readTime: "6 phút",
    image: "https://i.imgur.com/8KC5wKp.png",
  },
  {
    id: 5,
    title: "Kinh nghiệm bán hàng qua máy POS hiệu quả",
    category: "Kinh doanh",
    date: "11 Tháng 9, 2025",
    readTime: "7 phút",
    image: "https://i.imgur.com/Kn8sWuk.png",
  },
  {
    id: 6,
    title: "Lý do nên chọn PagBank Maquininha",
    category: "Công nghệ",
    date: "10 Tháng 9, 2025",
    readTime: "4 phút",
    image: "https://i.imgur.com/6MZQmK1.png",
  },
  {
    id: 7,
    title: "So sánh Maquininha Pro và Mini",
    category: "Sản phẩm",
    date: "8 Tháng 9, 2025",
    readTime: "5 phút",
    image: "https://i.imgur.com/hP9RjvR.png",
  },
];

export default function MainMenu() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  // Tính index bài viết đầu & cuối
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Tổng số trang
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <section className="mainmenu-container">
      <h2 className="mainmenu-title">Bài viết mới nhất</h2>

      <div className="mainmenu-grid">
        {currentArticles.map((a) => (
          <div key={a.id} className="article-card">
            <img src={a.image} alt={a.title} className="article-image" />

            <div className="article-content">
              <span className="article-category">{a.category}</span>
              <h3 className="article-title">{a.title}</h3>
              <p className="article-meta">
                {a.date} • {a.readTime}
              </p>
              <a href="#" className="article-link">
                ĐỌC THÊM →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
