import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MachineDetail() {
  const { id } = useParams();
  const [machine, setMachine] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://maquininha.com.br/wp-json/wp/v2/machine/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMachine(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center text-teal-600 text-xl animate-pulse">
        Đang tải chi tiết máy...
      </div>
    );
  }

  if (!machine) {
    return (
      <div className="p-8 text-center text-red-600 text-lg">
        Không tìm thấy máy.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-teal-700 mb-6">
        {machine.title.rendered}
      </h1>
      <div
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: machine.content?.rendered }}
      />
    </div>
  );
}
