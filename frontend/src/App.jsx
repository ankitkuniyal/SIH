import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext.jsx";
import { AppLayout } from "./components/AppLayout.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { ProfileSetup } from "./components/ProfileSetup.jsx";
import { Activities } from "./components/Activities.jsx";
import { Settings } from "./components/Settings.jsx";
import { ChatScreen } from "./components/ChatScreen.jsx";
import RegistrationFlow from "./components/auth/Registration/RegistrationFlow.jsx";

function RoutesContainer() {
  const [farmerProfile, setFarmerProfile] = useState(null);

  const handleProfileSave = (profile) => {
    setFarmerProfile(profile);
  };

    return (
    <Routes>
      {/* Registration routes - without AppLayout (no bottom nav) */}
      <Route path="/register/*" element={<RegistrationFlow />} />
      
      {/* Main app - unchanged */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard farmerName={farmerProfile?.name} />} />
        <Route path="/chat" element={<ChatScreen />} />
        <Route path="/activities" element={<Activities />} />
        <Route
          path="/profile"
          element={
            farmerProfile ? (
              <ProfileSetup
                existingProfile={farmerProfile}
                onProfileSave={handleProfileSave}
              />
            ) : (
              <ProfileSetup onProfileSave={handleProfileSave} />
            )
          }
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <RoutesContainer />
    </LanguageProvider>
  );
}