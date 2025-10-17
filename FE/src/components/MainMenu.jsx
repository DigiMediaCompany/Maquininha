import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/mainmenu.css";
import Pagination from "../components/Pagination";

export default function MainMenu() {
  const [articles, setArticles] = useState([]);
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentArticlePage, setCurrentArticlePage] = useState(1);
  const [currentMachine, setCurrentMachine] = useState(1);
  const articlesPerPage = 3;

  useEffect(() => {
    async function fetchData() {
      try {
        const [aRes, mRes] = await Promise.all([
          fetch("https://d1-admin.vinhdtq123123123.workers.dev/maquininha-articles/"),
          fetch("https://d1-admin.vinhdtq123123123.workers.dev/maquininha-machines/"),
        ]);
        const [aData, mData] = await Promise.all([aRes.json(), mRes.json()]);

        // ✅ Chuẩn hoá bài viết
        if (Array.isArray(aData.data)) setArticles(aData.data);
        else if (Array.isArray(aData)) setArticles(aData);
        else if (aData && typeof aData === "object") setArticles([aData]);

        // ✅ Chuẩn hoá máy móc
        if (Array.isArray(mData.data)) setMachines(mData.data);
        else if (Array.isArray(mData)) setMachines(mData);
        else if (mData && typeof mData === "object") setMachines([mData]);
      } catch (err) {
        console.error("❌ Lỗi tải dữ liệu:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;

  const indexOfLastArticle = currentArticlePage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalArticlePages = Math.ceil(articles.length / articlesPerPage);
  const currentM = machines[currentMachine - 1];

  return (
    <section className="mainmenu-container">
      {/* === BÀI VIẾT === */}
      <h2 className="mainmenu-title">📰 Bài viết mới nhất</h2>
      <div className="mainmenu-grid">
        {currentArticles.map((a) => (
          <div key={a.id || a.slug} className="article-card">
            <img src={a.thumbnail || "https://via.placeholder.com/400x200"} alt={a.title} />
            <div className="article-content">
              <span className="article-category">{a.category || "Tin tức"}</span>
              <h3 className="article-title">{a.title}</h3>
              <p className="article-meta">
                {a.date} • {a.duration || "3 phút"}
              </p>
              <Link to={`/article/${a.slug || a.id}`} className="article-link">
                ĐỌC THÊM →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {totalArticlePages > 1 && (
        <Pagination
          totalPages={totalArticlePages}
          currentPage={currentArticlePage}
          onPageChange={(page) => setCurrentArticlePage(page)}
        />
      )}

      {/* === MÁY MÓC NỔI BẬT === */}
      <h2 className="mainmenu-title">💳 Máy móc nổi bật</h2>
      {currentM && (
        <div className="machine-highlight">
          <div className="machine-card-large">
            <img
              src={currentM.thumbnail || "https://via.placeholder.com/250x250"}
              alt={currentM.title}
            />
            <div className="machine-info-large">
              <h3>{currentM.title}</h3>
              <div className="machine-btns">
                <a
                  href={currentM.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  ĐẶT HÀNG NGAY
                </a>
                <Link to={`/machine/${currentM.slug || currentM.id}`} className="btn-outline">
                  XEM CHI TIẾT →
                </Link>
              </div>
            </div>
          </div>

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
