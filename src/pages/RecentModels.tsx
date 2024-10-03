import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RecentModels.module.css";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

const RecentModels: React.FC = () => {
  const navigate = useNavigate();
  const [recentApps, setRecentApps] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const cache = localStorage.getItem("recentApps");
    const apps = cache ? JSON.parse(cache) : [];
    setRecentApps(apps);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === recentApps.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? recentApps.length - 1 : prevIndex - 1
    );
  };

  const handleSelectSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getItemClass = (index: number) => {
    if (index === currentIndex) return styles.active;
    if (index === (currentIndex - 1 + recentApps.length) % recentApps.length)
      return styles.prev;
    if (index === (currentIndex + 1) % recentApps.length) return styles.next;
    return styles.hidden;
  };

  const handleRemoveApp = (appName: string) => {
    const updatedApps = recentApps.filter((app) => app.name !== appName);
    setRecentApps(updatedApps);
    localStorage.setItem("recentApps", JSON.stringify(updatedApps));
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center scrollbar-hidden ${styles.animateSlideUp}`}
    >
      <h1 className="text-white text-xl mb-2">Recent Apps</h1>

      {recentApps.length === 0 ? (
        <p className="text-white text-lg">Nenhum app aberto</p>
      ) : (
        <>
          <div className={styles.carousel}>
            <div className={styles.carouselInner}>
              {recentApps.map((item, index) => (
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

          <div className="text-xl mb-20">
            <span>{recentApps[currentIndex]?.name}</span>
          </div>

          <button
            className="text-white bg-red-500 rounded-full "
            onClick={() => handleRemoveApp(recentApps[currentIndex]?.name)}
          >
            <IoCloseSharp size={25} />
          </button>
          <span className="text-sm">Fechar aplicativo</span>

          <div className="flex justify-center mt-6">
            {recentApps.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 mx-1 rounded-full ${
                  currentIndex === index ? "bg-blue-600" : "bg-gray-400"
                }`}
                onClick={() => handleSelectSlide(index)}
              ></button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentModels;
