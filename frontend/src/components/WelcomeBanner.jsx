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
        <div>
          <h2 className="font-medium">{t("appName")}</h2>
          <p className="text-sm text-muted-foreground">{t("tagline")}</p>
        </div>
      </div>
      <ImageWithFallback
        src="https://images.unsplash.com/photo-1625110110679-f0a5659e32b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBmYXJtaW5nJTIwYWdyaWN1bHR1cmUlMjBwYWRkeXxlbnwxfHx8fDE3NTc0MDM3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
        alt="Kerala farming"
        className="w-full h-32 object-cover rounded-md"
      />
    </div>
  );
}
