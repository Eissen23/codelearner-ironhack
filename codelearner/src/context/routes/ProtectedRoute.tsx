import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const ProtectedRoutes = () => {
	const { isAuthenticated, isLoading } = useAuth();

	if (isLoading) {
		return null; // or a loading spinner
	}

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;