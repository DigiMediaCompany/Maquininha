import React from "react";
import { Link } from "react-router-dom";
import { FaAward, FaMoneyBillAlt, FaSuitcase } from "react-icons/fa";
import { RiBankCardLine } from "react-icons/ri";
import { SiTon } from "react-icons/si";
import { MdCompareArrows } from "react-icons/md"; // icon máy so sánh

export default function Navbar() {
  const items = [
    {
      icon: <MdCompareArrows size={36} />,
      label: "Máy so sánh",
      link: "/machines/compare",
    },
    {
      icon: <FaAward size={36} />,
      label: "Máy tốt nhất",
      link: "/machines/best",
    },
    {
      icon: <FaMoneyBillAlt size={36} />,
      label: "Phí thấp nhất",
      link: "/machines/lowfee",
    },
    {
      icon: <FaSuitcase size={36} />,
      label: "Máy cho MEI",
      link: "/machines/mei",
    },
    {
      icon: <SiTon size={36} />,
      label: "Máy TON",
      link: "/machines/ton",
    },
    {
      icon: <RiBankCardLine size={36} />,
      label: "Máy Pagbank",
      link: "/machines/pagbank",
    },
  ];

  return (
    <nav className="bg-white py-4 shadow-sm border-b border-gray-200">
      {/* ✅ Desktop: grid */}
      <div className="hidden sm:flex max-w-6xl mx-auto justify-center flex-wrap gap-10 text-center">
        {items.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="flex flex-col items-center text-gray-700 hover:text-[#00796b] transition-all duration-300 w-[90px]"
          >
            <div className="border-2 border-[#00796b] rounded-full p-4 mb-2 bg-teal-50 hover:bg-[#e0f2f1] transition-all duration-200">
              {item.icon}
            </div>
            <span className="text-sm font-medium leading-tight">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* ✅ Mobile: scroll ngang */}
      <div className="sm:hidden overflow-x-auto flex space-x-5 px-4 scrollbar-hide">
        {items.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="flex flex-col items-center text-gray-700 hover:text-[#00796b] transition-all duration-300 flex-shrink-0 w-[80px]"
          >
            <div className="border-2 border-[#00796b] rounded-full p-3 mb-2 bg-teal-50 hover:bg-[#e0f2f1] transition-all duration-200">
              {item.icon}
            </div>
            <span className="text-xs text-center leading-tight">
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
