import React, { useState } from 'react';
import {
    IoSearchOutline, IoStar, IoStarOutline,
    IoLocationOutline, IoBusinessOutline, IoCallOutline,
} from 'react-icons/io5';
import { doctors, KEYWORD_MAP } from '../data/doctors';

function StarRating({ rating }) {
    const num = parseFloat(rating);
    return (
        <div className="flex items-center space-x-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <span key={i}>
                    {i <= Math.round(num)
                        ? <IoStar size={13} className="text-amber-400" />
                        : <IoStarOutline size={13} className="text-gray-300" />}
                </span>
            ))}
            <span className="text-sm font-bold text-gray-700 ml-1.5">{rating}</span>
        </div>
    );
}

export default function Doctors() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDocs, setFilteredDocs] = useState(doctors);

    const handleSearch = (e) => {
        const text = e.target.value;
        setSearchQuery(text);

        const lowerText = text.toLowerCase().trim();
        if (!lowerText) { setFilteredDocs(doctors); return; }

        // Smart keyword mapping: "heart" → Cardiologist, "skin" → Dermatologist, etc.
        const mappedSpecialty = KEYWORD_MAP[lowerText];

        const results = doctors.filter(doc => {
            const matchName = doc.name.toLowerCase().includes(lowerText);
            const matchSpec = doc.specialty.toLowerCase().includes(lowerText);
            const matchHospital = doc.hospital.toLowerCase().includes(lowerText);
            const matchKeyword = mappedSpecialty && doc.specialty === mappedSpecialty;
            return matchName || matchSpec || matchHospital || matchKeyword;
        });

        setFilteredDocs(results);
    };

    return (
        <div className="space-y-6 animate-fade-in">

            {/* Header & Search */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Find a Specialist</h1>
                <p className="text-gray-500 mb-6">
                    Search by name, specialty, or symptoms (e.g., "Heart", "Skin", "Fever")
                </p>

                <div className="relative">
                    <IoSearchOutline size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg transition-all"
                        placeholder="Search doctors..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                {/* Active keyword hint */}
                {searchQuery && KEYWORD_MAP[searchQuery.toLowerCase().trim()] && (
                    <p className="mt-3 text-sm text-primary font-medium">
                        🧠 Smart match: showing <span className="font-bold">{KEYWORD_MAP[searchQuery.toLowerCase().trim()]}</span> specialists
                    </p>
                )}
            </div>

            {/* Result count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    Showing <span className="font-bold text-gray-700">{filteredDocs.length}</span> doctors
                </p>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocs.length > 0 ? (
                    filteredDocs.slice(0, 30).map((doc) => (
                        <div
                            key={doc.id}
                            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                        >
                            {/* Subtle gradient top strip */}
                            <div className={`h-1.5 ${doc.colorStyle.includes('pink') ? 'bg-gradient-to-r from-pink-400 to-rose-400' : doc.colorStyle.includes('green') ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : doc.colorStyle.includes('orange') ? 'bg-gradient-to-r from-orange-400 to-amber-400' : doc.colorStyle.includes('purple') ? 'bg-gradient-to-r from-purple-400 to-violet-400' : 'bg-gradient-to-r from-blue-400 to-indigo-400'}`} />

                            <div className="p-6">
                                {/* Specialty badge + Rating */}
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${doc.colorStyle}`}>
                                        {doc.specialty}
                                    </span>
                                    <StarRating rating={doc.rating} />
                                </div>

                                {/* Name + Experience */}
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{doc.name}</h3>
                                <p className="text-primary font-semibold text-sm mb-4">{doc.exp} Experience</p>

                                {/* Hospital + Location */}
                                <div className="space-y-2 mb-5">
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <IoBusinessOutline size={15} className="mr-2 flex-shrink-0" />
                                        <span>{doc.hospital}</span>
                                    </div>
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <IoLocationOutline size={15} className="mr-2 flex-shrink-0" />
                                        <span>{doc.location}</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <button className="w-full py-3 bg-gray-50 hover:bg-primary hover:text-white text-primary font-bold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group-hover:bg-primary group-hover:text-white group-hover:shadow-md">
                                    <IoCallOutline size={16} />
                                    <span>Book Appointment</span>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-16 text-center text-gray-400">
                        <p className="text-5xl mb-4">🔍</p>
                        <p className="text-xl font-semibold text-gray-600 mb-2">No doctors found matching "{searchQuery}"</p>
                        <p className="text-sm">Try searching for a symptom like "fever" or a specialty like "Dentist".</p>
                    </div>
                )}
            </div>

            {/* Load hint */}
            {filteredDocs.length > 30 && (
                <p className="text-center text-sm text-gray-400">
                    Showing first 30 of {filteredDocs.length} results. Refine your search to see specific doctors.
                </p>
            )}
        </div>
    );
}
