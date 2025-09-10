import React from 'react';
import { useNavigate } from 'react-router-dom';

const Step1Welcome = ({ onNext }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="step-container welcome-page">
      <div className="welcome-content">
        <h1>🌱 Krishi Sakhi വിലകോം</h1>
        <h2>Your Digital Farming Companion</h2>
        
        <div className="language-toggle">
          <button className="lang-btn active">മലയാളം</button>
          <button className="lang-btn">English</button>
        </div>
        
        <div className="benefits-list">
          <div className="benefit-item">
            <span className="icon">📱</span>
            <p>Simple farming advice in Malayalam</p>
          </div>
          <div className="benefit-item">
            <span className="icon">🌦️</span>
            <p>Weather alerts & reminders</p>
          </div>
          <div className="benefit-item">
            <span className="icon">💰</span>
            <p>Market prices & government schemes</p>
          </div>
          <div className="benefit-item">
            <span className="icon">🤝</span>
            <p>Personalized farming support</p>
          </div>
        </div>
        
        <p className="welcome-text">
          Join thousands of Kerala farmers using Krishi Sakhi for better harvests!
        </p>
        <div className="button-row">
          <button className="primary-btn full-btn" onClick={onNext}>
            START REGISTRATION / <br />
            രജിസ്ട്രേഷൻ ആരംഭിക്കുക
          </button>
          <button className="primary-btn full-btn" onClick={handleLogin}>
            HAVE AN ACCOUNT? LOGIN / <br />
            അക്കൗണ്ട് ഉണ്ടോ? ലോഗിൻ
          </button>
        </div>
      </div>
    </div> 
  );
};

export default Step1Welcome;
