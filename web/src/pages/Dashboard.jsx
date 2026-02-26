import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    IoWalkOutline, IoWaterOutline, IoBedOutline, IoBulbOutline,
    IoSparkles, IoVideocam, IoFlask, IoPeople,
    IoTrendingUpOutline, IoHeartOutline, IoChevronForwardOutline, IoWifiOutline,
} from 'react-icons/io5';

// ── Reusable stat pill for the health tracker ─────────────────
function TrackerStat({ icon, label }) {
    return (
        <div className="flex items-center space-x-4">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">{icon}</div>
            <span className="text-lg font-medium">{label}</span>
        </div>
    );
}

// ── Reusable service card ─────────────────────────────────────
function ServiceCard({ to, gradient, icon, label, onClick }) {
    const content = (
        <>
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md`}>
                {icon}
            </div>
            <span className="text-lg font-bold text-gray-800">{label}</span>
            <span className="text-xs text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Open →
            </span>
        </>
    );

    const className = "bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group cursor-pointer";

    return to ? (
        <Link to={to} className={className}>{content}</Link>
    ) : (
        <button onClick={onClick} className={className}>{content}</button>
    );
}

// ── Quick-stat mini card ──────────────────────────────────────
function QuickStat({ icon, label, value, trend, color }) {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4 hover:border-gray-200 transition-colors">
            <div className={`p-3 ${color} rounded-xl shadow-sm`}>{icon}</div>
            <div className="flex-1">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-xl font-bold text-gray-800">{value}</p>
            </div>
            {trend && (
                <span className="text-xs font-semibold text-green-500 bg-green-50 px-2 py-1 rounded-full flex items-center space-x-1">
                    <IoTrendingUpOutline size={12} />
                    <span>{trend}</span>
                </span>
            )}
        </div>
    );
}

// ── DASHBOARD ─────────────────────────────────────────────────
export default function Dashboard() {
    const [serverStatus, setServerStatus] = useState('Connecting...');
    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/health-check')
            .then(res => res.json())
            .then(data => { setServerStatus(data.message); setIsOnline(true); })
            .catch(() => { setServerStatus('Backend Offline - Start Uvicorn'); setIsOnline(false); });
    }, []);

    return (
        <div className="space-y-8 animate-fade-in">

            {/* Header Greeting */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Guest User</h1>
                    <p className="text-gray-500 mt-1">Here is your health summary for today.</p>
                </div>
                <div className="hidden lg:flex items-center space-x-3">
                    <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border shadow-sm text-sm font-bold ${isOnline ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
                        }`}>
                        <IoWifiOutline size={18} className={isOnline ? 'animate-pulse' : ''} />
                        <span>{serverStatus}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-4 py-2.5 rounded-xl shadow-sm border border-gray-100 text-sm text-gray-500">
                        <span>📅</span>
                        <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
            </div>

            {/* Quick Stats Row */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <QuickStat
                    icon={<IoHeartOutline size={22} className="text-rose-500" />}
                    color="bg-rose-50" label="Heart Rate" value="72 bpm" trend="+3%"
                />
                <QuickStat
                    icon={<IoWalkOutline size={22} className="text-blue-500" />}
                    color="bg-blue-50" label="Steps Today" value="4,500" trend="+12%"
                />
                <QuickStat
                    icon={<IoBedOutline size={22} className="text-indigo-500" />}
                    color="bg-indigo-50" label="Sleep Quality" value="7h 20m"
                />
            </section>

            {/* 1. HEALTH TRACKER (Hero Section) */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 tracking-tight">Daily Tracker</h2>
                <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between transition-transform duration-300 hover:shadow-2xl">

                    <div className="flex items-center space-x-10 mb-8 md:mb-0">
                        {/* Circular Progress Mockup */}
                        <div className="w-36 h-36 rounded-full border-8 border-white/30 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm shadow-inner">
                            <span className="text-4xl font-extrabold tracking-tight">1,240</span>
                            <span className="text-sm font-medium text-indigo-100 uppercase tracking-wider mt-1">Kcal</span>
                        </div>

                        {/* Stats */}
                        <div className="space-y-4">
                            <TrackerStat icon={<IoWalkOutline size={22} className="text-white" />} label="4,500 Steps" />
                            <TrackerStat icon={<IoWaterOutline size={22} className="text-white" />} label="1.2L Water" />
                            <TrackerStat icon={<IoBedOutline size={22} className="text-white" />} label="7h Sleep" />
                        </div>
                    </div>

                    <Link to="/diet-plan" className="bg-white text-[#764ba2] px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-gray-50 hover:scale-105 transition-all duration-200 w-full md:w-auto text-lg flex items-center justify-center space-x-2">
                        <span>View Diet Plan & Vitals</span>
                        <IoChevronForwardOutline size={18} />
                    </Link>
                </div>
            </section>

            {/* 2. DAILY HEALTH TIP */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 tracking-tight">Daily Insight</h2>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-5 hover:border-orange-200 transition-colors group">
                    <div className="p-4 bg-orange-50 text-orange-500 rounded-2xl shadow-sm group-hover:bg-orange-100 transition-colors">
                        <IoBulbOutline size={32} />
                    </div>
                    <div className="flex-1 mt-1">
                        <h3 className="text-lg font-bold text-gray-800">Hydration is Key</h3>
                        <p className="text-gray-600 mt-2 leading-relaxed">
                            Drinking water 30 mins before a meal helps digestion and calorie control.
                            Try keeping a bottle at your desk while you work!
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. CORE SERVICES (4 Icons Grid) */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 tracking-tight">Services</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ServiceCard gradient="from-[#FF9966] to-[#FF5E62]" icon={<IoSparkles size={36} />} label="AI Expert" to="/ai-expert" />
                    <ServiceCard gradient="from-[#56CCF2] to-[#2F80ED]" icon={<IoVideocam size={36} />} label="Doctor" to="/doctors" />
                    <ServiceCard gradient="from-[#11998e] to-[#38ef7d]" icon={<IoFlask size={36} />} label="Pharmacy" to="/pharmacy" />
                    <ServiceCard gradient="from-[#8E2DE2] to-[#4A00E0]" icon={<IoPeople size={36} />} label="Camps" to="/camps" />
                </div>
            </section>

        </div>
    );
}
