import React, { useEffect, useState } from "react";
import PhoneFrame from "./PhoneFrame"; // Importa o componente PhoneFrame

interface PhoneSize {
  width: string;
  height: string;
}

function App() {
  useEffect(() => {
    document.body.style.zoom = "67%";
  }, []);
  const [phoneType, setPhoneType] = useState("iPhone 12");

  const phoneSizes: { [key: string]: PhoneSize } = {
    "iPhone 12": { width: "390px", height: "844px" },
    "iPhone SE": { width: "375px", height: "667px" },
    "Galaxy S21": { width: "412px", height: "915px" },
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoneType(e.target.value);
  };

  return (
    <div className="w-full h-full flex justify-center mt-16">
      <div className="mr-8">
        <label htmlFor="phone-select" className="block mb-2">
          Escolha o tipo de celular:
        </label>
        <select
          id="phone-select"
          value={phoneType}
          onChange={handlePhoneChange}
          className="border p-2 rounded"
        >
          <option value="iPhone 12">iPhone 12</option>
          <option value="iPhone SE">iPhone SE</option>
          <option value="Galaxy S21">Galaxy S21</option>
        </select>
      </div>
      <PhoneFrame phoneSize={phoneSizes[phoneType]} />
    </div>
  );
}

export default App;
