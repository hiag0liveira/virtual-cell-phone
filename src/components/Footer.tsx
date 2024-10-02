import React from "react";
import { GoTriangleLeft } from "react-icons/go";
import { FaCircle, FaSquare } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="w-full h-16 bg-transparent flex justify-around items-center rounded-b-2xl  bottom-0">
      <button
        className="text-white flex flex-col items-center"
        onClick={() => console.log("Voltar")}
      >
        <GoTriangleLeft size={28} />
      </button>

      <button
        className="text-white flex flex-col items-center"
        onClick={() => console.log("Home")}
      >
        <FaCircle size={15} />
      </button>

      <button
        className="text-white flex flex-col items-center"
        onClick={() => console.log("Abrir abas")}
      >
        <FaSquare size={15} />
      </button>
    </div>
  );
};

export default Footer;
