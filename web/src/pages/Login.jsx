import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    IoMailOutline, IoLockClosedOutline, IoPersonOutline, IoArrowForward,
    IoHeartOutline, IoFitnessOutline, IoFlaskOutline, IoPulseOutline,
    IoShieldCheckmarkOutline, IoEyeOutline, IoEyeOffOutline,
    IoLogoGoogle, IoLogoApple, IoWarningOutline, IoCheckmarkCircleOutline,
} from 'react-icons/io5';

/* ── Floating medical icons on the branding panel ─────────── */
const floatingIcons = [
    { icon: <IoHeartOutline size={28} />, top: '12%', left: '15%', delay: '0s', duration: '6s' },
    { icon: <IoFitnessOutline size={24} />, top: '30%', left: '75%', delay: '1s', duration: '7s' },
    { icon: <IoFlaskOutline size={22} />, top: '55%', left: '20%', delay: '2s', duration: '5s' },
    { icon: <IoPulseOutline size={26} />, top: '70%', left: '65%', delay: '0.5s', duration: '8s' },
    { icon: <IoShieldCheckmarkOutline size={20} />, top: '85%', left: '40%', delay: '3s', duration: '6s' },
    { icon: <IoHeartOutline size={18} />, top: '20%', left: '55%', delay: '1.5s', duration: '7s' },
    { icon: <IoFlaskOutline size={20} />, top: '45%', left: '85%', delay: '2.5s', duration: '5.5s' },
];

/* ── Password strength calculator ─────────────────────────── */
function getStrength(pw) {
    if (!pw) return { score: 0, label: '', color: '' };
    let s = 0;
    if (pw.length >= 6) s++;
    if (pw.length >= 10) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    if (s <= 1) return { score: 1, label: 'Weak', color: 'bg-red-400' };
    if (s <= 3) return { score: 2, label: 'Fair', color: 'bg-yellow-400' };
    if (s === 4) return { score: 3, label: 'Good', color: 'bg-blue-400' };
    return { score: 4, label: 'Strong', color: 'bg-green-500' };
}

/* ── Rotating taglines ────────────────────────────────────── */
const taglines = [
    'AI-powered health, in your pocket.',
    'Consult top doctors, anytime.',
    'Order medicines in 2 taps.',
    'Your health data, always private.',
];

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPw, setShowPw] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [tagIndex, setTagIndex] = useState(0);
    const [appleToast, setAppleToast] = useState(false);
    const navigate = useNavigate();

    // Rotate taglines every 3s
    useEffect(() => {
        const id = setInterval(() => setTagIndex(i => (i + 1) % taglines.length), 3000);
        return () => clearInterval(id);
    }, []);

    // ── GOOGLE IDENTITY SERVICES SETUP ─────────────────────────
    const handleGoogleResponse = useCallback(async (response) => {
        setFeedback(null);
        setIsLoading(true);
        try {
            const res = await fetch('http://127.0.0.1:8000/api/google-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ credential: response.credential }),
            });
            const data = await res.json();
            if (!res.ok) {
                setFeedback({ type: 'error', text: data.detail || 'Google sign-in failed' });
            } else {
                setFeedback({ type: 'success', text: `${data.message} Welcome, ${data.user_name}!` });
                setTimeout(() => navigate('/dashboard'), 1200);
            }
        } catch {
            setFeedback({ type: 'error', text: 'Cannot reach backend — is Uvicorn running?' });
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        // Load the Google Identity Services script
        if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.includes('YOUR_GOOGLE')) return;

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleGoogleResponse,
            });
        };
        document.head.appendChild(script);
        return () => { document.head.removeChild(script); };
    }, [handleGoogleResponse]);

    const handleGoogleClick = () => {
        if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID.includes('YOUR_GOOGLE')) {
            setFeedback({ type: 'error', text: 'Google Client ID not configured. Add it to web/.env' });
            return;
        }
        if (window.google?.accounts?.id) {
            window.google.accounts.id.prompt(); // Opens the Google One Tap popup
        }
    };

    const handleAppleClick = () => {
        setAppleToast(true);
        setTimeout(() => setAppleToast(false), 3000);
    };

    const strength = getStrength(password);

    // ── EMAIL/PASSWORD AUTH ────────────────────────────────────
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback(null);
        setIsLoading(true);

        const endpoint = isLogin ? '/api/login' : '/api/signup';
        const payload = isLogin ? { email, password } : { name, email, password };

        try {
            const res = await fetch(`http://127.0.0.1:8000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) {
                setFeedback({ type: 'error', text: data.detail || 'Authentication failed' });
            } else {
                setFeedback({ type: 'success', text: `${data.message} Welcome, ${data.user_name}!` });
                setTimeout(() => navigate('/dashboard'), 1200);
            }
        } catch {
            setFeedback({ type: 'error', text: 'Unable to connect to the server. Is Uvicorn running?' });
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setPassword('');
        setName('');
        setShowPw(false);
        setFeedback(null);
    };

    return (
        <div className="min-h-screen flex bg-white">

            {/* ─── LEFT PANEL: PREMIUM BRANDING ────────────────────── */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between p-12"
                style={{ background: 'linear-gradient(135deg, #007AFF 0%, #6200EA 50%, #FF6B6B 100%)' }}>

                <div className="absolute inset-0 opacity-30"
                    style={{
                        background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)',
                        animation: 'pulse 4s ease-in-out infinite',
                    }} />

                <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />

                {floatingIcons.map((f, i) => (
                    <div key={i} className="absolute text-white/20" style={{
                        top: f.top, left: f.left,
                        animation: `float ${f.duration} ease-in-out ${f.delay} infinite`,
                    }}>{f.icon}</div>
                ))}

                <div className="relative z-10">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl mb-10 hover:rotate-12 transition-transform duration-500 cursor-pointer">
                        <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#007AFF] to-[#6200EA] font-black text-3xl">M</span>
                    </div>
                    <h1 className="text-5xl font-bold text-white leading-tight mb-6">
                        Your Personal<br />Health OS.
                    </h1>
                    <div className="h-8 overflow-hidden">
                        <p key={tagIndex} className="text-blue-100 text-lg" style={{ animation: 'slideUp 0.5s ease-out' }}>
                            {taglines[tagIndex]}
                        </p>
                    </div>
                </div>

                <div className="relative z-10 space-y-4">
                    <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-2 text-white/70">
                            <IoShieldCheckmarkOutline size={18} />
                            <span className="text-sm font-medium">HIPAA Compliant</span>
                        </div>
                        <div className="flex items-center space-x-2 text-white/70">
                            <IoHeartOutline size={18} />
                            <span className="text-sm font-medium">50k+ Users</span>
                        </div>
                    </div>
                    <p className="text-white/40 text-xs">© 2026 MedAI Technologies. All rights reserved.</p>
                </div>
            </div>

            {/* ─── RIGHT PANEL: INTERACTIVE FORM ───────────────────── */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
                <div className="w-full max-w-md space-y-8" style={{ animation: 'fadeSlideIn 0.6s ease-out' }}>

                    <div className="lg:hidden w-12 h-12 bg-gradient-to-br from-[#007AFF] to-[#6200EA] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg mb-4">M</div>

                    {/* Toggle pills */}
                    <div className="bg-gray-100 p-1.5 rounded-2xl flex">
                        <button onClick={() => { if (!isLogin) toggleMode(); }}
                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${isLogin ? 'bg-white text-gray-800 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}>
                            Sign In
                        </button>
                        <button onClick={() => { if (isLogin) toggleMode(); }}
                            className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${!isLogin ? 'bg-white text-gray-800 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}>
                            Create Account
                        </button>
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            {isLogin ? 'Welcome back' : 'Join MedAI'}
                        </h2>
                        <p className="text-gray-500 mt-2">
                            {isLogin ? 'Enter your credentials to continue.' : 'Start your health journey today — it\'s free.'}
                        </p>
                    </div>

                    {/* Feedback banner */}
                    {feedback && (
                        <div className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center border transition-all ${feedback.type === 'error' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'
                            }`} style={{ animation: 'fadeSlideIn 0.3s ease-out' }}>
                            {feedback.type === 'error'
                                ? <IoWarningOutline size={18} className="mr-2 flex-shrink-0" />
                                : <IoCheckmarkCircleOutline size={18} className="mr-2 flex-shrink-0" />}
                            {feedback.text}
                        </div>
                    )}

                    {/* Social buttons — FUNCTIONAL */}
                    <div className="flex gap-3">
                        <button type="button" onClick={handleGoogleClick}
                            className="flex-1 flex items-center justify-center space-x-2 py-3.5 border border-gray-200 rounded-2xl hover:bg-blue-50 hover:border-blue-300 hover:shadow-md transition-all text-sm font-semibold text-gray-700 group active:scale-[0.97]">
                            <IoLogoGoogle size={18} className="text-blue-500 group-hover:scale-110 transition-transform" />
                            <span>Google</span>
                        </button>
                        <button type="button" onClick={handleAppleClick}
                            className="flex-1 flex items-center justify-center space-x-2 py-3.5 border border-gray-200 rounded-2xl hover:bg-gray-900 hover:text-white hover:border-gray-900 hover:shadow-md transition-all text-sm font-semibold text-gray-700 group active:scale-[0.97]">
                            <IoLogoApple size={20} className="group-hover:scale-110 transition-transform" />
                            <span>Apple</span>
                        </button>
                    </div>

                    {/* Apple "Coming Soon" toast */}
                    {appleToast && (
                        <div className="px-4 py-3 rounded-xl text-sm font-semibold bg-gray-100 text-gray-600 border border-gray-200 flex items-center"
                            style={{ animation: 'fadeSlideIn 0.3s ease-out' }}>
                            <IoLogoApple size={16} className="mr-2" />
                            Apple Sign-In is coming soon!
                        </div>
                    )}

                    {/* Divider */}
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">or continue with email</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Name (signup only) */}
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${!isLogin ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="relative group">
                                <IoPersonOutline size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                                <input type="text" placeholder="Full Name" {...(!isLogin ? { required: true } : {})}
                                    value={name} onChange={e => setName(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all" />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="relative group">
                            <IoMailOutline size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input type="email" placeholder="Email Address" required
                                value={email} onChange={e => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all" />
                        </div>

                        {/* Password */}
                        <div className="relative group">
                            <IoLockClosedOutline size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type={showPw ? 'text' : 'password'} placeholder="Password" required
                                value={password} onChange={e => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary focus:bg-white transition-all" />
                            <button type="button" onClick={() => setShowPw(!showPw)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                {showPw ? <IoEyeOffOutline size={18} /> : <IoEyeOutline size={18} />}
                            </button>
                        </div>

                        {/* Password strength (signup only) */}
                        <div className={`overflow-hidden transition-all duration-500 ${!isLogin && password ? 'max-h-8 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="flex items-center space-x-3">
                                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden flex space-x-1">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className={`flex-1 h-full rounded-full transition-all duration-500 ${i <= strength.score ? strength.color : 'bg-gray-200'}`} />
                                    ))}
                                </div>
                                <span className={`text-xs font-bold ${strength.score <= 1 ? 'text-red-400' : strength.score <= 2 ? 'text-yellow-500' : strength.score <= 3 ? 'text-blue-500' : 'text-green-500'}`}>
                                    {strength.label}
                                </span>
                            </div>
                        </div>

                        {/* Forgot password (login only) */}
                        {isLogin && (
                            <div className="flex justify-end">
                                <button type="button" className="text-sm font-semibold text-primary hover:text-blue-700 transition-colors">
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        {/* Submit button */}
                        <button type="submit" disabled={isLoading}
                            className="w-full bg-gradient-to-r from-[#007AFF] to-[#6200EA] hover:from-[#0066DD] hover:to-[#5200CC] disabled:opacity-70 text-white font-bold py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center group">
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>{isLogin ? 'Signing in...' : 'Creating account...'}</span>
                                </div>
                            ) : (
                                <>
                                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                    <IoArrowForward className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Toggle link */}
                    <p className="text-center text-gray-500">
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button onClick={toggleMode} className="text-primary font-bold hover:underline">
                            {isLogin ? 'Sign up for free' : 'Log in'}
                        </button>
                    </p>
                </div>
            </div>

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
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
        </div>
    );
}
