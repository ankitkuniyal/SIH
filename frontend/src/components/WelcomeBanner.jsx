import { useLanguage } from "../contexts/LanguageContext.jsx";
import ImageWithFallback from "./figma/ImageWithFallback.jsx";

export function WelcomeBanner() {
  const { t } = useLanguage();

  return (
    <div className="mb-6 rounded-lg overflow-hidden bg-gradient-to-r from-green-50 to-blue-50 p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-green-600">🌾</span>
        </div>
        <div >
          <div className="flex justify-start">
            <h2 className="font-medium">{t("appName")}</h2>
          </div>
          
          <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          
        </div>
        
      </div>
      
    </div>
  );
}