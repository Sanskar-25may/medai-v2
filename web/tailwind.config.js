/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#007AFF",  // MedAI signature blue
                    light: "#3D9AFF",
                    dark: "#005AC0",
                },
                secondary: {
                    DEFAULT: "#6200EA",  // AI Expert purple
                    light: "#9D46FF",
                    dark: "#3700B3",
                },
                surface: {
                    DEFAULT: "#0f172a",  // Dark background
                    card: "#1e293b",  // Card background
                    border: "#334155",  // Subtle border
                },
                accent: {
                    teal: "#14b8a6",  // Health / vitals
                    rose: "#f43f5e",  // Alerts / urgent
                    amber: "#f59e0b",  // Warnings
                    green: "#22c55e",  // Success / healthy
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            borderRadius: {
                xl: "1rem",
                "2xl": "1.25rem",
                "3xl": "1.5rem",
            },
            boxShadow: {
                glow: "0 0 20px rgba(0, 122, 255, 0.35)",
                "glow-purple": "0 0 20px rgba(98, 0, 234, 0.35)",
                card: "0 4px 24px rgba(0, 0, 0, 0.3)",
            },
            animation: {
                "fade-in": "fadeIn 0.4s ease-out",
                "slide-up": "slideUp 0.4s ease-out",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
                slideUp: { "0%": { opacity: "0", transform: "translateY(16px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
            },
        },
    },
    plugins: [],
};
