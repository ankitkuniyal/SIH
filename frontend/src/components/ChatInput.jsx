import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { Send, Mic, MicOff } from "lucide-react";

export function ChatInput({ onSendMessage, disabled = false }) {
  const { t, language } = useLanguage();
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [speechLanguage, setSpeechLanguage] = useState('ml-IN'); // Default to Malayalam
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    // Check if speech recognition is supported
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.log('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    
    // Configure recognition
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.maxAlternatives = 1;
    
    // Set language based on speechLanguage state
    recognitionRef.current.lang = speechLanguage;

    // Handle results
    recognitionRef.current.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      
      if (event.results[current].isFinal) {
        setMessage(prev => prev + transcript);
        setTranscript("");
        setIsListening(false);
      } else {
        setTranscript(transcript);
      }
    };

    // Handle errors
    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      setTranscript("");
      
      // Show user-friendly error message
      if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please allow microphone access and try again.');
      } else if (event.error === 'no-speech') {
        console.log('No speech detected');
      }
    };

    // Handle end
    recognitionRef.current.onend = () => {
      setIsListening(false);
      setTranscript("");
    };

    // Handle start
    recognitionRef.current.onstart = () => {
      setIsListening(true);
      setTranscript("");
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [speechLanguage]); // Changed dependency to speechLanguage

  // Available speech languages
  const speechLanguageOptions = [
    { code: 'ml-IN', name: 'മലയാളം', flag: '🇮🇳' },
    { code: 'hi-IN', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'en-IN', name: 'English', flag: '🇮🇳' }
  ];

  // Map language context to speech recognition language codes
  const getSpeechLanguage = (lang) => {
    const languageMap = {
      'ml': 'ml-IN', // Malayalam
      'hi': 'hi-IN', // Hindi
      'ta': 'ta-IN', // Tamil
      'te': 'te-IN', // Telugu
      'kn': 'kn-IN', // Kannada
      'en': 'en-IN', // English (India)
    };
    return languageMap[lang] || 'en-IN';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        alert('Failed to start voice recognition. Please try again.');
      }
    }
  };

  const getCurrentLanguageName = () => {
    const currentLang = speechLanguageOptions.find(lang => lang.code === speechLanguage);
    return currentLang ? currentLang.name : 'Malayalam';
  };

  const displayText = transcript || message;

  return (
    <div className="border-t border-gray-200 bg-gradient-to-br from-white via-green-50/30 to-blue-50/30 p-4 pb-26 backdrop-blur-sm">
      {/* Language selection dropdown - Enhanced */}
      {showLanguageOptions && (
        <div className="mb-4 p-4 bg-gradient-to-r from-white to-green-50/50 rounded-xl border-0 shadow-lg">
          <div className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-xs">🌐</span>
            </div>
            Select Speech Language:
          </div>
          <div className="grid grid-cols-3 gap-3">
            {speechLanguageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSpeechLanguage(lang.code);
                  setShowLanguageOptions(false);
                }}
                className={`p-3 rounded-xl border-0 text-sm font-medium transition-all shadow-sm hover:shadow-md ${
                  speechLanguage === lang.code
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-green-50'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowLanguageOptions(false)}
            className="mt-3 text-xs text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {/* Voice status indicator - Enhanced */}
      {isListening && (
        <div className="mb-3 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-medium shadow-lg">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span>Listening in {getCurrentLanguageName()}... Speak now</span>
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-white/70 rounded-full animate-pulse"></div>
              <div className="w-1 h-4 bg-white/90 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
              <div className="w-1 h-3 bg-white/70 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Transcript preview - Enhanced */}
      {transcript && (
        <div className="mb-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
              <Mic className="h-2 w-2 text-white" />
            </div>
            <span className="text-xs font-medium text-blue-600">Speaking in {getCurrentLanguageName()}</span>
          </div>
          <p className="text-sm text-gray-700 font-medium">{transcript}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <Input
            value={displayText}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isListening ? "Listening..." : t('askQuestion')}
            disabled={disabled || isListening}
            className="pr-24 rounded-2xl bg-white border-0 shadow-lg h-12 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500/20 focus:shadow-xl transition-all"
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={toggleListening}
            disabled={disabled}
            className={`absolute right-12 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full p-0 hover:bg-transparent ${
              isListening 
                ? 'text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100' 
                : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
            } transition-all`}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          {/* Language selector button - Enhanced */}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setShowLanguageOptions(!showLanguageOptions)}
            disabled={disabled || isListening}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
            title="Select speech language"
          >
            <span className="text-xs font-bold">
              {speechLanguage === 'ml-IN' ? 'മ' : speechLanguage === 'hi-IN' ? 'हि' : 'En'}
            </span>
          </Button>
        </div>
        <Button 
          type="submit" 
          size="sm" 
          disabled={!message.trim() || disabled || isListening}
          className="rounded-2xl h-12 w-12 p-0 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95"
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>

      {/* Help text - Enhanced */}
      {!recognitionRef.current && (
        <div className="mt-3 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-medium border border-orange-200">
            <span>⚠️</span>
            Voice input not supported in this browser
          </div>
        </div>
      )}
    </div>
  );
}