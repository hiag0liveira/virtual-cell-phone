import React, { useState, useEffect } from "react";

interface AppData {
  name: string;
  link: string;
  icon: string;
}

const Home: React.FC = () => {
  const [apps, setApps] = useState<AppData[]>([]);
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);
  const [isHome, setIsHome] = useState<boolean>(true); // Adicionado estado para controlar a tela inicial

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
    setSelectedApp(app);
    setIsHome(false); // Altera para não estar na tela inicial
  };

  const handleBackToHome = () => {
    setSelectedApp(null);
    setIsHome(true); // Retorna à tela inicial
  };

  if (!isHome && selectedApp) {
    return (
      <div className="w-full h-full flex flex-col">
        <iframe
          src={selectedApp.link}
          title={selectedApp.name}
          className="flex-grow"
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {apps.map((app) => (
        <div
          key={app.name}
          className="text-center cursor-pointer"
          onClick={() => handleOpenApp(app)}
        >
          <img
            src={app.icon}
            alt={app.name}
            className="w-16 h-16 mx-auto mb-2"
          />
          <p>{app.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
