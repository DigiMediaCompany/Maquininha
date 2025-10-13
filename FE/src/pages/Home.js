import React from "react";
import MainMenu from "../components/MainMenu";
import "../styles/home.css"; // thêm CSS riêng cho layout đẹp hơn

export default function Home() {
  const demoPosts = [1, 2, 3].map((i) => ({
    id: i,
    title: `Tiêu đề bài viết mẫu ${i}`,
    excerpt:
      "Một đoạn ngắn mô tả nội dung bài viết để xem demo. Giúp người dùng nắm nội dung chính trước khi đọc chi tiết.",
    image: "https://i.imgur.com/hP9RjvR.png",
  }));

  return (
    <div className="home-container">
      {/* Banner hero có thể thêm sau */}
      {/* <Hero /> */}

      {/* Menu chính */}
      <MainMenu />

      {/* Danh sách bài viết mới nhất */}
      <section className="latest-section">
        <h3 className="section-title"> Bài viết mới nhất</h3>

        <div className="articles-grid">
          {demoPosts.map((p) => (
            <article key={p.id} className="article-card">
              <img src={p.image} alt={p.title} className="article-img" />
              <div className="article-info">
                <h4 className="article-title">{p.title}</h4>
                <p className="article-excerpt">{p.excerpt}</p>
                <a href={`/articles/${p.id}`} className="article-link">
                  Đọc thêm →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
