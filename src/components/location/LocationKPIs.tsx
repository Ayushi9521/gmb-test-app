
import React from 'react';
import { TrendingUp, TrendingDown, FileText, Image, Star, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface LocationKPIsProps {
  kpis: {
    totalPosts: number;
    postsChange: number;
    mediaPosts: number;
    mediaChange: number;
    reviewsResponded: number;
    reviewsChange: number;
    qaAnswered: number;
    qaChange: number;
  };
}

export const LocationKPIs: React.FC<LocationKPIsProps> = ({ kpis }) => {
  const kpiData = [
    {
      title: 'Total Posts',
      value: kpis.totalPosts,
      change: kpis.postsChange,
      changeLabel: 'vs last period',
      icon: FileText,
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Media Posts',
      value: kpis.mediaPosts,
      change: kpis.mediaChange,
      changeLabel: 'new this period',
      icon: Image,
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Reviews Responded',
      value: kpis.reviewsResponded,
      change: kpis.reviewsChange,
      changeLabel: 'response rate',
      icon: Star,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      title: 'Q&A Answered',
      value: kpis.qaAnswered,
      change: kpis.qaChange,
      changeLabel: 'pending',
      icon: MessageSquare,
      color: 'green',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    }
  ];

  const formatChange = (change: number, isPercentage = false) => {
    const suffix = isPercentage ? '%' : '';
    return change > 0 ? `+${change}${suffix}` : `${change}${suffix}`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        const isPositive = kpi.change >= 0;
        
        return (
          <Card key={index} className="p-6 hover:shadow-lg transition-all duration-200 border-0 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                <Icon className={`w-6 h-6 ${kpi.iconColor}`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositive ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="font-medium">
                  {formatChange(kpi.change, kpi.title === 'Reviews Responded')}
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">{kpi.value}</p>
              <p className="text-xs text-gray-500">{kpi.changeLabel}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
