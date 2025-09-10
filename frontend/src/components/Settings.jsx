import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select.jsx";
import { Switch } from "./ui/switch.jsx";
import { Label } from "./ui/label.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { Languages, Bell, Moon, Info, HelpCircle, Shield } from "lucide-react";

export function Settings() {
  const { t, language, setLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="p-4 space-y-4 pb-16">
      <h1 className="text-xl font-medium">{t('settings')}</h1>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-blue-600" />
            {t('language')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label>{t('language')}</Label>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger
                className="
                  dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800
                  dark:hover:bg-zinc-900/90
                  dark:data-[state=open]:bg-zinc-900
                  dark:focus:ring-zinc-700
                "
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent
                className="
                  dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-800
                  dark:shadow-lg dark:shadow-black/30
                "
                position="popper"
              >
                <SelectItem
                  value="en"
                  className="
                    dark:focus:bg-zinc-800 dark:focus:text-zinc-100
                    dark:data-[state=checked]:bg-zinc-800
                  "
                >
                  <div className="flex items-center gap-2">
                    <span>🇬🇧</span>
                    {t('english')}
                  </div>
                </SelectItem>
                <SelectItem
                  value="ml"
                  className="
                    dark:focus:bg-zinc-800 dark:focus:text-zinc-100
                    dark:data-[state=checked]:bg-zinc-800
                  "
                >
                  <div className="flex items-center gap-2">
                    <span>🇮🇳</span>
                    {t('malayalam')}
                  </div>
                </SelectItem>
                <SelectItem
                  value="hi"
                  className="
                    dark:focus:bg-zinc-800 dark:focus:text-zinc-100
                    dark:data-[state=checked]:bg-zinc-800
                  "
                >
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-yellow-600" />
            {language === 'ml' ? 'അറിയിപ്പുകൾ' : language === 'hi' ? 'सूचनाएं' : 'Notifications'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>
                {language === 'ml' ? 'കാലാവസ്ഥാ അലർട്ടുകൾ' : 
                 language === 'hi' ? 'मौसम अलर्ट' : 'Weather Alerts'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {language === 'ml' ? 'കാലാവസ്ഥാ മാറ്റങ്ങളെക്കുറിച്ച് അറിയിപ്പുകൾ' :
                 language === 'hi' ? 'मौसम बदलाव की सूचनाएं' :
                 'Get notified about weather changes'}
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>
                {language === 'ml' ? 'കൃഷി ഓർമ്മപ്പെടുത്തലുകൾ' :
                 language === 'hi' ? 'खेती रिमाइंडर' :
                 'Farming Reminders'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {language === 'ml' ? 'കൃഷി പ്രവർത്തനങ്ങളുടെ ഓർമ്മപ്പെടുത്തലുകൾ' :
                 language === 'hi' ? 'खेती के कामों की रिमाइंडर' :
                 'Reminders for farming activities'}
              </p>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>
                {language === 'ml' ? 'വില അപ്ഡേറ്റുകൾ' :
                 language === 'hi' ? 'कीमत अपडेट' :
                 'Price Updates'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {language === 'ml' ? 'വിള വിലയിലുള്ള മാറ്റങ്ങൾ' :
                 language === 'hi' ? 'फसल की कीमत में बदलाव' :
                 'Market price changes for your crops'}
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* App Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-purple-600" />
            {language === 'ml' ? 'ആപ്പ് മുൻഗണനകൾ' : 
             language === 'hi' ? 'ऐप प्राथमिकताएं' : 'App Preferences'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>
                {language === 'ml' ? 'ഡാർക്ക് മോഡ്' :
                 language === 'hi' ? 'डार्क मोड' :
                 'Dark Mode'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {language === 'ml' ? 'ഇരുണ്ട തീം ഉപയോഗിക്കുക' :
                 language === 'hi' ? 'डार्क थीम का उपयोग करें' :
                 'Use dark theme'}
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>
                {language === 'ml' ? 'ഓഫ്‌ലൈൻ മോഡ്' :
                 language === 'hi' ? 'ऑफलाइन मोड' :
                 'Offline Mode'}
              </Label>
              <p className="text-sm text-muted-foreground">
                {language === 'ml' ? 'ഇന്റർനെറ്റ് ഇല്ലാതെ ഉപയോഗിക്കുക' :
                 language === 'hi' ? 'इंटरनेट के बिना उपयोग करें' :
                 'Use app without internet'}
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Support & Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-green-600" />
            {language === 'ml' ? 'സഹായവും വിവരങ്ങളും' :
             language === 'hi' ? 'सहायता और जानकारी' :
             'Support & Information'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start" size="sm">
            <HelpCircle className="h-4 w-4 mr-2" />
            {language === 'ml' ? 'സഹായം ലഭിക്കുക' :
             language === 'hi' ? 'सहायता प्राप्त करें' :
             'Get Help'}
          </Button>
          
          <Button variant="outline" className="w-full justify-start" size="sm">
            <Info className="h-4 w-4 mr-2" />
            {language === 'ml' ? 'ആപ്പിനെക്കുറിച്ച്' :
             language === 'hi' ? 'ऐप के बारे में' :
             'About App'}
          </Button>

          <Button variant="outline" className="w-full justify-start" size="sm">
            <Shield className="h-4 w-4 mr-2" />
            {language === 'ml' ? 'സ്വകാര്യതാ നയം' :
             language === 'hi' ? 'गोपनीयता नीति' :
             'Privacy Policy'}
          </Button>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card>
        <CardContent className="pt-6 px-3 pb-16 space-y-4">
          <div className="text-center space-y-2 mb-4">
            <h3 className="font-medium">കൃഷി സഹായി</h3>
            <p className="text-sm text-muted-foreground">
              {language === 'ml' ? 'പതിപ്പ് 1.0.0' :
               language === 'hi' ? 'संस्करण 1.0.0' :
               'Version 1.0.0'}
            </p>
            <p className="text-xs text-muted-foreground space-y-3">
              {language === 'ml' ? 'കേരള കർഷകർക്കുള്ള AI സഹായി' :
               language === 'hi' ? 'केरल के किसानों के लिए AI सहायक' :
               'AI Assistant for Kerala Farmers'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
