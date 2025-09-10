import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card.jsx";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { Label } from "./ui/label.jsx";
import { Textarea } from "./ui/textarea.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select.jsx";
import { Badge } from "./ui/badge.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";
import { Calendar, Plus, Droplets, Sprout, Zap, Bug, Scissors, Package } from "lucide-react";

export function Activities() {
  const { t, language } = useLanguage();
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

  const getActivityIcon = (type) => {
    switch (type) {
      case 'sowing': return <Sprout className="h-4 w-4" />;
      case 'irrigation': return <Droplets className="h-4 w-4" />;
      case 'fertilizing': return <Zap className="h-4 w-4" />;
      case 'pestSpray': return <Bug className="h-4 w-4" />;
      case 'weeding': return <Scissors className="h-4 w-4" />;
      case 'harvesting': return <Package className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'sowing': return 'bg-green-100 text-green-800';
      case 'irrigation': return 'bg-blue-100 text-blue-800';
      case 'fertilizing': return 'bg-yellow-100 text-yellow-800';
      case 'pestSpray': return 'bg-red-100 text-red-800';
      case 'weeding': return 'bg-orange-100 text-orange-800';
      case 'harvesting': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
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
        timestamp: "Just now"
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
    <div className="p-4 space-y-4 pb-16">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">{t('activities')}</h1>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          size="sm"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          {t('addActivity')}
        </Button>
      </div>

      {/* Add Activity Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t('logActivity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddActivity} className="space-y-4">
              <div className="space-y-2">
                <Label>{t('activityType')}</Label>
                <Select 
                  value={newActivity.type} 
                  onValueChange={(value) => setNewActivity({...newActivity, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={
                      language === 'ml' ? 'പ്രവർത്തനം തിരഞ്ഞെടുക്കുക' :
                      language === 'hi' ? 'गतिविधि चुनें' :
                      'Select activity'
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        <div className="flex items-center gap-2">
                          {getActivityIcon(type)}
                          {t(type)}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t('description')}</Label>
                <Textarea
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  placeholder={
                    language === 'ml' ? 'പ്രവർത്തനത്തിന്റെ വിശദാംശങ്ങൾ...' :
                    language === 'hi' ? 'गतिविधि का विवरण...' :
                    'Activity details...'
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>{t('date')}</Label>
                <Input
                  type="date"
                  value={newActivity.date}
                  onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  {t('submit')}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  {t('cancel')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-green-600" />
            {t('recentActivities')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>
                {language === 'ml' ? 'ഇതുവരെ പ്രവർത്തനങ്ങളൊന്നുമില്ല' :
                 language === 'hi' ? 'अभी तक कोई गतिविधि नहीं' :
                 'No activities logged yet'}
              </p>
            </div>
          ) : (
            activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {t(activity.type)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </span>
                  </div>
                  <p className="text-sm">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(activity.date).toLocaleDateString(
                      language === 'ml' ? 'ml-IN' : 
                      language === 'hi' ? 'hi-IN' : 'en-IN'
                    )}
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'ml' ? 'ഈ മാസത്തെ സംഗ്രഹം' :
             language === 'hi' ? 'इस महीने का सारांश' :
             'This Month Summary'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {activityTypes.map((type) => {
              const count = activities.filter(a => a.type === type).length;
              return (
                <div key={type} className="flex items-center gap-2 p-2 bg-muted/30 rounded">
                  {getActivityIcon(type)}
                  <div>
                    <p className="text-sm font-medium">{t(type)}</p>
                    <p className="text-xs text-muted-foreground">{count} times</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}