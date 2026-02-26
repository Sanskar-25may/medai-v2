import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    IoHomeOutline, IoHome,
    IoVideocamOutline, IoVideocam,
    IoFlaskOutline, IoFlask,
    IoFitnessOutline, IoFitness,
    IoSparklesOutline, IoSparkles,
    IoPeopleOutline, IoPeople,
    IoPersonOutline,
    IoLogOutOutline,
    IoNotificationsOutline,
    IoMenuOutline,
    IoCloseOutline,
} from 'react-icons/io5';

const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <IoHomeOutline size={22} />, activeIcon: <IoHome size={22} /> },
    { name: 'Doctors', path: '/dashboard/doctors', icon: <IoVideocamOutline size={22} />, activeIcon: <IoVideocam size={22} /> },
    { name: 'Pharmacy', path: '/dashboard/pharmacy', icon: <IoFlaskOutline size={22} />, activeIcon: <IoFlask size={22} /> },
    { name: 'Lab Tests', path: '/dashboard/lab-tests', icon: <IoFitnessOutline size={22} />, activeIcon: <IoFitness size={22} /> },
    { name: 'AI Expert', path: '/dashboard/ai-expert', icon: <IoSparklesOutline size={22} />, activeIcon: <IoSparkles size={22} /> },
    { name: 'Camps', path: '/dashboard/camps', icon: <IoPeopleOutline size={22} />, activeIcon: <IoPeople size={22} /> },
];

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const currentPage = menuItems.find(item => item.path === location.pathname)?.name || 'MedAI';

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">

            {/* ── SIDEBAR ──────────────────────────────────────── */}
            <aside
                className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg flex flex-col justify-between transition-all duration-300 ease-in-out flex-shrink-0`}
            >
                <div>
                    {/* Logo */}
                    <div className={`h-20 flex items-center border-b border-gray-100 ${sidebarOpen ? 'px-6' : 'justify-center px-2'}`}>
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md flex-shrink-0">
                            +
                        </div>
                        {sidebarOpen && (
                            <h1 className="text-2xl font-bold text-gray-800 ml-3 whitespace-nowrap">
                                MedAI<span className="text-primary text-sm align-top">OS</span>
                            </h1>
                        )}
                    </div>

                    {/* Nav Links */}
                    <nav className={`mt-6 space-y-1 ${sidebarOpen ? 'px-4' : 'px-2'}`}>
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    title={!sidebarOpen ? item.name : undefined}
                                    className={`flex items-center py-3 rounded-xl transition-all duration-200 group
                    ${sidebarOpen ? 'px-4' : 'justify-center px-2'}
                    ${isActive
                                            ? 'bg-primary text-white shadow-md'
                                            : 'text-gray-500 hover:bg-blue-50 hover:text-primary'
                                        }`}
                                >
                                    <span className="flex-shrink-0">
                                        {isActive ? item.activeIcon : item.icon}
                                    </span>
                                    {sidebarOpen && (
                                        <span className="ml-4 font-semibold text-sm whitespace-nowrap">
                                            {item.name}
                                        </span>
                                    )}
                                    {/* Active pill indicator */}
                                    {isActive && sidebarOpen && (
                                        <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full opacity-80" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Logout */}
                <div className={`p-4 border-t border-gray-100 ${!sidebarOpen && 'flex justify-center'}`}>
                    <button
                        onClick={() => navigate('/login')}
                        title={!sidebarOpen ? 'Log Out' : undefined}
                        className={`flex items-center text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors font-semibold
              ${sidebarOpen ? 'w-full px-4 py-3' : 'p-3'}`}
                    >
                        <IoLogOutOutline size={22} className="flex-shrink-0" />
                        {sidebarOpen && <span className="ml-4 text-sm">Log Out</span>}
                    </button>
                </div>
            </aside>

            {/* ── MAIN AREA ─────────────────────────────────────── */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Top Navbar */}
                <header className="h-20 bg-white shadow-sm flex items-center justify-between px-8 z-10 flex-shrink-0">
                    {/* Left: hamburger + page title */}
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(prev => !prev)}
                            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                            aria-label="Toggle sidebar"
                        >
                            {sidebarOpen ? <IoCloseOutline size={22} /> : <IoMenuOutline size={22} />}
                        </button>
                        <h2 className="text-xl font-bold text-gray-800 tracking-wide">
                            {currentPage}
                        </h2>
                    </div>

                    {/* Right: notifications + profile */}
                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                            <IoNotificationsOutline size={22} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>

                        <div className="flex items-center space-x-3 border-l border-gray-100 pl-4">
                            <div className="text-right hidden md:block">
                                <p className="text-sm font-bold text-gray-800 leading-tight">Guest User</p>
                                <p className="text-xs text-gray-400">ID: MED-99281</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-primary ring-2 ring-blue-100">
                                <IoPersonOutline size={20} />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F8F9FA] p-8 animate-fade-in">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
