
import React, { useEffect, useState } from 'react';
import { TrendingUp, AlertTriangle, MapPin, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getListingsStats } from '@/services/localtionService';

interface Stats {
  title: string,
  value: number,
  subtitle: string,
  icon: string,
  color: string,
  trend: string
}


export const SummaryStats = () => {

  const [stats, setStats] = useState<Stats[]>([])

  // const stats = [
  //   {
  //     title: 'Total Listings',
  //     value: '20',
  //     subtitle: 'of 100 selected',
  //     icon: MapPin,
  //     color: 'blue',
  //     trend: '+2 this month'
  //   },
  //   {
  //     title: 'Avg. Health Score',
  //     value: '76%',
  //     subtitle: '↑ 8% from last month',
  //     icon: TrendingUp,
  //     color: 'green',
  //     trend: 'Improving'
  //   },
  // ];

  const topIssues = [
    { issue: 'Missing business hours', count: 8, severity: 'high' },
    { issue: 'Outdated photos', count: 12, severity: 'medium' },
    { issue: 'No recent reviews', count: 5, severity: 'low' }
  ];

  const getStats = async () => {
    try {
      const res = await getListingsStats();
      const stateArray = res.data.data.trends

      const temp = stateArray.map((item: any, index: number) => {
        let icon;

        if (item.title === "Total Listings") {
          icon = MapPin;
        } else if (item.title === "Avg. Health Score") {
          icon = TrendingUp;
        } else if (item.title === "Critical Issues") {
          icon = AlertTriangle;
        } else {
          icon = Star; // default icon
        }

        return {
          title: item.title,
          value: item.value,
          subtitle: item.subtitle,
          icon: icon,
          color: item.color,
          trend: 'Improving',
        };
      });
      setStats(temp);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getStats()

  }, [])


  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
                </div>
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">{stat.trend}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Top Issues Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 3 Issues Across Listings</h3>
        <div className="space-y-3">
          {topIssues.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${item.severity === 'high' ? 'bg-red-500' :
                    item.severity === 'medium' ? 'bg-yellow-500' : 'bg-gray-400'
                  }`} />
                <span className="text-gray-700">{item.issue}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{item.count} listings</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
