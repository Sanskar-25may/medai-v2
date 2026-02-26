import React, { useState } from 'react';
import { IoShieldCheckmarkOutline, IoHomeOutline, IoTimeOutline, IoFlaskOutline, IoSearchOutline, IoNutritionOutline } from 'react-icons/io5';
import { LAB_CATEGORIES, POPULAR_PACKAGES, INDIVIDUAL_TESTS } from '../data/labTests';

export default function LabTests() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredTests = INDIVIDUAL_TESTS.filter(test => {
        const matchesCategory = activeCategory === 'All' || test.category === activeCategory;
        const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-10 animate-fade-in">

            {/* Header */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Diagnostic Tests</h1>
                    <p className="text-gray-500">Book lab tests and health checkups from trusted NABL-certified labs.</p>
                </div>
                <div className="flex items-center space-x-2 bg-blue-50 text-primary px-4 py-2 rounded-xl border border-blue-100">
                    <IoShieldCheckmarkOutline size={20} />
                    <span className="font-bold">100% Safe & Hygienic</span>
                </div>
            </div>

            {/* Popular Packages */}
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 tracking-tight">Popular Health Packages</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {POPULAR_PACKAGES.map(pkg => {
                        const discount = Math.round((1 - pkg.price / pkg.mrp) * 100);
                        return (
                            <div key={pkg.id} className="bg-gradient-to-br from-white to-blue-50 rounded-3xl p-6 shadow-sm border border-blue-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col">
                                {/* Recommendation Badge */}
                                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-3 py-1 rounded-bl-xl">
                                    {pkg.recommendation}
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-2 pr-16">{pkg.name}</h3>
                                <p className="text-primary font-medium mb-3 flex items-center text-sm">
                                    <IoFlaskOutline className="mr-2 flex-shrink-0" /> {pkg.includes}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-5">
                                    <span className="flex items-center text-xs text-gray-600 bg-white px-3 py-1 rounded-lg shadow-sm">
                                        <IoTimeOutline className="mr-1 text-gray-400" /> {pkg.tat}
                                    </span>
                                    {pkg.homeCollection && (
                                        <span className="flex items-center text-xs text-green-700 bg-green-100 px-3 py-1 rounded-lg shadow-sm">
                                            <IoHomeOutline className="mr-1 text-green-500" /> Home Sample
                                        </span>
                                    )}
                                    {pkg.fasting && (
                                        <span className="flex items-center text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-lg shadow-sm">
                                            <IoNutritionOutline className="mr-1 text-amber-500" /> Fasting
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-between items-end mt-auto pt-4 border-t border-blue-200/50">
                                    <div>
                                        <span className="text-2xl font-bold text-gray-800">₹{pkg.price}</span>
                                        <span className="text-sm text-gray-400 line-through ml-2">₹{pkg.mrp}</span>
                                        <span className="text-xs font-bold text-green-500 ml-1">{discount}% off</span>
                                    </div>
                                    <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl transition-colors shadow-md text-sm">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Individual Tests */}
            <section>
                <div className="flex flex-col md:flex-row justify-between md:items-end mb-6 gap-4">
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight">Individual Tests</h2>
                    <div className="relative w-full md:w-72">
                        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text" placeholder="Search tests..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex overflow-x-auto pb-4 gap-3 mb-2">
                    <button onClick={() => setActiveCategory('All')}
                        className={`whitespace-nowrap px-5 py-2 rounded-full font-semibold transition-all text-sm ${activeCategory === 'All' ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >All Tests</button>
                    {LAB_CATEGORIES.map(cat => (
                        <button key={cat.id} onClick={() => setActiveCategory(cat.name)}
                            className={`whitespace-nowrap px-5 py-2 rounded-full font-semibold transition-all border text-sm ${activeCategory === cat.name ? `${cat.color} shadow-sm ring-2 ring-offset-1` : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                        >{cat.name}</button>
                    ))}
                </div>

                {/* Test Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTests.length > 0 ? (
                        filteredTests.map(test => (
                            <div key={test.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-gray-800 text-lg">{test.name}</h3>
                                    {test.description && (
                                        <p className="text-xs text-gray-400 mt-1 leading-relaxed">{test.description}</p>
                                    )}
                                    <div className="flex items-center text-xs text-gray-500 mt-3 gap-3">
                                        <span className="flex items-center"><IoTimeOutline className="mr-1" /> {test.tat}</span>
                                        {test.homeCollection ? (
                                            <span className="flex items-center text-green-600"><IoHomeOutline className="mr-1" /> Home Visit</span>
                                        ) : (
                                            <span className="flex items-center text-orange-600">Lab Visit Only</span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-50">
                                    <span className="text-xl font-bold text-gray-800">₹{test.price}</span>
                                    <button className="text-primary font-bold hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors border border-blue-100 text-sm">
                                        Add
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-12 text-center text-gray-400">
                            <p className="text-5xl mb-4">🔬</p>
                            <p className="text-lg font-semibold text-gray-600">No tests found</p>
                            <p className="text-sm mt-1">Try a different search or category.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
