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
    <div className="border-t bg-background p-4 pb-20">
      {/* Language selection dropdown */}
      {showLanguageOptions && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg border">
          <div className="text-sm font-medium text-gray-700 mb-2">Select Speech Language:</div>
          <div className="grid grid-cols-3 gap-2">
            {speechLanguageOptions.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSpeechLanguage(lang.code);
                  setShowLanguageOptions(false);
                }}
                className={`p-2 rounded-lg border text-sm font-medium transition-colors ${
                  speechLanguage === lang.code
                    ? 'bg-green-100 border-green-300 text-green-800'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowLanguageOptions(false)}
            className="mt-2 text-xs text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>
      )}

      {/* Voice status indicator */}
      {isListening && (
        <div className="mb-2 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Listening in {getCurrentLanguageName()}... Speak now
          </div>
        </div>
      )}
      
      {/* Transcript preview */}
      {transcript && (
        <div className="mb-2 p-2 bg-gray-100 rounded-lg text-sm text-gray-600">
          <span className="text-xs text-gray-400">Speaking in {getCurrentLanguageName()}:</span> {transcript}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            value={displayText}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={isListening ? "Listening..." : t('askQuestion')}
            disabled={disabled || isListening}
            className="pr-20 rounded-full bg-input-background border-border"
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={toggleListening}
            disabled={disabled}
            className={`absolute right-10 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full p-0 ${
              isListening ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-gray-600'
            }`}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          {/* Language selector button */}
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setShowLanguageOptions(!showLanguageOptions)}
            disabled={disabled || isListening}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full p-0 text-gray-500 hover:text-gray-600"
            title="Select speech language"
          >
            <span className="text-xs font-medium">
              {speechLanguage === 'ml-IN' ? 'മ' : speechLanguage === 'hi-IN' ? 'हि' : 'En'}
            </span>
          </Button>
        </div>
        <Button 
          type="submit" 
          size="sm" 
          disabled={!message.trim() || disabled || isListening}
          className="rounded-full h-10 w-10 p-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>

      {/* Help text */}
      {!recognitionRef.current && (
        <div className="mt-2 text-xs text-gray-400 text-center">
          Voice input not supported in this browser
        </div>
      )}
    </div>
  );
}