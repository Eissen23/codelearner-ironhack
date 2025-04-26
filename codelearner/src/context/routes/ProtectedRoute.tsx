
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoutes = () => {
	// TODO: Use authentication token
	const { isAuthenticated } = useAuth(); 

	return isAuthenticated ? <Outlet /> : <Navigate to="/login"  replace />;
};

export default ProtectedRoutes;