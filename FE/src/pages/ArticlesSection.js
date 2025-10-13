import React, { useState, useEffect } from "react";
import "../styles/articles.css";

export default function ArticlesSection() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6; // số bài mỗi trang
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API WordPress
    fetch("https://maquininha.com.br/wp-json/wp/v2/posts?per_page=30&_embed")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((post) => ({
          id: post.id,
          title: post.title.rendered,
          date: new Date(post.date).toLocaleDateString("vi-VN"),
          image:
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "https://via.placeholder.com/400x200?text=No+Image",
          excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 120) + "...",
          link: post.link,
        }));
        setArticles(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi tải bài viết:", err);
        setLoading(false);
      });
  }, []);

  // Phân trang
  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  return (
    <section className="articles-section">
      <h2 className="articles-title">Bài viết mới nhất</h2>

      {loading ? (
        <p className="loading-text">Đang tải bài viết...</p>
      ) : (
        <>
          <div className="articles-grid">
            {currentArticles.map((a) => (
              <div className="article-card" key={a.id}>
                <img src={a.image} alt={a.title} className="article-image" />
                <div className="article-content">
                  <h3
                    className="article-title"
                    dangerouslySetInnerHTML={{ __html: a.title }}
                  ></h3>
                  <p className="article-meta">{a.date}</p>
                  <p className="article-excerpt">{a.excerpt}</p>
                  <a href={a.link} className="article-link" target="_blank" rel="noopener noreferrer">
                    ĐỌC THÊM →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Phân trang */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="page-btn"
              >
                ← Trước
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="page-btn"
              >
                Sau →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
