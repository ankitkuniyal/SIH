import { Button } from "./ui/button.jsx";
import { MessageCircle, Calendar, Home, User, Settings, Mic } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext.jsx";

export function BottomNavigation({ activeTab, onTabChange }) {
  const { t } = useLanguage();

  // Activities is moved before Profile per request
  const tabs = [
    { id: 'dashboard', icon: Home, label: t('dashboard') },
    { id: 'activities', icon: Calendar, label: t('activities') }, // moved up
    { id: 'chat', icon: Mic, label: t('chat') },
    { id: 'profile', icon: User, label: t('profile') },           // moved down
    { id: 'settings', icon: Settings, label: t('settings') }
  ];

  return (
    <div
      className="fixed inset-x-0 bottom-0 w-full z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 0px)" }}
    >
      <div className="flex justify-around items-center py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isMic = tab.id === 'chat';

          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon
                className={`${
                  isMic ? 'h-8 w-8' : 'h-5 w-5'
                } ${isActive ? 'text-primary' : ''}`}
                style={isMic ? { color: 'green' } : undefined}
              />
              <span className="text-xs">{tab.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
