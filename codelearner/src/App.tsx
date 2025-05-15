import "./App.css";
import { AuthProvider } from "./context/auth/AuthContext";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router";
import routes_map from "./config/sitemap-config";

function App() {
  // const [count, setCount] = useState(0);
  const router = createBrowserRouter(routes_map as RouteObject[]);

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
