import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface AppData {
  name: string;
  link: string;
  icon: string;
}

const Home: React.FC = () => {
  const gridSize = 24;
  const [apps, setApps] = useState<(AppData | null)[]>([]);
  const [draggedApp, setDraggedApp] = useState<AppData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadApps = async () => {
      try {
        const response = await fetch("/apps.json");
        const data: AppData[] = await response.json();

        const initialGrid = [
          ...data,
          ...Array(gridSize - data.length).fill(null),
        ];
        setApps(initialGrid);
      } catch (error) {
        console.error("Aplicação", error);
      }
    };

    loadApps();
  }, []);

  const handleOpenApp = (app: AppData) => {
    navigate(`/app/${app.name}`);
  };

  const handleDragStart = (app: AppData | null) => {
    setDraggedApp(app);
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedApp) {
      const draggedIndex = apps.findIndex((a) => a?.name === draggedApp.name);

      const newApps = [...apps];
      newApps[draggedIndex] = newApps[targetIndex];
      newApps[targetIndex] = draggedApp;

      setApps(newApps);
      setDraggedApp(null);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-2 h-full">
      {apps.map((app, index) => (
        <div
          key={index}
          className=" cursor-pointer h-full"
          draggable={!!app}
          onDragStart={() => handleDragStart(app)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(index)}
        >
          {app ? (
            <>
              <div className="flex justify-end items-center flex-col mt-24">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-16 h-16 mx-auto rounded-lg mb-2"
                  onClick={() => handleOpenApp(app)}
                />
                <p>{app.name}</p>
              </div>
            </>
          ) : (
            <div className="w-16 h-16 mx-auto rounded-lg mb-2 bg-transparent"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
