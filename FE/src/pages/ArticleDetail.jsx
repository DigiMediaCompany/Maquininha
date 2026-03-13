// src/pages/ArticleDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/detail.css";

export default function ArticleDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const listRes = await fetch(
          "https://d1-admin.vinhdtq123123123.workers.dev/maquininha-articles/"
        );
        const listData = await listRes.json();
        const found = listData.data.find((a) => a.slug === slug);
        if (!found) throw new Error("Không tìm thấy bài viết");
        const detailRes = await fetch(
          `https://d1-admin.vinhdtq123123123.workers.dev/maquininha-articles/${found.id}`
        );
        const detailData = await detailRes.json();
        setArticle(detailData);
      } catch (err) {
        console.error("❌ Lỗi tải chi tiết bài viết:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  if (loading) return <p className="loading-text">Đang tải bài viết...</p>;
  if (!article) return <p>Không tìm thấy bài viết.</p>;

  return (
    <section className="detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>

      <h1 className="detail-title">{article.title}</h1>
      <img
        src={article.thumbnail}
        alt={article.title}
        className="detail-image"
      />
      <article
        className="detail-content"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </section>
  );
}
