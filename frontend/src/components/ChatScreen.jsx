import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { ChatMessage } from "./ChatMessage.jsx";
import { ChatInput } from "./ChatInput.jsx";
import { QuickActions } from "./QuickActions.jsx";
import { TypingIndicator } from "./TypingIndicator.jsx";
import { ScrollArea } from "./ui/scroll-area.jsx";
import { WelcomeBanner } from "./WelcomeBanner.jsx";

export function ChatScreen() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const scrollAreaRef = useRef(null);

  // Initialize welcome message on language change
  useEffect(() => {
    const welcomeMessage = {
      id: "1",
      message:
        language === "ml"
          ? "നമസ്കാരം! ഞാൻ കൃഷി സഹായി, നിങ്ങളുടെ AI കൃഷി സഹായകനാണ്. നെല്ല്, തേങ്ങ, കുരുമുളക്, എലം തുടങ്ങിയ കേരളത്തിലെ വിളകളെക്കുറിച്ചുള്ള വിദഗ്ധ ഉപദേശങ്ങൾ നൽകാൻ ഞാൻ ഇവിടെയുണ്ട്. നിങ്ങൾക്ക് എന്താണ് അറിയേണ്ടത്?"
          : language === "hi"
          ? "नमस्कार! मैं कृषि सहायक हूँ, आपका AI खेती सहायक। मैं केरल की फसलों - चावल, नारियल, काली मिर्च, इलायची के बारे में विशेषज्ञ सलाह देने के लिए यहाँ हूँ। आप क्या जानना चाहते हैं?"
          : "Hello! I'm Krishi Sahayi, your AI farming assistant. I'm here to help you with expert advice on Kerala crops like rice, coconut, pepper, cardamom, and more. What would you like to know?",
      isBot: true,
      timestamp: "Just now",
      confidence: 0.98,
    };
    setMessages([welcomeMessage]);
    setShowQuickActions(true);
  }, [language]);

  // Enhanced Kerala-specific bot responses
  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Kerala crop specific responses
    const keralaBotResponses = {
      "നെല്ല്": {
        message: language === 'ml'
          ? "നെല്ല് കൃഷിക്ക് മൺസൂൺ സമയം ഏറ്റവും നല്ലതാണ്. ജൂൺ-ജൂലൈയിൽ വിത്ത് വിതയ്ക്കുക. ഭൂമി തയ്യാറാക്കൽ, വെള്ളം നിൽക്കാൻ കഴിയുന്ന വയലുകൾ ഉണ്ടാക്കുക. ഓർഗാനിക് വളം ഉപയോഗിക്കുക."
          : language === 'hi'
          ? "धान की खेती के लिए मानसून का समय सबसे अच्छा है। जून-जुलाई में बीज बोएं। जमीन तैयार करें, पानी खड़ा रहने वाले खेत बनाएं। जैविक खाद का उपयोग करें।"
          : "For paddy cultivation, monsoon season is ideal. Sow seeds in June-July. Prepare fields with proper water retention. Use organic fertilizers like FYM at 12-15 tons/hectare.",
        confidence: 0.94
      },
      "തേങ്ങ": {
        message: language === 'ml'
          ? "തേങ്ങ കൃഷിക്ക് വർഷം മുഴുവനും പരിചരണം വേണം. മാസത്തിൽ ഒരിക്കൽ വെള്ളം കൊടുക്കുക. കമ്പോസ്റ്റ് വളം 3 മാസത്തിലൊരിക്കൽ. വേനൽക്കാലത്ത് കൂടുതൽ വെള്ളം വേണം."
          : language === 'hi' 
          ? "नारियल की खेती में साल भर देखभाल चाहिए। महीने में एक बार पानी दें। कंपोस्ट खाद 3 महीने में एक बार। गर्मियों में ज्यादा पानी चाहिए।"
          : "Coconut farming needs year-round care. Water once monthly during normal season, increase in summer. Apply compost every 3 months. Mulching helps retain moisture.",
        confidence: 0.91
      },
      "കുരുമുളക്": {
        message: language === 'ml'
          ? "കുരുമുളകിന് തണൽ വേണം. മറ്റു മരങ്ങളുടെ ചുവട്ടിൽ വളർത്താം. മഴക്കാലത്ത് കൂടുതൽ ജലം കൊടുക്കരുത്. നല്ല drainage വേണം. ഓർഗാനിക് കീടനാശിനി ഉപയോഗിക്കുക."
          : language === 'hi'
          ? "काली मिर्च को छाया चाहिए। दूसरे पेड़ों के नीचे उगा सकते हैं। बारिश में ज्यादा पानी न दें। अच्छी drainage चाहिए। जैविक कीटनाशक का उपयोग करें।"
          : "Black pepper needs shade - grow under coconut or areca palms. Avoid excess water during monsoons. Ensure good drainage. Use organic pest control like neem oil spray.",
        confidence: 0.89
      },
      "കീടനാശിനി": {
        message: language === 'ml'
          ? "രാസ കീടനാശികൾ ഒഴിവാക്കുക. നീം എണ്ണ, പഞ്ചഗവ്യ, മത്സ്യാമൃത് എന്നിവ ഉപയോഗിക്കുക. മാരിഗോൾഡ് പൂക്കൾ നട്ടാൽ കീടങ്ങളെ അകറ്റാം. പ്രകൃതിദത്ത ശത്രുക്കളെ പ്രോത്സാഹിപ്പിക്കുക."
          : language === 'hi'
          ? "रासायनिक कीटनाशकों से बचें। नीम का तेल, पंचगव्य, मत्स्यामृत का उपयोग करें। गेंदे के फूल लगाने से कीट भागते हैं। प्राकृतिक शत्रुओं को बढ़ावा दें।"
          : "Avoid chemical pesticides. Use neem oil, panchagavya, and fish amino acid. Plant marigolds as companion crops. Encourage beneficial insects like ladybugs.",
        confidence: 0.87
      }
    };

    // Check for Malayalam/Hindi/English keywords
    for (const [keyword, response] of Object.entries(keralaBotResponses)) {
      if (lowerMessage.includes(keyword) || 
          (keyword === "നെല്ل്" && (lowerMessage.includes("paddy") || lowerMessage.includes("rice") || lowerMessage.includes("धान"))) ||
          (keyword === "തേങ്ങ" && (lowerMessage.includes("coconut") || lowerMessage.includes("नारियल"))) ||
          (keyword === "കുരുമുളക്" && (lowerMessage.includes("pepper") || lowerMessage.includes("काली मिर्च"))) ||
          (keyword === "കീടനാശിനി" && (lowerMessage.includes("pest") || lowerMessage.includes("कीട")))) {
        return response;
      }
    }

    // Generic farming responses based on language
    const genericResponses = {
      fertilizer: {
        message: language === 'ml'
          ? "കേരളത്തിലെ ലാറ്ററൈറ്റ് മണ്ണിന് ഓർഗാനിക് വളമാണ് ഏറ്റവും നല്ലത്. കമ്പോസ്റ്റ്, ചാണകം, പച്ചിലവളം ഉപയോഗിക്കുക. NPK അനുപാതം വിളയനുസരിച്ച് മാറും."
          : language === 'hi'  
          ? "केरल की लैटेराइट मिट्टी के लिए जैविक खाद सबसे अच्छी है। कंपोस्ट, गोबर की खाद, हरी खाद का उपयोग करें। NPK अनुपात फसल के अनुसार बदलता है।"
          : "For Kerala's laterite soil, organic fertilizers work best. Use compost, FYM, and green manure. NPK ratio varies by crop - consult local agricultural officer.",
        confidence: 0.85
      },
      water: {
        message: language === 'ml'
          ? "കേരളത്തിലെ മഴക്കാലം മുതലെടുക്കുക. വെള്ളം സംഭരിക്കാൻ കുളങ്ങളും കിണറുകളും ഉണ്ടാക്കുക. ഡ്രിപ്പ് ഇറിഗേഷൻ വെള്ളം ലാഭിക്കാൻ നല്ലതാണ്."
          : language === 'hi'
          ? "केरल के मानसून का फायदा उठाएं। पानी संग्रह के लिए तालाب और कुएं बनाएं। ड्रिप सिंचाई पानी बचाने के लिए अच्छी है।"
          : "Utilize Kerala's monsoon effectively. Create ponds and wells for water storage. Drip irrigation saves water - ideal for coconut and spice cultivation.",
        confidence: 0.88
      }
    };

    // Check for generic keywords
    for (const [keyword, response] of Object.entries(genericResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Default response
    return {
      message: language === 'ml'
        ? "ക്ഷമിക്കണം, ആ കാര്യത്തെക്കുറിച്ച് എനിക്ക് വിശദമായ വിവരങ്ങൾ ഇല്ല. നിങ്ങളുടെ പ്രാദേശിക കൃഷി ഓഫീസറോട് സംസാരിക്കുക. മറ്റെന്തെങ്കിലും സഹായം വേണോ?"
        : language === 'hi'
        ? "क्षमा करें, मुझे इस बारे में विस्तृत जानकारी नहीं है। अपने स्थानीय कृषि अधिकारी से बात करें। क्या कोई और सहायता चाहिए?"
        : "I understand you're asking about farming. For specific queries, please consult your local agricultural extension officer. Can I help with general Kerala farming practices?",
      confidence: 0.65
    };
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (messageText) => {
    setShowQuickActions(false);

    const userMessage = {
      id: Date.now().toString(),
      message: messageText,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botResponseData = generateBotResponse(messageText);
      const botMessage = {
        id: (Date.now() + 1).toString(),
        message: botResponseData.message,
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        confidence: botResponseData.confidence,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        <div className="p-4">
          {/* Welcome banner */}
          {messages.length === 1 && <WelcomeBanner />}

          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.message}
              isBot={message.isBot}
              timestamp={message.timestamp}
              confidence={message.confidence}
            />
          ))}

          {isTyping && <TypingIndicator />}

          {showQuickActions && messages.length === 1 && (
            <QuickActions onSelectQuestion={handleSendMessage} disabled={isTyping} />
          )}
        </div>
      </ScrollArea>

      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
}
