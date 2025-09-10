import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase';

const LoginPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 450);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // FIXED: Better responsive max width
  const getResponsiveMaxWidth = () => {
    if (windowWidth >= 1440) return '520px';        // Large Desktop
    if (windowWidth >= 1024) return '480px';        // Desktop
    if (windowWidth >= 768) return '450px';         // Tablet
    return 'min(90vw, 400px)';                      // Mobile
  };

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
      // Navigate to dashboard after successful login
      navigate('/');
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
      // Navigate to dashboard after successful login
      navigate('/');
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

  // FIXED: No-scroll styles for desktop
  const styles = {
    container: {
      // CHANGED: Use fixed height instead of minHeight to prevent scrolling
      height: '100vh',
      overflow: 'hidden', // ADDED: Prevent any overflow scrolling
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: windowWidth >= 768 ? '1rem' : '0.5rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: 'linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%)',
      boxSizing: 'border-box'
    },
    card: {
      background: '#FFFFFF',
      borderRadius: windowWidth >= 768 ? '1rem' : '0.75rem',
      boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
      border: '1px solid rgba(0,0,0,0.08)',
      width: '100%',
      maxWidth: getResponsiveMaxWidth(),
      // CHANGED: Add maxHeight to prevent card from being too tall
      maxHeight: 'calc(100vh - 2rem)',
      // ADDED: Make card scrollable if content overflows
      overflowY: 'auto',
      padding: windowWidth >= 768 ? '1.75rem' : '1.25rem',
      position: 'relative',
      animation: 'slideUp 0.6s ease-out',
      boxSizing: 'border-box'
    },
    gradientBorder: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #2E7D32, #03DAC6, #4CAF50)'
    },
    header: {
      textAlign: 'center',
      marginBottom: windowWidth >= 768 ? '1.5rem' : '1.25rem'
    },
    emoji: {
      fontSize: windowWidth >= 768 ? '2.5rem' : '2rem',
      marginBottom: '0.75rem'
    },
    title: {
      background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontSize: windowWidth >= 768 ? '1.9rem' : '1.6rem',
      fontWeight: '700',
      lineHeight: '1.2',
      marginBottom: '0.5rem'
    },
    subtitle: {
      color: '#212121',
      fontSize: windowWidth >= 768 ? '1.1rem' : '0.95rem',
      fontWeight: '600',
      marginBottom: '0.75rem'
    },
    underline: {
      width: windowWidth >= 768 ? '45px' : '40px',
      height: '3px',
      background: 'linear-gradient(90deg, #2E7D32, #4CAF50)',
      borderRadius: '50px',
      margin: '0 auto 0.75rem'
    },
    description: {
      color: '#666666',
      fontSize: windowWidth >= 768 ? '0.9rem' : '0.8rem',
      lineHeight: '1.4'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: windowWidth >= 768 ? '1rem' : '0.875rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem'
    },
    label: {
      color: '#212121',
      fontSize: windowWidth >= 768 ? '0.85rem' : '0.75rem',
      fontWeight: '600'
    },
    phoneContainer: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: 0,
      alignItems: 'stretch'
    },
    phonePrefix: {
      padding: windowWidth >= 768 ? '0.8rem' : '0.7rem',
      border: '2px solid #E5E7EB',
      borderRight: 'none',
      borderRadius: '8px 0 0 8px',
      backgroundColor: '#F8F9FA',
      color: '#666666',
      fontSize: windowWidth >= 768 ? '0.85rem' : '0.75rem',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      padding: windowWidth >= 768 ? '0.8rem' : '0.7rem',
      border: '2px solid #E5E7EB',
      borderRadius: '8px',
      fontSize: windowWidth >= 768 ? '0.9rem' : '0.8rem',
      fontFamily: 'inherit',
      background: '#FFFFFF',
      color: '#212121',
      outline: 'none',
      transition: 'all 0.3s ease'
    },
    inputPhone: {
      borderLeft: 'none',
      borderRadius: '0 8px 8px 0'
    },
    inputOTP: {
      textAlign: 'center',
      fontSize: windowWidth >= 768 ? '1.1rem' : '1rem',
      letterSpacing: '0.15em'
    },
    error: {
      color: '#F44336',
      fontSize: windowWidth >= 768 ? '0.75rem' : '0.7rem',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    buttonGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: windowWidth >= 768 ? '0.8rem' : '0.7rem',
      marginTop: windowWidth >= 768 ? '1.25rem' : '1rem'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
      padding: windowWidth >= 768 ? '0.8rem 1rem' : '0.7rem 0.875rem',
      borderRadius: '8px',
      fontSize: windowWidth >= 768 ? '0.85rem' : '0.75rem',
      fontWeight: '600',
      letterSpacing: '0.3px',
      textTransform: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      minHeight: windowWidth >= 768 ? '45px' : '42px',
      width: '100%'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #2E7D32, #4CAF50)',
      color: '#FFFFFF',
      boxShadow: '0 3px 12px rgba(46, 125, 50, 0.25)'
    },
    secondaryButton: {
      background: '#FFFFFF',
      color: '#374151',
      border: '2px solid #E5E7EB'
    },
    spinner: {
      width: '16px',
      height: '16px',
      border: '2px solid rgba(255,255,255,0.3)',
      borderTop: '2px solid #FFFFFF',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    welcomeCard: {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,249,250,0.95))',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.3)',
      textAlign: 'center'
    },
    infoGrid: {
      display: 'grid',
      gap: '0.75rem',
      marginTop: '1.25rem'
    },
    infoItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.75rem',
      background: '#FFFFFF',
      borderRadius: '8px',
      borderLeft: '4px solid #4CAF50',
      boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
    },
    keyframes: `
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
  };

  // Helper function to merge styles
  const mergeStyles = (...styleObjects) => Object.assign({}, ...styleObjects);

  if (step === 'phone') {
    return (
      <>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.gradientBorder} />
            
            <div style={styles.header}>
              <div style={styles.emoji}>🌱</div>
              <h1 style={styles.title}>Krishi Sakhi</h1>
              <h2 style={styles.subtitle}>കൃഷി സഖി</h2>
              <div style={styles.underline} />
              <p style={styles.description}>
                {isSignUp ? 'Create your account' : 'Sign in to your account'}
              </p>
            </div>

            <form onSubmit={handleSendOTP} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Phone Number / ഫോൺ നമ്പർ <span style={{color: '#F44336'}}>*</span>
                </label>
                <div style={styles.phoneContainer}>
                  <span style={styles.phonePrefix}>+91</span>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                    style={mergeStyles(styles.input, styles.inputPhone)}
                    maxLength={10}
                    required
                    onFocus={(e) => {
                      e.target.style.borderColor = '#4CAF50';
                      e.target.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.15)';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#E5E7EB';
                      e.target.style.boxShadow = 'none';
                      e.target.style.transform = 'none';
                    }}
                  />
                </div>
              </div>

              {error && (
                <div style={styles.error}>
                  <span>⚠</span>
                  {error}
                </div>
              )}

              <div style={styles.buttonGroup}>
                <button
                  type="submit"
                  style={mergeStyles(
                    styles.button, 
                    styles.primaryButton,
                    (isLoading || phoneNumber.length !== 10) && {opacity: 0.6, cursor: 'not-allowed'}
                  )}
                  disabled={isLoading || phoneNumber.length !== 10}
                  onMouseEnter={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 16px rgba(46, 125, 50, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.transform = 'none';
                      e.target.style.boxShadow = '0 3px 12px rgba(46, 125, 50, 0.25)';
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <div style={styles.spinner} />
                      Sending OTP...
                    </>
                  ) : (
                    isSignUp ? 'CREATE ACCOUNT / അക്കൗണ്ട് സൃഷ്ടിക്കുക' : 'SEND OTP / OTP അയയ്ക്കുക'
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  style={mergeStyles(styles.button, styles.secondaryButton)}
                  disabled={isLoading}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#F9FAFB';
                    e.target.style.borderColor = '#4CAF50';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#FFFFFF';
                    e.target.style.borderColor = '#E5E7EB';
                    e.target.style.transform = 'none';
                  }}
                >
                  <svg style={{width: '16px', height: '16px', flexShrink: 0}} viewBox="0 0 24 24">
                    <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button
                  type="button"
                  style={mergeStyles(styles.button, styles.secondaryButton)}
                  onClick={() => {
                    if (isSignUp) {
                      setIsSignUp(false);
                      setError('');
                    } else {
                      navigate('/register');
                    }
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#F9FAFB';
                    e.target.style.borderColor = '#4CAF50';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#FFFFFF';
                    e.target.style.borderColor = '#E5E7EB';
                    e.target.style.transform = 'none';
                  }}
                >
                  {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
                </button>

                <button
                  type="button"
                  style={mergeStyles(styles.button, styles.secondaryButton)}
                  onClick={() => navigate('/register')}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#F9FAFB';
                    e.target.style.borderColor = '#4CAF50';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#FFFFFF';
                    e.target.style.borderColor = '#E5E7EB';
                    e.target.style.transform = 'none';
                  }}
                >
                  ← Back to Registration
                </button>
              </div>
            </form>
            <div id="recaptcha-container" />
          </div>
        </div>
        <style>{styles.keyframes}</style>
      </>
    );
  }

  if (step === 'otp') {
    return (
      <>
        <div style={styles.container}>
          <div style={styles.card}>
            <div style={styles.gradientBorder} />
            
            <div style={styles.header}>
              <div style={styles.emoji}>🌱</div>
              <h1 style={styles.title}>Verify OTP</h1>
              <h2 style={styles.subtitle}>OTP സ്ഥിരീകരിക്കുക</h2>
              <div style={styles.underline} />
              <p style={styles.description}>
                Enter the 6-digit code sent to +91 {phoneNumber}
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Enter OTP / OTP നൽകുക <span style={{color: '#F44336'}}>*</span>
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="6-digit OTP"
                  style={mergeStyles(styles.input, styles.inputOTP)}
                  maxLength={6}
                  required
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4CAF50';
                    e.target.style.boxShadow = '0 0 0 3px rgba(76, 175, 80, 0.15)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'none';
                  }}
                />
              </div>

              {error && (
                <div style={styles.error}>
                  <span>⚠</span>
                  {error}
                </div>
              )}

              <div style={styles.buttonGroup}>
                <button
                  type="submit"
                  style={mergeStyles(
                    styles.button, 
                    styles.primaryButton,
                    (isLoading || otp.length !== 6) && {opacity: 0.6, cursor: 'not-allowed'}
                  )}
                  disabled={isLoading || otp.length !== 6}
                  onMouseEnter={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 16px rgba(46, 125, 50, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.transform = 'none';
                      e.target.style.boxShadow = '0 3px 12px rgba(46, 125, 50, 0.25)';
                    }
                  }}
                >
                  {isLoading ? (
                    <>
                      <div style={styles.spinner} />
                      Verifying...
                    </>
                  ) : (
                    'VERIFY OTP / സ്ഥിരീകരിക്കുക'
                  )}
                </button>

                <button
                  type="button"
                  style={mergeStyles(styles.button, styles.secondaryButton)}
                  onClick={() => {
                    setStep('phone');
                    setOtp('');
                    setError('');
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#F9FAFB';
                    e.target.style.borderColor = '#4CAF50';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#FFFFFF';
                    e.target.style.borderColor = '#E5E7EB';
                    e.target.style.transform = 'none';
                  }}
                >
                  ← Change Phone Number
                </button>
              </div>
            </form>
          </div>
        </div>
        <style>{styles.keyframes}</style>
      </>
    );
  }

  // Welcome screen
  return (
    <>
      <div style={styles.container}>
        <div style={mergeStyles(styles.card, styles.welcomeCard)}>
          <div style={{...styles.gradientBorder, height: '4px'}} />
          
          <div style={{padding: '1.5rem', width: '100%'}}>
            <div style={styles.emoji}>🌱</div>
            <h2 style={{
              color: '#4CAF50', 
              fontSize: windowWidth >= 768 ? '1.7rem' : '1.5rem', 
              fontWeight: 'bold', 
              marginBottom: '0.75rem'
            }}>
              Welcome!
            </h2>
            <h2 style={{
              color: '#4CAF50', 
              fontSize: windowWidth >= 768 ? '1.1rem' : '1rem', 
              fontWeight: '600', 
              marginBottom: '0.75rem'
            }}>
              സ്വാഗതം!
            </h2>
            <p style={{
              fontSize: windowWidth >= 768 ? '0.95rem' : '0.85rem', 
              color: '#666666', 
              marginBottom: '0.75rem'
            }}>
              You are successfully logged in.
            </p>
            
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <strong style={{
                  color: '#666666', 
                  fontSize: windowWidth >= 768 ? '0.75rem' : '0.7rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.5px', 
                  fontWeight: '500'
                }}>
                  Phone:
                </strong>
                <span style={{fontSize: windowWidth >= 768 ? '0.85rem' : '0.8rem'}}>
                  {user?.phoneNumber || 'N/A'}
                </span>
              </div>
              <div style={styles.infoItem}>
                <strong style={{
                  color: '#666666', 
                  fontSize: windowWidth >= 768 ? '0.75rem' : '0.7rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.5px', 
                  fontWeight: '500'
                }}>
                  Email:
                </strong>
                <span style={{fontSize: windowWidth >= 768 ? '0.85rem' : '0.8rem'}}>
                  {user?.email || 'N/A'}
                </span>
              </div>
            </div>

            <div style={{marginTop: '1.25rem'}}>
              <button
                style={mergeStyles(styles.button, styles.primaryButton)}
                onClick={handleLogout}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(46, 125, 50, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'none';
                  e.target.style.boxShadow = '0 3px 12px rgba(46, 125, 50, 0.25)';
                }}
              >
                LOGOUT / ലോഗ് ഔട്ട്
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{styles.keyframes}</style>
    </>
  );
};

export default LoginPage;