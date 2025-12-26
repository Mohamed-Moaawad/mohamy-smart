import './Sidebar.css';
import { useEffect, useState } from 'react';

import { IoGrid, IoNotifications } from "react-icons/io5";
import { GoLaw } from "react-icons/go";
import { FaBookOpen, FaChevronDown, FaChevronUp, FaUsers } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";
import { BsChatTextFill } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { IoSettings } from "react-icons/io5";
import { LuLogOut } from "react-icons/lu";

import { motion } from "framer-motion";
import { useAppDispatch } from '../../hooks/reduxHooks';
import { logOut } from '../../redux/auth/authSlice';


const Sidebar = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 1000);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const logOutUser = async () => {
        dispatch(logOut());
    }


    return (
        <motion.aside
            initial={{ y: isMobile ? "-0%" : 0 }}
            animate={{ y: isMobile ? (open ? 0 : "-100%") : 0 }}
            transition={{ type: "tween", duration: 0, ease: "easeIn" }}
        >
            <div className="logo">
                <img src="/images/logo.png" alt="logo" />
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/'>
                            <span>
                                <IoGrid />
                            </span>
                            الصفحة الرئيسة
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/cases'>
                            <span>
                                <GoLaw />
                            </span>
                            القضايا
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/clients'>
                            <span>
                                <FaUsers />
                            </span>
                            الموكلين
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/documents'>
                            <span>
                                <IoDocumentText />
                            </span>
                            المستندات
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/legal-contracts'>
                            <span>
                                <FaBookOpen />
                            </span>
                            العقود القانونية
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/calendar'>
                            <span>
                                <FaCalendarDays />
                            </span>
                            التقويم
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/chat'>
                            <span>
                                <BsChatTextFill />
                            </span>
                            المحادثه الذكيه
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/aaaaaaaa'>
                            <span>
                                <IoNotifications />
                            </span>
                            الاشعارات
                        </NavLink>
                    </li>
                </ul>
                <ul className='settings'>
                    <li>
                        <NavLink to='/settings'>
                            <span>
                                <IoSettings />
                            </span>
                            الاعدادات
                        </NavLink>
                    </li>
                </ul>
            </nav>


            <div className="actions">
                <NavLink to='/auth/login' onClick={logOutUser}>
                    <span>
                        <LuLogOut />
                    </span>
                    تسجيل الخروج
                </NavLink>
            </div>

            <motion.div className="drag-box"
                drag='y'
                dragConstraints={{ top: 0, bottom: 0 }}
                // dragConstraints={{ top: 0, bottom: window.innerHeight - 100 }}
                dragElastic={0.05}
                onDragEnd={(_, info) => {
                    if (info.offset.y > 50) {
                        setOpen(true);
                    } else if (info.offset.y < -50) {
                        setOpen(false);
                    }
                }}
            >
                {open ? (
                    <FaChevronUp />
                ) : (
                    <FaChevronDown />
                )}
            </motion.div>
        </motion.aside>
    );
};

export default Sidebar;