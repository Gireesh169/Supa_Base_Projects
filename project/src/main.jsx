import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { router } from "./router.jsx";
import { RouterProvider } from "react-router-dom";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <h1 className="text-center text-3xl pt-4">Supabase Auth & Context</h1>
      
        <RouterProvider router={router} />

    </>
  </StrictMode>
);