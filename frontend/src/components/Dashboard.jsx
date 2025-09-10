import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Badge } from "./ui/badge.jsx";
import { Button } from "./ui/button.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { Cloud, Droplets, Sun, Wind, Calendar, TrendingUp, AlertTriangle, MessageCircle, Newspaper, ExternalLink, ChevronRight, ChevronDown } from "lucide-react";
import ImageWithFallback from "./figma/ImageWithFallback.jsx";
import { ProfileSetup } from "./ProfileSetup.jsx";
import { useNavigate } from "react-router-dom";

// Add BottomNavigation import if needed
// import { BottomNavigation } from "./BottomNavigation.jsx";

export function Dashboard({ farmerName, onTabChange }) {
  const navigate = useNavigate()
  const { t, language } = useLanguage();
  
  // News state
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(null);
  const [selectedNewsLanguage, setSelectedNewsLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Language options for news
  const newsLanguageOptions = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' }
  ];

  // Fetch agriculture news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setNewsLoading(true);
        const response = await fetch(
          'https://newsapi.org/v2/everything?q=indian+agriculture+pm+kisan&apiKey=7ecd3f5530104f04b50aca7d85d447c2'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Get only first 3 articles for dashboard
        setNews(data.articles?.slice(0, 3) || []);
        setNewsLoading(false);
      } catch (err) {
        setNewsError('Failed to fetch news');
        setNewsLoading(false);
        console.error('News fetch error:', err);
      }
    };
    fetchNews();
  }, []);

  // Mock weather data
  const weather = {
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 78,
    rainfall: 5,
    windSpeed: 12
  };

  // Mock upcoming tasks based on Kerala farming calendar
  const upcomingTasks = [
    {
      task: language === 'ml' ? "നെല്ല് വിത്ത് ഒരുക്കം" : language === 'hi' ? "धान बीज तैयारी" : "Prepare paddy seeds",
      dueDate: "Tomorrow",
      priority: "high"
    },
    {
      task: language === 'ml' ? "തേങ്ങാ വളപ്രയോഗം" : language === 'hi' ? "नारियल उर्वरक" : "Coconut fertilization",
      dueDate: "2 days",
      priority: "medium"
    },
    {
      task: language === 'ml' ? "കുരുമുളക് വെള്ളം" : language === 'hi' ? "काली मिर्च पानी" : "Water pepper plants",
      dueDate: "3 days", 
      priority: "low"
    }
  ];

  // Mock recent advice
  const recentAdvice = [
    {
      message: language === 'ml' 
        ? "മഴക്കാലത്തിന് മുന്നോടിയായി നെല്ല് വയലുകൾ തയ്യാറാക്കുക"
        : language === 'hi'
        ? "मानसून से पहले धान के खेत तैयार करें"
        : "Prepare paddy fields before monsoon season",
      timestamp: "2 hours ago",
      confidence: 0.92
    },
    {
      message: language === 'ml'
        ? "ഇലപ്പുള്ളി രോഗം തടയാൻ നീം എണ്ണ തളിക്കുക"
        : language === 'hi' 
        ? "पत्ती के धब्बे की बीमारी को रोकने के लिए नीम का तेल छिड़कें"
        : "Spray neem oil to prevent leaf spot disease",
      timestamp: "Yesterday",
      confidence: 0.88
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Welcome Section */}
      <Card className="rounded-lg border shadow-sm overflow-hidden bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <span className="text-xl" onClick={() => navigate('/profile')}>👨‍🌾</span>
            </div>
            <div>
              {/* Clickable welcome that navigates to Profile tab */}
              <h2
                className="font-medium cursor-pointer hover:underline"
                onClick={() => onTabChange && onTabChange('profile')}
              >
                {t('welcomeBack')}
              </h2>
              <p className="text-sm text-muted-foreground">
                {farmerName || t('farmerName')} • കൃഷി സഹായി
              </p>
            </div>
          </div>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1625110110679-f0a5659e32b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBmYXJtaW5nJTIwYWdyaWN1bHR1cmUlMjBwYWRkeXxlbnwxfHx8fDE3NTc0MDM3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Kerala farming"
            className="w-full h-24 object-cover rounded-md"
          />
        </CardContent>
      </Card>

      {/* Today's Weather */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Sun className="h-5 w-5 text-yellow-500" />
            {t('weatherToday')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-2xl font-medium">{weather.temp}°C</p>
                <p className="text-sm text-muted-foreground">{weather.condition}</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Droplets className="h-3 w-3 text-blue-500" />
                <span>{weather.humidity}% Humidity</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Wind className="h-3 w-3 text-gray-500" />
                <span>{weather.windSpeed} km/h Wind</span>
              </div>
            </div>
          </div>
          <div className="mt-3 p-2 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              {language === 'ml' 
                ? `ഇന്ന് ${weather.rainfall}mm മഴ പ്രതീക്ഷിക്കുന്നു`
                : language === 'hi'
                ? `आज ${weather.rainfall}mm बारिश की उम्मीद`
                : `${weather.rainfall}mm rainfall expected today`}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Tasks */}
      {/* <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            {t('upcomingTasks')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {upcomingTasks.map((task, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium">{task.task}</p>
                <p className="text-sm text-muted-foreground">Due in {task.dueDate}</p>
              </div>
              <Badge variant={getPriorityColor(task.priority)}>
                {task.priority}
              </Badge>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full">
            {language === 'ml' ? "എല്ലാ ജോലികളും കാണുക" : language === 'hi' ? "सभी कार्य देखें" : "View All Tasks"}
          </Button>
        </CardContent>
      </Card> */}

      {/* Recent Advice */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            {t('recentAdvice')}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {recentAdvice.map((advice, index) => (
            <div key={index} className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <p className="text-sm">{advice.message}</p>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-muted-foreground">{advice.timestamp}</p>
                <Badge variant="secondary" className="text-xs">
                  {Math.round(advice.confidence * 100)}% confident
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Agriculture News */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Newspaper className="h-5 w-5 text-blue-600" />
              {language === 'ml' ? 'കാർഷിക വാർത്തകൾ' : language === 'hi' ? 'कृषि समाचार' : 'Agriculture News'}
            </CardTitle>
            
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg border transition-colors"
              >
                <span className="text-xs">
                  {newsLanguageOptions.find(lang => lang.name === selectedNewsLanguage)?.flag || '🇬🇧'}
                </span>
                <span className="font-medium">{selectedNewsLanguage}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showLanguageDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg z-10 min-w-[120px]">
                  {newsLanguageOptions.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => {
                        setSelectedNewsLanguage(option.name);
                        setShowLanguageDropdown(false);
                        // TODO: Add language change functionality here
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        selectedNewsLanguage === option.name ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                      }`}
                    >
                      <span className="text-xs">{option.flag}</span>
                      <span>{option.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {newsLoading && (
            <div className="flex items-center justify-center p-6">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
              <span className="ml-2 text-sm text-gray-600">
                {language === 'ml' ? 'വാർത്തകൾ ലോഡ് ചെയ്യുന്നു...' : language === 'hi' ? 'समाचार लोड हो रहे हैं...' : 'Loading news...'}
              </span>
            </div>
          )}
          
          {newsError && (
            <div className="text-center p-4 text-red-600 bg-red-50 rounded-lg">
              <p className="text-sm">
                {language === 'ml' ? 'വാർത്തകൾ ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല' : language === 'hi' ? 'समाचार लोड नहीं हो सके' : 'Failed to load news'}
              </p>
            </div>
          )}

          {!newsLoading && !newsError && news.length === 0 && (
            <div className="text-center p-4 text-gray-600">
              <p className="text-sm">
                {language === 'ml' ? 'വാർത്തകൾ ലഭ്യമല്ല' : language === 'hi' ? 'कोई समाचार उपलब्ध नहीं' : 'No news available'}
              </p>
            </div>
          )}

          {!newsLoading && !newsError && news.map((article, index) => (
            <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">
                    {article.title || 'Untitled'}
                  </h4>
                  <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                    {article.description || 'No description available.'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {article.source?.name || 'Unknown Source'}
                    </span>
                    <a
                      href={article.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-xs"
                    >
                      {language === 'ml' ? 'കൂടുതൽ വായിക്കുക' : language === 'hi' ? 'और पढ़ें' : 'Read more'}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                {article.urlToImage && (
                  <img 
                    src={article.urlToImage} 
                    alt="News" 
                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
              </div>
            </div>
          ))}

          {/* {!newsLoading && !newsError && news.length > 0 && (
            <Button variant="outline" size="sm" className="w-full mt-3">
              <span className="flex items-center gap-2">
                {language === 'ml' ? 'എല്ലാ വാർത്തകളും കാണുക' : language === 'hi' ? 'सभी समाचार देखें' : 'View All News'}
                <ChevronRight className="h-4 w-4" />
              </span>
            </Button>
          )} */}
        </CardContent>
      </Card>

      {/* Space left for removed Quick Access cards */}
      <div className="grid grid-cols-2 gap-3 h-16" />
    </div>
  );
}