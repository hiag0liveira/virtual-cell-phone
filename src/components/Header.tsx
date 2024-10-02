import React, { useEffect, useState } from "react";
import {
  MdOutlineNetworkCell,
  MdOutlineNetworkWifi,
  MdOutlineVibration,
} from "react-icons/md";
import { FaBatteryThreeQuarters } from "react-icons/fa6";
import { IoAlarmOutline } from "react-icons/io5";

const Header: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className="w-full flex justify-between items-center p-2 bg-transparent text-white">
      <div className="text-lg font-semibold">
        {formatTime(currentTime)} - {formatDate(currentTime)}
      </div>
      <div className="flex items-center gap-1">
        <IoAlarmOutline size={20} />
        <MdOutlineVibration size={20} />
        <MdOutlineNetworkWifi size={20} />
        <MdOutlineNetworkCell size={20} />
        <FaBatteryThreeQuarters size={20} />
      </div>
    </div>
  );
};

export default Header;
