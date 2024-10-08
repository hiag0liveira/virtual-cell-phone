import { createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import Home from "../pages/Home";
import AppViewer from "../pages/AppViewer";
import RecentModels from "../pages/RecentModels";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "app/:appName",
        element: <AppViewer />,
      },
      {
        path: "recent-models",
        element: <RecentModels />,
      },
    ],
  },
]);
