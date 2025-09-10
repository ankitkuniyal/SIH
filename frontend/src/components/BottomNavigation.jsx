import { Button } from "./ui/button";
import { MessageCircle, Calendar, Home, User, Settings, Mic } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

export function BottomNavigation({ activeTab, onTabChange }) {
  const { t } = useLanguage();
  
  const tabs = [
    { id: 'dashboard', icon: Home, label: t('dashboard') },
    { id: 'activities', icon: Calendar, label: t('activities') },
    { id: 'chat', icon: Mic, label: t('chat') },
    { id: 'profile', icon: User, label: t('profile') },
    { id: 'settings', icon: Settings, label: t('settings') }
  ];

  return (
    <div
      className="fixed inset-x-0 bottom-0 w-full z-50"
      style={{ paddingBottom: `max(env(safe-area-inset-bottom, 0px), 0px)` }}
    >
      {/* Main Navigation Bar */}
      <div className="bg-white border-t border-gray-200 shadow-2xl px-2 py-2 backdrop-blur-lg bg-white/95">
        <div className="flex justify-between items-center max-w-sm mx-auto sm:max-w-md">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isMicIcon = tab.id === 'chat';
            
            return (
              <Button
                key={tab.id}
                variant="ghost"
                size="sm"
                onClick={() => onTabChange(tab.id)}
                className={`flex flex-col items-center gap-1 h-auto px-2 py-3 min-w-0 flex-1 hover:bg-green-50 transition-all duration-300 ease-in-out active:scale-95 ${
                  isActive ? 'transform -translate-y-1' : ''
                }`}
              >
                <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-green-500 shadow-lg scale-110' 
                    : 'hover:bg-green-100 bg-gray-100'
                }`}>
                  <Icon
                    className={`${isMicIcon ? 'h-6 w-6' : 'h-5 w-5'} transition-all duration-300 ${
                      isActive 
                        ? 'text-white stroke-[2.5]' 
                        : 'text-gray-600 hover:text-green-600 stroke-[2]'
                    }`}
                  />
                </div>
                <span className={`text-xs whitespace-nowrap transition-all duration-300 font-medium truncate max-w-16 ${
                  isActive 
                    ? 'text-green-600 font-semibold' 
                    : 'text-gray-500 hover:text-green-600'
                }`}>
                  {tab.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}