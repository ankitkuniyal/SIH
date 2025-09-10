// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
// import { Button } from "./ui/button.jsx";
// import { Input } from "./ui/input.jsx";
// import { Label } from "./ui/label.jsx";
// import { Textarea } from "./ui/textarea.jsx";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select.jsx";
// import { Badge } from "./ui/badge.jsx";
// import { useLanguage } from "../contexts/LanguageContext.jsx";
// import { Calendar, Plus, Droplets, Sprout, Zap, Bug, Scissors, Package } from "lucide-react";

// export function Activities() {
//   const { t, language } = useLanguage();
//   const [activities, setActivities] = useState([
//     {
//       id: "1",
//       type: "sowing",
//       description: language === 'ml' ? "നെല്ല് വിത്ത് വിതച്ചു" : language === 'hi' ? "धान के बीज बोए" : "Sowed paddy seeds",
//       date: "2024-01-08",
//       timestamp: "2 days ago"
//     },
//     {
//       id: "2", 
//       type: "irrigation",
//       description: language === 'ml' ? "വയലിൽ വെള്ളം വിട്ടു" : language === 'hi' ? "खेत में पानी दिया" : "Irrigated the field",
//       date: "2024-01-09",
//       timestamp: "1 day ago"
//     },
//     {
//       id: "3",
//       type: "fertilizing",
//       description: language === 'ml' ? "യൂറിയ വള പ്രയോഗിച്ചു" : language === 'hi' ? "यूरिया खाद डाली" : "Applied urea fertilizer",
//       date: "2024-01-10",
//       timestamp: "Today"
//     }
//   ]);

//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newActivity, setNewActivity] = useState({
//     type: "",
//     description: "",
//     date: new Date().toISOString().split('T')[0]
//   });

//   const activityTypes = [
//     'sowing', 'irrigation', 'fertilizing', 'pestSpray', 'weeding', 'harvesting'
//   ];

//   const getActivityIcon = (type) => {
//     switch (type) {
//       case 'sowing': return <Sprout className="h-4 w-4" />;
//       case 'irrigation': return <Droplets className="h-4 w-4" />;
//       case 'fertilizing': return <Zap className="h-4 w-4" />;
//       case 'pestSpray': return <Bug className="h-4 w-4" />;
//       case 'weeding': return <Scissors className="h-4 w-4" />;
//       case 'harvesting': return <Package className="h-4 w-4" />;
//       default: return <Calendar className="h-4 w-4" />;
//     }
//   };

//   const getActivityColor = (type) => {
//     switch (type) {
//       case 'sowing': return 'bg-green-100 text-green-800';
//       case 'irrigation': return 'bg-blue-100 text-blue-800';
//       case 'fertilizing': return 'bg-yellow-100 text-yellow-800';
//       case 'pestSpray': return 'bg-red-100 text-red-800';
//       case 'weeding': return 'bg-orange-100 text-orange-800';
//       case 'harvesting': return 'bg-purple-100 text-purple-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   const handleAddActivity = (e) => {
//     e.preventDefault();
//     if (newActivity.type && newActivity.description) {
//       const activity = {
//         id: Date.now().toString(),
//         type: newActivity.type,
//         description: newActivity.description,
//         date: newActivity.date,
//         timestamp: "Just now"
//       };
//       setActivities([activity, ...activities]);
//       setNewActivity({
//         type: "",
//         description: "",
//         date: new Date().toISOString().split('T')[0]
//       });
//       setShowAddForm(false);
//     }
//   };

//   return (
//     <div className="p-4 space-y-4 pb-16">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-xl font-medium">{t('activities')}</h1>
//         <Button 
//           onClick={() => setShowAddForm(!showAddForm)}
//           size="sm"
//           className="flex items-center gap-2"
//         >
//           <Plus className="h-4 w-4" />
//           {t('addActivity')}
//         </Button>
//       </div>

//       {/* Add Activity Form */}
//       {showAddForm && (
//         <Card>
//           <CardHeader>
//             <CardTitle>{t('logActivity')}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleAddActivity} className="space-y-4">
//               <div className="space-y-2">
//                 <Label>{t('activityType')}</Label>
//                 <Select 
//                   value={newActivity.type} 
//                   onValueChange={(value) => setNewActivity({...newActivity, type: value})}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder={
//                       language === 'ml' ? 'പ്രവർത്തനം തിരഞ്ഞെടുക്കുക' :
//                       language === 'hi' ? 'गतिविधि चुनें' :
//                       'Select activity'
//                     } />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {activityTypes.map((type) => (
//                       <SelectItem key={type} value={type}>
//                         <div className="flex items-center gap-2">
//                           {getActivityIcon(type)}
//                           {t(type)}
//                         </div>
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label>{t('description')}</Label>
//                 <Textarea
//                   value={newActivity.description}
//                   onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
//                   placeholder={
//                     language === 'ml' ? 'പ്രവർത്തനത്തിന്റെ വിശദാംശങ്ങൾ...' :
//                     language === 'hi' ? 'गतिविधि का विवरण...' :
//                     'Activity details...'
//                   }
//                   rows={3}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>{t('date')}</Label>
//                 <Input
//                   type="date"
//                   value={newActivity.date}
//                   onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
//                 />
//               </div>

//               <div className="flex gap-2">
//                 <Button type="submit" className="flex-1">
//                   {t('submit')}
//                 </Button>
//                 <Button 
//                   type="button" 
//                   variant="outline" 
//                   onClick={() => setShowAddForm(false)}
//                   className="flex-1"
//                 >
//                   {t('cancel')}
//                 </Button>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       )}

//       {/* Recent Activities */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Calendar className="h-5 w-5 text-green-600" />
//             {t('recentActivities')}
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-3">
//           {activities.length === 0 ? (
//             <div className="text-center py-8 text-muted-foreground">
//               <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
//               <p>
//                 {language === 'ml' ? 'ഇതുവരെ പ്രവർത്തനങ്ങളൊന്നുമില്ല' :
//                  language === 'hi' ? 'अभी तक कोई गतिविधि नहीं' :
//                  'No activities logged yet'}
//               </p>
//             </div>
//           ) : (
//             activities.map((activity) => (
//               <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
//                 <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
//                   {getActivityIcon(activity.type)}
//                 </div>
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <Badge variant="secondary" className="text-xs">
//                       {t(activity.type)}
//                     </Badge>
//                     <span className="text-xs text-muted-foreground">
//                       {activity.timestamp}
//                     </span>
//                   </div>
//                   <p className="text-sm">{activity.description}</p>
//                   <p className="text-xs text-muted-foreground mt-1">
//                     {new Date(activity.date).toLocaleDateString(
//                       language === 'ml' ? 'ml-IN' : 
//                       language === 'hi' ? 'hi-IN' : 'en-IN'
//                     )}
//                   </p>
//                 </div>
//               </div>
//             ))
//           )}
//         </CardContent>
//       </Card>

//       {/* Activity Summary */}
//       <Card>
//         <CardHeader>
//           <CardTitle>
//             {language === 'ml' ? 'ഈ മാസത്തെ സംഗ്രഹം' :
//              language === 'hi' ? 'इस महीने का सारांश' :
//              'This Month Summary'}
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-2 gap-4">
//             {activityTypes.map((type) => {
//               const count = activities.filter(a => a.type === type).length;
//               return (
//                 <div key={type} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
//                   {getActivityIcon(type)}
//                   <div>
//                     <p className="text-sm font-medium">{t(type)}</p>
//                     <p className="text-xs text-muted-foreground">{count} times</p>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



























import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { useLanguage } from "../contexts/LanguageContext";
import { Calendar, Plus, Droplets, Sprout, Zap, Bug, Scissors, Package, Clock, TrendingUp } from "lucide-react";

export function Activities() {
  const { t, language } = useLanguage(); // Removed setLanguage since it's now controlled from Settings
  
  const [activities, setActivities] = useState([
    {
      id: "1",
      type: "sowing",
      description: language === 'ml' ? "നെല്ല് വിത്ത് വിതച്ചു" : language === 'hi' ? "धान के बीज बोए" : "Sowed paddy seeds",
      date: "2024-01-08",
      timestamp: "2 days ago"
    },
    {
      id: "2", 
      type: "irrigation",
      description: language === 'ml' ? "വയലിൽ വെള്ളം വിട്ടു" : language === 'hi' ? "खेत में पानी दिया" : "Irrigated the field",
      date: "2024-01-09", 
      timestamp: "1 day ago"
    },
    {
      id: "3",
      type: "fertilizing",
      description: language === 'ml' ? "യൂറിയ വള പ്രയോഗിച്ചു" : language === 'hi' ? "यूरिया खाद डाली" : "Applied urea fertilizer",
      date: "2024-01-10",
      timestamp: "Today"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: "",
    description: "",
    date: new Date().toISOString().split('T')[0]
  });

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
    const iconProps = { className: "h-4 w-4 sm:h-5 sm:w-5" };
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
      const activity = {
        id: Date.now().toString(),
        type: newActivity.type,
        description: newActivity.description,
        date: newActivity.date,
        timestamp: t('justNow')
      };
      setActivities([activity, ...activities]);
      setNewActivity({
        type: "",
        description: "",
        date: new Date().toISOString().split('T')[0]
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 pb-24">
      <div className="px-3 sm:px-4 py-4 space-y-4 sm:space-y-6 max-w-lg mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -translate-y-4 translate-x-4 sm:-translate-y-8 sm:translate-x-8"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
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
                {/* Activity Type Dropdown - Mobile Enhanced (ChevronDown REMOVED) */}
                <div className="space-y-2 sm:space-y-3">
                  <Label className="text-gray-700 font-medium text-sm sm:text-base">
                    {t('activityType')}
                  </Label>
                  <div className="relative">
                    <Select 
                      value={newActivity.type} 
                      onValueChange={(value) => setNewActivity({...newActivity, type: value})}
                    >
                      <SelectTrigger className="h-12 sm:h-14 border-2 border-gray-200 rounded-xl hover:border-green-400 focus:border-green-500 transition-all duration-200 bg-gradient-to-r from-white to-green-50/30 shadow-sm hover:shadow-md group">
                        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                          {newActivity.type && (
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${getActivityColor(newActivity.type)}`}>
                              {getActivityIcon(newActivity.type)}
                            </div>
                          )}
                          <div className="flex flex-col items-start flex-1 min-w-0">
                            <SelectValue 
                              placeholder={
                                <span className="text-gray-500 font-medium text-sm sm:text-base">
                                  {t('selectActivity')}
                                </span>
                              } 
                            />
                            {newActivity.type && (
                              <span className="text-xs text-gray-500 mt-0.5 truncate w-full">
                                {t('selectedActivity')}
                              </span>
                            )}
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
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-110 shrink-0 ${getActivityColor(type)}`}>
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
                                <div className={`w-3 h-3 rounded-full shrink-0 ${getActivityBadgeColor(type)} opacity-60 group-hover:opacity-100 transition-opacity duration-200`}></div>
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

                {/* Date Field - Mobile Optimized */}
                <div className="space-y-2 sm:space-y-3">
                  <Label className="text-gray-700 font-medium text-sm sm:text-base">
                    {t('date')}
                  </Label>
                  <Input
                    type="date"
                    value={newActivity.date}
                    onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                    className="h-11 sm:h-12 border-2 border-gray-200 rounded-xl hover:border-green-300 focus:border-green-500 transition-colors text-sm sm:text-base"
                  />
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
            {activities.length === 0 ? (
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
              activities.map((activity) => (
                <div key={activity.id} className="bg-gradient-to-r from-white to-green-50 border border-green-100 p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`p-2 sm:p-3 rounded-full border shrink-0 ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                        <Badge className={`${getActivityColor(activity.type)} text-xs font-medium px-2 sm:px-3 py-0.5 sm:py-1 rounded-full border w-fit`}>
                          {t(activity.type)}
                        </Badge>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3 shrink-0" />
                          <span className="truncate">{activity.timestamp}</span>
                        </span>
                      </div>
                      <p className="text-gray-800 font-medium mb-2 text-sm sm:text-base line-clamp-3">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3 shrink-0" />
                        <span className="truncate">
                          {new Date(activity.date).toLocaleDateString(
                            language === 'ml' ? 'ml-IN' : 
                            language === 'hi' ? 'hi-IN' : 'en-IN'
                          )}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Activity Summary - Mobile Optimized */}
        <Card className="border-0 shadow-lg bg-white pb-18">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl p-4 sm:pb-4">
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              </div>
              <span className="text-gray-800 font-semibold text-base sm:text-lg truncate">
                {t('monthSummary')}
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