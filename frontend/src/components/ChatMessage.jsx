import { Avatar } from "./ui/avatar.jsx";
import { Badge } from "./ui/badge.jsx";

export function ChatMessage({ message, isBot, timestamp, confidence }) {
  if (isBot) {
    return (
      <div className="flex gap-3 mb-4">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <div className="w-full h-full rounded-full flex items-center justify-center bg-green-100 text-green-600">
            🌱
          </div>
        </Avatar>
        
        <div className="max-w-[75%]">
          <div className="bg-green-50 rounded-2xl rounded-bl-sm px-4 py-3">
            <p className="text-sm">{message}</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-muted-foreground">{timestamp}</p>
            {confidence && (
              <Badge variant="secondary" className="text-xs">
                {Math.round(confidence * 100)}% confident
              </Badge>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-end mb-4">
      <div className="max-w-[75%]">
        <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-3">
          <p className="text-sm">{message}</p>
        </div>
        <p className="text-xs text-muted-foreground text-right mt-1">{timestamp}</p>
      </div>
    </div>
  );
}