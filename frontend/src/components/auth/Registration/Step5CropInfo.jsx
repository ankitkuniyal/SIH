import React, { useState } from 'react';

const Step5CropInfo = ({ formData, updateFormData, onNext, onPrev }) => {
  const [errors, setErrors] = useState({});
  const [customPrimaryCrop, setCustomPrimaryCrop] = useState('');
  const [customSecondaryCrop, setCustomSecondaryCrop] = useState('');

  const keralaCrops = [
    'Rice / അരി', 'Coconut / തെങ്ങ്', 'Rubber / റബ്ബർ', 'Pepper / കുരുമട്',
    'Cardamom / ഏലം', 'Banana / വാഴ', 'Tapioca / കപ്പ', 'Ginger / ഇഞ്ചി',
    'Turmeric / മഞ്ഞൾ', 'Vegetables / പച്ചക്കറി', 'Arecanut / അടയ്ക്ക',
    'Coffee / കാപ്പി', 'Tea / ചായ', 'Cashew / കശുമാവ്'
  ];

  const seasonalPatterns = [
    'Single Season / ഒരു സീസൺ മാത്രം',
    'Double Season / രണ്ട് സീസൺ',
    'Year Round / മുഴുവൻ വർഷം',
    'Seasonal Rotation / സീസണൽ റോട്ടേഷൻ'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const toggleCropSelection = (crop, type) => {
    const selected = formData[type] || [];
    if (selected.includes(crop)) {
      updateFormData({ [type]: selected.filter(c => c !== crop) });
    } else {
      updateFormData({ [type]: [...selected, crop] });
    }
  };

  const addCrop = (type, crop, setCrop) => {
    const trimmedCrop = crop.trim();
    if (trimmedCrop.length === 0) return;
    // Avoid duplicate entries
    if ((formData[type] || []).includes(trimmedCrop)) {
      alert('Crop already added.');
      return;
    }
    updateFormData({
      [type]: [...(formData[type] || []), trimmedCrop]
    });
    setCrop('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.primaryCrops || formData.primaryCrops.length === 0) {
      newErrors.primaryCrops = 'Select at least one primary crop / കുറഞ്ഞത് ഒരു പ്രധാനപിടി തിരഞ്ഞെടുക്കുക';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="step-container">
      <h2>Crop Information / വിള വിവരങ്ങൾ</h2>

      <div className="form-group">
        <label>Primary Crops / പ്രധാനപിടി (Multiple selection)</label>
        <div className="crop-selection">
          {keralaCrops.map(crop => (
            <button
              key={crop}
              type="button"
              className={`crop-btn ${formData.primaryCrops?.includes(crop) ? 'selected' : ''}`}
              onClick={() => toggleCropSelection(crop, 'primaryCrops')}
            >
              {crop}
            </button>
          ))}
          {formData.primaryCrops?.filter(c => !keralaCrops.includes(c)).map(crop => (
            <button
              key={crop}
              type="button"
              className={`crop-btn selected`}
              onClick={() => toggleCropSelection(crop, 'primaryCrops')}
            >
              {crop}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={customPrimaryCrop}
            placeholder="Add custom crop"
            onChange={(e) => setCustomPrimaryCrop(e.target.value)}
          />
          <button type="button" onClick={() => addCrop('primaryCrops', customPrimaryCrop, setCustomPrimaryCrop)}>
            Add
          </button>
        </div>
        {errors.primaryCrops && <span className="error-text">{errors.primaryCrops}</span>}
      </div>

      <div className="form-group">
        <label>Secondary Crops / ദ്വിതീയപിടി (Optional)</label>
        <div className="crop-selection">
          {keralaCrops.map(crop => (
            <button
              key={crop}
              type="button"
              className={`crop-btn ${formData.secondaryCrops?.includes(crop) ? 'selected' : ''}`}
              onClick={() => toggleCropSelection(crop, 'secondaryCrops')}
            >
              {crop}
            </button>
          ))}
          {formData.secondaryCrops?.filter(c => !keralaCrops.includes(c)).map(crop => (
            <button
              key={crop}
              type="button"
              className={`crop-btn selected`}
              onClick={() => toggleCropSelection(crop, 'secondaryCrops')}
            >
              {crop}
            </button>
          ))}
        </div>
        <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
          <input
            type="text"
            value={customSecondaryCrop}
            placeholder="Add custom crop"
            onChange={(e) => setCustomSecondaryCrop(e.target.value)}
          />
          <button type="button" onClick={() => addCrop('secondaryCrops', customSecondaryCrop, setCustomSecondaryCrop)}>
            Add
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>Farming Pattern / കൃഷി വ്യതി</label>
        <select name="seasonalPattern" value={formData.seasonalPattern} onChange={handleChange}>
          <option value="">Select pattern</option>
          {seasonalPatterns.map(pattern => (
            <option key={pattern} value={pattern}>{pattern}</option>
          ))}
        </select>
      </div>

       <div className="selected-crops-summary">
        {formData.primaryCrops?.length > 0 && (
          <div>
            <h4>Selected Primary Crops:</h4>
            <p>{formData.primaryCrops.join(', ')}</p>
          </div>
        )}
        {formData.secondaryCrops?.length > 0 && (
          <div>
            <h4>Selected Secondary Crops:</h4>
            <p>{formData.secondaryCrops.join(', ')}</p>
          </div>
        )}
      </div>

      <div className="button-group">
        <button className="primary-btn" onClick={handleSubmit}>Next</button>
        <button className="secondary-btn" onClick={onPrev}>Back</button>
      </div>
    </div>
  )
};

export default Step5CropInfo;
