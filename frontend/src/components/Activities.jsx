import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { useLanguage } from "../contexts/LanguageContext";
import { Calendar, Plus, Droplets, Sprout, Zap, Bug, Scissors, Package, Clock, TrendingUp } from "lucide-react";

// Toast notification function
const showToast = (message) => {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #22c55e;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    opacity: 0;
    transition: opacity 300ms ease-in-out;
    z-index: 10000;
    font-size: 16px;
  `;
  document.body.appendChild(toast);
  
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
  });
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.addEventListener('transitionend', () => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    });
  }, 3000);
};

export function Activities() {
  const { t, language } = useLanguage();
  
  const [activities, setActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [activitiesError, setActivitiesError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: "",
    description: "",
    date: new Date().toISOString().split('T')[0]
  });

  // Helper: relative time formatter
  const timeAgo = (dateValue) => {
    if (!dateValue) return '';
    
    let date;
    
    // Try to parse as regular date first
    if (typeof dateValue === 'string' || dateValue instanceof Date) {
      date = new Date(dateValue);
    }
    
    // If not a valid date and looks like MongoDB ObjectId, extract timestamp
    if (isNaN(date?.getTime()) && typeof dateValue === 'string' && dateValue.length === 24) {
      try {
        const timestamp = parseInt(dateValue.substring(0, 8), 16) * 1000;
        date = new Date(timestamp);
      } catch (e) {
        return '';
      }
    }
    
    if (!date || isNaN(date.getTime())) return '';
    
    const diffMs = Date.now() - date.getTime();
    const sec = Math.floor(diffMs / 1000);
    if (sec < 60) return t('justNow') || 'Just now';
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const day = Math.floor(hr / 24);
    if (day === 1) return '1 day ago';
    return `${day} days ago`;
  };

  // Fetch activities from API
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setActivitiesLoading(true);
        setActivitiesError(null);
        const res = await fetch('http://localhost:3000/api/activity');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        // Map backend data into UI-friendly shape
        const mapped = (Array.isArray(data) ? data : []).map(a => ({
          id: a._id || a.id,
            // Fallback to attempt deriving a type from description keywords
          type: a.type || (a.description?.toLowerCase().includes('harvest') ? 'harvesting' :
                 a.description?.toLowerCase().includes('irrigat') ? 'irrigation' :
                 a.description?.toLowerCase().includes('fert') ? 'fertilizing' :
                 a.description?.toLowerCase().includes('sow') ? 'sowing' : 'general'),
          description: a.description || a.advisory || 'No description',
          date: a.date || a.createdAt || a._id || null,
          timestamp: timeAgo(a.date || a.createdAt || a._id),
          rawDate: a.date || a.createdAt || a._id // Keep raw date for sorting
        }));
        
        // Sort activities by date (latest first) - handle multiple date formats
        const sorted = mapped.sort((a, b) => {
          // Try to get the most recent timestamp from various sources
          const getTimestamp = (activity) => {
            // Try explicit date field first
            if (activity.rawDate) {
              const date = new Date(activity.rawDate);
              if (!isNaN(date.getTime())) return date.getTime();
            }
            
            // Fallback to extracting timestamp from MongoDB ObjectId
            if (activity.id && typeof activity.id === 'string' && activity.id.length === 24) {
              try {
                const timestamp = parseInt(activity.id.substring(0, 8), 16) * 1000;
                return timestamp;
              } catch (e) {
                console.log('Error parsing ObjectId timestamp:', e);
              }
            }
            
            // Last resort - return 0
            return 0;
          };
          
          const timestampA = getTimestamp(a);
          const timestampB = getTimestamp(b);
          
          return timestampB - timestampA; // Descending order (latest first)
        });
        
        setActivities(sorted);
      } catch (err) {
        console.error('Failed to fetch activities:', err);
        setActivitiesError(err.message);
      } finally {
        setActivitiesLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const activityTypes = [
    'sowing', 'irrigation', 'fertilizing', 'pestSpray', 'weeding', 'harvesting'
  ];

  const activityDescriptions = {
    en: {
      sowing: "Plant seeds and saplings",
      irrigation: "Water management", 
      fertilizing: "Nutrient application",
      pestSpray: "Pest and disease control",
      weeding: "Weed management",
      harvesting: "Crop collection"
    },
    ml: {
      sowing: "വിത്തുകളും തൈകളും നടുക",
      irrigation: "ജല പരിപാലനം",
      fertilizing: "പോഷക പദാർത്ഥ പ്രയോഗം", 
      pestSpray: "കീടരോഗ നിയന്ത്രണം",
      weeding: "കള പരിപാലനം",
      harvesting: "വിള ശേഖരണം"
    },
    hi: {
      sowing: "बीज और पौधे लगाना",
      irrigation: "जल प्रबंधन",
      fertilizing: "पोषक तत्व का प्रयोग",
      pestSpray: "कीट और रोग नियंत्रण", 
      weeding: "खरपतवार प्रबंधन",
      harvesting: "फसल संग्रह"
    }
  };

  const getActivityIcon = (type) => {
    const iconProps = { className: "h-4 w-4 flex-shrink-0" };
    switch (type) {
      case 'sowing': return <Sprout {...iconProps} />;
      case 'irrigation': return <Droplets {...iconProps} />;
      case 'fertilizing': return <Zap {...iconProps} />;
      case 'pestSpray': return <Bug {...iconProps} />;
      case 'weeding': return <Scissors {...iconProps} />;
      case 'harvesting': return <Package {...iconProps} />;
      default: return <Calendar {...iconProps} />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'sowing': return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-200';
      case 'irrigation': return 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-200';
      case 'fertilizing': return 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border-yellow-200';
      case 'pestSpray': return 'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border-red-200';
      case 'weeding': return 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-200';
      case 'harvesting': return 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border-purple-200';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-200';
    }
  };

  const getActivityBadgeColor = (type) => {
    switch (type) {
      case 'sowing': return 'bg-green-500';
      case 'irrigation': return 'bg-blue-500';
      case 'fertilizing': return 'bg-yellow-500';
      case 'pestSpray': return 'bg-red-500';
      case 'weeding': return 'bg-orange-500';
      case 'harvesting': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (newActivity.type && newActivity.description) {
      const now = new Date();
      const activity = {
        id: Date.now().toString(),
        type: newActivity.type,
        description: newActivity.description,
        date: newActivity.date || now.toISOString(),
        timestamp: t('justNow') || 'Just now',
        rawDate: now.toISOString() // Ensure proper sorting
      };
      setActivities([activity, ...activities]);
      setNewActivity({
        type: "",
        description: "",
        date: new Date().toISOString().split('T')[0]
      });
      setShowAddForm(false);
      showToast(language === 'ml' ? 'പ്രവർത്തനം ചേർത്തു!' : language === 'hi' ? 'गतिविधि जोड़ी गई!' : 'Activity added!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 pb-12">
      <div className="px-3 sm:px-4 py-4 space-y-4 sm:space-y-6 max-w-lg mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -translate-y-4 translate-x-4 sm:-translate-y-8 sm:translate-x-8"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-lg">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white drop-shadow-sm" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold truncate">{t('activities')}</h1>
                  <p className="text-green-100 text-xs sm:text-sm mt-0.5 line-clamp-2">
                    {t('trackingSubtitle')}
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 shadow-lg min-h-[44px] px-3 sm:px-4 w-full sm:w-auto"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2 shrink-0" />
                <span className="truncate">{t('addActivity')}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Add Activity Form - Mobile Optimized */}
        {showAddForm && (
          <Card className="border-0 shadow-xl bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:pb-4">
              <CardTitle className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                </div>
                <span className="text-gray-800 font-semibold text-base sm:text-lg truncate">
                  {t('logActivity')}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <form onSubmit={handleAddActivity} className="space-y-5 sm:space-y-6">
                {/* Activity Type Dropdown - FIXED for mobile */}
                <div className="space-y-2 sm:space-y-3">
                  <Label className="text-gray-700 font-medium text-sm sm:text-base">
                    {t('activityType')}
                  </Label>
                  <div className="relative">
                    <Select 
                      value={newActivity.type} 
                      onValueChange={(value) => setNewActivity({...newActivity, type: value})}
                    >
                      <SelectTrigger className="h-12 sm:h-14 border-2 border-gray-200 rounded-xl hover:border-green-400 focus:border-green-500 transition-all duration-200 bg-gradient-to-r from-white to-green-50/30 shadow-sm hover:shadow-md">
                        <div className="flex items-center gap-2 w-full min-w-0">
                          {newActivity.type && (
                            <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(newActivity.type)}`}>
                              {getActivityIcon(newActivity.type)}
                            </div>
                          )}
                          <div className="flex-1 min-w-0 text-left">
                            <SelectValue 
                              placeholder={
                                <span className="text-gray-500 font-medium text-sm sm:text-base block truncate">
                                  {t('selectActivity')}
                                </span>
                              }
                            >
                              {newActivity.type && (
                                <span className="text-gray-900 font-medium text-sm sm:text-base block truncate">
                                  {t(newActivity.type)}
                                </span>
                              )}
                            </SelectValue>
                          </div>
                        </div>
                      </SelectTrigger>
                      <SelectContent className="w-full border-2 border-gray-200 shadow-2xl rounded-xl bg-white backdrop-blur-sm mt-2 overflow-hidden">
                        <div className="p-1 sm:p-2">
                          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-2 mb-1 sm:mb-2">
                            {t('farmingActivities')}
                          </div>
                          {activityTypes.map((type) => (
                            <SelectItem 
                              key={type} 
                              value={type}
                              className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 focus:bg-gradient-to-r focus:from-green-50 focus:to-emerald-50 cursor-pointer p-3 sm:p-4 rounded-lg m-0.5 sm:m-1 border-0 transition-all duration-200 group"
                            >
                              <div className="flex items-center gap-3 sm:gap-4 w-full">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 flex-shrink-0 ${getActivityColor(type)}`}>
                                  {getActivityIcon(type)}
                                </div>
                                <div className="flex flex-col items-start flex-1 min-w-0">
                                  <span className="font-semibold text-gray-800 text-sm sm:text-base truncate w-full">
                                    {t(type)}
                                  </span>
                                  <span className="text-xs text-gray-500 mt-0.5 line-clamp-2 w-full">
                                    {activityDescriptions[language]?.[type] || activityDescriptions.en[type]}
                                  </span>
                                </div>
                                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${getActivityBadgeColor(type)} opacity-60 group-hover:opacity-100 transition-opacity duration-200`}></div>
                              </div>
                            </SelectItem>
                          ))}
                        </div>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Description Field - Mobile Optimized */}
                <div className="space-y-2 sm:space-y-3">
                  <Label className="text-gray-700 font-medium text-sm sm:text-base">
                    {t('description')}
                  </Label>
                  <Textarea
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                    placeholder={t('activityDetails')}
                    rows={3}
                    className="border-2 border-gray-200 rounded-xl hover:border-green-300 focus:border-green-500 transition-colors resize-none text-sm sm:text-base min-h-[88px]"
                  />
                </div>

                {/* Date Field */}
                <div className="space-y-2 sm:space-y-3">
                  <Label className="text-gray-700 font-medium text-sm sm:text-base flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center border border-green-200">
                      <Calendar className="h-3 w-3 text-green-600" />
                    </div>
                    {t('date')}
                  </Label>
                  <div className="relative">
                    <Input
                      type="date"
                      value={newActivity.date}
                      onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                      className="h-12 sm:h-14 w-full max-w-[160px] border border-gray-300/60 rounded-lg hover:border-green-400/80 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all duration-300 text-sm sm:text-base px-3 bg-white/80 shadow-sm hover:shadow-md focus:shadow-lg backdrop-blur-sm ring-0 font-medium"
                      style={{
                        colorScheme: 'light'
                      }}
                    />
                  </div>
                </div>

                {/* Action Buttons - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4">
                  <Button 
                    type="submit" 
                    className="h-11 sm:h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-md order-1 sm:order-none flex-1"
                  >
                    {t('submit')}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowAddForm(false)}
                    className="h-11 sm:h-12 border-2 border-gray-300 hover:border-green-300 rounded-xl font-medium order-2 sm:order-none flex-1"
                  >
                    {t('cancel')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Recent Activities - Mobile Optimized */}
        <Card className="border-0 shadow-lg bg-white">
          <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-t-xl p-4 sm:pb-4">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
              </div>
              <span className="text-gray-800 font-semibold text-base sm:text-lg truncate">
                {t('recentActivities')}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            {activitiesLoading && (
              <div className="text-center py-10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full border-4 border-green-200 border-t-green-500 animate-spin"></div>
                <p className="text-gray-500 text-sm font-medium">{t('loading') || 'Loading activities...'}</p>
              </div>
            )}
            {!activitiesLoading && activitiesError && (
              <div className="text-center py-10">
                <p className="text-red-600 font-medium mb-3 text-sm">{t('failedToLoad') || 'Failed to load activities'}</p>
                <Button 
                  onClick={() => { setActivitiesLoading(true); setActivitiesError(null); (async ()=>{ try { const res = await fetch('http://localhost:3000/api/activity'); if(!res.ok) throw new Error(); const data = await res.json(); const mapped = (Array.isArray(data)?data:[]).map(a=>({ id: a._id || a.id, type: a.type || 'general', description: a.description || a.advisory || 'No description', date: a.date || a.createdAt || null, timestamp: timeAgo(a.date || a.createdAt) })); setActivities(mapped);} catch(e){ setActivitiesError(e.message);} finally{ setActivitiesLoading(false);} })(); }}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                >
                  {t('retry') || 'Retry'}
                </Button>
              </div>
            )}
            {!activitiesLoading && !activitiesError && activities.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-100 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-gray-400" />
                </div>
                <p className="text-gray-500 font-medium text-sm sm:text-base px-4">
                  {t('noActivities')}
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 px-4">
                  {t('startTracking')}
                </p>
              </div>
            ) : (
              !activitiesLoading && !activitiesError && activities.map((activity) => (
                <div key={activity.id} className="bg-gradient-to-r from-white to-green-50 border border-green-100 p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`p-2 sm:p-3 rounded-full border shrink-0 ${getActivityColor(activity.type || 'general')}`}>
                      {getActivityIcon(activity.type || 'general')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                        {activity.type && activity.type !== 'general' && (
                          <Badge className={`${getActivityColor(activity.type)} text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border w-fit`}>
                            {t(activity.type) || activity.type}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3 shrink-0" />
                          <span className="truncate">{activity.timestamp}</span>
                        </span>
                      </div>
                      <p className="text-gray-800 font-medium mb-2 text-sm sm:text-base line-clamp-3">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        {/* <span className="w-3 h-3 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center border border-green-200 flex-shrink-0">
                          <Calendar className="h-2 w-2 text-green-600" />
                        </span>
                        <span className="truncate">
                          {activity.date ? new Date(activity.date).toLocaleDateString('en-IN') : ''}
                        </span> */}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Activity Summary - Mobile Optimized */}
        <Card className="border-0 shadow-lg bg-white pb-19">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl p-4 sm:pb-4">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              </div>
              <span className="text-gray-800 font-semibold text-base sm:text-lg truncate">
                Month Summary
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {activityTypes.map((type) => {
                const count = activities.filter(a => a.type === type).length;
                return (
                  <div key={type} className="bg-gradient-to-br from-gray-50 to-green-50 border border-green-100 p-3 sm:p-4 rounded-xl hover:shadow-md transition-all">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className={`p-1.5 sm:p-2 rounded-full shrink-0 ${getActivityColor(type)}`}>
                        {getActivityIcon(type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
                          {t(type)}
                        </p>
                        <p className="text-base sm:text-lg font-bold text-green-600">
                          {count}
                        </p>
                        <p className="text-xs text-gray-500">
                          {t('times')}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}