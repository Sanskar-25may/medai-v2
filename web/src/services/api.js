// ── MedAI API Service ─────────────────────────────────────────
// All calls go through the Vite proxy: /api/* → localhost:8000/*

const API_BASE = '/api';

/**
 * GET /api/ → Backend status
 */
export async function getStatus() {
    const res = await fetch(`${API_BASE}/`);
    if (!res.ok) throw new Error(`Status check failed: ${res.status}`);
    return res.json(); // { status: "active", system: "MedAI 2.0 Brain" }
}

/**
 * GET /api/health → Database & system health
 */
export async function getHealth() {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
    return res.json(); // { database: "connected", latency: "low" }
}

/**
 * WebSocket URL for voice agent (through Vite proxy)
 * In dev: ws://localhost:5173/ws/voice → proxied to ws://localhost:8000/ws/voice
 */
export function getVoiceWsUrl() {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    return `${protocol}://${window.location.host}/ws/voice`;
}
