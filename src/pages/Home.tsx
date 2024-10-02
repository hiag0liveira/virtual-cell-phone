import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AppData {
  name: string;
  link: string;
  icon: string;
}

const Home: React.FC = () => {
  const [apps, setApps] = useState<AppData[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const loadApps = async () => {
      try {
        const response = await fetch("/apps.json");
        const data: AppData[] = await response.json();
        setApps(data);
      } catch (error) {
        console.error("Aplicação", error);
      }
    };

    loadApps();
  }, []);

  const handleOpenApp = (app: AppData) => {
    navigate(`/app/${app.name}`);
  };

  return (
    <div className="grid grid-cols-4 gap-2 h-64 items-end mt-28">
      {apps.map((app) => (
        <div
          key={app.name}
          className="text-center cursor-pointer"
          onClick={() => handleOpenApp(app)}
        >
          <img
            src={app.icon}
            alt={app.name}
            className="w-16 h-16 mx-auto rounded-lg mb-2"
          />
          <p>{app.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
