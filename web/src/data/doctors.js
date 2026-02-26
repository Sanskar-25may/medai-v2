// --- 1. CONFIGURATION ---
const SPECIALTIES = [
    'General Physician', 'Cardiologist', 'Dermatologist', 'Pediatrician',
    'Neurologist', 'Orthopedic', 'Dentist', 'ENT Specialist',
    'Psychiatrist', 'Ophthalmologist', 'Gynecologist', 'Urologist'
];

const HOSPITALS = [
    'City Care Hospital', 'Max Health', 'Apollo Clinic', 'LifeLine Center',
    'Medanta Hub', 'Global Health', 'Community Clinic', 'Star Diagnostics'
];

const NAMES = [
    'Sharma', 'Gupta', 'Verma', 'Singh', 'Malhotra', 'Kumar', 'Reddy',
    'Patel', 'Das', 'Iyer', 'Khan', 'Mishra', 'Yadav', 'Joshi', 'Chopra'
];

// --- 2. KEYWORD MAPPING (The "Smart" Brain) ---
export const KEYWORD_MAP = {
    'heart': 'Cardiologist',
    'skin': 'Dermatologist',
    'pimple': 'Dermatologist',
    'hair': 'Dermatologist',
    'child': 'Pediatrician',
    'baby': 'Pediatrician',
    'kids': 'Pediatrician',
    'brain': 'Neurologist',
    'bone': 'Orthopedic',
    'tooth': 'Dentist',
    'eye': 'Ophthalmologist',
    'mind': 'Psychiatrist',
    'stomach': 'General Physician',
    'fever': 'General Physician',
};

// --- 3. GENERATOR FUNCTION ---
const generateDoctors = (count) => {
    const docs = [];
    for (let i = 0; i < count; i++) {
        const spec = SPECIALTIES[Math.floor(Math.random() * SPECIALTIES.length)];
        const name = `Dr. ${NAMES[Math.floor(Math.random() * NAMES.length)]}`;
        const exp = Math.floor(Math.random() * 30) + 2;

        let color = 'bg-blue-50 text-blue-600';

        if (spec === 'Dermatologist') color = 'bg-pink-50 text-pink-600';
        if (spec === 'General Physician') color = 'bg-green-50 text-green-600';
        if (spec === 'Dentist') color = 'bg-orange-50 text-orange-600';
        if (spec === 'Neurologist') color = 'bg-purple-50 text-purple-600';

        docs.push({
            id: i.toString(),
            name: `${name}`,
            specialty: spec,
            exp: `${exp} Years`,
            rating: (3.5 + Math.random() * 1.5).toFixed(1),
            hospital: HOSPITALS[Math.floor(Math.random() * HOSPITALS.length)],
            location: i % 2 === 0 ? 'Gorakhpur' : 'Lucknow',
            colorStyle: color
        });
    }
    return docs;
};

// Generate 120 doctors instantly
export const doctors = generateDoctors(120);