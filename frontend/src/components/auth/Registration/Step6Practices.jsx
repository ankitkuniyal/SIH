// import React, { useState } from 'react';

// const Step6Practices = ({ formData, updateFormData, onNext, onPrev }) => {
//   const fertilizerTypes = [
//     'Urea / യൂറിയ',
//     'DAP / ഡിഎപി',
//     'MOP / എംഒപി',
//     'NPK / എൻപികെ',
//     'Organic Compost / ജൈവ വളം',
//     'Vermicompost / പുഴു വളം',
//     'Green Manure / പച്ച വളം'
//   ];

//   const pesticideTypes = [
//     'Chemical Pesticides / രാസ കീടനാശിനികൾ',
//     'Bio-pesticides / ബയോ കീടനാശിനികൾ',
//     'Neem Products / വേപ്പിന്റെ ഉത്പന്നങ്ങൾ',
//     'Organic Solutions / ജൈവ കീടനാശിനികൾ',
//     'None / ഒന്നും ഉപയോഗിക്കുന്നില്ല'
//   ];

//   const experienceLevels = [
//     'Beginner (0-2 years) / തുടക്കക്കാരൻ',
//     'Intermediate (3-10 years) / ഇടത്തരം പരിചയം',
//     'Experienced (11-20 years) / അനുഭവസമ്പന്നൻ',
//     'Expert (20+ years) / വിദഗ്ധൻ'
//   ];

//   const handleMultiSelection = (item, type) => {
//     const currentItems = formData[type] || [];
//     let updatedItems;
    
//     if (currentItems.includes(item)) {
//       updatedItems = currentItems.filter(i => i !== item);
//     } else {
//       updatedItems = [...currentItems, item];
//     }
    
//     updateFormData({ [type]: updatedItems });
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     if (type === 'checkbox') {
//       updateFormData({ [name]: checked });
//     } else {
//       updateFormData({ [name]: value });
//     }
//   };

//   return (
//     <div className="step-container">
//       <h2>Farming Practices / കൃഷി രീതികൾ</h2>
      
//       <div className="form-group">
//         <label>Fertilizers Used / ഉപയോഗിക്കുന്ന വളങ്ങൾ</label>
//         <div className="practice-selection">
//           {fertilizerTypes.map(fertilizer => (
//             <button
//               key={fertilizer}
//               type="button"
//               className={`practice-btn ${formData.fertilizers?.includes(fertilizer) ? 'selected' : ''}`}
//               onClick={() => handleMultiSelection(fertilizer, 'fertilizers')}
//             >
//               {fertilizer}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="form-group">
//         <label>Pest Control Methods / കീട നിയന്ത്രണ രീതികൾ</label>
//         <div className="practice-selection">
//           {pesticideTypes.map(pesticide => (
//             <button
//               key={pesticide}
//               type="button"
//               className={`practice-btn ${formData.pesticides?.includes(pesticide) ? 'selected' : ''}`}
//               onClick={() => handleMultiSelection(pesticide, 'pesticides')}
//             >
//               {pesticide}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="form-group">
//         <div className="checkbox-group">
//           <input
//             type="checkbox"
//             id="organic"
//             name="organicPractices"
//             checked={formData.organicPractices}
//             onChange={handleChange}
//           />
//           <label htmlFor="organic">
//             I follow organic farming practices / ഞാൻ ജൈവകൃഷി രീതികൾ പിന്തുടരുന്നു
//           </label>
//         </div>
//       </div>

//       <div className="form-group">
//         <label>Farming Experience / കൃഷി അനുഭവം</label>
//         <select name="experience" value={formData.experience} onChange={handleChange}>
//           <option value="">Select experience level / അനുഭവ നില തിരഞ്ഞെടുക്കുക</option>
//           {experienceLevels.map(level => (
//             <option key={level} value={level}>{level}</option>
//           ))}
//         </select>
//       </div>

//       <div className="practices-summary">
//         {formData.fertilizers?.length > 0 && (
//           <div>
//             <h4>Selected Fertilizers:</h4>
//             <p>{formData.fertilizers.join(', ')}</p>
//           </div>
//         )}
//         {formData.pesticides?.length > 0 && (
//           <div>
//             <h4>Selected Pest Control:</h4>
//             <p>{formData.pesticides.join(', ')}</p>
//           </div>
//         )}
//       </div>

//       <div className="button-group">
        
//         <button className="primary-btn" onClick={handleNext}>Review & Submit</button>
//         <button className="secondary-btn" onClick={onPrev}>Back</button>
//       </div>
//     </div>
//   );
// };

// export default Step6Practices;

























import React, { useState } from 'react';

const Step6Practices = ({ formData, updateFormData, onNext, onPrev }) => {
  const [errors, setErrors] = useState({});

  const fertilizerTypes = [
    'Urea / യൂറിയ',
    'DAP / ഡിഎപി',
    'MOP / എംഒപി',
    'NPK / എൻപികെ',
    'Organic Compost / ജൈവ വളം',
    'Vermicompost / പുഴു വളം',
    'Green Manure / പച്ച വളം'
  ];

  const pesticideTypes = [
    'Chemical Pesticides / രാസ കീടനാശിനികൾ',
    'Bio-pesticides / ബയോ കീടനാശിനികൾ',
    'Neem Products / വേപ്പിന്റെ ഉത്പന്നങ്ങൾ',
    'Organic Solutions / ജൈവ കീടനാശിനികൾ',
    'None / ഒന്നും ഉപയോഗിക്കുന്നില്ല'
  ];

  const experienceLevels = [
    'Beginner (0-2 years) / തുടക്കക്കാരൻ',
    'Intermediate (3-10 years) / ഇടത്തരം പരിചയം',
    'Experienced (11-20 years) / അനുഭവസമ്പന്നൻ',
    'Expert (20+ years) / വിദഗ്ധൻ'
  ];

  const handleMultiSelection = (item, type) => {
    const currentItems = formData[type] || [];
    let updatedItems;
    
    if (currentItems.includes(item)) {
      updatedItems = currentItems.filter(i => i !== item);
    } else {
      updatedItems = [...currentItems, item];
    }
    
    updateFormData({ [type]: updatedItems });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      updateFormData({ [name]: checked });
    } else {
      updateFormData({ [name]: value });
    }
  };

  // Add validation function
  const validate = () => {
    const newErrors = {};
    
    if (!formData.fertilizers || formData.fertilizers.length === 0) {
      newErrors.fertilizers = 'Please select at least one fertilizer / കുറഞ്ഞത് ഒരു വളം തിരഞ്ഞെടുക്കുക';
    }
    
    if (!formData.pesticides || formData.pesticides.length === 0) {
      newErrors.pesticides = 'Please select at least one pest control method / കുറഞ്ഞത് ഒരു കീട നിയന്ത്രണ രീതി തിരഞ്ഞെടുക്കുക';
    }
    
    if (!formData.experience) {
      newErrors.experience = 'Please select your farming experience / കൃഷി അനുഭവം തിരഞ്ഞെടുക്കുക';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fix the handleNext function - change to handleSubmit and use onNext prop
  const handleSubmit = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="step-container">
      <h2>Farming Practices / കൃഷി രീതികൾ</h2>
      
      <div className="form-group">
        <label>Fertilizers Used / ഉപയോഗിക്കുന്ന വളങ്ങൾ</label>
        <div className="practice-selection">
          {fertilizerTypes.map(fertilizer => (
            <button
              key={fertilizer}
              type="button"
              className={`practice-btn ${formData.fertilizers?.includes(fertilizer) ? 'selected' : ''}`}
              onClick={() => handleMultiSelection(fertilizer, 'fertilizers')}
            >
              {fertilizer}
            </button>
          ))}
        </div>
        {errors.fertilizers && <span className="error-text">{errors.fertilizers}</span>}
      </div>

      <div className="form-group">
        <label>Pest Control Methods / കീട നിയന്ത്രണ രീതികൾ</label>
        <div className="practice-selection">
          {pesticideTypes.map(pesticide => (
            <button
              key={pesticide}
              type="button"
              className={`practice-btn ${formData.pesticides?.includes(pesticide) ? 'selected' : ''}`}
              onClick={() => handleMultiSelection(pesticide, 'pesticides')}
            >
              {pesticide}
            </button>
          ))}
        </div>
        {errors.pesticides && <span className="error-text">{errors.pesticides}</span>}
      </div>

      <div className="form-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="organic"
            name="organicPractices"
            checked={formData.organicPractices || false}
            onChange={handleChange}
          />
          <label htmlFor="organic">
            I follow organic farming practices / ഞാൻ ജൈവകൃഷി രീതികൾ പിന്തുടരുന്നു
          </label>
        </div>
      </div>

      <div className="form-group">
        <label>Farming Experience / കൃഷി അനുഭവം</label>
        <select name="experience" value={formData.experience || ''} onChange={handleChange}>
          <option value="">Select experience level / അനുഭവ നില തിരഞ്ഞെടുക്കുക</option>
          {experienceLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        {errors.experience && <span className="error-text">{errors.experience}</span>}
      </div>

      <div className="practices-summary">
        {formData.fertilizers?.length > 0 && (
          <div>
            <h4>Selected Fertilizers:</h4>
            <p>{formData.fertilizers.join(', ')}</p>
          </div>
        )}
        {formData.pesticides?.length > 0 && (
          <div>
            <h4>Selected Pest Control:</h4>
            <p>{formData.pesticides.join(', ')}</p>
          </div>
        )}
      </div>

      <div className="button-group">
        <button className="primary-btn" onClick={handleSubmit}>Review & Submit</button>
        <button className="secondary-btn" onClick={onPrev}>Back</button>
      </div>
    </div>
  );
};

export default Step6Practices;
