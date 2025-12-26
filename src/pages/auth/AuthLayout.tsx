import { Toaster } from 'react-hot-toast';
import './Auth.css';
import { Outlet } from "react-router-dom"

const AuthLayout = () => {
    return (
        <div className="auth-layout">
            <div className="sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 2xl:w/2-12 p-4">
                <Outlet />
                <Toaster />
            </div>
        </div>
    );
};

export default AuthLayout;