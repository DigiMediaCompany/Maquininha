import React from "react";
import { Link } from "react-router-dom";
import { FaAward, FaMoneyBillAlt, FaSuitcase } from "react-icons/fa";
import { RiBankCardLine } from "react-icons/ri";
import { SiTon } from "react-icons/si";

export default function Navbar() {
  const items = [
    {
      icon: <FaAward size={36} />,
      label: "Máy tốt nhất",
      link: "/machines?category=best",
    },
    {
      icon: <FaMoneyBillAlt size={36} />,
      label: "Phí thấp nhất",
      link: "/machines?category=lowfee",
    },
    {
      icon: <FaSuitcase size={36} />,
      label: "Máy cho MEI",
      link: "/machines?category=mei",
    },
    {
      icon: <SiTon size={36} />,
      label: "Máy TON",
      link: "/machines?brand=ton",
    },
    {
      icon: <RiBankCardLine size={36} />,
      label: "PagBank",
      link: "/machines?brand=pagbank",
    },
  ];

  return (
    <nav className="bg-white py-8 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between px-[5%] flex-wrap gap-8">
        {items.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className="flex flex-col items-center text-gray-700 hover:text-teal-600 transition duration-300 cursor-pointer"
          >
            <div className="border-2 border-teal-600 rounded-full p-5 mb-2 bg-teal-50 hover:bg-teal-100 transition-all">
              {item.icon}
            </div>
            <span className="text-base font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
