import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { router } from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="w-full min-h-screen bg-white">
      <h1 className="text-center text-3xl pt-4 text-black">Supabase Auth & Context</h1>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </div>
  </StrictMode>
);
