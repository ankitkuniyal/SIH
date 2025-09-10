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
      <div className="p-4">
        <Card className="rounded-lg border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-green-600" />
              Loading Profile...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If error, show error state
  if (error) {
    return (
      <div className="p-4">
        <Card className="rounded-lg border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <User className="h-5 w-5" />
              Profile Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-8">
              <p className="text-red-600 mb-4">Failed to load profile: {error}</p>
              <Button onClick={() => window.location.reload()} variant="outline">
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { farmer, farms } = profileData;

  return (
    <div className="p-4 space-y-4">
      {/* Farmer Profile Card */}
      <Card className="rounded-lg border shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-green-600" />
            Farmer Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <User className="h-4 w-4" />
                Name
              </Label>
              <p className="text-lg font-semibold">{farmer.name}</p>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Calendar className="h-4 w-4" />
                Age
              </Label>
              <p className="text-lg">{farmer.age} years</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Phone className="h-4 w-4" />
                Phone
              </Label>
              <p className="text-lg">{farmer.phone}</p>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <p className="text-lg">{farmer.email}</p>
            </div>
          </div>

          {/* Location Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <p className="text-lg">{farmer.village}, {farmer.district}</p>
              <p className="text-sm text-gray-500">{farmer.state} - {farmer.pincode}</p>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <Home className="h-4 w-4" />
                Language
              </Label>
              <p className="text-lg capitalize">{farmer.language}</p>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-600">Experience</Label>
            <p className="text-lg">{farmer.experience}</p>
          </div>
        </CardContent>
      </Card>

      {/* Farm Details Card */}
      {farms && farms.length > 0 && (
        <Card className="rounded-lg border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crop className="h-5 w-5 text-green-600" />
              Farm Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {farms.map((farm, index) => (
              <div key={farm._id || index} className="space-y-4 pb-4 border-b border-gray-200 last:border-b-0 last:pb-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Land Size</Label>
                    <p className="text-lg">{farm.landSize} {farm.landUnit}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Soil Type</Label>
                    <p className="text-lg capitalize">{farm.soilType}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                      <Droplets className="h-4 w-4" />
                      Irrigation
                    </Label>
                    <p className="text-lg capitalize">{farm.irrigationType}</p>
                  </div>
                </div>

                {farm.waterSource && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Water Source</Label>
                    <p className="text-lg capitalize">{farm.waterSource}</p>
                  </div>
                )}

                {(farm.primaryCrops && farm.primaryCrops.length > 0) && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Primary Crops</Label>
                    <div className="flex flex-wrap gap-2">
                      {farm.primaryCrops.map((crop, cropIndex) => (
                        <span 
                          key={cropIndex}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm capitalize"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {(farm.secondaryCrops && farm.secondaryCrops.length > 0) && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">Secondary Crops</Label>
                    <div className="flex flex-wrap gap-2">
                      {farm.secondaryCrops.map((crop, cropIndex) => (
                        <span 
                          key={cropIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize"
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

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button 
          onClick={() => setIsEditing(true)} 
          className="flex-1"
          variant="outline"
        >
          Edit Profile
        </Button>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline"
        >
          Refresh
        </Button>
      </div>
    </div>
  );
}
