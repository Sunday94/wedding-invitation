
export interface WelcomeTheme {
    overlayColor: string;       // CSS rgba overlay on background image
    accentColor: string;        // button / highlight color
    titleFont: string;          // Tailwind font class
    buttonStyle: string;        // Tailwind classes for the button
    taglineText: string;        // tagline above names
    attireText: string;         // bottom decoration text
}

export const WELCOME_THEMES: Record<number, WelcomeTheme> = {
    1: { overlayColor: 'rgba(0,0,0,0.30)', accentColor: '#c8a96e', titleFont: 'script-font', buttonStyle: 'bg-white text-yellow-700', taglineText: 'Together with their families', attireText: 'Formal Attire' },
    2: { overlayColor: 'rgba(80,10,20,0.55)', accentColor: '#9b2335', titleFont: 'script-font', buttonStyle: 'bg-red-800 text-white', taglineText: 'United in Love', attireText: 'Black Tie' },
    3: { overlayColor: 'rgba(200,100,100,0.35)', accentColor: '#e8a0a0', titleFont: 'script-font', buttonStyle: 'bg-pink-200 text-pink-800', taglineText: 'With joy in our hearts', attireText: 'Garden Attire' },
    4: { overlayColor: 'rgba(40,60,30,0.45)', accentColor: '#7d9b76', titleFont: 'serif-font', buttonStyle: 'bg-green-800 text-white', taglineText: 'Celebrate with us', attireText: 'Smart Casual' },
    5: { overlayColor: 'rgba(15,30,60,0.65)', accentColor: '#1e3a5f', titleFont: 'serif-font', buttonStyle: 'bg-navy-800 text-white bg-[#1e3a5f]', taglineText: 'The honour of your presence', attireText: 'Black Tie Required' },
    6: { overlayColor: 'rgba(80,60,120,0.40)', accentColor: '#9b88b4', titleFont: 'script-font', buttonStyle: 'bg-purple-200 text-purple-900', taglineText: 'Two hearts, one love', attireText: 'Semi-Formal' },
    7: { overlayColor: 'rgba(100,50,10,0.40)', accentColor: '#d4813a', titleFont: 'script-font', buttonStyle: 'bg-orange-400 text-white', taglineText: 'As the sun sets on our journey', attireText: 'Cocktail Attire' },
    8: { overlayColor: 'rgba(20,20,20,0.60)', accentColor: '#3a3a3a', titleFont: 'serif-font', buttonStyle: 'bg-gray-800 text-white', taglineText: 'A new chapter begins', attireText: 'Formal Attire' },
    9: { overlayColor: 'rgba(180,100,60,0.35)', accentColor: '#e8a87c', titleFont: 'script-font', buttonStyle: 'bg-orange-200 text-orange-900', taglineText: 'With warmth and love', attireText: 'Summer Formal' },
    10: { overlayColor: 'rgba(20,70,40,0.50)', accentColor: '#2d6a4f', titleFont: 'serif-font', buttonStyle: 'bg-emerald-700 text-white', taglineText: 'Together in nature', attireText: 'Garden Formal' },
    11: { overlayColor: 'rgba(110,40,30,0.45)', accentColor: '#b5533c', titleFont: 'script-font', buttonStyle: 'bg-red-700 text-white', taglineText: 'An earthy celebration of love', attireText: 'Boho Chic' },
    12: { overlayColor: 'rgba(150,160,170,0.35)', accentColor: '#b0bec5', titleFont: 'serif-font', buttonStyle: 'bg-slate-300 text-slate-800', taglineText: 'United in elegance', attireText: 'Silver Formal' },
    13: { overlayColor: 'rgba(180,160,80,0.30)', accentColor: '#e8d5a3', titleFont: 'script-font', buttonStyle: 'bg-yellow-200 text-yellow-900', taglineText: 'Pop the champagne!', attireText: 'Festive Attire' },
    14: { overlayColor: 'rgba(60,100,140,0.40)', accentColor: '#7ba7bc', titleFont: 'serif-font', buttonStyle: 'bg-blue-300 text-blue-900', taglineText: 'Sailing into forever', attireText: 'Coastal Formal' },
    15: { overlayColor: 'rgba(5,5,15,0.70)', accentColor: '#1a1a2e', titleFont: 'sans-serif', buttonStyle: 'bg-indigo-900 text-white', taglineText: 'An exclusive invitation', attireText: 'Black Tie Only' },
};
