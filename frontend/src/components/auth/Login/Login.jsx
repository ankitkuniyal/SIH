import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { auth } from '../firebase';

const LoginPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('login'); // 'login' or 'welcome'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); // Will be set to phone number on signup
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Update password field automatically when phone changes during signup
  React.useEffect(() => {
    if (isSignUp) {
      setPassword(phone);
      setConfirmPassword(phone);
    }
  }, [phone, isSignUp]);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !phone) {
      setError('Email and Phone number are required');
      return;
    }
    if (phone.length !== 10) {
      setError('Phone number must be 10 digits');
      return;
    }
    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      let res;
      if (isSignUp) {
        // On signup, password is phone number
        res = await createUserWithEmailAndPassword(auth, email, phone);
      } else {
        res = await signInWithEmailAndPassword(auth, email, phone);
      }
      setUser(res.user);
      setStep('welcome');
      setConfirmPassword('');
      setIsSignUp(false);
    } catch (err) {
      setError(err.message || 'Authentication failed');
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
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    navigate('/')
  };

  const renderForm = () => (
    <form onSubmit={handleEmailAuth}>
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-left" style={{ color: '#212121' }}>
          Email / ഇമെയിൽ <span className="text-red-500">*</span>
        </label>
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Enter your email" 
          required
          className="w-full border-2 border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
          style={{ fontSize: '1rem', fontFamily: 'inherit' }}
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-left" style={{ color: '#212121' }}>
          Phone Number / ഫോൺ നമ്പർ <span className="text-red-500">*</span>
        </label>
        <input 
          type="tel" 
          value={phone} 
          onChange={e => {
            // Only allow digits, max length 10
            const val = e.target.value.replace(/\D/g,'').slice(0,10);
            setPhone(val);
          }} 
          placeholder="Enter your 10-digit mobile number" 
          required
          maxLength={10}
          className="w-full border-2 border-gray-300 px-4 py-3 rounded-md focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
          style={{ fontSize: '1rem', fontFamily: 'inherit' }}
        />
      </div>
      {isSignUp && (
        <>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-left" style={{ color: '#212121' }}>
              Password / പാസ്‌വേഡ് (Auto-set as Phone Number, hidden)
            </label>
            <input 
              type="password" 
              value={phone} 
              readOnly 
              className="w-full border-2 border-gray-300 px-4 py-3 rounded-md bg-gray-100 cursor-not-allowed"
              style={{ fontSize: '1rem', fontFamily: 'inherit' }}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-left" style={{ color: '#212121' }}>
              Confirm Password / പാസ്‌വേഡ് സ്ഥിരീകരിക്കുക (Auto-set as Phone Number, hidden)
            </label>
            <input 
              type="password" 
              value={phone} 
              readOnly 
              className="w-full border-2 border-gray-300 px-4 py-3 rounded-md bg-gray-100 cursor-not-allowed"
              style={{ fontSize: '1rem', fontFamily: 'inherit' }}
            />
          </div>
        </>
      )}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <button 
        type="submit"
        disabled={!email || phone.length !==10 || isLoading}
        className={`w-full py-3 rounded-md font-semibold text-white shadow-md transition ${
          isLoading ? "opacity-50 cursor-not-allowed" : "bg-gradient-to-r from-green-700 to-green-400 hover:from-green-800 hover:to-green-500"
        }`}
      >
        {isSignUp ? (isLoading ? "Creating Account..." : "Create Account") : (isLoading ? "Signing In..." : "Sign In")}
      </button>

     <button
  type="button"
  onClick={() => window.location.href = './register'} // change this path as needed
  className="mt-4 text-green-700 font-semibold hover:underline"
>
  Don't have an account? Sign Up
</button>

    </form>
  );

  if(user) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: "linear-gradient(135deg, #d0e8d0, #b1e394)"}}>
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-4 text-green-800">Welcome, {user.email}</h2>
          <button 
            onClick={handleLogout} 
            className="mt-6 w-full py-3 bg-gradient-to-r from-green-700 to-green-400 hover:from-green-800 hover:to-green-500 text-white font-semibold rounded-md shadow-md"
          >
            To Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 p-6 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="text-5xl mb-2">🌱</div>
          <h1 className="text-4xl font-extrabold text-green-700">Krishi Sakhi</h1>
          <p className="text-green-600 text-lg mt-1">കൃഷി സഖി</p>
          <div className="mt-2 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-green-700 to-green-400"></div>
          <p className="mt-4 text-gray-700">{isSignUp ? "Create your account" : "Sign in to your account"}</p>
        </div>
        {renderForm()}
        <button 
          onClick={handleGoogleSignIn} 
          disabled={isLoading} 
          className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-3 font-semibold text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285f4" d="M533.5 278.4c0-17-1.5-33.4-4.4-49.2H272.1v93h146.9c-6.3 33.8-25 62.4-53.4 81.6v67h86.2c50.3-46.3 79.7-114.6 79.7-192.4z"/>
            <path fill="#34a853" d="M272.1 544.3c72.9 0 134.1-24.1 178.8-65.5l-86.2-67c-24 16-54.6 25.6-92.5 25.6-71.3 0-131.7-48-153.4-112.5h-89.7v70.6c44.5 87.4 135.7 149.8 243.2 149.8z"/>
            <path fill="#fbbc04" d="M118.7 323.8c-10.2-30.9-10.2-64.3 0-95.2v-70.6h-89.7c-35 68.7-35 150.6 0 219.3l89.7-70.6z"/>
            <path fill="#ea4335" d="M272.1 107.7c39.6 0 75.2 13.6 103.1 40.4l77.1-77.1c-49-45.5-113.9-73.2-180.2-73.2-107.5 0-198.7 62.3-243.2 149.8l89.7 70.6c21.7-64.6 81.7-112.5 153.4-112.5z"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;