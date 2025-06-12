
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Calendar, Zap, User } from 'lucide-react';

interface ActivitySectionProps {
  timeRange: string;
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({ timeRange }) => {
  const [chartType, setChartType] = useState('line');

  // Mock data for activity chart
  const activityData = [
    { date: '03 May', posts: 2, media: 1.5, reviews: 0.5, qa: 0 },
    { date: '05 May', posts: 1.8, media: 1.2, reviews: 0.8, qa: 0.2 },
    { date: '07 May', posts: 1.2, media: 1.8, reviews: 1.2, qa: 0.5 },
    { date: '09 May', posts: 0.8, media: 2.2, reviews: 0.9, qa: 0.3 },
    { date: '11 May', posts: 1.5, media: 1.9, reviews: 1.5, qa: 0.8 },
    { date: '13 May', posts: 2.2, media: 2.5, reviews: 1.8, qa: 1.2 },
    { date: '15 May', posts: 1.9, media: 2.1, reviews: 2.2, qa: 1.5 },
    { date: '17 May', posts: 0.5, media: 1.8, reviews: 1.9, qa: 0.9 },
    { date: '19 May', posts: 1.8, media: 2.8, reviews: 2.5, qa: 1.8 },
    { date: '21 May', posts: 1.2, media: 2.2, reviews: 1.8, qa: 1.2 },
    { date: '25 May', posts: 0.8, media: 1.5, reviews: 1.2, qa: 0.8 },
    { date: '27 May', posts: 1.5, media: 2.0, reviews: 1.9, qa: 1.5 },
    { date: '29 May', posts: 2.0, media: 2.3, reviews: 2.1, qa: 1.8 },
    { date: '31 May', posts: 1.8, media: 2.1, reviews: 1.8, qa: 1.2 }
  ];

  // Progress pie chart data
  const progressData = [
    { name: 'AI Actions', value: 30.3, color: '#3B82F6' },
    { name: 'Manual Actions', value: 19.1, color: '#1E40AF' },
    { name: 'Remaining', value: 50.6, color: '#E5E7EB' }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600 capitalize">{entry.dataKey}:</span>
              <span className="font-medium">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Daily Activity Chart */}
      <Card className="lg:col-span-2 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Daily Activity Summary</h3>
            <p className="text-sm text-gray-500">Last {timeRange === '30d' ? '30' : timeRange === '7d' ? '7' : '90'} days</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={chartType === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('line')}
            >
              Line
            </Button>
            <Button
              variant={chartType === 'area' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('area')}
            >
              Area
            </Button>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="posts" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="media" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="reviews" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="qa" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            ) : (
              <AreaChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="posts" 
                  stackId="1"
                  stroke="#3B82F6" 
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="media" 
                  stackId="1"
                  stroke="#8B5CF6" 
                  fill="#8B5CF6"
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="reviews" 
                  stackId="1"
                  stroke="#F59E0B" 
                  fill="#F59E0B"
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="qa" 
                  stackId="1"
                  stroke="#10B981" 
                  fill="#10B981"
                  fillOpacity={0.6}
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-600">Posts</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm text-gray-600">Media Responded</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-600">Reviews</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Q & A</span>
          </div>
        </div>
      </Card>

      {/* Progress Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Progress</h3>
          <Badge variant="outline" className="text-xs">
            Last 30 days
          </Badge>
        </div>

        <div className="relative">
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`${value}%`, 'Percentage']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">49.4%</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>
        </div>

        {/* Progress Legend */}
        <div className="space-y-3 mt-4">
          {progressData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}</span>
                {item.name === 'AI Actions' && <Zap className="w-3 h-3 text-yellow-500" />}
                {item.name === 'Manual Actions' && <User className="w-3 h-3 text-blue-500" />}
              </div>
              <span className="text-sm font-medium text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
