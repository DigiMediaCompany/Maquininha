export default function LatestPosts() {
  const posts = [
    {
      id: 1,
      title: "Cách nạp Robux trên Roblox",
      date: "19/05/2025",
      time: "3 phút",
      desc: "Cách kiếm Robux an toàn và chính thức",
      image: "https://via.placeholder.com/400x200",
      link: "#",
    },
    {
      id: 2,
      title: "Tạo và chơi game Roblox",
      date: "16/05/2025",
      time: "4 phút",
      desc: "Tìm hiểu cách tạo trò chơi an toàn",
      image: "https://via.placeholder.com/400x200",
      link: "#",
    },
    {
      id: 3,
      title: "Ứng dụng nổi bật",
      date: "20/05/2025",
      time: "6 phút",
      desc: "Công cụ hữu ích cho người chơi Roblox",
      image: "https://via.placeholder.com/400x200",
      link: "#",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-8">Bài viết mới nhất</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {post.date} • {post.time}
              </p>
              <p className="text-gray-600 text-sm mb-3">{post.desc}</p>
              <a
                href={post.link}
                className="text-teal-600 text-sm font-medium hover:underline"
              >
                Đọc thêm →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
