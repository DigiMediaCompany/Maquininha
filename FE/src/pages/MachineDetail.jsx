import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import "../styles/machineDetail.css";

export default function MachineDetail() {
  const { title } = useParams();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchMachine() {
      try {
        const res = await fetch(
          "https://d1-admin.vinhdtq123123123.workers.dev/maquininha/machines"
        );
        const data = await res.json();
        const found = data?.data?.find(
          (item) => item.title === decodeURIComponent(title)
        );
        if (found) {
          setMachine(found);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Lỗi tải chi tiết máy:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchMachine();
  }, [title]);

  if (loading)
    return <p className="loading">⏳ Đang tải chi tiết máy...</p>;

  if (error || !machine)
    return (
      <div className="machine-notfound text-center">
        <h2>❌ Không tìm thấy thông tin máy!</h2>
        <Link to="/" className="home-btn-top">
          ← Quay lại trang chính
        </Link>
      </div>
    );

  return (
    <div className="machine-detail-container">
      {/* 🔙 Nút quay lại ở đầu trang */}
      <div className="machine-back-top">
        <Link to="/" className="home-btn-top">
          ← Quay lại trang chính
        </Link>
      </div>

      <div className="machine-header">
        <h1>{machine.title}</h1>
        <p className="machine-subtitle">
          Thông tin chi tiết và ưu đãi mới nhất
        </p>
      </div>

      <div className="machine-thumbnail">
        <img src={machine.thumbnail} alt={machine.title} />
      </div>

      <article
        className="machine-content"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(machine.content),
        }}
      />

      {/* 🛒 Chỉ giữ nút đặt hàng */}
      <div className="machine-footer">
        <a
          href={machine.link}
          target="_blank"
          rel="noopener noreferrer"
          className="order-btn"
        >
          🛒 Đặt máy ngay
        </a>
      </div>
    </div>
  );
}
