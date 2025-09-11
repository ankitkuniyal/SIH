import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { BottomNavigation } from "./BottomNavigation.jsx";
import { ChatHeader } from "./ChatHeader.jsx";

export function AppLayout() {
  const location = useLocation();
  const showChatHeader = location.pathname === "/chat";
  const navigate = useNavigate();

  // Map bottom nav tab IDs to routes
  const handleTabChange = (tabId) => {
    switch (tabId) {
      case "dashboard":
        navigate("/");
        break;
      case "chat":
        navigate("/chat");
        break;
      case "activities":
        navigate("/activities");
        break;
      case "profile":
        navigate("/profile");
        break;
      case "settings":
        navigate("/settings");
        break;
      default:
        navigate("/");
    }
  };

  // Derive activeTab from route for highlighting in BottomNavigation
  const activeTab =
    location.pathname === "/"
      ? "dashboard"
      : location.pathname.slice(1); // "chat" | "activities" | "profile" | "settings"

  return (
    <div className="h-f flex flex-col bg-white">
      {showChatHeader && <ChatHeader />}
      <div className="flex-1 flex flex-col min-h-0">
        <Outlet />
      </div>
      <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
