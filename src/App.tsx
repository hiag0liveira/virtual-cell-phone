import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.body.style.zoom = "67%";
  }, []);
  return (
    <div className="w-full h-full ">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
