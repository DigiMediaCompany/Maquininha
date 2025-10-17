// src/pages/MachineDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/detail.css";

export default function MachineDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMachine() {
      try {
        const listRes = await fetch(
          "https://d1-admin.vinhdtq123123123.workers.dev/maquininha-machines/"
        );
        const listData = await listRes.json();
        const found = listData.data.find((m) => m.slug === slug);
        if (!found) throw new Error("Không tìm thấy máy");
        const detailRes = await fetch(
          `https://d1-admin.vinhdtq123123123.workers.dev/maquininha-machines/${found.id}`
        );
        const detailData = await detailRes.json();
        setMachine(detailData);
      } catch (err) {
        console.error("❌ Lỗi tải chi tiết máy:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMachine();
  }, [slug]);

  if (loading) return <p className="loading-text">Đang tải chi tiết máy...</p>;
  if (!machine) return <p>Không tìm thấy dữ liệu máy.</p>;

  return (
    <section className="detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Quay lại
      </button>

      <h1 className="detail-title">{machine.title}</h1>
      <img
        src={machine.thumbnail}
        alt={machine.title}
        className="detail-image"
      />
      <article
        className="detail-content"
        dangerouslySetInnerHTML={{ __html: machine.content }}
      />
    </section>
  );
}
