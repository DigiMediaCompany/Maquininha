import React from "react";

export default function Posts() {
  const posts = [
    {
      title: "Cách nạp Robux trên Roblox",
      date: "19/05/2025",
      read: "3 phút",
      desc: "Cách kiếm Robux an toàn và chính thức",
      img: "https://via.placeholder.com/400x200",
    },
    {
      title: "Tạo và chơi game Roblox",
      date: "16/05/2025",
      read: "4 phút",
      desc: "Tìm hiểu cách tạo trò chơi an toàn",
      img: "https://via.placeholder.com/400x200",
    },
    {
      title: "Ứng dụng nổi bật",
      date: "20/05/2025",
      read: "6 phút",
      desc: "Công cụ hữu ích cho người chơi Roblox",
      img: "https://via.placeholder.com/400x200",
    },
  ];

  return (
    <section className="px-6 py-10">
      <h3 className="text-2xl font-bold text-center mb-6">Bài viết mới nhất</h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <div
            key={i}
            className="rounded-xl shadow hover:shadow-lg transition p-3 bg-white"
          >
            <img
              src={post.img}
              alt={post.title}
              className="rounded-lg w-full"
            />
            <h4 className="font-semibold text-lg mt-3">{post.title}</h4>
            <p className="text-sm text-gray-500">
              {post.date} • {post.read}
            </p>
            <p className="text-gray-600 text-sm mt-1">{post.desc}</p>
            <button className="text-teal-600 hover:underline mt-2">
              Đọc thêm →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
