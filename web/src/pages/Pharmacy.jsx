import React, { useState } from 'react';
import { IoCartOutline, IoDocumentTextOutline, IoSearchOutline, IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import { CATEGORIES, MEDICINES } from '../data/pharmacy';

export default function Pharmacy() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [cart, setCart] = useState({});

    const filteredMeds = MEDICINES.filter(med => {
        const matchesCategory = activeCategory === 'All' || med.category === activeCategory;
        const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            med.brand.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const addToCart = (id) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    const removeFromCart = (id) => setCart(prev => {
        const next = { ...prev };
        if (next[id] > 1) next[id]--;
        else delete next[id];
        return next;
    });

    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalPrice = Object.entries(cart).reduce((sum, [id, qty]) => {
        const med = MEDICINES.find(m => m.id === id);
        return sum + (med ? med.price * qty : 0);
    }, 0);

    return (
        <div className="space-y-8 animate-fade-in">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">MedAI Pharmacy</h1>
                    <p className="text-gray-500">Get authentic medicines delivered directly to your door.</p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                    {/* Live Cart Badge */}
                    {totalItems > 0 && (
                        <div className="flex items-center space-x-2 bg-primary text-white px-5 py-3 rounded-2xl shadow-md animate-fade-in">
                            <IoCartOutline size={20} />
                            <span className="font-bold">{totalItems} items</span>
                            <span className="opacity-70">•</span>
                            <span className="font-bold">₹{totalPrice.toLocaleString()}</span>
                        </div>
                    )}

                    {/* Upload Prescription */}
                    <button className="flex items-center justify-center space-x-2 bg-secondary text-white px-6 py-3 rounded-2xl font-bold hover:bg-purple-700 hover:shadow-lg transition-all">
                        <IoDocumentTextOutline size={20} />
                        <span>Upload Rx</span>
                    </button>
                </div>
            </div>

            {/* Search & Categories */}
            <div className="space-y-5">
                <div className="relative max-w-2xl">
                    <IoSearchOutline size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent shadow-sm"
                        placeholder="Search for medicines or brands..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex overflow-x-auto pb-2 gap-3">
                    <button
                        onClick={() => setActiveCategory('All')}
                        className={`whitespace-nowrap px-6 py-2 rounded-full font-semibold transition-all ${activeCategory === 'All' ? 'bg-secondary text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                            }`}
                    >All Items</button>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.name)}
                            className={`whitespace-nowrap px-6 py-2 rounded-full font-semibold transition-all border ${activeCategory === cat.name
                                    ? `${cat.color} shadow-sm ring-2 ring-offset-1 ring-opacity-50`
                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                        >{cat.name}</button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMeds.length > 0 ? (
                    filteredMeds.map(med => {
                        const discount = Math.round(((med.mrp - med.price) / med.mrp) * 100);
                        const qty = cart[med.id] || 0;

                        return (
                            <div key={med.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full group">

                                {/* Top Tags */}
                                <div className="flex justify-between items-start mb-4 h-8">
                                    {discount > 0 ? (
                                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">
                                            {discount}% OFF
                                        </span>
                                    ) : <div />}
                                    {med.rxRequired && (
                                        <span className="flex items-center text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg">
                                            <IoDocumentTextOutline className="mr-1" /> Rx
                                        </span>
                                    )}
                                </div>

                                {/* Product Icon & Info */}
                                <div className="text-center mb-5 flex-grow">
                                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                        {med.emoji}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{med.name}</h3>
                                    <p className="text-gray-500 text-sm mt-1">by {med.brand}</p>
                                    {!med.inStock && (
                                        <span className="inline-block mt-2 text-xs font-bold text-red-400 bg-red-50 px-2 py-0.5 rounded-full">Out of Stock</span>
                                    )}
                                </div>

                                {/* Pricing & Cart */}
                                <div className="mt-auto pt-4 border-t border-gray-50">
                                    <div className="flex items-end justify-between mb-4">
                                        <div>
                                            <span className="text-2xl font-bold text-gray-800">₹{med.price}</span>
                                            {med.price < med.mrp && (
                                                <span className="text-sm text-gray-400 line-through ml-2">₹{med.mrp}</span>
                                            )}
                                        </div>
                                    </div>

                                    {!med.inStock ? (
                                        <button disabled className="w-full py-3 bg-gray-100 text-gray-400 font-bold rounded-xl cursor-not-allowed">
                                            Unavailable
                                        </button>
                                    ) : qty > 0 ? (
                                        <div className="flex items-center justify-center space-x-4 py-2">
                                            <button onClick={() => removeFromCart(med.id)} className="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 transition-colors">
                                                <IoRemoveOutline size={18} />
                                            </button>
                                            <span className="text-lg font-bold text-gray-800 w-6 text-center">{qty}</span>
                                            <button onClick={() => addToCart(med.id)} className="w-10 h-10 rounded-xl bg-secondary text-white flex items-center justify-center hover:bg-purple-700 transition-colors">
                                                <IoAddOutline size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button onClick={() => addToCart(med.id)} className="w-full flex items-center justify-center space-x-2 py-3 bg-gray-50 hover:bg-secondary hover:text-white text-secondary font-bold rounded-xl transition-colors duration-200">
                                            <IoCartOutline size={20} />
                                            <span>Add to Cart</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full py-16 text-center text-gray-400">
                        <p className="text-5xl mb-4">💊</p>
                        <p className="text-xl font-semibold text-gray-600 mb-2">No items found</p>
                        <p className="text-sm">Try a different search or category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
