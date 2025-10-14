import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import "../styles/articleDetail.css";

export default function ArticleDetail() {
  const { title } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ALL_ARTICLES_URL =
    "https://d1-admin.vinhdtq123123123.workers.dev/maquininha/articles";

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(ALL_ARTICLES_URL);
        if (!res.ok) throw new Error(`Server trả về ${res.status}`);
        const json = await res.json();

        if (json?.data) {
          const decodedTitle = decodeURIComponent(title);
          const found = json.data.find((a) => a.title === decodedTitle);
          if (!found) {
            setError("Không tìm thấy bài viết này.");
            return;
          }
          setArticle(found);

          // Lọc bài viết liên quan cùng category
          const relatedPosts = json.data
            .filter(
              (a) => a.title !== found.title && a.category === found.category
            )
            .slice(0, 3);
          setRelated(relatedPosts);
        }
      } catch (err) {
        console.error("Lỗi tải bài viết:", err);
        setError("Đã xảy ra lỗi khi tải bài viết.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [title]);

  if (loading) return <div className="article-loading">Đang tải...</div>;
  if (error)
    return (
      <div className="article-error">
        <p>{error}</p>
        <button onClick={() => navigate(-1)}>← Quay lại</button>
      </div>
    );

  const safeHtml = DOMPurify.sanitize(article.content || "");

  return (
    <div className="article-container">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>

      <h1 className="article-title">{article.title}</h1>
      <div className="article-meta">
        <span>{article.category}</span> • <span>{article.date}</span> •{" "}
        <span>{article.duration}</span>
      </div>

      {article.thumbnail && (
        <img
          src={article.thumbnail}
          alt={article.title}
          className="article-thumbnail"
        />
      )}

      <div
        className="article-content"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />

      <div className="article-share">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
          rel="noreferrer"
        >
          Facebook
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>
      </div>

      {related.length > 0 && (
        <div className="related-section">
          <h3>Bài viết liên quan</h3>
          <div className="related-grid">
            {related.map((r) => (
              <Link
                to={`/article/${encodeURIComponent(r.title)}`}
                key={r.title}
                className="related-card"
              >
                <img src={r.thumbnail} alt={r.title} />
                <p>{r.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
