// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
// import { Button } from "./ui/button.jsx";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select.jsx";
// import { Switch } from "./ui/switch.jsx";
// import { Label } from "./ui/label.jsx";
// import { useLanguage } from "../contexts/LanguageContext.jsx";
// import { Languages, Bell, Moon, Info, HelpCircle, Shield } from "lucide-react";

// export function Settings() {
//   const { t, language, setLanguage } = useLanguage();

//   const handleLanguageChange = (newLanguage) => {
//     setLanguage(newLanguage);
//   };

//   return (
//     <div className="p-4 space-y-4 pb-16">
//       <h1 className="text-xl font-medium">{t('settings')}</h1>

//       {/* Language Settings */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Languages className="h-5 w-5 text-blue-600" />
//             {t('language')}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-3">
//             <Label>{t('language')}</Label>
//             <Select value={language} onValueChange={handleLanguageChange}>
//               <SelectTrigger
//                 className="
//                   dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800
//                   dark:hover:bg-zinc-900/90
//                   dark:data-[state=open]:bg-zinc-900
//                   dark:focus:ring-zinc-700
//                 "
//               >
//                 <SelectValue />
//               </SelectTrigger>
//               <SelectContent
//                 className="
//                   dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800
//                   dark:shadow-lg dark:shadow-black/30
//                 "
//                 position="popper"
//               >
//                 <SelectItem
//                   value="en"
//                   className="
//                     dark:focus:bg-zinc-800 dark:focus:text-zinc-100
//                     dark:data-[state=checked]:bg-zinc-800
//                   "
//                 >
//                   <div className="flex items-center gap-2">
//                     <span>🇬🇧</span>
//                     {t('english')}
//                   </div>
//                 </SelectItem>
//                 <SelectItem
//                   value="ml"
//                   className="
//                     dark:focus:bg-zinc-800 dark:focus:text-zinc-100
//                     dark:data-[state=checked]:bg-zinc-800
//                   "
//                 >
//                   <div className="flex items-center gap-2">
//                     <span>🇮🇳</span>
//                     {t('malayalam')}
//                   </div>
//                 </SelectItem>
//                 <SelectItem
//                   value="hi"
//                   className="
//                     dark:focus:bg-zinc-800 dark:focus:text-zinc-100
//                     dark:data-[state=checked]:bg-zinc-800
//                   "
//                 >
//                   <div className="flex items-center gap-2">
//                     <span>🇮🇳</span>
//                     {t('hindi')}
//                   </div>
//                 </SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Notification Settings */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Bell className="h-5 w-5 text-yellow-600" />
//             {language === 'ml' ? 'അറിയിപ്പുകൾ' : language === 'hi' ? 'सूचनाएं' : 'Notifications'}
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <Label>
//                 {language === 'ml' ? 'കാലാവസ്ഥാ അലർട്ടുകൾ' : 
//                  language === 'hi' ? 'मौसम अलर्ट' : 'Weather Alerts'}
//               </Label>
//               <p className="text-sm text-muted-foreground">
//                 {language === 'ml' ? 'കാലാവസ്ഥാ മാറ്റങ്ങളെക്കുറിച്ച് അറിയിപ്പുകൾ' :
//                  language === 'hi' ? 'मौसम बदलाव की सूचनाएं' :
//                  'Get notified about weather changes'}
//               </p>
//             </div>
//             <Switch defaultChecked />
//           </div>
          
//           <div className="flex items-center justify-between">
//             <div>
//               <Label>
//                 {language === 'ml' ? 'കൃഷി ഓർമ്മപ്പെടുത്തലുകൾ' :
//                  language === 'hi' ? 'खेती रिमाइंडर' :
//                  'Farming Reminders'}
//               </Label>
//               <p className="text-sm text-muted-foreground">
//                 {language === 'ml' ? 'കൃഷി പ്രവർത്തനങ്ങളുടെ ഓർമ്മപ്പെടുത്തലുകൾ' :
//                  language === 'hi' ? 'खेती के कामों की रिमाइंडर' :
//                  'Reminders for farming activities'}
//               </p>
//             </div>
//             <Switch defaultChecked />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <Label>
//                 {language === 'ml' ? 'വില അപ്ഡേറ്റുകൾ' :
//                  language === 'hi' ? 'कीमत अपडेट' :
//                  'Price Updates'}
//               </Label>
//               <p className="text-sm text-muted-foreground">
//                 {language === 'ml' ? 'വിള വിലയിലുള്ള മാറ്റങ്ങൾ' :
//                  language === 'hi' ? 'फसल की कीमत में बदलाव' :
//                  'Market price changes for your crops'}
//               </p>
//             </div>
//             <Switch />
//           </div>
//         </CardContent>
//       </Card>

//       {/* App Preferences */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Moon className="h-5 w-5 text-purple-600" />
//             {language === 'ml' ? 'ആപ്പ് മുൻഗണനകൾ' : 
//              language === 'hi' ? 'ऐप प्राथमिकताएं' : 'App Preferences'}
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <Label>
//                 {language === 'ml' ? 'ഡാർക്ക് മോഡ്' :
//                  language === 'hi' ? 'डार्क मोड' :
//                  'Dark Mode'}
//               </Label>
//               <p className="text-sm text-muted-foreground">
//                 {language === 'ml' ? 'ഇരുണ്ട തീം ഉപയോഗിക്കുക' :
//                  language === 'hi' ? 'डार्क थीम का उपयोग करें' :
//                  'Use dark theme'}
//               </p>
//             </div>
//             <Switch />
//           </div>

//           <div className="flex items-center justify-between">
//             <div>
//               <Label>
//                 {language === 'ml' ? 'ഓഫ്‌ലൈൻ മോഡ്' :
//                  language === 'hi' ? 'ऑफलाइन मोड' :
//                  'Offline Mode'}
//               </Label>
//               <p className="text-sm text-muted-foreground">
//                 {language === 'ml' ? 'ഇന്റർനെറ്റ് ഇല്ലാതെ ഉപയോഗിക്കുക' :
//                  language === 'hi' ? 'इंटरनेट के बिना उपयोग करें' :
//                  'Use app without internet'}
//               </p>
//             </div>
//             <Switch defaultChecked />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Support & Info */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <HelpCircle className="h-5 w-5 text-green-600" />
//             {language === 'ml' ? 'സഹായവും വിവരങ്ങളും' :
//              language === 'hi' ? 'सहायता और जानकारी' :
//              'Support & Information'}
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           <Button variant="outline" className="w-full justify-start" size="sm">
//             <HelpCircle className="h-4 w-4 mr-2" />
//             {language === 'ml' ? 'സഹായം ലഭിക്കുക' :
//              language === 'hi' ? 'सहायता प्राप्त करें' :
//              'Get Help'}
//           </Button>
          
//           <Button variant="outline" className="w-full justify-start" size="sm">
//             <Info className="h-4 w-4 mr-2" />
//             {language === 'ml' ? 'ആപ്പിനെക്കുറിച്ച്' :
//              language === 'hi' ? 'ऐप के बारे में' :
//              'About App'}
//           </Button>

//           <Button variant="outline" className="w-full justify-start" size="sm">
//             <Shield className="h-4 w-4 mr-2" />
//             {language === 'ml' ? 'സ്വകാര്യതാ നയം' :
//              language === 'hi' ? 'गोपनीयता नीति' :
//              'Privacy Policy'}
//           </Button>
//         </CardContent>
//       </Card>

//       {/* App Info */}
//       <Card>
//         <CardContent className="pt-6 px-3 pb-16 space-y-4">
//           <div className="text-center space-y-2 mb-4">
//             <h3 className="font-medium">കൃഷി സഹായി</h3>
//             <p className="text-sm text-muted-foreground">
//               {language === 'ml' ? 'പതിപ്പ് 1.0.0' :
//                language === 'hi' ? 'संस्करण 1.0.0' :
//                'Version 1.0.0'}
//             </p>
//             <p className="text-xs text-muted-foreground space-y-3">
//               {language === 'ml' ? 'കേരള കർഷകർക്കുള്ള AI സഹായി' :
//                language === 'hi' ? 'केरल के किसानों के लिए AI सहायक' :
//                'AI Assistant for Kerala Farmers'}
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }























import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Languages, Bell, Moon, Info, HelpCircle, Shield, LogOut } from "lucide-react";

export function Settings() {
  const { t, language, setLanguage } = useLanguage();

  // State for toggles
  const [toggles, setToggles] = useState({
    weatherAlerts: true,
    farmingReminders: true,
    priceUpdates: false,
    darkMode: false,
    offlineMode: true
  });

  const handleToggle = (key) => {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSignOut = () => {
    console.log("Sign out clicked");
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="px-4 py-6 space-y-6 pb-24 max-w-sm mx-auto sm:max-w-md md:max-w-lg lg:max-w-4xl">
        <div className="pt-4 space-y-4">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-semibold text-gray-900">{t('settings')}</h1>
            <p className="text-gray-600 mt-1">Manage your app preferences</p>
          </div>
         
        </div>

        {/* Language Settings */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-sky-50 border-b border-blue-100">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Languages className="h-5 w-5" />
              {t('language')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-3">
              <Label className="text-gray-700">{t('language')}</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="border-gray-200 focus:border-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200 shadow-xl">
                  <SelectItem value="en" className="hover:bg-green-50 focus:bg-green-50">
                    <div className="flex items-center gap-2">
                      <span>🇬🇧</span>
                      {t('english')}
                    </div>
                  </SelectItem>
                  <SelectItem value="ml" className="hover:bg-green-50 focus:bg-green-50">
                    <div className="flex items-center gap-2">
                      <span>🇮🇳</span>
                      {t('malayalam')}
                    </div>
                  </SelectItem>
                  <SelectItem value="hi" className="hover:bg-green-50 focus:bg-green-50">
                    <div className="flex items-center gap-2">
                      <span>🇮🇳</span>
                      {t('hindi')}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-yellow-100">
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <Bell className="h-5 w-5" />
              {language === 'ml' ? 'അറിയിപ്പുകൾ' : language === 'hi' ? 'सूचनाएं' : 'Notifications'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-lg">
              <div className="flex-1 min-w-0 pr-4">
                <Label className="text-gray-900 font-medium">
                  {language === 'ml' ? 'കാലാവസ്ഥാ അലർട്ടുകൾ' : 
                   language === 'hi' ? 'मौसम अलर्ट' : 'Weather Alerts'}
                </Label>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {language === 'ml' ? 'കാലാവസ്ഥാ മാറ്റങ്ങളെക്കുറിച്ച് അറിയിപ്പുകൾ' :
                   language === 'hi' ? 'मौसम बदलाव की सूचनाएं' :
                   'Get notified about weather changes'}
                </p>
              </div>
              <div 
                onClick={() => handleToggle('weatherAlerts')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                  toggles.weatherAlerts ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  toggles.weatherAlerts ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-lg">
              <div className="flex-1 min-w-0 pr-4">
                <Label className="text-gray-900 font-medium">
                  {language === 'ml' ? 'കൃഷി ഓർമ്മപ്പെടുത്തലുകൾ' :
                   language === 'hi' ? 'खेती रिमाइंडर' :
                   'Farming Reminders'}
                </Label>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {language === 'ml' ? 'കൃഷി പ്രവർത്തനങ്ങളുടെ ഓർമ്മപ്പെടുത്തലുകൾ' :
                   language === 'hi' ? 'खेती के कामों की रिमाइंडर' :
                   'Reminders for farming activities'}
                </p>
              </div>
              <div 
                onClick={() => handleToggle('farmingReminders')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                  toggles.farmingReminders ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  toggles.farmingReminders ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </div>
            </div>

            <div className="flex items-center justify-between p-5 bg-gray-50 rounded-lg">
              <div className="flex-1 min-w-0 pr-4">
                <Label className="text-gray-900 font-medium">
                  {language === 'ml' ? 'വില അപ്ഡേറ്റുകൾ' :
                   language === 'hi' ? 'कीमत अपडेट' :
                   'Price Updates'}
                </Label>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {language === 'ml' ? 'വിള വിലയിലുള്ള മാറ്റങ്ങൾ' :
                   language === 'hi' ? 'फसल की कीमत में बदलाव' :
                   'Market price changes for your crops'}
                </p>
              </div>
              <div 
                onClick={() => handleToggle('priceUpdates')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                  toggles.priceUpdates ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  toggles.priceUpdates ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <Moon className="h-5 w-5" />
              {language === 'ml' ? 'ആപ്പ് മുൻഗണനകൾ' : 
               language === 'hi' ? 'ऐप प्राथमिकताएं' : 'App Preferences'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label className="text-gray-900">
                  {language === 'ml' ? 'ഡാർക്ക് മോഡ്' :
                   language === 'hi' ? 'डार्क मोड' :
                   'Dark Mode'}
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  {language === 'ml' ? 'ഇരുണ്ട തീം ഉപയോഗിക്കുക' :
                   language === 'hi' ? 'डार्क थीम का उपयोग करें' :
                   'Use dark theme'}
                </p>
              </div>
              <div 
                onClick={() => handleToggle('darkMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                  toggles.darkMode ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  toggles.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <Label className="text-gray-900">
                  {language === 'ml' ? 'ഓഫ്‌ലൈൻ മോഡ്' :
                   language === 'hi' ? 'ऑफलाइन मोड' :
                   'Offline Mode'}
                </Label>
                <p className="text-sm text-gray-600 mt-1">
                  {language === 'ml' ? 'ഇന്റർനെറ്റ് ഇല്ലാതെ ഉപയോഗിക്കുക' :
                   language === 'hi' ? 'इंटरनेट के बिना उपयोग करें' :
                   'Use app without internet'}
                </p>
              </div>
              <div 
                onClick={() => handleToggle('offlineMode')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                  toggles.offlineMode ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  toggles.offlineMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support & Info */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <HelpCircle className="h-5 w-5" />
                {language === 'ml' ? 'സഹായവും വിവരങ്ങളും' :
                 language === 'hi' ? 'सहायता और जानकारी' :
                 'Support & Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-3">
              <Button variant="outline" className="w-full justify-start border-gray-200 hover:bg-green-50" size="sm">
                <HelpCircle className="h-4 w-4 mr-2" />
                {language === 'ml' ? 'സഹായം ലഭിക്കുക' :
                 language === 'hi' ? 'सहायता प्राप्त करें' :
                 'Get Help'}
              </Button>
              
              <Button variant="outline" className="w-full justify-start border-gray-200 hover:bg-green-50" size="sm">
                <Info className="h-4 w-4 mr-2" />
                {language === 'ml' ? 'ആപ്പിനെക്കുറിച്ച്' :
                 language === 'hi' ? 'ऐप के बारे में' :
                 'About App'}
              </Button>

              <Button variant="outline" className="w-full justify-start border-gray-200 hover:bg-green-50" size="sm">
                <Shield className="h-4 w-4 mr-2" />
                {language === 'ml' ? 'സ്വകാര്യതാ നയം' :
                 language === 'hi' ? 'गोपनीयता नीति' :
                 'Privacy Policy'}
              </Button>
            </CardContent>
          </Card>
          <Button 
            onClick={async () => {
              if (window.gapi && window.gapi.auth2) {
                const auth2 = window.gapi.auth2.getAuthInstance();
                if (auth2) {
            await auth2.signOut();
            await auth2.disconnect();
                }
              }
              // Optionally clear local app state, redirect, etc.
              handleSignOut();
            }}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 bg-white border-amber-50 text-red-600 hover:bg-red-50 h-12 active:scale-95 transition-transform"
          >
            <LogOut className="h-4 w-4 border-b-amber-50" />
            Sign Out
          </Button>

          {/* App Info */}
        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-100 to-emerald-100 mb-5">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="font-semibold text-green-800 mb-2">കൃഷി സഹായി</h3>
            <p className="text-sm text-green-700 mb-2">
              {language === 'ml' ? 'പതിപ്പ് 1.0.0' :
               language === 'hi' ? 'संस्करण 1.0.0' :
               'Version 1.0.0'}
            </p>
            <p className="text-xs text-green-600">
              {language === 'ml' ? 'കേരള കർഷകർക്കുള്ള AI സഹായി' :
               language === 'hi' ? 'केरल के किसानों के लिए AI सहायक' :
               'AI Assistant for Kerala Farmers'}
            </p>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
}