import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;
  const [loading, setLoading] = useState(true);

  // Gọi API thật
  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(
          "https://d1-admin.vinhdtq123123123.workers.dev/maquininha/articles"
        );
        const data = await res.json();
        if (data?.data) setArticles(data.data);
      } catch (err) {
        console.error("Lỗi tải danh sách bài viết:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  // Phân trang
  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" }); // cuộn lên đầu khi đổi trang
    }
  };

  if (loading) return <p className="loading-text">Đang tải bài viết...</p>;

  return (
    <section className="articles-section">
      <h2 className="articles-title">📰 Artigos gần đây</h2>

      <div className="articles-grid">
        {currentArticles.map((a, i) => (
          <div key={i} className="article-card">
            <img
              src={a.thumbnail || "https://via.placeholder.com/400x200"}
              alt={a.title}
              className="article-image"
            />
            <div className="article-content">
              <span className="article-category">{a.category}</span>
              <h3 className="article-title">{a.title}</h3>
              <p className="article-meta">
                {a.date} • {a.duration || "3 phút"}
              </p>
              <Link
                to={`/article/${encodeURIComponent(a.title)}`}
                className="article-link"
              >
                ĐỌC THÊM →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* --- PHÂN TRANG DẠNG SỐ --- */}
      {totalPages > 1 && (
        <div className="pagination-container">
          <button
            onClick={() => changePage(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-nav"
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(
              (page) =>
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
            )
            .reduce((acc, page, i, arr) => {
              if (i > 0 && page - arr[i - 1] > 1) acc.push("...");
              acc.push(page);
              return acc;
            }, [])
            .map((page, i) =>
              page === "..." ? (
                <span key={i} className="dots">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`page-btn ${
                    currentPage === page ? "active" : ""
                  }`}
                >
                  {page}
                </button>
              )
            )}

          <button
            onClick={() => changePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-nav"
          >
            {">"}
          </button>
        </div>
      )}
    </section>
  );
}
