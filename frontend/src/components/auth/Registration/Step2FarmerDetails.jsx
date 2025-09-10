import React, { useState } from 'react';

const Step2FarmerDetails = ({ formData, updateFormData, onNext, onPrev }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required / പേര് ആവശ്യമാണ്';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required / ഫോൺ നമ്പർ ആവശ്യമാണ്';
    if (formData.phone && !/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Valid 10-digit mobile number required';
    }
    if (!formData.age) newErrors.age = 'Age is required / പ്രായം ആവശ്യമാണ്';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  return (
    <div className="step-container">
      <h2>Personal Details / വ്യക്തിഗത വിവരങ്ങൾ</h2>
      
      <div className="form-group">
        <label>Full Name / പൂർണ്ണ നാമം *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name / നിങ്ങളുടെ പൂർണ്ണ നാമം എഴുതുക"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label>Mobile Number / മൊബൈൽ നമ്പർ *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="10-digit mobile number"
          className={errors.phone ? 'error' : ''}
        />
        {errors.phone && <span className="error-text">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label>Email (Optional) / ഇമെയിൽ</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
        />
      </div>

      <div className="form-group">
        <label>Age / പ്രായം *</label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter age"
          min="18"
          max="100"
          className={errors.age ? 'error' : ''}
        />
        {errors.age && <span className="error-text">{errors.age}</span>}
      </div>

      <div className="form-group">
        <label>Preferred Language / ഭാഷ</label>
        <select name="language" value={formData.language} onChange={handleChange}>
          <option value="ml">Malayalam / മലയാളം</option>
          <option value="hn">Hindi</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="button-group">
        
        <button className="primary-btn" onClick={handleNext}>Next</button>
        <button className="secondary-btn" onClick={onPrev}>Back</button>
      </div>
    </div>
  );
};

export default Step2FarmerDetails;
