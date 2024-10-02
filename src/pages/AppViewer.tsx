import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface AppData {
  name: string;
  link: string;
}

const AppViewer: React.FC = () => {
  const { appName } = useParams<{ appName: string }>();
  const [app, setApp] = useState<AppData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadApps = async () => {
      try {
        const response = await fetch("/apps.json");
        const data: AppData[] = await response.json();
        const foundApp = data.find((app) => app.name === appName);
        setApp(foundApp || null);
      } catch (error) {
        console.error("Erro ao carregar o app", error);
      }
    };

    loadApps();
  }, [appName]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate("/");
  };

  if (!app) {
    return <div>App não encontrado</div>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between p-4 bg-gray-800 text-white">
        <button onClick={handleBack}>Voltar</button>
        <button onClick={handleHome}>Home</button>
      </div>
      <iframe src={app.link} title={app.name} className="flex-grow" />
    </div>
  );
};

export default AppViewer;
