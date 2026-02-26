import React, { useState, useEffect, useRef } from 'react';
import { IoSend, IoSparkles, IoPersonOutline } from 'react-icons/io5';

// Pre-built Q&A for when the backend WebSocket is offline
const quickQuestions = [
    "What are common causes of headaches?",
    "How much water should I drink daily?",
    "What foods help lower cholesterol?",
    "What are early signs of diabetes?",
    "How to improve sleep quality?",
];

const offlineResponses = {
    "What are common causes of headaches?": "Common causes include: tension/stress, dehydration, poor sleep, sinus pressure, and eye strain from screens.\n\n💡 Tip: Try the 20-20-20 rule — every 20 minutes, look at something 20 feet away for 20 seconds.",
    "How much water should I drink daily?": "The general recommendation is 8 glasses (2 liters) per day.\n\nActive lifestyle → 2.5–3L\nHot climate → add 500ml–1L extra\n\n💡 Pale yellow urine = well hydrated!",
    "What foods help lower cholesterol?": "Heart-healthy foods:\n🥑 Avocados — monounsaturated fats\n🐟 Fatty fish — omega-3\n🫘 Legumes — beans, lentils\n🌾 Oats & whole grains — soluble fiber\n🥜 Nuts — almonds, walnuts",
    "What are early signs of diabetes?": "Watch for: frequent urination, excessive thirst, unexplained weight loss, fatigue, blurred vision, slow-healing wounds.\n\n⚠️ If you have multiple symptoms, book an HbA1c test on our Lab Tests page.",
    "How to improve sleep quality?": "Science-backed tips:\n🌙 Consistent bed/wake time\n📱 No screens 1hr before bed\n🌡️ Cool room (18–20°C)\n☕ No caffeine after 2 PM\n🧘 Meditation or deep breathing",
};

export default function AIExpert() {
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Hello! I am your MedAI Health Expert. How can I assist you today? (e.g., "What are the symptoms of flu?" or "Give me a healthy diet plan.")' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [wsStatus, setWsStatus] = useState('Connecting...');

    const ws = useRef(null);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom on new messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

    // Connect to FastAPI WebSocket
    useEffect(() => {
        try {
            ws.current = new WebSocket('ws://127.0.0.1:8000/ws/voice');

            ws.current.onopen = () => setWsStatus('Online');
            ws.current.onclose = () => setWsStatus('Disconnected');
            ws.current.onerror = () => setWsStatus('Disconnected');

            ws.current.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    if (data.type === 'error') {
                        setMessages(prev => [...prev, { sender: 'ai', text: `⚠️ ${data.message}` }]);
                    } else {
                        setMessages(prev => [...prev, { sender: 'ai', text: data.data || event.data }]);
                    }
                } catch {
                    setMessages(prev => [...prev, { sender: 'ai', text: event.data }]);
                }
                setIsTyping(false);
            };
        } catch {
            setWsStatus('Disconnected');
        }

        return () => ws.current?.close();
    }, []);

    const handleSend = (e) => {
        e?.preventDefault();
        const text = (typeof e === 'string' ? e : input).trim();
        if (!text) return;

        setMessages(prev => [...prev, { sender: 'user', text }]);
        setInput('');
        setIsTyping(true);

        // If WebSocket is connected, send through it
        if (wsStatus === 'Online' && ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(text);
        } else {
            // Fallback: use pre-built responses
            setTimeout(() => {
                const response = offlineResponses[text] || "I'm currently in offline mode. Please start the backend server for live AI responses. In the meantime, try one of the quick questions below! 😊";
                setMessages(prev => [...prev, { sender: 'ai', text: response }]);
                setIsTyping(false);
            }, 800);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] animate-fade-in">

            {/* Header */}
            <div className="bg-white p-6 rounded-t-3xl shadow-sm border border-gray-100 flex justify-between items-center z-10">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9966] to-[#FF5E62] flex items-center justify-center text-white shadow-md">
                        <IoSparkles size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">MedAI Expert</h1>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className={`w-2.5 h-2.5 rounded-full ${wsStatus === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                            <p className="text-sm text-gray-500">{wsStatus === 'Online' ? 'Powered by Gemini — Live' : wsStatus === 'Connecting...' ? 'Connecting to server...' : 'Offline — Using cached responses'}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Question Chips */}
            <div className="bg-white px-6 pb-3 border-x border-gray-100 flex gap-2 flex-wrap">
                {quickQuestions.map(q => (
                    <button key={q} onClick={() => handleSend(q)}
                        className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-xs font-medium text-gray-600 hover:border-primary hover:text-primary transition-all">
                        {q}
                    </button>
                ))}
            </div>

            {/* Chat Area */}
            <div className="flex-1 bg-gray-50 overflow-y-auto p-6 space-y-6 border-x border-gray-100">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {msg.sender === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9966] to-[#FF5E62] flex items-center justify-center text-white mr-3 mt-1 flex-shrink-0">
                                <IoSparkles size={14} />
                            </div>
                        )}
                        <div className={`max-w-[75%] p-4 rounded-2xl ${msg.sender === 'user'
                                ? 'bg-primary text-white rounded-br-none shadow-md'
                                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
                            }`}>
                            <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        </div>
                        {msg.sender === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary ml-3 mt-1 flex-shrink-0">
                                <IoPersonOutline size={14} />
                            </div>
                        )}
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF9966] to-[#FF5E62] flex items-center justify-center text-white mr-3 mt-1">
                            <IoSparkles size={14} />
                        </div>
                        <div className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-none shadow-sm flex space-x-2 items-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white p-6 rounded-b-3xl shadow-sm border border-gray-100">
                <form onSubmit={handleSend} className="relative flex items-center">
                    <input
                        type="text"
                        className="w-full pl-6 pr-16 py-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg transition-all shadow-inner"
                        placeholder="Ask your health question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-blue-700 disabled:bg-gray-400 text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors shadow-md"
                    >
                        <IoSend size={20} className="ml-0.5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
