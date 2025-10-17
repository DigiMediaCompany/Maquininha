// src/pages/MachineList.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/machine.css";

export default function MachineList() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMachines() {
      try {
        const res = await fetch(
          "https://d1-admin.vinhdtq123123123.workers.dev/maquininha-machines/"
        );
        const data = await res.json();
        if (data?.data) setMachines(data.data);
      } catch (err) {
        console.error("❌ Lỗi tải máy:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMachines();
  }, []);

  if (loading) return <p>Đang tải danh sách máy...</p>;

  return (
    <section className="machine-list">
      <h2 className="machine-list-title">💳 Danh sách máy thanh toán</h2>

      <div className="machine-grid">
        {machines.map((m) => (
          <div key={m.id} className="machine-card">
            <img
              src={m.thumbnail || "https://via.placeholder.com/300x200"}
              alt={m.title}
              className="machine-image"
            />

            <div className="machine-content">
              <h3 className="machine-title">{m.title}</h3>
              <p className="machine-description">
                {m.description || "Máy POS thông minh hỗ trợ nhiều hình thức thanh toán."}
              </p>

              <div className="machine-btns">
                <a
                  href={m.link || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  ĐẶT HÀNG NGAY
                </a>
                <Link to={`/machine/${m.slug || m.id}`} className="btn-outline">
                  XEM CHI TIẾT →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
