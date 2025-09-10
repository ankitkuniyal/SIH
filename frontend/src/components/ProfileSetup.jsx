import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Label } from "./ui/label.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { User, MapPin, Crop, Droplets, Phone, Mail, Calendar, Home } from "lucide-react";

export function ProfileSetup({ onProfileSave, existingProfile }) {
  const { t } = useLanguage();
  
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile data from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/profile');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }
        
        const data = await response.json();
        setProfileData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 pb-20">
        <div className="p-4">
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-800 font-semibold">Loading Profile...</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                <span className="ml-3 text-gray-600">Fetching your profile...</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // If error, show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 pb-20">
        <div className="p-4">
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-gray-800 font-semibold">Profile Error</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-gray-600" />
                </div>
                <p className="text-gray-700 mb-4 font-medium">Failed to load profile: {error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { farmer, farms } = profileData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 pb-20">
      <div className="p-4 space-y-6">
        {/* Farmer Profile Card - Enhanced */}
        <Card className="border-0 shadow-lg bg-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-full -translate-y-4 translate-x-4"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-green-500/5 rounded-full translate-y-2 -translate-x-2"></div>
          <CardHeader className="pb-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg relative z-10">
            <CardTitle className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center ring-2 ring-green-500/20">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-gray-800 font-bold text-lg">Farmer Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6 relative z-10">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-gray-50 p-4 rounded-xl border border-green-100">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="h-3 w-3 text-green-600" />
                  </div>
                  Name
                </Label>
                <p className="text-xl font-bold text-gray-800">{farmer.name}</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-green-50 p-4 rounded-xl border border-gray-200">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <Calendar className="h-3 w-3 text-gray-600" />
                  </div>
                  Age
                </Label>
                <p className="text-xl font-bold text-gray-800">{farmer.age} years</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-gray-50 p-4 rounded-xl border border-green-100">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Phone className="h-3 w-3 text-green-600" />
                  </div>
                  Phone
                </Label>
                <p className="text-xl font-bold text-gray-800">{farmer.phone}</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-green-50 p-4 rounded-xl border border-gray-200">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <Mail className="h-3 w-3 text-gray-600" />
                  </div>
                  Email
                </Label>
                <p className="text-xl font-bold text-gray-800">{farmer.email}</p>
              </div>
            </div>

            {/* Location Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-gray-50 p-4 rounded-xl border border-green-100">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <MapPin className="h-3 w-3 text-green-600" />
                  </div>
                  Location
                </Label>
                <p className="text-lg font-bold text-gray-800">{farmer.village}, {farmer.district}</p>
                <p className="text-sm text-gray-600 mt-1">{farmer.state} - {farmer.pincode}</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-green-50 p-4 rounded-xl border border-gray-200">
                <Label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <Home className="h-3 w-3 text-gray-600" />
                  </div>
                  Language
                </Label>
                <p className="text-xl font-bold text-gray-800 capitalize">{farmer.language}</p>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl text-white">
              <Label className="text-sm font-medium text-green-100 mb-2 block">Experience</Label>
              <p className="text-xl font-bold">{farmer.experience}</p>
            </div>
          </CardContent>
        </Card>

        {/* Farm Details Card - Enhanced */}
        {farms && farms.length > 0 && (
          <Card className="border-0 shadow-lg bg-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -translate-y-2 translate-x-2"></div>
            <CardHeader className="pb-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg relative z-10">
              <CardTitle className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center ring-2 ring-emerald-500/20">
                  <Crop className="h-6 w-6 text-emerald-600" />
                </div>
                <span className="text-gray-800 font-bold text-lg">Farm Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 relative z-10">
              {farms.map((farm, index) => (
                <div key={farm._id || index} className="space-y-6 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-green-50 to-gray-50 p-4 rounded-xl border border-green-100">
                      <Label className="text-sm font-medium text-gray-600 mb-2 block">Land Size</Label>
                      <p className="text-xl font-bold text-gray-800">{farm.landSize} {farm.landUnit}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-50 to-green-50 p-4 rounded-xl border border-gray-200">
                      <Label className="text-sm font-medium text-gray-600 mb-2 block">Soil Type</Label>
                      <p className="text-xl font-bold text-gray-800 capitalize">{farm.soilType}</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-50 to-gray-50 p-4 rounded-xl border border-green-100">
                      <Label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Droplets className="h-3 w-3 text-green-600" />
                        </div>
                        Irrigation
                      </Label>
                      <p className="text-xl font-bold text-gray-800 capitalize">{farm.irrigationType}</p>
                    </div>
                  </div>

                  {farm.waterSource && (
                    <div className="bg-gradient-to-br from-gray-50 to-green-50 p-4 rounded-xl border border-gray-200">
                      <Label className="text-sm font-medium text-gray-600 mb-2 block">Water Source</Label>
                      <p className="text-xl font-bold text-gray-800 capitalize">{farm.waterSource}</p>
                    </div>
                  )}

                  {(farm.primaryCrops && farm.primaryCrops.length > 0) && (
                    <div className="bg-gradient-to-br from-green-50 to-gray-50 p-4 rounded-xl border border-green-100">
                      <Label className="text-sm font-medium text-gray-600 mb-3 block">Primary Crops</Label>
                      <div className="flex flex-wrap gap-2">
                        {farm.primaryCrops.map((crop, cropIndex) => (
                          <span 
                            key={cropIndex}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm font-medium capitalize shadow-sm"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(farm.secondaryCrops && farm.secondaryCrops.length > 0) && (
                    <div className="bg-gradient-to-br from-gray-50 to-green-50 p-4 rounded-xl border border-gray-200">
                      <Label className="text-sm font-medium text-gray-600 mb-3 block">Secondary Crops</Label>
                      <div className="flex flex-wrap gap-2">
                        {farm.secondaryCrops.map((crop, cropIndex) => (
                          <span 
                            key={cropIndex}
                            className="px-4 py-2 bg-gray-600 text-white rounded-full text-sm font-medium capitalize shadow-sm"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons - Enhanced */}
        <div className="flex gap-4">
          <Button 
            onClick={() => setIsEditing(true)} 
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-md"
          >
            Edit Profile
          </Button>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md"
          >
            Refresh
          </Button>
        </div>

        {/* Bottom Spacing */}
        <div className="h-18"></div>
      </div>
    </div>
  );
}
