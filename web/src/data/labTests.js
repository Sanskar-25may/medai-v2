// ── Lab Test Categories ───────────────────────────────────────
export const LAB_CATEGORIES = [
    { id: '1', name: 'Full Body', color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { id: '2', name: 'Blood Test', color: 'bg-red-50 text-red-600 border-red-200' },
    { id: '3', name: 'Diabetes', color: 'bg-green-50 text-green-600 border-green-200' },
    { id: '4', name: 'Thyroid', color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { id: '5', name: 'Covid-19', color: 'bg-orange-50 text-orange-600 border-orange-200' },
];

// ── Popular Health Packages ───────────────────────────────────
export const POPULAR_PACKAGES = [
    {
        id: 'pkg1',
        name: 'Comprehensive Full Body Checkup',
        includes: '72 Tests (CBC, Lipid, Liver, Kidney...)',
        price: 1499, mrp: 2500,
        tat: '24 Hours', homeCollection: true, fasting: true,
        recommendation: 'Recommended for Ages 30+',
    },
    {
        id: 'pkg2',
        name: 'Diabetes Screening Pack',
        includes: '3 Tests (HbA1c, Fasting Glucose)',
        price: 499, mrp: 800,
        tat: '12 Hours', homeCollection: true, fasting: true,
        recommendation: 'Vital for Diabetics',
    },
    {
        id: 'pkg3',
        name: 'Heart Health Package',
        includes: '8 Tests (Lipid, ECG, Troponin...)',
        price: 1299, mrp: 2100,
        tat: '24 Hours', homeCollection: true, fasting: true,
        recommendation: 'Ages 40+ / Family History',
    },
];

// ── Individual Tests ──────────────────────────────────────────
export const INDIVIDUAL_TESTS = [
    { id: 't1', name: 'CBC (Complete Blood Count)', price: 299, tat: '6 Hours', homeCollection: true, category: 'Blood Test', description: 'Measures red & white blood cells, hemoglobin, platelets.' },
    { id: 't2', name: 'Thyroid Profile (T3, T4, TSH)', price: 399, tat: '24 Hours', homeCollection: true, category: 'Thyroid', description: 'Screens for hypo/hyperthyroidism.' },
    { id: 't3', name: 'Lipid Profile', price: 450, tat: '12 Hours', homeCollection: true, category: 'Blood Test', description: 'Checks total cholesterol, triglycerides, HDL, LDL.' },
    { id: 't4', name: 'Covid-19 RTPCR', price: 700, tat: '24 Hours', homeCollection: true, category: 'Covid-19', description: 'Gold-standard molecular test for active infection.' },
    { id: 't5', name: 'Liver Function Test (LFT)', price: 550, tat: '12 Hours', homeCollection: true, category: 'Full Body', description: 'Evaluates liver enzymes, proteins, and bilirubin.' },
    { id: 't6', name: 'X-Ray Chest PA View', price: 400, tat: 'Instant', homeCollection: false, category: 'Full Body', description: 'Detects lung infections, fractures, and heart size.' },
    { id: 't7', name: 'HbA1c (Glycated Hemoglobin)', price: 449, tat: '12 Hours', homeCollection: true, category: 'Diabetes', description: 'Avg blood sugar over 2-3 months — key for diabetes.' },
    { id: 't8', name: 'Kidney Function Test (KFT)', price: 549, tat: '12 Hours', homeCollection: true, category: 'Full Body', description: 'Checks creatinine, urea, and electrolyte levels.' },
    { id: 't9', name: 'Vitamin D Total', price: 749, tat: '24 Hours', homeCollection: true, category: 'Blood Test', description: 'Measures Vitamin D — essential for bones and immunity.' },
];
