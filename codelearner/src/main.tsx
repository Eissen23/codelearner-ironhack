import { createBrowserRouter, RouterProvider } from "react-router";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import routes_map from "./config/sitemap-config";

const router = createBrowserRouter(routes_map);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
