// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// const Step7Confirmation = ({ formData, onPrev }) => {
//   const navigate = useNavigate()
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = async () => {
//     setIsSubmitting(true);
    
//     try {
//       navigate("/")
//       // Simulate API call
//       const response = await fetch('/api/register-farmer', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData)
//       });
      
//       if (response.ok) {
//         setIsSubmitted(true);
//         // Redirect to dashboard after successful registration
        
//       }
//     } catch (error) {
//       console.error('Registration failed:', error);
//       alert('Registration failed. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <div className="step-container">
//         <div className="success-message">
//           <h2>🎉 Registration Successful! / രജിസ്ട്രേഷൻ വിജയകരം!</h2>
//           <p>Welcome to Krishi Sakhi, {formData.name}!</p>
//           <p>You will be redirected to your dashboard shortly...</p>
//           <div className="loading-spinner"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="step-container">
//       <h2>Confirm Your Details / വിവരങ്ങൾ സ്ഥിരീകരിക്കുക</h2>
      
//       <div className="confirmation-section">
//         <h3>Personal Information</h3>
//         <div className="info-grid">
//           <div className="info-item">
//             <strong>Name:</strong> {formData.name}
//           </div>
//           <div className="info-item">
//             <strong>Phone:</strong> {formData.phone}
//           </div>
//           <div className="info-item">
//             <strong>Age:</strong> {formData.age}
//           </div>
//           <div className="info-item">
//             <strong>Language:</strong> {formData.language}
//           </div>
//         </div>
//       </div>

//       <div className="confirmation-section">
//         <h3>Location</h3>
//         <div className="info-grid">
//           <div className="info-item">
//             <strong>District:</strong> {formData.district}
//           </div>
//           <div className="info-item">
//             <strong>Village:</strong> {formData.village}
//           </div>
//           <div className="info-item">
//             <strong>Pincode:</strong> {formData.pincode}
//           </div>
//         </div>
//       </div>

//       <div className="confirmation-section">
//         <h3>Farm Details</h3>
//         <div className="info-grid">
//           <div className="info-item">
//             <strong>Land Size:</strong> {formData.landSize} {formData.landUnit}
//           </div>
//           <div className="info-item">
//             <strong>Soil Type:</strong> {formData.soilType}
//           </div>
//           <div className="info-item">
//             <strong>Irrigation:</strong> {formData.irrigationType}
//           </div>
//           <div className="info-item">
//             <strong>Water Source:</strong> {formData.waterSource}
//           </div>
//         </div>
//       </div>

//       <div className="confirmation-section">
//         <h3>Crops</h3>
//         <div className="info-grid">
//           <div className="info-item">
//             <strong>Primary Crops:</strong> {formData.primaryCrops?.join(', ')}
//           </div>
//           {formData.secondaryCrops?.length > 0 && (
//             <div className="info-item">
//               <strong>Secondary Crops:</strong> {formData.secondaryCrops.join(', ')}
//             </div>
//           )}
//           <div className="info-item">
//             <strong>Experience:</strong> {formData.experience}
//           </div>
//         </div>
//       </div>

//       <div className="terms-section">
//         <label className="checkbox-group">
//           <input type="checkbox" required />
//           I agree to the Terms & Conditions and Privacy Policy
//         </label>
//       </div>

//       <div className="button-group">
//         <button className="secondary-btn" onClick={onPrev} disabled={isSubmitting}>
//           Back
//         </button>
//         <button 
//           className="primary-btn submit-btn" 
//           onClick={handleSubmit} 
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? 'Submitting...' : 'Complete Registration / രജിസ്ട്രേഷൻ പൂർത്തിയാക്കുക'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Step7Confirmation;


























import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  linkWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth } from '../firebase.js'; // Import your Firebase config
const Step7Confirmation = ({ formData, onPrev }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Create user in Firebase Auth
      const { email, phone } = formData;
      console.log(formData);
      await createUserWithEmailAndPassword(auth, email, phone);
      const user = auth.currentUser;
      const token = await user.getIdToken();

      const response = await fetch('https://sih-8mrt.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Redirect immediately after successful registration
        window.location.href = '/login';
            }
          } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
          } finally {
            setIsSubmitting(false);
          }
        };

        if (isSubmitted) {
          return (
            <div className="step-container">
        <div className="success-message">
          <h2>🎉 Registration Successful! / രജിസ്ട്രേഷൻ വിജയകരം!</h2>
          <p>Welcome to Krishi Sakhi, {formData.name}!</p>
          <p>You will be redirected to the login page shortly...</p>
          <div className="loading-spinner"></div>
        </div>
            </div>
          );
        }

  return (
    <div className="step-container">
      <h2>Confirm Your Details / വിവരങ്ങൾ സ്ഥിരീകരിക്കുക</h2>
      
      <div className="confirmation-section">
        <h3>Personal Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>Name:</strong> {formData.name}
          </div>
          <div className="info-item">
            <strong>Phone:</strong> {formData.phone}
          </div>
          <div className="info-item">
            <strong>Age:</strong> {formData.age}
          </div>
          <div className="info-item">
            <strong>Language:</strong> {formData.language}
          </div>
        </div>
      </div>

      <div className="confirmation-section">
        <h3>Location</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>District:</strong> {formData.district}
          </div>
          <div className="info-item">
            <strong>Village:</strong> {formData.village}
          </div>
          <div className="info-item">
            <strong>Pincode:</strong> {formData.pincode}
          </div>
        </div>
      </div>

      <div className="confirmation-section">
        <h3>Farm Details</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>Land Size:</strong> {formData.landSize} {formData.landUnit}
          </div>
          <div className="info-item">
            <strong>Soil Type:</strong> {formData.soilType}
          </div>
          <div className="info-item">
            <strong>Irrigation:</strong> {formData.irrigationType}
          </div>
          <div className="info-item">
            <strong>Water Source:</strong> {formData.waterSource}
          </div>
        </div>
      </div>

      <div className="confirmation-section">
        <h3>Crops</h3>
        <div className="info-grid">
          <div className="info-item">
            <strong>Primary Crops:</strong> {formData.primaryCrops?.join(', ')}
          </div>
          {formData.secondaryCrops?.length > 0 && (
            <div className="info-item">
              <strong>Secondary Crops:</strong> {formData.secondaryCrops.join(', ')}
            </div>
          )}
          <div className="info-item">
            <strong>Experience:</strong> {formData.experience}
          </div>
        </div>
      </div>

      <div className="terms-section">
        <label className="checkbox-group">
          <input type="checkbox" required />
          I agree to the Terms & Conditions and Privacy Policy
        </label>
      </div>

      <div className="button-group">
        <button className="secondary-btn" onClick={onPrev} disabled={isSubmitting}>
          Back
        </button>
        <button 
          className="primary-btn submit-btn" 
          onClick={handleSubmit} 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Complete Registration / രജിസ്ട്രേഷൻ പൂർത്തിയാക്കുക'}
        </button>
      </div>
    </div>
  );
};

export default Step7Confirmation;