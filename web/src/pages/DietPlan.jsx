import React from 'react';
import { IoHeartOutline, IoWaterOutline, IoFitnessOutline, IoPulseOutline, IoNutritionOutline, IoLeafOutline } from 'react-icons/io5';

const vitals = [
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'Normal', color: 'bg-green-50 text-green-600', icon: <IoHeartOutline size={22} /> },
    { label: 'Blood Sugar', value: '95', unit: 'mg/dL', status: 'Normal', color: 'bg-blue-50 text-blue-600', icon: <IoPulseOutline size={22} /> },
    { label: 'BMI', value: '22.4', unit: 'kg/m²', status: 'Healthy', color: 'bg-teal-50 text-teal-600', icon: <IoFitnessOutline size={22} /> },
    { label: 'SpO2', value: '98', unit: '%', status: 'Normal', color: 'bg-indigo-50 text-indigo-600', icon: <IoWaterOutline size={22} /> },
];

const meals = [
    { time: 'Breakfast', items: 'Oatmeal with berries, boiled eggs, green tea', kcal: 350, emoji: '🥣', color: 'border-l-amber-400' },
    { time: 'Lunch', items: 'Grilled chicken, brown rice, mixed veggies, curd', kcal: 520, emoji: '🍛', color: 'border-l-green-400' },
    { time: 'Snack', items: 'Mixed nuts, apple slices, protein shake', kcal: 200, emoji: '🥜', color: 'border-l-orange-400' },
    { time: 'Dinner', items: 'Dal tadka, multigrain roti, salad, buttermilk', kcal: 420, emoji: '🥗', color: 'border-l-purple-400' },
];

const weeklyData = [
    { day: 'Mon', kcal: 1480 }, { day: 'Tue', kcal: 1520 }, { day: 'Wed', kcal: 1310 },
    { day: 'Thu', kcal: 1600 }, { day: 'Fri', kcal: 1240 }, { day: 'Sat', kcal: 1700 }, { day: 'Sun', kcal: 1400 },
];
const maxKcal = Math.max(...weeklyData.map(d => d.kcal));

const tips = [
    { icon: <IoNutritionOutline size={20} />, text: 'Eat 5 servings of fruits and vegetables daily for optimal micronutrient intake.' },
    { icon: <IoLeafOutline size={20} />, text: 'Replace refined carbs with whole grains to maintain steady blood sugar levels.' },
    { icon: <IoWaterOutline size={20} />, text: 'Drink a glass of warm water with lemon first thing in the morning.' },
];

export default function DietPlan() {
    const totalKcal = meals.reduce((s, m) => s + m.kcal, 0);
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Diet Plan & Vitals</h1>
                <p className="text-gray-500 mt-1">Your personalized nutrition plan and health vitals.</p>
            </div>

            {/* Vitals */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Your Vitals</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {vitals.map(v => (
                        <div key={v.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                            <div className={`w-11 h-11 rounded-xl ${v.color} flex items-center justify-center mb-3`}>{v.icon}</div>
                            <p className="text-sm text-gray-500">{v.label}</p>
                            <p className="text-2xl font-extrabold text-gray-800 mt-1">{v.value} <span className="text-sm font-normal text-gray-400">{v.unit}</span></p>
                            <span className={`inline-block mt-2 text-xs font-bold px-2.5 py-1 rounded-full ${v.color}`}>{v.status}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Today's Meal Plan */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Today's Meal Plan</h2>
                    <span className="text-sm font-bold text-primary bg-blue-50 px-4 py-1.5 rounded-full">{totalKcal} kcal total</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {meals.map(m => (
                        <div key={m.time} className={`bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 ${m.color} p-5 flex items-start space-x-4 hover:shadow-md transition-shadow`}>
                            <span className="text-3xl">{m.emoji}</span>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-gray-800">{m.time}</h3>
                                    <span className="text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-full">{m.kcal} kcal</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{m.items}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Weekly Calories Chart */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Calories</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-end justify-between h-48 space-x-3">
                        {weeklyData.map(d => (
                            <div key={d.day} className="flex-1 flex flex-col items-center">
                                <span className="text-xs font-bold text-gray-600 mb-1">{d.kcal}</span>
                                <div className="w-full rounded-t-lg bg-gradient-to-t from-[#667eea] to-[#764ba2] transition-all duration-500 hover:opacity-80"
                                    style={{ height: `${(d.kcal / maxKcal) * 100}%` }} />
                                <span className="text-xs text-gray-500 mt-2 font-medium">{d.day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Nutrition Tips */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Nutrition Tips</h2>
                <div className="space-y-3">
                    {tips.map((tip, i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center space-x-4 hover:border-green-200 transition-colors">
                            <div className="p-2.5 bg-green-50 text-green-500 rounded-xl">{tip.icon}</div>
                            <p className="text-sm text-gray-600">{tip.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
