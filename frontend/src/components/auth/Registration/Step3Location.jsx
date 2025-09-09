import React, { useState } from 'react';

const Step3Location = ({ formData, updateFormData, onNext, onPrev }) => {
  const [errors, setErrors] = useState({});
  const [loadingLoc, setLoadingLoc] = useState(false);

  // Full list of Indian states (can modify as needed)
  const indianStates = [
    'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh',
    'Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka',
    'Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram',
    'Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana',
    'Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu and Kashmir',
    'Ladakh'
  ];

  const keralaDistricts = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam',
    'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode',
    'Wayanad', 'Kannur', 'Kasaragod'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Enhanced reverse geocoding to autofill all location fields including village
  const reverseGeocode = async (lat, lng) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.address) {
        const address = data.address;
        let state = address.state || '';
        let district = address.county || address.town || address.city || '';

        // Try multiple keys to get proper village/locality info
        let village = address.village 
                      || address.hamlet 
                      || address.suburb 
                      || address.neighbourhood 
                      || address.town 
                      || address.city_district 
                      || '';

        let postcode = address.postcode || '';

        // Normalize district to Kerala district if state is Kerala
        if (state.toLowerCase() === 'kerala') {
          const matchedDistrict = keralaDistricts.find(d => district.toLowerCase().includes(d.toLowerCase()));
          if (matchedDistrict) district = matchedDistrict;
        }

        updateFormData({
          state,
          district,
          village,
          pincode: postcode
        });
      }
    } catch (error) {
      console.error('Reverse geocoding failed:', error);
      alert('Failed to auto-fill location details.');
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoadingLoc(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          updateFormData({
            coordinates: { lat, lng }
          });

          await reverseGeocode(lat, lng);

          setLoadingLoc(false);
          alert('Location captured! / ലൊക്കേഷൻ കിട്ടി!');
        },
        (error) => {
          setLoadingLoc(false);
          alert('Could not get location / ലൊക്കേഷൻ കിട്ടിയില്ല');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.state) newErrors.state = 'State is required / സംസ്ഥാനത്തെ തിരഞ്ഞെടുക്കുക';
    if (!formData.district) newErrors.district = 'District is required / ജില്ല ആവശ്യമാണ്';
    if (!formData.village.trim()) newErrors.village = 'Village/Town is required / ഗ്രാമം ആവശ്യമാണ്';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required / പിൻകോഡ് ആവശ്യമാണ്';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  // District input type depends on selected state
  const isKeralaSelected = formData.state?.toLowerCase() === 'kerala';

  return (
    <div className="step-container">
      <h2>Location Details / സ്ഥല വിവരങ്ങൾ</h2>
      
      <div className="form-group">
        <label>State / സംസ്ഥാന *</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className={errors.state ? 'error' : ''}
        >
          <option value="">Select State / സംസ്ഥാനത്തെ തെരഞ്ഞെടുക്കുക</option>
          {indianStates.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {errors.state && <span className="error-text">{errors.state}</span>}
      </div>

      <div className="form-group">
        <label>District / ജില്ല *</label>
        {isKeralaSelected ? (
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className={errors.district ? 'error' : ''}
          >
            <option value="">Select District / ജില്ല തിരഞ്ഞെടുക്കുക</option>
            {keralaDistricts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            placeholder="Enter district"
            className={errors.district ? 'error' : ''}
          />
        )}
        {errors.district && <span className="error-text">{errors.district}</span>}
      </div>

      <div className="form-group">
        <label>Village/Town / ഗ്രാമം/പട്ടണം *</label>
        <input
          type="text"
          name="village"
          value={formData.village}
          onChange={handleChange}
          placeholder="Enter village or town name"
          className={errors.village ? 'error' : ''}
        />
        {errors.village && <span className="error-text">{errors.village}</span>}
      </div>

      <div className="form-group">
        <label>Pincode / പിൻകോഡ് *</label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          placeholder="6-digit pincode"
          pattern="[0-9]{6}"
          className={errors.pincode ? 'error' : ''}
        />
        {errors.pincode && <span className="error-text">{errors.pincode}</span>}
      </div>

      <div className="form-group">
        <button 
          className="location-btn" 
          onClick={getCurrentLocation}
          disabled={loadingLoc}
        >
          {loadingLoc ? 'Getting location...' : '📍 Get Current Location / നിലവിലെ സ്ഥാനം എടുക്കുക'}
        </button>
        {formData.coordinates.lat && (
          <p className="location-info">
            ✅ Location captured: {formData.coordinates.lat.toFixed(4)}, {formData.coordinates.lng.toFixed(4)}
          </p>
        )}
      </div>

      <div className="button-group">
        <button className="primary-btn" onClick={handleNext}>Next</button>
        <button className="secondary-btn" onClick={onPrev}>Back</button>
      </div>
    </div>
  );
};

export default Step3Location;
