import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/mainmenu.css";
import Pagination from "../components/Pagination";

export default function MainMenu() {
  // ----------------------------
  // BÀI VIẾT
  // ----------------------------
  const [articles, setArticles] = useState([]);
  const [currentArticlePage, setCurrentArticlePage] = useState(1);
  const articlesPerPage = 3;
  const [loadingArticles, setLoadingArticles] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch(
          "https://d1-admin.vinhdtq123123123.workers.dev/maquininha/articles?limit=100"
        );
        const data = await res.json();
        if (data?.data) setArticles(data.data);
      } catch (err) {
        console.error("Lỗi tải bài viết:", err);
      } finally {
        setLoadingArticles(false);
      }
    }
    fetchArticles();
  }, []);

  const indexOfLastArticle = currentArticlePage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalArticlePages = Math.ceil(articles.length / articlesPerPage);

  // ----------------------------
  // MÁY MÓC NỔI BẬT
  // ----------------------------
  const [machines, setMachines] = useState([]);
  const [currentMachine, setCurrentMachine] = useState(1);
  const [loadingMachines, setLoadingMachines] = useState(true);

  useEffect(() => {
    async function fetchMachines() {
      try {
        const res = await fetch(
          "https://d1-admin.vinhdtq123123123.workers.dev/maquininha/machines"
        );
        const data = await res.json();
        if (data?.data) setMachines(data.data);
      } catch (err) {
        console.error("Lỗi tải máy:", err);
      } finally {
        setLoadingMachines(false);
      }
    }
    fetchMachines();
  }, []);

  if (loadingArticles || loadingMachines)
    return <p className="loading-text">Đang tải dữ liệu...</p>;

  const currentM = machines[currentMachine - 1];

  return (
    <section className="mainmenu-container">
      {/* ==================== PHẦN 1: BÀI VIẾT ==================== */}
      <h2 className="mainmenu-title">📰 Bài viết mới nhất</h2>

      <div className="mainmenu-grid">
        {currentArticles.map((a) => (
          <div key={a.title} className="article-card">
            <img
              src={a.thumbnail || "https://via.placeholder.com/400x200"}
              alt={a.title}
              className="article-image"
            />
            <div className="article-content">
              <span className="article-category">{a.category}</span>
              <h3 className="article-title">{a.title}</h3>
              <p className="article-meta">
                {a.date} • {a.duration || "—"}
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

      {/* ✅ PHÂN TRANG CHO BÀI VIẾT */}
      {totalArticlePages > 1 && (
        <Pagination
          totalPages={totalArticlePages}
          currentPage={currentArticlePage}
          onPageChange={(page) => setCurrentArticlePage(page)}
        />
      )}

      {/* ==================== PHẦN 2: MÁY MÓC ==================== */}
      <h2 className="mainmenu-title">💳 Máy móc nổi bật</h2>

      {currentM && (
        <div className="machine-highlight">
          <div className="machine-card-large">
            <img
              src={currentM.thumbnail || "https://via.placeholder.com/250x250"}
              alt={currentM.title}
              className="machine-img-large"
            />
            <div className="machine-info-large">
              <h3>{currentM.title}</h3>
              <p>{currentM.description}</p>
              <div className="machine-btns">
                <a
                  href={currentM.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  ĐẶT HÀNG NGAY
                </a>
                <Link
                  to={`/machine/${encodeURIComponent(currentM.title)}`}
                  className="btn-outline"
                >
                  XEM CHI TIẾT →
                </Link>
              </div>
            </div>
          </div>

          {/* ✅ 4 DẤU CHẤM PHÂN TRANG MÁY */}
          <div className="machine-dots">
            {machines.slice(0, 4).map((_, i) => (
              <span
                key={i}
                className={`dot ${currentMachine === i + 1 ? "active" : ""}`}
                onClick={() => setCurrentMachine(i + 1)}
              ></span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
