import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.jsx';
import { Button } from './ui/button.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { Newspaper, ExternalLink, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNewsLanguage, setSelectedNewsLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Language options for news
  const newsLanguageOptions = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  ];

  // Fetch news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://newsapi.org/v2/everything?q=indian+agriculture+pm+kisan&apiKey=7ecd3f5530104f04b50aca7d85d447c2'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Get first 10 articles
        setNews(data.articles?.slice(0, 10) || []);
        setLoading(false);
      } catch (err) {
        setError(
          language === 'ml'
            ? 'വാർത്തകൾ ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല'
            : language === 'hi'
            ? 'समाचार लोड नहीं हो सके'
            : 'Failed to load news'
        );
        setLoading(false);
        console.error('News fetch error:', err);
      }
    };
    fetchNews();
  }, [language]);

  // Handle language selection (mock for now, since no Google Translate)
  const handleLanguageChange = (name) => {
    setSelectedNewsLanguage(name);
    setShowLanguageDropdown(false);
    // TODO: Implement actual translation when needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 p-4 pb-20">
      {/* Agricultural News - Enhanced */}
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="pb-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Newspaper className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-gray-800 font-semibold">
                {language === 'ml' ? "കാർഷിക വാർത്തകൾ" : language === 'hi' ? "कृषि समाचार" : "Agricultural News"}
              </span>
            </CardTitle>
            
            {/* Language Dropdown */}
            <div className="relative">
              {/* <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg border transition-colors"
              >
                <span className="text-xs">
                  {newsLanguageOptions.find(lang => lang.name === selectedNewsLanguage)?.flag || '🇬🇧'}
                </span>
                <span className="font-medium">{selectedNewsLanguage}</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} />
              </button> */}
              
              {/* {showLanguageDropdown && (
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
              )} */}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {loading && (
            <div className="flex items-center justify-center p-6">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
              <span className="ml-2 text-sm text-gray-600">
                {language === 'ml' ? 'വാർത്തകൾ ലോഡ് ചെയ്യുന്നു...' : language === 'hi' ? 'समाचार लोड हो रहे हैं...' : 'Loading news...'}
              </span>
            </div>
          )}
          
          {error && (
            <div className="text-center p-4 text-red-600 bg-red-50 rounded-lg">
              <p className="text-sm">
                {language === 'ml' ? 'വാർത്തകൾ ലോഡ് ചെയ്യാൻ കഴിഞ്ഞില്ല' : language === 'hi' ? 'समाचार लोड नहीं हो सके' : 'Failed to load news'}
              </p>
            </div>
          )}

          {!loading && !error && news.length === 0 && (
            <div className="text-center p-4 text-gray-600">
              <p className="text-sm">
                {language === 'ml' ? 'വാർത്തകൾ ലഭ്യമല്ല' : language === 'hi' ? 'कोई समाचार उपलब्ध नहीं' : 'No news available'}
              </p>
            </div>
          )}

          {!loading && !error && news.map((article, index) => (
            <div key={index} className="bg-gradient-to-r from-white to-green-50 border border-green-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
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
        </CardContent>
      </Card>
      <div className='h-5'></div>
    </div>
  );
};

export default News;