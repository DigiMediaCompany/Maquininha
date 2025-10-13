import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Machines() {
  const [machines, setMachines] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category");
  const brand = query.get("brand");

  useEffect(() => {
    // ⚙️ Giả lập API theo query
    let url = "https://maquininha.com.br/wp-json/wp/v2/machine";

    if (category) url += `?category=${category}`;
    if (brand) url += `?brand=${brand}`;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // Đảm bảo data là mảng
        if (Array.isArray(data)) {
          setMachines(data);
        } else {
          setMachines([]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category, brand]);

  const pageTitle =
    brand === "ton"
      ? "Máy thương hiệu TON"
      : brand === "pagbank"
      ? "Máy PagBank"
      : category === "best"
      ? "Máy tốt nhất"
      : category === "lowfee"
      ? "Máy có phí thấp nhất"
      : category === "mei"
      ? "Máy dành cho MEI"
      : "Tất cả máy POS";

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-teal-600 text-xl animate-pulse">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-10 text-teal-700">
        {pageTitle}
      </h1>

      {machines.length === 0 ? (
        <p className="text-center text-gray-500">Không có dữ liệu phù hợp.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {machines.map((m) => (
            <div
              key={m.id}
              className="border rounded-lg shadow hover:shadow-lg transition-all p-5 bg-white"
            >
              <h2 className="text-xl font-semibold mb-3 text-teal-700">
                <Link to={`/machine/${m.id}`}>{m.title.rendered}</Link>
              </h2>
              <div
                className="text-gray-600 text-sm leading-relaxed line-clamp-3"
                dangerouslySetInnerHTML={{ __html: m.excerpt?.rendered }}
              />
              <Link
                to={`/machine/${m.id}`}
                className="mt-3 inline-block text-sm text-white bg-teal-600 px-4 py-2 rounded hover:bg-teal-700"
              >
                Xem chi tiết
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Machines;
