import React, { useState } from 'react';

const Step4FarmDetails = ({ formData, updateFormData, onNext, onPrev }) => {
  const [errors, setErrors] = useState({});

  const soilTypes = [
    'Laterite / ലാറ്ററൈറ്റ്',
    'Alluvial / പാললം',
    'Red Soil / ചുവന്ന മണ്ണ്',
    'Black Cotton / കരിമണ്ണ്',
    'Sandy / മണൽ മണ്ണ്',
    'Clay / കളിമണ്ണ്'
  ];

  const irrigationTypes = [
    'Drip Irrigation / ഡ്രിപ്പ് ജലസേചനം',
    'Sprinkler / സ്പ്രിംക്ലർ',
    'Flood Irrigation / വെള്ളപ്പൊക്ക ജലസേചനം',
    'Rainfed / മഴയെ ആശ്രയിച്ച്',
    'Mixed / മിശ്രിതം'
  ];

  const waterSources = [
    'Bore Well / ബോർവെൽ',
    'Open Well / തുറന്ന കിണർ',
    'Canal / കനാൽ',
    'River / നദി',
    'Pond / കുളം',
    'Rainwater / മഴവെള്ളം'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.landSize) newErrors.landSize = 'Land size is required / ഭൂമിയുടെ വലുപ്പം ആവശ്യമാണ്';
    if (!formData.soilType) newErrors.soilType = 'Soil type is required / മണ്ണിന്റെ തരം ആവശ്യമാണ്';
    if (!formData.irrigationType) newErrors.irrigationType = 'Irrigation type is required / ജലസേചന രീതി ആവശ്യമാണ്';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="step-container">
      <h2>Farm Details / കൃഷിസ്ഥല വിവരങ്ങൾ</h2>
      
      <div className="form-row">
        <div className="form-group">
          <label>Land Size / ഭൂമിയുടെ വലുപ്പം *</label>
          <input
            type="number"
            name="landSize"
            value={formData.landSize}
            onChange={handleChange}
            placeholder="Enter size"
            step="0.1"
            min="0"
            className={errors.landSize ? 'error' : ''}
          />
          {errors.landSize && <span className="error-text">{errors.landSize}</span>}
        </div>
        
        <div className="form-group">
          <label>Unit / യൂണിറ്റ്</label>
          <select name="landUnit" value={formData.landUnit} onChange={handleChange}>
            <option value="acres">Acres / ഏക്കർ</option>
            <option value="hectares">Hectares / ഹെക്ടർ</option>
            <option value="cents">Cents / സെൻറ്</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Soil Type / മണ്ണിന്റെ തരം *</label>
        <select 
          name="soilType" 
          value={formData.soilType} 
          onChange={handleChange}
          className={errors.soilType ? 'error' : ''}
        >
          <option value="">Select soil type / മണ്ണിന്റെ തരം തിരഞ്ഞെടുക്കുക</option>
          {soilTypes.map(soil => (
            <option key={soil} value={soil}>{soil}</option>
          ))}
        </select>
        {errors.soilType && <span className="error-text">{errors.soilType}</span>}
      </div>

      <div className="form-group">
        <label>Irrigation Method / ജലസേചന രീതി *</label>
        <select 
          name="irrigationType" 
          value={formData.irrigationType} 
          onChange={handleChange}
          className={errors.irrigationType ? 'error' : ''}
        >
          <option value="">Select irrigation method / ജലസേചന രീതി തിരഞ്ഞെടുക്കുക</option>
          {irrigationTypes.map(irrigation => (
            <option key={irrigation} value={irrigation}>{irrigation}</option>
          ))}
        </select>
        {errors.irrigationType && <span className="error-text">{errors.irrigationType}</span>}
      </div>

      <div className="form-group">
        <label>Water Source / ജല സ്രോതസ്സ്</label>
        <select name="waterSource" value={formData.waterSource} onChange={handleChange}>
          <option value="">Select water source / ജല സ്രോതസ്സ് തിരഞ്ഞെടുക്കുക</option>
          {waterSources.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
      </div>

      <div className="button-group">
        
        <button className="primary-btn" onClick={handleNext}>Next</button>
        <button className="secondary-btn" onClick={onPrev}>Back</button>
      </div>
    </div>
  );
};

export default Step4FarmDetails;
