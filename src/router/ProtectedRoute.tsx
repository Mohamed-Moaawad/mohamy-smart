import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../hooks/reduxHooks";

const ProtectedRoute = () => {
    const { user, token } = useAppSelector((state) => state.auth);
    const savedData = localStorage.getItem('user');
    const accessToken = localStorage.getItem('accessToken');

    const isAuthenticated = (user && token) || (savedData && accessToken);

    if (!isAuthenticated) return <Navigate to='/auth/login' replace />;

    return <Outlet />;
}

export default ProtectedRoute;