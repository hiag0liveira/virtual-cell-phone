import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import bg1 from "../assets/bg.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";
import bg4 from "../assets/bg4.jpg";
import bg5 from "../assets/bg5.jpg";
import bg6 from "../assets/bg6.jpg";

interface PhoneSize {
  width: string;
  height: string;
}

const Layout: React.FC = () => {
  const [deviceType, setDeviceType] = useState("iPhone");
  const [phoneType, setPhoneType] = useState("iPhone 12");
  const [orientation, setOrientation] = useState("portrait");
  const [backgroundImage, setBackgroundImage] = useState("");

  const allPhoneSizes: { [key: string]: { [key: string]: PhoneSize } } = {
    iPhone: {
      "iPhone 12": { width: "390px", height: "844px" },
      "iPhone SE": { width: "375px", height: "667px" },
      "iPhone 13 Pro Max": { width: "430px", height: "932px" },
      "iPhone X": { width: "375px", height: "812px" },
      "iPhone 8 Plus": { width: "414px", height: "736px" },
      "iPhone 14 Pro": { width: "430px", height: "932px" },
      "iPhone 14": { width: "393px", height: "852px" },
    },
    Android: {
      "Galaxy S21": { width: "412px", height: "915px" },
      "Pixel 5": { width: "393px", height: "851px" },
      "OnePlus 9": { width: "412px", height: "915px" },
      "Galaxy Note 20": { width: "412px", height: "915px" },
      "Xiaomi Mi 11": { width: "409px", height: "917px" },
      "Galaxy S22": { width: "450px", height: "916px" },
      "Pixel 6": { width: "411px", height: "897px" },
    },
  };

  const phoneSizes = allPhoneSizes[deviceType];

  const handleDeviceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeviceType(e.target.value);
    setPhoneType(Object.keys(allPhoneSizes[e.target.value])[0]);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoneType(e.target.value);
  };

  const handleOrientationChange = () => {
    setOrientation((prevOrientation) =>
      prevOrientation === "portrait" ? "landscape" : "portrait"
    );
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "bg1":
        setBackgroundImage(bg1);
        break;
      case "bg2":
        setBackgroundImage(bg2);
        break;
      case "bg3":
        setBackgroundImage(bg3);
        break;
      case "bg4":
        setBackgroundImage(bg4);
        break;
      case "bg5":
        setBackgroundImage(bg5);
        break;
      case "bg6":
        setBackgroundImage(bg6);
        break;
      case "none":
        setBackgroundImage("");
        break;
      default:
        setBackgroundImage(bg1);
    }
  };

  const adjustedSize =
    orientation === "portrait"
      ? phoneSizes[phoneType]
      : {
          width: phoneSizes[phoneType].height,
          height: phoneSizes[phoneType].width,
        };

  return (
    <div className="min-h-screen bg-slate-900 pb-20 font-roboto text-white flex flex-col justify-between">
      <div className="w-full h-full flex justify-center mt-6">
        <div className="mr-8 ">
          <label htmlFor="device-select" className="block mb-2">
            Escolha o tipo de dispositivo:
          </label>
          <select
            id="device-select"
            value={deviceType}
            onChange={handleDeviceTypeChange}
            className="border p-2 w-full text-black rounded mb-4"
          >
            <option value="iPhone">iPhone</option>
            <option value="Android">Android</option>
          </select>

          <label htmlFor="phone-select" className="block mb-2">
            Escolha o modelo de celular:
          </label>
          <select
            id="phone-select"
            value={phoneType}
            onChange={handlePhoneChange}
            className="border p-2 w-full text-black rounded mb-4"
          >
            {Object.keys(phoneSizes).map((phone) => (
              <option key={phone} value={phone}>
                {phone}
              </option>
            ))}
          </select>

          <label htmlFor="background-select" className="block mb-2">
            Escolha o Papel de Parede:
          </label>
          <select
            id="background-select"
            onChange={handleBackgroundChange}
            className="border p-2 w-full text-black rounded mb-4"
          >
            <option value="none">Nenhum Papel de Parede</option>{" "}
            <option value="bg1">Papel de Parede 1</option>
            <option value="bg2">Papel de Parede 2</option>
            <option value="bg3">Papel de Parede 3</option>
            <option value="bg4">Papel de Parede 4</option>
            <option value="bg5">Papel de Parede 5</option>
            <option value="bg6">Papel de Parede 6</option>
          </select>

          <button
            onClick={handleOrientationChange}
            className="bg-blue-500 text-white p-2 rounded mb-4 w-full"
          >
            Alternar Orientação (
            {orientation === "portrait" ? "Retrato" : "Paisagem"})
          </button>
        </div>
        <div
          className="flex flex-col border-8 border-gray-400 rounded-3xl bg-cover bg-center bg-no-repeat shadow-lg"
          style={{
            width: adjustedSize.width,
            height: adjustedSize.height,
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : "none",
          }}
        >
          <Header />
          <div className="flex-grow overflow-auto">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
