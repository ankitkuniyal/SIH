import React, { useState } from 'react';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase';

const LoginPage = () => {
  const [step, setStep] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
    }
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          setError('reCAPTCHA expired. Please try again.');
        }
      }
    );
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      setupRecaptcha();
      const formattedPhone = `+91${phoneNumber}`;
      const result = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      setConfirmationResult(result);
      setStep('otp');
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otp.length !== 6 || !confirmationResult) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await confirmationResult.confirm(otp);
      setUser(result.user);
      setStep('welcome');
    } catch (error) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      setStep('welcome');
    } catch (error) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setStep('phone');
      setPhoneNumber('');
      setOtp('');
      setError('');
      setConfirmationResult(null);
      setUser(null);
      setIsSignUp(false);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (step === 'phone') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center w-full p-4 sm:p-6 md:p-8"
        style={{ 
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          background: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)'
        }}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 relative overflow-hidden w-full max-w-md mx-auto"
          style={{ 
            padding: '2rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            animation: 'slideUp 0.6s ease-out'
          }}
        >
          {/* Top gradient border */}
          <div 
            className="absolute top-0 left-0 right-0"
            style={{ 
              height: '4px',
              background: 'linear-gradient(90deg, #2E7D32, #03DAC6)'
            }}
          ></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div 
              className="mb-4"
              style={{ fontSize: '3rem' }}
            >
              🌱
            </div>
            <h1 
              className="font-bold mb-2"
              style={{ 
                background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                lineHeight: '1.2'
              }}
            >
              Krishi Sakhi
            </h1>
            <h2 
              className="font-semibold mb-6"
              style={{ 
                color: '#212121',
                fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)'
              }}
            >
              കൃഷി സഖി
            </h2>
            {/* ONLY ONE GREEN LINE UNDER MALAYALAM TEXT */}
            <div 
              className="mx-auto mb-6"
              style={{ 
                width: '40px',
                height: '3px',
                background: 'linear-gradient(90deg, #2E7D32, #4CAF50)',
                borderRadius: '50px'
              }}
            ></div>
            <p 
              className="text-gray-600"
              style={{ 
                fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
                lineHeight: '1.5'
              }}
            >
              {isSignUp ? 'Create your account' : 'Sign in to your account'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSendOTP}>
            {/* Phone Number Field with proper spacing */}
            <div className="mb-6">
              <label 
                className="block mb-3 font-semibold text-left"
                style={{ 
                  color: '#212121',
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                }}
              >
                Phone Number / ഫോൺ നമ്പർ <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-[auto_1fr] gap-0 items-center w-full">
                <span 
                  className="text-gray-600 border-2 border-gray-300 border-r-0 flex items-center"
                  style={{ 
                    padding: '1rem',
                    borderRadius: '8px 0 0 8px',
                    backgroundColor: '#F8F9FA',
                    fontSize: '0.9rem'
                  }}
                >
                  +91
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full border-2 border-gray-300 border-l-0 bg-white text-gray-900 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:-translate-y-0.5 transition-all duration-300"
                  style={{ 
                    padding: '1rem',
                    borderRadius: '0 8px 8px 0',
                    fontSize: 'clamp(0.9rem, 2.2vw, 0.95rem)',
                    fontFamily: 'inherit'
                  }}
                  maxLength={10}
                  required
                />
              </div>
            </div>

            {/* Error Message with spacing */}
            {error && (
              <div 
                className="flex items-center gap-1 text-left mb-6"
                style={{ 
                  color: '#F44336',
                  fontSize: 'clamp(0.75rem, 1.8vw, 0.8rem)',
                  fontWeight: '500'
                }}
              >
                <span style={{ fontSize: '0.8rem' }}>⚠</span>
                {error}
              </div>
            )}

            {/* Buttons with proper spacing - separated from form fields */}
            <div className="space-y-4 mt-8">
              {/* Send OTP Button */}
              <button
                type="submit"
                className={`w-full border-none rounded-lg font-semibold cursor-pointer transition-all duration-300 uppercase tracking-wide ${
                  isLoading || phoneNumber.length !== 10 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:-translate-y-0.5 hover:shadow-lg'
                }`}
                style={{ 
                  background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
                  color: '#FFFFFF',
                  padding: '1rem 1.5rem',
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                disabled={isLoading || phoneNumber.length !== 10}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div 
                      className="mr-2 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin"
                      style={{ width: '20px', height: '20px' }}
                    ></div>
                    Sending OTP...
                  </div>
                ) : (
                  isSignUp ? 'CREATE ACCOUNT / അക്കൗണ്ട് സൃഷ്ടിക്കുക' : 'SEND OTP / OTP അയയ്ക്കുക'
                )}
              </button>

              {/* Google Sign-in Button */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-white border-2 border-gray-300 rounded-lg font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-green-500 hover:-translate-y-0.5 hover:shadow-sm"
                style={{ 
                  color: '#212121',
                  padding: '1rem 1.5rem',
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                  letterSpacing: '0.5px'
                }}
                disabled={isLoading}
              >
                <svg
                  style={{ width: '18px', height: '18px' }}
                  viewBox="0 0 24 24"
                >
                  <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* Sign Up Toggle Button */}
              <button
                type="button"
                className="w-full bg-white border-2 border-gray-300 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-50 hover:border-green-500 hover:-translate-y-0.5 hover:shadow-sm"
                style={{ 
                  color: '#212121',
                  padding: '1rem 1.5rem',
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                  letterSpacing: '0.5px'
                }}
                onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
              >
                {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
              </button>

              {/* Back to Home Button */}
              <button
                type="button"
                className="w-full bg-white border-2 border-gray-300 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-50 hover:border-green-500 hover:-translate-y-0.5 hover:shadow-sm"
                style={{ 
                  color: '#212121',
                  padding: '1rem 1.5rem',
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                  letterSpacing: '0.5px'
                }}
                onClick={() => setStep('welcome')}
              >
                ← Back to Home
              </button>
            </div>
          </form>
          <div id="recaptcha-container"></div>
        </div>

        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div 
        className="min-h-screen flex items-center justify-center w-full p-4 sm:p-6 md:p-8"
        style={{ 
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          background: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)'
        }}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 relative overflow-hidden w-full max-w-md mx-auto"
          style={{ 
            padding: '2rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            animation: 'slideUp 0.6s ease-out'
          }}
        >
          {/* Top gradient border */}
          <div 
            className="absolute top-0 left-0 right-0"
            style={{ 
              height: '4px',
              background: 'linear-gradient(90deg, #2E7D32, #03DAC6)'
            }}
          ></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div 
              className="mb-4"
              style={{ fontSize: '3rem' }}
            >
              🌱
            </div>
            <h1 
              className="font-bold mb-2"
              style={{ 
                background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                lineHeight: '1.2'
              }}
            >
              Verify OTP
            </h1>
            <h2 
              className="font-semibold mb-6"
              style={{ 
                color: '#212121',
                fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)'
              }}
            >
              OTP സ്ഥിരീകരിക്കുക
            </h2>
            <div 
              className="mx-auto mb-6"
              style={{ 
                width: '40px',
                height: '3px',
                background: 'linear-gradient(90deg, #2E7D32, #4CAF50)',
                borderRadius: '50px'
              }}
            ></div>
            <p 
              className="text-gray-600"
              style={{ 
                fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
                lineHeight: '1.5'
              }}
            >
              Enter the 6-digit code sent to +91 {phoneNumber}
            </p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleVerifyOTP}>
            <div className="mb-6">
              <label 
                className="block mb-3 font-semibold text-left"
                style={{ 
                  color: '#212121',
                  fontSize: 'clamp(0.8rem, 2vw, 0.9rem)'
                }}
              >
                Enter OTP / OTP നൽകുക <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit OTP"
                className="w-full border-2 border-gray-300 bg-white text-gray-900 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 focus:-translate-y-0.5 transition-all duration-300 text-center"
                style={{ 
                  padding: '1rem',
                  borderRadius: '8px',
                  fontSize: '1.2rem',
                  letterSpacing: '0.2em',
                  fontFamily: 'inherit'
                }}
                maxLength={6}
                required
              />
            </div>

            {error && (
              <div 
                className="flex items-center gap-1 text-left mb-6"
                style={{ 
                  color: '#F44336',
                  fontSize: 'clamp(0.75rem, 1.8vw, 0.8rem)',
                  fontWeight: '500'
                }}
              >
                <span style={{ fontSize: '0.8rem' }}>⚠</span>
                {error}
              </div>
            )}

            <div className="space-y-4 mt-8">
              <button
                type="submit"
                className={`w-full border-none rounded-lg font-semibold cursor-pointer transition-all duration-300 uppercase tracking-wide ${
                  isLoading || otp.length !== 6 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:-translate-y-0.5 hover:shadow-lg'
                }`}
                style={{ 
                  background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
                  color: '#FFFFFF',
                  padding: '1rem 1.5rem',
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div 
                      className="mr-2 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin"
                      style={{ width: '20px', height: '20px' }}
                    ></div>
                    Verifying...
                  </div>
                ) : (
                  'VERIFY OTP / സ്ഥിരീകരിക്കുക'
                )}
              </button>

              <button
                type="button"
                className="w-full bg-white border-2 border-gray-300 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-50 hover:border-green-500 hover:-translate-y-0.5 hover:shadow-sm"
                style={{ 
                  color: '#212121',
                  padding: '1rem 1.5rem',
                  fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                  letterSpacing: '0.5px'
                }}
                onClick={() => {
                  setStep('phone');
                  setOtp('');
                  setError('');
                }}
              >
                ← Change Phone Number
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Welcome screen
  return (
    <div 
      className="min-h-screen flex items-center justify-center w-full p-4 sm:p-6 md:p-8"
      style={{ 
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        background: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)'
      }}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 relative overflow-hidden w-full max-w-md mx-auto text-center"
        style={{ 
          padding: '2rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          animation: 'slideUp 0.6s ease-out',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,249,250,0.95))',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.3)'
        }}
      >
        {/* Top gradient border */}
        <div 
          className="absolute top-0 left-0 right-0"
          style={{ 
            height: '6px',
            background: 'linear-gradient(90deg, #2E7D32, #03DAC6, #4CAF50)'
          }}
        ></div>

        <div style={{ padding: '2rem', width: '100%' }}>
          <div 
            className="mb-4"
            style={{ fontSize: '3rem' }}
          >
            🌱
          </div>
          <h2 
            className="mb-6"
            style={{ 
              color: '#4CAF50',
              fontSize: 'clamp(1.5rem, 4vw, 1.75rem)',
              fontWeight: 'bold'
            }}
          >
            Welcome!
          </h2>
          <h2 
            className="mb-4"
            style={{ 
              color: '#4CAF50',
              fontSize: '1.2rem',
              fontWeight: '600'
            }}
          >
            സ്വാഗതം!
          </h2>
          <p 
            className="mb-4"
            style={{ 
              fontSize: 'clamp(0.95rem, 2.2vw, 1rem)',
              color: '#666666'
            }}
          >
            You are successfully logged in.
          </p>
          
          <div className="grid gap-2 w-full mt-8">
            <div 
              className="flex justify-between items-center flex-wrap"
              style={{ 
                background: '#FFFFFF',
                padding: '1rem',
                borderRadius: '6px',
                borderLeft: '3px solid #4CAF50',
                color: '#212121'
              }}
            >
              <strong 
                style={{ 
                  color: '#666666',
                  fontSize: 'clamp(0.75rem, 1.8vw, 0.8rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: '500'
                }}
              >
                Phone:
              </strong>
              <span>{user?.phoneNumber || 'N/A'}</span>
            </div>
            <div 
              className="flex justify-between items-center flex-wrap"
              style={{ 
                background: '#FFFFFF',
                padding: '1rem',
                borderRadius: '6px',
                borderLeft: '3px solid #4CAF50',
                color: '#212121'
              }}
            >
              <strong 
                style={{ 
                  color: '#666666',
                  fontSize: 'clamp(0.75rem, 1.8vw, 0.8rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: '500'
                }}
              >
                Email:
              </strong>
              <span>{user?.email || 'N/A'}</span>
            </div>
          </div>

          <div className="flex justify-center mt-8 w-full">
            <button
              className="w-full border-none rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{ 
                background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
                color: '#FFFFFF',
                padding: '1rem 1.5rem',
                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                letterSpacing: '0.5px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onClick={handleLogout}
            >
              LOGOUT / ലോഗ് ഔട്ട്
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;