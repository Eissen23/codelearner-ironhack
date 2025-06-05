import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
