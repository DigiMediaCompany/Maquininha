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
          "https://d1-admin.vinhdtq123123123.workers.dev/maquininha/machines"
        );
        const data = await res.json();
        if (data?.data) setMachines(data.data);
      } catch (err) {
        console.error("Lỗi tải máy:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMachines();
  }, []);

  if (loading) return <p>Đang tải danh sách máy...</p>;

  return (
    <section className="machine-list">
      <h2>Danh sách máy thanh toán</h2>
      <div className="machine-grid">
        {machines.map((m, i) => (
          <div key={i} className="machine-card">
            <img src={m.thumbnail} alt={m.title} />
            <h3>{m.title}</h3>
            <Link to={`/machine/${encodeURIComponent(m.title)}`}>
              Xem chi tiết →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
