import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext(undefined);

// Translations for the farming assistant
const translations = {
  en: {
    // App branding
    appName: "Krishi Sakhi", // Krishi Sahayi in Malayalam script
    tagline: "Your AI-powered farming companion",
    
    // Navigation
    dashboard: "Dashboard",
    chat: "Chat",
    activities: "Activities", 
    profile: "Profile",
    settings: "Settings",
    
    // Profile Setup
    setupProfile: "Setup Your Farm Profile",
    location: "Location",
    selectDistrict: "Select District",
    landSize: "Land Size (acres)",
    cropType: "Primary Crop",
    soilType: "Soil Type",
    irrigationType: "Irrigation Type",
    save: "Save Profile",
    
    // Districts in Kerala
    alappuzha: "Alappuzha",
    ernakulam: "Ernakulam", 
    idukki: "Idukki",
    kannur: "Kannur",
    kasaragod: "Kasaragod",
    kollam: "Kollam",
    kottayam: "Kottayam",
    kozhikode: "Kozhikode",
    malappuram: "Malappuram",
    palakkad: "Palakkad",
    pathanamthitta: "Pathanamthitta",
    thiruvananthapuram: "Thiruvananthapuram",
    thrissur: "Thrissur",
    wayanad: "Wayanad",
    
    // Crops
    rice: "Rice",
    coconut: "Coconut",
    pepper: "Pepper",
    cardamom: "Cardamom",
    rubber: "Rubber",
    cashew: "Cashew",
    banana: "Banana",
    ginger: "Ginger",
    turmeric: "Turmeric",
    vegetables: "Vegetables",
    
    // Soil Types
    laterite: "Laterite",
    alluvial: "Alluvial",
    black: "Black Cotton",
    red: "Red Soil",
    clayey: "Clayey",
    sandy: "Sandy",
    
    // Irrigation
    rainfed: "Rainfed",
    drip: "Drip Irrigation",
    sprinkler: "Sprinkler",
    flood: "Flood Irrigation",
    
    // Chat
    askQuestion: "Ask about your crops...",
    botOnline: "Online • Ready to help",
    
    // Quick Questions
    quickQuestions: "Quick Questions",
    whenToPlant: "When to plant paddy?",
    pestControl: "How to control pests?",
    fertilizer: "Which fertilizer to use?",
    weatherAlert: "Weather predictions?",
    soilHealth: "How to improve soil?",
    harvest: "Best time to harvest?",
    
    // Activities
    logActivity: "Log Activity",
    recentActivities: "Recent Activities",
    addActivity: "Add Activity",
    activityType: "Activity Type",
    description: "Description",
    date: "Date",
    
    // Activity Types
    sowing: "Sowing",
    irrigation: "Irrigation", 
    fertilizing: "Fertilizing",
    pestSpray: "Pest Control",
    weeding: "Weeding",
    harvesting: "Harvesting",
    
    // Dashboard
    welcomeBack: "Welcome! 👋🏽 ",
    farmerName: "Farmer",
    weatherToday: "Today's Weather",
    upcomingTasks: "Upcoming Tasks",
    recentAdvice: "Recent Advice",
    
    // Common
    today: "Today",
    yesterday: "Yesterday",
    thisWeek: "This Week",
    loading: "Loading...",
    submit: "Submit",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    
    // Language
    language: "Language",
    english: "English",
    malayalam: "മലയാളം",
    hindi: "हिन्दी"
  },
  
  ml: {
    // App branding
    appName: "കൃഷി സഹായി",
    tagline: "നിങ്ങളുടെ AI കൃഷി സഹായി",
    
    // Navigation 
    dashboard: "ഡാഷ്‌ബോർഡ്",
    chat: "ചാറ്റ്",
    activities: "പ്രവർത്തനങ്ങൾ",
    profile: "പ്രൊഫൈൽ", 
    settings: "ക്രമീകരണങ്ങൾ",
    
    // Profile Setup
    setupProfile: "നിങ്ങളുടെ കൃഷിഭൂമിയുടെ പ്രൊഫൈൽ സജ്ജമാക്കുക",
    location: "സ്ഥലം",
    selectDistrict: "ജില്ല തിരഞ്ഞെടുക്കുക",
    landSize: "ഭൂമിയുടെ വിസ്തീർണ്ണം (ഏക്കർ)",
    cropType: "പ്രധാന വിള",
    soilType: "മണ്ണിന്റെ തരം",
    irrigationType: "ജലസേചന രീതി",
    save: "പ്രൊഫൈൽ സംരക്ഷിക്കുക",
    
    // Districts in Malayalam
    alappuzha: "ആലപ്പുഴ",
    ernakulam: "എറണാകുളം",
    idukki: "ഇടുക്കി", 
    kannur: "കണ്ണൂർ",
    kasaragod: "കാസർഗോഡ്",
    kollam: "കൊല്ലം",
    kottayam: "കോട്ടയം",
    kozhikode: "കോഴിക്കോട്",
    malappuram: "മലപ്പുറം",
    palakkad: "പാലക്കാട്",
    pathanamthitta: "പത്തനംതിട്ട",
    thiruvananthapuram: "തിരുവനന്തപുരം",
    thrissur: "തൃശ്ശൂർ",
    wayanad: "വയനാട്",
    
    // Crops in Malayalam
    rice: "നെല്ല്",
    coconut: "തേങ്ങ",
    pepper: "കുരുമുളക്",
    cardamom: "ഏലം",
    rubber: "റബ്ബർ",
    cashew: "കശുവണ്ടി",
    banana: "വാഴ",
    ginger: "ഇഞ്ചി",
    turmeric: "മഞ്ഞൾ",
    vegetables: "പച്ചക്കറികൾ",
    
    // Soil Types in Malayalam
    laterite: "ലാറ്ററൈറ്റ്",
    alluvial: "പുഴമുതൽ മണ്ണ്",
    black: "കറുത്ത പരുത്തി മണ്ണ്",
    red: "ചുവന്ന മണ്ണ്",
    clayey: "കളിമണ്ണ്",
    sandy: "മണൽ മണ്ണ്",
    
    // Irrigation in Malayalam
    rainfed: "മഴയെ ആശ്രയിച്ച്",
    drip: "തുള്ളി ജലസേചനം",
    sprinkler: "സ്പ്രിങ്ക്ലർ",
    flood: "വെള്ളപ്പൊക്ക ജലസേചനം",
    
    // Chat
    askQuestion: "നിങ്ങളുടെ വിളകളെക്കുറിച്ച് ചോദിക്കുക...",
    botOnline: "ഓൺലൈൻ • സഹായിക്കാൻ തയ്യാർ",
    
    // Quick Questions
    quickQuestions: "പെട്ടെന്നുള്ള ചോദ്യങ്ങൾ",
    whenToPlant: "നെല്ല് എപ്പോൾ നടണം?",
    pestControl: "കീടങ്ങളെ എങ്ങനെ നിയന്ത്രിക്കാം?",
    fertilizer: "ഏത് വളം ഉപയോഗിക്കണം?",
    weatherAlert: "കാലാവസ്ഥാ പ്രവചനം?",
    soilHealth: "മണ്ണ് എങ്ങനെ മെച്ചപ്പെടുത്താം?",
    harvest: "വിളവെടുപ്പിന് ഏറ്റവും നല്ല സമയം?",
    
    // Activities
    logActivity: "പ്രവർത്തനം രേഖപ്പെടുത്തുക",
    recentActivities: "സമീപകാല പ്രവർത്തനങ്ങൾ",
    addActivity: "പ്രവർത്തനം ചേർക്കുക",
    activityType: "പ്രവർത്തന തരം",
    description: "വിവരണം",
    date: "തീയതി",
    
    // Activity Types in Malayalam  
    sowing: "വിത്ത് വിതയൽ",
    irrigation: "ജലസേചനം",
    fertilizing: "വളപ്രയോഗം", 
    pestSpray: "കീടനിയന്ത്രണം",
    weeding: "കളപ്പിഴുപ്പ്",
    harvesting: "വിളവെടുപ്പ്",
    
    // Dashboard
    welcomeBack: "സ്വാഗതം",
    farmerName: "കർഷകൻ",
    weatherToday: "ഇന്നത്തെ കാലാവസ്ഥ",
    upcomingTasks: "വരാനിരിക്കുന്ന ജോലികൾ",
    recentAdvice: "സമീപകാല ഉപദേശം",
    
    // Common
    today: "ഇന്ന്",
    yesterday: "ഇന്നലെ",
    thisWeek: "ഈ ആഴ്ച",
    loading: "ലോഡ് ചെയ്യുന്നു...",
    submit: "സമർപ്പിക്കുക",
    cancel: "റദ്ദാക്കുക",
    edit: "എഡിറ്റ് ചെയ്യുക",
    delete: "ഇല്ലാതാക്കുക",
    
    // Language
    language: "ഭാഷ",
    english: "English",
    malayalam: "മലയാളം", 
    hindi: "हिन्दी"
  },
  
  hi: {
    // App branding
    appName: "कृषि सहायक",
    tagline: "आपका AI-संचालित खेती सहायक",
    
    // Navigation
    dashboard: "डैशबोर्ड",
    chat: "चैट",
    activities: "गतिविधियां",
    profile: "प्रोफाइल",
    settings: "सेटिंग्स",
    
    // Profile Setup  
    setupProfile: "अपने खेत की प्रोफाइल सेट करें",
    location: "स्थान",
    selectDistrict: "जिला चुनें",
    landSize: "भूमि का आकार (एकड़)",
    cropType: "मुख्य फसल",
    soilType: "मिट्टी का प्रकार",
    irrigationType: "सिंचाई का प्रकार",
    save: "प्रोफाइल सेव करें",
    
    // Districts in Hindi
    alappuzha: "अलप्पुझा",
    ernakulam: "एर्णाकुलम",
    idukki: "इडुक्की",
    kannur: "कन्नूर", 
    kasaragod: "कासरगोड",
    kollam: "कोल्लम",
    kottayam: "कोट्टायम",
    kozhikode: "कोझिकोड",
    malappuram: "मलप्पुरम",
    palakkad: "पलक्कड़",
    pathanamthitta: "पथानामथिट्टा",
    thiruvananthapuram: "तिरुवनंतपुरम",
    thrissur: "त्रिशूर",
    wayanad: "वायनाड",
    
    // Crops in Hindi
    rice: "चावल",
    coconut: "नारियल",
    pepper: "काली मिर्च",
    cardamom: "इलायची",
    rubber: "रबड़",
    cashew: "काजू",
    banana: "केला",
    ginger: "अदरक", 
    turmeric: "हल्दी",
    vegetables: "सब्जियां",
    
    // Soil Types in Hindi
    laterite: "लैटेराइट",
    alluvial: "जलोढ़",
    black: "काली कपास मिट्टी",
    red: "लाल मिट्टी",
    clayey: "चिकनी मिट्टी",
    sandy: "बलुई मिट्टी",
    
    // Irrigation in Hindi
    rainfed: "वर्षा आधारित",
    drip: "ड्रिप सिंचाई",
    sprinkler: "स्प्रिंकलर",
    flood: "बाढ़ सिंचाई",
    
    // Chat
    askQuestion: "अपनी फसलों के बारे में पूछें...",
    botOnline: "ऑनलाइन • मदद के लिए तैयार",
    
    // Quick Questions
    quickQuestions: "त्वरित प्रश्न",
    whenToPlant: "धान कब बोना चाहिए?",
    pestControl: "कीटों को कैसे नियंत्रित करें?", 
    fertilizer: "कौन सा उर्वरक उपयोग करें?",
    weatherAlert: "मौसम की भविष्यवाणी?",
    soilHealth: "मिट्टी कैसे सुधारें?",
    harvest: "फसल काटने का सबसे अच्छा समय?",
    
    // Activities
    logActivity: "गतिविधि लॉग करें",
    recentActivities: "हाल की गतिविधियां",
    addActivity: "गतिविधि जोड़ें",
    activityType: "गतिविधि का प्रकार",
    description: "विवरण",
    date: "तारीख",
    
    // Activity Types in Hindi
    sowing: "बुआई",
    irrigation: "सिंचाई",
    fertilizing: "खाद डालना",
    pestSpray: "कीट नियंत्रण",
    weeding: "निराई",
    harvesting: "कटाई",
    
    // Dashboard
    welcomeBack: "नमस्ते! 👋🏽 ",
    farmerName: "किसान",
    weatherToday: "आज का मौसम",
    upcomingTasks: "आगामी कार्य",
    recentAdvice: "हाल की सलाह",
    
    // Common
    today: "आज",
    yesterday: "कल",
    thisWeek: "इस सप्ताह",
    loading: "लोड हो रहा है...",
    submit: "जमा करें",
    cancel: "रद्द करें",
    edit: "संपादित करें",
    delete: "हटाएं",
    
    // Language
    language: "भाषा",
    english: "English",
    malayalam: "മലയാളം",
    hindi: "हिन्दी"
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}