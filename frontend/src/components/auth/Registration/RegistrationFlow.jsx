import React, { useState } from 'react';
import Step1Welcome from './Step1Welcome';
import Step2FarmerDetails from './Step2FarmerDetails';
import Step3Location from './Step3Location';
import Step4FarmDetails from './Step4FarmDetails';
import Step5CropInfo from './Step5CropInfo';
import Step6Practices from './Step6Practices';
import Step7Confirmation from './Step7Confirmation';
import './Registration.css';

const RegistrationFlow = () => {
  const [currentStep, setCurrentStep] = useState(0); // Start from 0 for welcome
  const [formData, setFormData] = useState({
    // Farmer Details
    name: '',
    phone: '',
    email: '',
    age: '',
    language: 'malayalam',
    
    // Location
    state: 'kerala',
    district: '',
    village: '',
    pincode: '',
    coordinates: { lat: '', lng: '' },
    
    // Farm Details
    landSize: '',
    landUnit: 'acres',
    soilType: '',
    irrigationType: '',
    waterSource: '',
    
    // Crop Info
    primaryCrops: [],
    secondaryCrops: [],
    seasonalPattern: '',
    
    // Practices
    fertilizers: [],
    pesticides: [],
    organicPractices: false,
    experience: ''
  });

  const updateFormData = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const renderStep = () => {
    switch(currentStep) {
      case 0: return <Step1Welcome onNext={nextStep} />; // Welcome page (no step counter)
      case 1: return <Step2FarmerDetails formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 2: return <Step3Location formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 3: return <Step4FarmDetails formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 4: return <Step5CropInfo formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 5: return <Step6Practices formData={formData} updateFormData={updateFormData} onNext={nextStep} onPrev={prevStep} />;
      case 6: return <Step7Confirmation formData={formData} onPrev={prevStep} />;
      default: return <Step1Welcome onNext={nextStep} />;
    }
  };

  // Don't show progress bar and step indicator for welcome page (step 0)
  const showProgress = currentStep > 0;
  const actualStep = currentStep; // For steps 1-6, show as Step 1-6
  const totalSteps = 6; // Total form steps (excluding welcome)

  return (
    <div className="registration-container " >
      {showProgress && (
        <>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(actualStep / totalSteps) * 100}%` }}></div>
          </div>
          <div className="step-indicator">
            Step {actualStep} of {totalSteps}
          </div>
        </>
      )}
      {renderStep()}
    </div>
  );
};

export default RegistrationFlow;
