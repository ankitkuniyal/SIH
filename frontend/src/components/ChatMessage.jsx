import { Avatar } from "./ui/avatar.jsx";
import { Badge } from "./ui/badge.jsx";

export function ChatMessage({ message, isBot, timestamp, confidence, advisory, isOffline }) {
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
            {advisory && advisory !== message && (
              <div className="mt-2 p-2 bg-green-100 rounded-lg border border-green-200">
                <p className="text-xs font-medium text-green-800 mb-1">Quick Advisory:</p>
                <p className="text-xs text-green-700">{advisory}</p>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-xs text-muted-foreground">{timestamp}</p>

            {isOffline && (
              <Badge variant="outline" className="text-xs text-amber-600 border-amber-200">
                Offline Mode
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