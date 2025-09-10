import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Label } from "./ui/label.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { User, MapPin, Crop, Droplets } from "lucide-react";

export function ProfileSetup({ onProfileSave, existingProfile }) {
  const { t } = useLanguage();
  
  const [profile, setProfile] = useState(existingProfile || {
    name: "",
    district: "",
    landSize: "",
    cropType: "",
    soilType: "",
    irrigationType: ""
  });

  const districts = [
    'alappuzha', 'ernakulam', 'idukki', 'kannur', 'kasaragod', 'kollam',
    'kottayam', 'kozhikode', 'malappuram', 'palakkad', 'pathanamthitta',
    'thiruvananthapuram', 'thrissur', 'wayanad'
  ];

  const crops = [
    'rice', 'coconut', 'pepper', 'cardamom', 'rubber', 'cashew',
    'banana', 'ginger', 'turmeric', 'vegetables'
  ];

  const soilTypes = [
    'laterite', 'alluvial', 'black', 'red', 'clayey', 'sandy'
  ];

  const irrigationTypes = [
    'drained', 'drip', 'sprinkler', 'flood'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onProfileSave(profile);
  };

  const updateProfile = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = Object.values(profile).every(value => value.trim() !== "");

  return (
    <div className="p-4">
      <Card className="rounded-lg border shadow-sm overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-green-600" />
            {t('setupProfile')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Farmer Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                {t('language') === 'ml' ? 'പേര്' : t('language') === 'hi' ? 'नाम' : 'Name'}
              </Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => updateProfile('name', e.target.value)}
                placeholder={t('language') === 'ml' ? 'നിങ്ങളുടെ പേര്' : t('language') === 'hi' ? 'आपका नाम' : 'Enter your name'}
              />
            </div>

            {/* District */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {t('location')}
              </Label>
              <Select value={profile.district} onValueChange={(value) => updateProfile('district', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('selectDistrict')} />
                </SelectTrigger>
                <SelectContent
                  side="bottom"
                  sideOffset={4}
                  className="rounded-md border bg-neutral-900 text-neutral-100 shadow-md"
                >
                  {districts.map((district) => (
                    <SelectItem
                      key={district}
                      value={district}
                      className="data-[highlighted]:bg-neutral-800 data-[highlighted]:text-white data-[state=checked]:bg-neutral-800 focus:bg-neutral-800 focus:text-white"
                    >
                      {t(district)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Land Size */}
            <div className="space-y-2">
              <Label htmlFor="landSize">{t('landSize')}</Label>
              <Input
                id="landSize"
                type="number"
                step="0.1"
                value={profile.landSize}
                onChange={(e) => updateProfile('landSize', e.target.value)}
                placeholder="0.5"
              />
            </div>

            {/* Primary Crop */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Crop className="h-4 w-4" />
                {t('cropType')}
              </Label>
              <Select value={profile.cropType} onValueChange={(value) => updateProfile('cropType', value)}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={`${
                      t('language') === 'ml' ? 'വിള തിരഞ്ഞെടുക്കുക' : t('language') === 'hi' ? 'फसल चुनें' : 'Select crop'
                    }`}
                  />
                </SelectTrigger>
                <SelectContent
                  side="bottom"
                  sideOffset={4}
                  className="rounded-md border bg-neutral-900 text-neutral-100 shadow-md"
                >
                  {crops.map((crop) => (
                    <SelectItem
                      key={crop}
                      value={crop}
                      className="data-[highlighted]:bg-neutral-800 data-[highlighted]:text-white data-[state=checked]:bg-neutral-800 focus:bg-neutral-800 focus:text-white"
                    >
                      {t(crop)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Soil Type */}
            <div className="space-y-2">
              <Label>{t('soilType')}</Label>
              <Select value={profile.soilType} onValueChange={(value) => updateProfile('soilType', value)}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={`${
                      t('language') === 'ml' ? 'മണ്ണിന്റെ തരം തിരഞ്ഞെടുക്കുക' : t('language') === 'hi' ? 'मिट्टी का प्रकार चुनें' : 'Select soil type'
                    }`}
                  />
                </SelectTrigger>
                <SelectContent
                  side="bottom"
                  sideOffset={4}
                  className="rounded-md border bg-neutral-900 text-neutral-100 shadow-md"
                >
                  {soilTypes.map((soil) => (
                    <SelectItem
                      key={soil}
                      value={soil}
                      className="data-[highlighted]:bg-neutral-800 data-[highlighted]:text-white data-[state=checked]:bg-neutral-800 focus:bg-neutral-800 focus:text-white"
                    >
                      {t(soil)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Irrigation Type */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                {t('irrigationType')}
              </Label>
              <Select value={profile.irrigationType} onValueChange={(value) => updateProfile('irrigationType', value)}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={`${
                      t('language') === 'ml' ? 'ജലസേചന രീതി തിരഞ്ഞെടുക്കുക' : t('language') === 'hi' ? 'सिंचाई प्रकार चुनें' : 'Select irrigation type'
                    }`}
                  />
                </SelectTrigger>
                <SelectContent
                  side="bottom"
                  sideOffset={4}
                  className="rounded-md border bg-neutral-900 text-neutral-100 shadow-md"
                >
                  {irrigationTypes.map((irrigation) => (
                    <SelectItem
                      key={irrigation}
                      value={irrigation}
                      className="data-[highlighted]:bg-neutral-800 data-[highlighted]:text-white data-[state=checked]:bg-neutral-800 focus:bg-neutral-800 focus:text-white"
                    >
                      {t(irrigation)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full" disabled={!isFormValid}>
              {t('save')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
