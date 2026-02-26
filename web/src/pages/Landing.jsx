import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    IoSparkles, IoVideocam, IoFlask, IoShieldCheckmarkOutline,
    IoArrowForward, IoHeartOutline, IoPulseOutline, IoFitnessOutline,
    IoStarOutline, IoStar, IoChevronForward,
} from 'react-icons/io5';

/* ── Stats counter hook ───────────────────────────────────── */
function useCounter(target, duration = 2000) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        let start = 0;
        const step = target / (duration / 16);
        const id = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(id); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(id);
    }, [target, duration]);
    return count;
}

/* ── Rotating words ───────────────────────────────────────── */
const heroWords = ['Healthcare', 'Wellness', 'Medicine', 'Diagnostics'];

/* ── Testimonials ─────────────────────────────────────────── */
const testimonials = [
    { name: 'Priya Sharma', role: 'Patient', text: 'MedAI completely changed how I manage my health. The AI assistant caught early warning signs my previous doctor missed.', rating: 5 },
    { name: 'Dr. Rajesh Kapoor', role: 'Cardiologist', text: 'The telehealth integration is seamless. I can monitor my patients remotely with real-time data from their wearables.', rating: 5 },
    { name: 'Ananya Gupta', role: 'Pharmacy Customer', text: 'Ordering medicines is literally 2 taps. Delivery is fast, and the AI checks for drug interactions automatically.', rating: 4 },
];

export default function Landing() {
    const [wordIdx, setWordIdx] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const users = useCounter(50000, 2500);
    const doctors = useCounter(2400, 2000);
    const consults = useCounter(180000, 3000);

    // Rotate hero word
    useEffect(() => {
        const id = setInterval(() => setWordIdx(i => (i + 1) % heroWords.length), 2500);
        return () => clearInterval(id);
    }, []);

    // Sticky nav on scroll
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white flex flex-col">

            {/* ─── STICKY NAVIGATION ───────────────────────────────── */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'}`}>
                <div className="flex items-center justify-between px-6 md:px-12 py-4 max-w-7xl mx-auto w-full">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#007AFF] to-[#6200EA] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">
                            M
                        </div>
                        <h1 className="text-xl font-bold text-gray-800">Med<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] to-[#6200EA]">AI</span></h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link to="/login" className="hidden sm:inline text-gray-600 font-semibold hover:text-primary px-4 py-2 rounded-xl hover:bg-gray-50 transition-all">
                            Log In
                        </Link>
                        <Link to="/login" className="bg-gradient-to-r from-[#007AFF] to-[#6200EA] text-white px-6 py-2.5 rounded-full font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* ─── HERO SECTION ────────────────────────────────────── */}
            <main className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
                {/* Background gradients */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl" />
                    <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-purple-100/40 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-pink-100/30 rounded-full blur-3xl" />
                </div>

                {/* Floating medical icons */}
                {[
                    { icon: <IoHeartOutline size={22} />, top: '15%', left: '8%', delay: '0s', dur: '6s' },
                    { icon: <IoPulseOutline size={20} />, top: '25%', right: '10%', delay: '1s', dur: '7s' },
                    { icon: <IoFitnessOutline size={18} />, top: '60%', left: '5%', delay: '2s', dur: '5s' },
                    { icon: <IoFlask size={16} />, top: '70%', right: '8%', delay: '0.5s', dur: '8s' },
                ].map((f, i) => (
                    <div key={i} className="absolute text-primary/15 hidden md:block" style={{
                        top: f.top, left: f.left, right: f.right,
                        animation: `float ${f.dur} ease-in-out ${f.delay} infinite`,
                    }}>{f.icon}</div>
                ))}

                <div className="max-w-5xl mx-auto text-center px-6">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 bg-white text-primary px-5 py-2.5 rounded-full font-semibold text-sm mb-10 border border-blue-100 shadow-sm"
                        style={{ animation: 'fadeSlideIn 0.6s ease-out' }}>
                        <IoShieldCheckmarkOutline size={16} />
                        <span>Trusted by 50,000+ patients across India</span>
                    </div>

                    {/* Headline with rotating word */}
                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] mb-8"
                        style={{ animation: 'fadeSlideIn 0.8s ease-out' }}>
                        The Future of{' '}
                        <span className="relative inline-block">
                            <span key={wordIdx}
                                className="text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] via-[#6200EA] to-[#FF6B6B]"
                                style={{ animation: 'slideUp 0.5s ease-out' }}>
                                {heroWords[wordIdx]}
                            </span>
                        </span>
                        <br />is Here.
                    </h2>

                    <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed"
                        style={{ animation: 'fadeSlideIn 1s ease-out' }}>
                        AI-driven health insights, instant doctor consultations, and doorstep pharmacy delivery — all in one next-generation health OS.
                    </p>

                    {/* CTA buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                        style={{ animation: 'fadeSlideIn 1.2s ease-out' }}>
                        <Link to="/login"
                            className="group flex items-center space-x-2 bg-gradient-to-r from-[#007AFF] to-[#6200EA] text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                            <span>Enter MedAI</span>
                            <IoArrowForward className="group-hover:translate-x-1.5 transition-transform duration-300" />
                        </Link>
                        <a href="#features"
                            className="flex items-center space-x-2 text-gray-600 font-semibold px-6 py-4 rounded-full hover:bg-gray-50 transition-all">
                            <span>Learn more</span>
                            <IoChevronForward size={16} />
                        </a>
                    </div>

                    {/* Stats bar */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16"
                        style={{ animation: 'fadeSlideIn 1.4s ease-out' }}>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-extrabold text-gray-900">{users.toLocaleString()}+</div>
                            <div className="text-sm text-gray-400 font-medium mt-1">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-extrabold text-gray-900">{doctors.toLocaleString()}+</div>
                            <div className="text-sm text-gray-400 font-medium mt-1">Verified Doctors</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-extrabold text-gray-900">{consults.toLocaleString()}+</div>
                            <div className="text-sm text-gray-400 font-medium mt-1">Consultations Done</div>
                        </div>
                    </div>
                </div>

                {/* Dashboard preview mockup */}
                <div className="max-w-5xl mx-auto mt-20 px-6">
                    <div className="bg-white p-3 md:p-4 rounded-t-[2rem] md:rounded-t-[3rem] shadow-2xl border border-gray-100 border-b-0">
                        <div className="w-full h-48 sm:h-64 md:h-80 rounded-t-[1.5rem] md:rounded-t-[2.5rem] relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#007AFF]/20 via-[#6200EA]/15 to-[#FF6B6B]/20" />
                            <div className="absolute inset-0 backdrop-blur-sm" />
                            {/* Simulated UI elements */}
                            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-white/60 rounded-lg" />
                                    <div className="w-24 h-3 bg-white/40 rounded-full" />
                                </div>
                                <div className="flex space-x-2">
                                    <div className="w-8 h-8 bg-white/40 rounded-lg" />
                                    <div className="w-8 h-8 bg-white/40 rounded-lg" />
                                </div>
                            </div>
                            <div className="absolute top-20 left-6 space-y-3">
                                <div className="w-48 h-4 bg-white/30 rounded-full" />
                                <div className="w-32 h-3 bg-white/20 rounded-full" />
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 flex space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex-1 h-20 bg-white/25 rounded-2xl backdrop-blur-sm" />
                                ))}
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-lg md:text-2xl font-bold text-white/70">Intelligent Dashboard</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ─── FEATURES SECTION ────────────────────────────────── */}
            <section id="features" className="py-24 md:py-32 px-6 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 bg-white text-primary px-4 py-2 rounded-full font-semibold text-sm mb-6 border border-blue-100 shadow-sm">
                            <IoSparkles size={14} />
                            <span>Core Features</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Everything you need.</h3>
                        <p className="text-lg text-gray-500 max-w-xl mx-auto">One platform for consultations, prescriptions, lab tests, and AI-powered health insights.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <IoSparkles size={32} />, grad: 'from-[#FF9966] to-[#FF5E62]', title: 'AI Health Expert', desc: 'Chat with our real-time, Gemini-powered medical AI for instant health advice and preliminary symptom checking.', rotate: 'rotate-3' },
                            { icon: <IoVideocam size={32} />, grad: 'from-[#56CCF2] to-[#2F80ED]', title: 'Instant Telehealth', desc: 'Connect with top-tier specialists through high-definition video calls directly within the platform.', rotate: '-rotate-3' },
                            { icon: <IoFlask size={32} />, grad: 'from-[#11998e] to-[#38ef7d]', title: 'Smart Pharmacy', desc: 'Upload prescriptions and order authentic medicines with rapid delivery straight to your doorstep.', rotate: 'rotate-3' },
                        ].map((f, i) => (
                            <div key={i} className="group bg-white p-8 rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer">
                                <div className={`w-16 h-16 bg-gradient-to-br ${f.grad} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg transform ${f.rotate} group-hover:rotate-0 transition-transform duration-500`}>
                                    {f.icon}
                                </div>
                                <h4 className="text-xl font-bold text-gray-800 mb-3">{f.title}</h4>
                                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TESTIMONIALS ────────────────────────────────────── */}
            <section className="py-24 md:py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Loved by thousands.</h3>
                        <p className="text-lg text-gray-500">Hear from people who trust MedAI with their health journey.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                                <div className="flex mb-4">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        s <= t.rating
                                            ? <IoStar key={s} size={16} className="text-yellow-400" />
                                            : <IoStarOutline key={s} size={16} className="text-gray-300" />
                                    ))}
                                </div>
                                <p className="text-gray-600 leading-relaxed mb-6 italic">"{t.text}"</p>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {t.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800 text-sm">{t.name}</div>
                                        <div className="text-gray-400 text-xs">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ───────────────────────────────────────── */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#007AFF] via-[#6200EA] to-[#FF6B6B] rounded-[2.5rem] p-12 md:p-16 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Ready to take control?</h3>
                        <p className="text-blue-100 text-lg mb-10 max-w-lg mx-auto">Join 50,000+ users who already trust MedAI for smarter, faster, and more accessible healthcare.</p>
                        <Link to="/login"
                            className="group inline-flex items-center space-x-2 bg-white text-gray-900 px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                            <span>Create Free Account</span>
                            <IoArrowForward className="group-hover:translate-x-1.5 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── FOOTER ──────────────────────────────────────────── */}
            <footer className="bg-gray-50 border-t border-gray-100 py-10 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#007AFF] to-[#6200EA] rounded-lg flex items-center justify-center text-white font-bold text-sm">M</div>
                        <span className="text-gray-400 text-sm">© 2026 MedAI Technologies. All rights reserved.</span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                        <span className="hover:text-gray-600 cursor-pointer transition-colors">Privacy</span>
                        <span className="hover:text-gray-600 cursor-pointer transition-colors">Terms</span>
                        <span className="hover:text-gray-600 cursor-pointer transition-colors">Contact</span>
                    </div>
                </div>
            </footer>

            {/* ─── KEYFRAME STYLES ─────────────────────────────────── */}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(8deg); }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes fadeSlideIn {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
        </div>
    );
}
