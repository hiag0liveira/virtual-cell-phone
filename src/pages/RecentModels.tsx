import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsonData from "../../public/apps.json";
import styles from "./RecentModels.module.css";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const RecentModels: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === jsonData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? jsonData.length - 1 : prevIndex - 1
    );
  };

  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getItemClass = (index: number) => {
    if (index === currentIndex) return styles.active;
    if (index === (currentIndex - 1 + jsonData.length) % jsonData.length)
      return styles.prev;
    if (index === (currentIndex + 1) % jsonData.length) return styles.next;
    return styles.hidden;
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center scrollbar-hidden ${styles.animateSlideUp}`}
    >
      <h1 className="text-white text-xl mb-2">Apps Models</h1>
      <div className={styles.carousel}>
        <div className={styles.carouselInner}>
          {jsonData.map((item, index) => (
            <div
              key={index}
              className={`${styles.carouselItem} ${getItemClass(index)}`}
            >
              <img
                className="cursor-pointer"
                src={item.screen}
                alt={`${item.name} slide`}
                onClick={() =>
                  navigate(`/app/${item.name.replace(/\s+/g, "-")}`)
                }
              />
            </div>
          ))}
        </div>

        <button
          className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white px-3 py-2"
          onClick={handlePrev}
        >
          <MdOutlineArrowBackIos size={35} />
        </button>

        <button
          className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white px-3 py-2"
          onClick={handleNext}
        >
          <MdOutlineArrowForwardIos size={35} />
        </button>
      </div>
      <div className="mt-4 text-xl">
        <span>{jsonData[currentIndex].name}</span>
      </div>
      <div className="flex justify-center mt-6">
        {jsonData.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-400"
            }`}
            onClick={() => handleSelectSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default RecentModels;
