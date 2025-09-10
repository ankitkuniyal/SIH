import { Avatar } from "./ui/avatar.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export function TypingIndicator() {
  const { t, language } = useLanguage();

  const thinkingText = language === 'ml' 
    ? 'കൃഷി സഹായി ചിന്തിക്കുന്നു...'
    : language === 'hi'
    ? 'कृषि सहायक सोच रहा है...'
    : 'CropBot is thinking...';

  return (
    <div className="flex gap-3 mb-4">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <div className="w-full h-full rounded-full flex items-center justify-center bg-green-100 text-green-600">
          🌱
        </div>
      </Avatar>
      
      <div className="max-w-[75%]">
        <div className="bg-green-50 rounded-2xl rounded-bl-sm px-4 py-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce"></div>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{thinkingText}</p>
      </div>
    </div>
  );
}