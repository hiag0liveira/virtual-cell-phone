import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface AppData {
  name: string;
  link: string;
}

const AppViewer: React.FC = () => {
  const { appName } = useParams<{ appName: string }>();
  const [app, setApp] = useState<AppData | null>(null);

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

  if (!app) {
    return <div>App não encontrado</div>;
  }

  return (
    <div className="w-full h-full flex flex-col">
      <iframe src={app.link} title={app.name} className="flex-grow" />
    </div>
  );
};

export default AppViewer;
