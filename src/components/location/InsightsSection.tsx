
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MousePointer, 
  Navigation, 
  Phone, 
  MessageSquare, 
  Monitor, 
  MapPin, 
  Smartphone 
} from 'lucide-react';

interface InsightsSectionProps {
  insights: {
    websiteClicks: number;
    directionsRequests: number;
    phoneCallsClicked: number;
    messagesReceived: number;
    desktopSearchViews: number;
    desktopMapsViews: number;
    mobileSearchViews: number;
    mobileMapsViews: number;
  };
}

export const InsightsSection: React.FC<InsightsSectionProps> = ({ insights }) => {
  const insightItems = [
    {
      label: 'Website Clicks',
      value: insights.websiteClicks,
      icon: MousePointer,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Directions',
      value: insights.directionsRequests,
      icon: Navigation,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Phone Calls',
      value: insights.phoneCallsClicked,
      icon: Phone,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Messages',
      value: insights.messagesReceived,
      icon: MessageSquare,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      label: 'Desktop Search',
      value: insights.desktopSearchViews,
      icon: Monitor,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      label: 'Desktop Maps',
      value: insights.desktopMapsViews,
      icon: MapPin,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      label: 'Mobile Search',
      value: insights.mobileSearchViews,
      icon: Smartphone,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50'
    },
    {
      label: 'Mobile Maps',
      value: insights.mobileMapsViews,
      icon: MapPin,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Insights</h3>
        <Badge variant="outline" className="text-xs">
          Last 30 Days
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {insightItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className={`p-2 rounded-lg ${item.bgColor}`}>
                <Icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-600 truncate">{item.label}</p>
                <p className="text-lg font-semibold text-gray-900">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
