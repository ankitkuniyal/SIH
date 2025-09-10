import { useState } from "react";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { Send, Mic } from "lucide-react";

export function ChatInput({ onSendMessage, disabled = false }) {
  const { t } = useLanguage();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    <div className="border-t bg-background p-4 pb-20">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('askQuestion')}
            disabled={disabled}
            className="pr-12 rounded-full bg-input-background border-border"
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full p-0"
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          type="submit" 
          size="sm" 
          disabled={!message.trim() || disabled}
          className="rounded-full h-10 w-10 p-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}