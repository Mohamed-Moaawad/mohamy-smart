import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/sidebar/Sidebar"
import Header from "../components/header/Header";
import { Toaster } from "react-hot-toast";


const Layout = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>(() => {
        return localStorage.getItem('theme') as 'dark' | 'light' || 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <main className={`flex ${theme}`} >
            <div className="sidebar-box">
                <Sidebar />
            </div>
            <div className="outlet-box">
                <Header theme={theme} setTheme={setTheme} />
                <Outlet />
                <Toaster />
            </div>
        </main>
    )
}

export default Layout