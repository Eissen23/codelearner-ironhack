import "./App.css";
import { AuthProvider } from "./context/auth/AuthContext";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router";
import routes_map from "./config/sitemap-config";
import { Suspense } from "react";

function App() {
  // const [count, setCount] = useState(0);
  const router = createBrowserRouter(routes_map as RouteObject[]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Suspense>
  );
}

export default App;
