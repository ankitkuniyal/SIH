import React, { useMemo, useState } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { RegistrationWrapper } from "../../RegistrationWrapper.jsx";
import Step1Welcome from "./Step1Welcome";
import Step2FarmerDetails from "./Step2FarmerDetails";
import Step3Location from "./Step3Location";
import Step4FarmDetails from "./Step4FarmDetails";
import Step5CropInfo from "./Step5CropInfo";
import Step6Practices from "./Step6Practices";
import Step7Confirmation from "./Step7Confirmation";

const RegistrationFlow = () => {
  // Centralized form state
  const [formData, setFormData] = useState({
    // Farmer Details
    name: "",
    phone: "",
    email: "",
    age: "",
    language: "malayalam",

    // Location
    state: "kerala",
    district: "",
    village: "",
    pincode: "",
    coordinates: { lat: "", lng: "" },

    // Farm Details
    landSize: "",
    landUnit: "acres",
    soilType: "",
    irrigationType: "",
    waterSource: "",

    // Crop Info
    primaryCrops: [],
    secondaryCrops: [],
    seasonalPattern: "",

    // Practices
    fertilizers: [],
    pesticides: [],
    organicPractices: false,
    experience: "",
  });

  const updateFormData = (stepData) => setFormData((prev) => ({ ...prev, ...stepData }));

  const navigate = useNavigate();
  const location = useLocation();

  // Ordered steps configuration
  const steps = useMemo(
    () => [
      { path: "", element: Step1Welcome, showInProgress: false, label: "Welcome" },
      { path: "farmer", element: Step2FarmerDetails, showInProgress: true, label: "Farmer" },
      { path: "location", element: Step3Location, showInProgress: true, label: "Location" },
      { path: "farm", element: Step4FarmDetails, showInProgress: true, label: "Farm" },
      { path: "crops", element: Step5CropInfo, showInProgress: true, label: "Crops" },
      { path: "practices", element: Step6Practices, showInProgress: true, label: "Practices" },
      { path: "confirm", element: Step7Confirmation, showInProgress: true, label: "Confirm" },
    ],
    []
  );

  const pathnames = steps.map((s) => s.path);
  
  // Fix: Get the current step slug from the URL
  const pathSegments = location.pathname.split("/");
  const currentSlug = pathSegments[pathSegments.length - 1];
  const isRegisterRoot = location.pathname === "/register";
  
  const currentIndex = isRegisterRoot ? 0 : Math.max(0, pathnames.indexOf(currentSlug));

  const goToIndex = (idx) => {
    const clamped = Math.min(Math.max(idx, 0), steps.length - 1);
    const slug = steps[clamped].path;
    navigate(slug ? `/register/${slug}` : "/register");
  };

  const nextStep = () => goToIndex(currentIndex + 1);
  const prevStep = () => goToIndex(currentIndex - 1);

  // Progress logic
  const showProgress = steps[currentIndex]?.showInProgress === true;
  const totalSteps = steps.filter((s) => s.showInProgress).length;
  const stepNumberForDisplay = Math.max(1, currentIndex);
  const percent =
    currentIndex <= 0
      ? 0
      : Math.min(100, Math.round((stepNumberForDisplay / totalSteps) * 100));

  return (
    <RegistrationWrapper>
      <div className="registration-container">
        {showProgress && (
          <>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${percent}%` }}></div>
            </div>
            <div className="step-indicator">
              Step {stepNumberForDisplay} of {totalSteps}
            </div>
          </>
        )}

        {/* Routes for each step */}
        <Routes>
          <Route
            path=""
            element={<Step1Welcome onNext={nextStep} />}
          />
          <Route
            path="farmer"
            element={
              <Step2FarmerDetails
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            }
          />
          <Route
            path="location"
            element={
              <Step3Location
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            }
          />
          <Route
            path="farm"
            element={
              <Step4FarmDetails
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            }
          />
          <Route
            path="crops"
            element={
              <Step5CropInfo
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            }
          />
          <Route
            path="practices"
            element={
              <Step6Practices
                formData={formData}
                updateFormData={updateFormData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            }
          />
          <Route
            path="confirm"
            element={<Step7Confirmation formData={formData} onPrev={prevStep} />}
          />
          <Route path="*" element={<Navigate to="/register" replace />} />
        </Routes>
      </div>
    </RegistrationWrapper>
  );
};

export default RegistrationFlow;
