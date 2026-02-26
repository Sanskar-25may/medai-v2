import React, { useState } from 'react';
import { IoLocationOutline, IoCalendarOutline, IoTimeOutline, IoPeopleOutline, IoCheckmarkCircle } from 'react-icons/io5';

const camps = [
    { id: 1, name: 'Free Eye Checkup Camp', date: 'Mar 5, 2026', time: '9 AM – 3 PM', location: 'Community Hall, Sector 14', organizer: 'Vision Care Foundation', spots: 120, spotsLeft: 34, tags: ['Free', 'Eye Checkup'], gradient: 'from-[#56CCF2] to-[#2F80ED]' },
    { id: 2, name: 'Blood Donation Drive', date: 'Mar 10, 2026', time: '10 AM – 5 PM', location: 'City Hospital Auditorium', organizer: 'Red Cross Society', spots: 200, spotsLeft: 87, tags: ['Blood Donation', 'Free'], gradient: 'from-[#FF6B6B] to-[#EE5A24]' },
    { id: 3, name: 'Diabetes Awareness Workshop', date: 'Mar 14, 2026', time: '11 AM – 2 PM', location: 'MedAI Health Center', organizer: 'MedAI Foundation', spots: 60, spotsLeft: 12, tags: ['Workshop', 'Free Screening'], gradient: 'from-[#11998e] to-[#38ef7d]' },
    { id: 4, name: 'Yoga & Mental Wellness Camp', date: 'Mar 18, 2026', time: '6 AM – 9 AM', location: 'Lotus Park, Sector 22', organizer: 'Mindful Living NGO', spots: 80, spotsLeft: 45, tags: ['Yoga', 'Mental Health'], gradient: 'from-[#A18CD1] to-[#FBC2EB]' },
    { id: 5, name: 'Pediatric Health Camp', date: 'Mar 22, 2026', time: '10 AM – 4 PM', location: "Children's Hospital Wing", organizer: 'KidCare Trust', spots: 100, spotsLeft: 0, tags: ['Pediatric', 'Free Vaccination'], gradient: 'from-[#F093FB] to-[#F5576C]' },
    { id: 6, name: "Women's Health Screening", date: 'Mar 28, 2026', time: '9 AM – 1 PM', location: "Shakti Women's Center", organizer: 'HealthHer Initiative', spots: 75, spotsLeft: 28, tags: ["Women's Health", 'Free'], gradient: 'from-[#FA709A] to-[#FEE140]' },
];

export default function Camps() {
    const [registered, setRegistered] = useState({});
    const handleRegister = (id) => setRegistered(prev => ({ ...prev, [id]: true }));

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Health Camps</h1>
                <p className="text-gray-500 mt-1">Discover and register for upcoming health camps near you.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 rounded-xl text-primary"><IoCalendarOutline size={24} /></div>
                    <div><p className="text-sm text-gray-500">Upcoming</p><p className="text-2xl font-bold text-gray-800">{camps.length}</p></div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center space-x-4">
                    <div className="p-3 bg-green-50 rounded-xl text-green-500"><IoPeopleOutline size={24} /></div>
                    <div><p className="text-sm text-gray-500">Total Spots</p><p className="text-2xl font-bold text-gray-800">{camps.reduce((s, c) => s + c.spots, 0)}</p></div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center space-x-4">
                    <div className="p-3 bg-purple-50 rounded-xl text-purple-500"><IoCheckmarkCircle size={24} /></div>
                    <div><p className="text-sm text-gray-500">Registered</p><p className="text-2xl font-bold text-gray-800">{Object.keys(registered).length}</p></div>
                </div>
            </div>

            {/* Camp Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {camps.map(camp => {
                    const isFull = camp.spotsLeft === 0;
                    const isReg = registered[camp.id];
                    const pct = ((camp.spots - camp.spotsLeft) / camp.spots) * 100;
                    return (
                        <div key={camp.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                            <div className={`h-3 bg-gradient-to-r ${camp.gradient}`} />
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-bold text-gray-800">{camp.name}</h3>
                                    {isFull && <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-500">Full</span>}
                                </div>
                                <p className="text-sm text-gray-500 mb-4">by <span className="font-semibold text-gray-700">{camp.organizer}</span></p>
                                <div className="space-y-2 mb-4 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2"><IoCalendarOutline size={16} className="text-gray-400" /><span>{camp.date}</span></div>
                                    <div className="flex items-center space-x-2"><IoTimeOutline size={16} className="text-gray-400" /><span>{camp.time}</span></div>
                                    <div className="flex items-center space-x-2"><IoLocationOutline size={16} className="text-gray-400" /><span>{camp.location}</span></div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    {camp.tags.map(t => <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-50 text-gray-500">{t}</span>)}
                                </div>
                                <div className="mb-4">
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>{camp.spots - camp.spotsLeft} registered</span>
                                        <span>{camp.spotsLeft} left</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className={`h-full rounded-full bg-gradient-to-r ${camp.gradient}`} style={{ width: `${pct}%` }} />
                                    </div>
                                </div>
                                <button disabled={isFull || isReg} onClick={() => handleRegister(camp.id)}
                                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${isReg ? 'bg-green-50 text-green-600' : isFull ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-blue-600 shadow-sm hover:shadow-md'}`}>
                                    {isReg ? '✓ Registered' : isFull ? 'Fully Booked' : 'Register Now'}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
