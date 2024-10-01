import React, { useEffect, useState } from "react";
import domtoimage from "dom-to-image";
import PhoneFrame from "./PhoneFrame";

interface PhoneSize {
  width: string;
  height: string;
}

function App() {
  useEffect(() => {
    document.body.style.zoom = "67%";
  }, []);

  const [deviceType, setDeviceType] = useState("iPhone");
  const [phoneType, setPhoneType] = useState("iPhone 12");
  const [orientation, setOrientation] = useState("portrait");

  const allPhoneSizes: { [key: string]: { [key: string]: PhoneSize } } = {
    iPhone: {
      "iPhone 12": { width: "390px", height: "844px" },
      "iPhone SE": { width: "375px", height: "667px" },
      "iPhone 13 Pro Max": { width: "430px", height: "932px" },
    },
    Android: {
      "Galaxy S21": { width: "412px", height: "915px" },
      "Pixel 5": { width: "393px", height: "851px" },
      "OnePlus 9": { width: "412px", height: "915px" },
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

  const handleScreenshot = () => {
    const phoneFrameElement = document.getElementById("phone-frame");
    if (phoneFrameElement) {
      domtoimage
        .toPng(phoneFrameElement)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = "phone-screenshot.png";
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Error taking screenshot", error);
        });
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
    <div className="w-full h-full flex justify-center mt-6">
      <div className="mr-8">
        <label htmlFor="device-select" className="block mb-2">
          Escolha o tipo de dispositivo:
        </label>
        <select
          id="device-select"
          value={deviceType}
          onChange={handleDeviceTypeChange}
          className="border p-2 rounded mb-4"
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
          className="border p-2 rounded mb-4"
        >
          {Object.keys(phoneSizes).map((phone) => (
            <option key={phone} value={phone}>
              {phone}
            </option>
          ))}
        </select>

        <button
          onClick={handleOrientationChange}
          className="bg-blue-500 text-white p-2 rounded mb-4 w-full"
        >
          Alternar Orientação (
          {orientation === "portrait" ? "Retrato" : "Paisagem"})
        </button>

        <button
          onClick={handleScreenshot}
          className="bg-green-500 text-white p-2 rounded w-full"
        >
          Tirar Screenshot
        </button>
      </div>
      <div id="phone-frame">
        <PhoneFrame phoneSize={adjustedSize} />
      </div>
    </div>
  );
}

export default App;
