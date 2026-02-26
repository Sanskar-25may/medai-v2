// ── Categories ────────────────────────────────────────────────
export const CATEGORIES = [
    { id: 'c1', name: 'Prescription', color: 'bg-red-50 text-red-600 border-red-200' },
    { id: 'c2', name: 'Over the Counter', color: 'bg-green-50 text-green-600 border-green-200' },
    { id: 'c3', name: 'Vitamins & Supplements', color: 'bg-yellow-50 text-yellow-600 border-yellow-200' },
    { id: 'c4', name: 'Devices', color: 'bg-blue-50 text-blue-600 border-blue-200' },
];

// ── Medicines ─────────────────────────────────────────────────
export const MEDICINES = [
    {
        id: 'm1', name: 'Paracetamol 500mg', brand: 'Crocin',
        category: 'Over the Counter', price: 30, mrp: 40,
        rxRequired: false, inStock: true, pack: 'Strip of 10',
        emoji: '💊', description: 'Relieves mild to moderate pain and reduces fever.',
    },
    {
        id: 'm2', name: 'Amoxicillin 250mg', brand: 'Moxikind',
        category: 'Prescription', price: 120, mrp: 150,
        rxRequired: true, inStock: true, pack: 'Strip of 15',
        emoji: '💊', description: 'Antibiotic used to treat bacterial infections.',
    },
    {
        id: 'm3', name: 'Vitamin C + Zinc', brand: 'Limcee',
        category: 'Vitamins & Supplements', price: 85, mrp: 100,
        rxRequired: false, inStock: true, pack: 'Bottle of 100',
        emoji: '🧪', description: 'Boosts immunity and supports daily wellness.',
    },
    {
        id: 'm4', name: 'Digital BP Monitor', brand: 'Omron',
        category: 'Devices', price: 1450, mrp: 2000,
        rxRequired: false, inStock: true, pack: '1 Unit',
        emoji: '🩺', description: 'Automatic upper-arm blood pressure monitor with memory.',
    },
    {
        id: 'm5', name: 'Cough Relief Syrup', brand: 'Benadryl',
        category: 'Over the Counter', price: 110, mrp: 125,
        rxRequired: false, inStock: true, pack: '100 ml Bottle',
        emoji: '🧴', description: 'Provides relief from dry and wet cough.',
    },
    {
        id: 'm6', name: 'Thyroxine Sodium 50mcg', brand: 'Thyronorm',
        category: 'Prescription', price: 180, mrp: 210,
        rxRequired: true, inStock: true, pack: 'Strip of 30',
        emoji: '💊', description: 'Treats hypothyroidism by replacing thyroid hormone.',
    },
    {
        id: 'm7', name: 'Multivitamin A-Z', brand: 'Supradyn',
        category: 'Vitamins & Supplements', price: 240, mrp: 310,
        rxRequired: false, inStock: true, pack: 'Jar of 30',
        emoji: '🧪', description: 'Complete daily multivitamin with essential minerals.',
    },
    {
        id: 'm8', name: 'Pulse Oximeter', brand: 'Dr. Trust',
        category: 'Devices', price: 899, mrp: 1299,
        rxRequired: false, inStock: false, pack: '1 Unit',
        emoji: '🩺', description: 'Measures SpO2 levels and pulse rate on your fingertip.',
    },
    {
        id: 'm9', name: 'Cetirizine 10mg', brand: 'Cetzine',
        category: 'Over the Counter', price: 35, mrp: 50,
        rxRequired: false, inStock: true, pack: 'Strip of 10',
        emoji: '💊', description: 'Antihistamine for allergies, runny nose, and sneezing.',
    },
    {
        id: 'm10', name: 'Metformin 500mg', brand: 'Glycomet',
        category: 'Prescription', price: 65, mrp: 85,
        rxRequired: true, inStock: true, pack: 'Strip of 20',
        emoji: '💊', description: 'First-line medication for managing Type 2 diabetes.',
    },
];
