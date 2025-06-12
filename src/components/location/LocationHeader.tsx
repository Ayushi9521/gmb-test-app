
import React from 'react';
import { ChevronRight, MapPin, Clock, ExternalLink, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { doLogout } from '@/services/authService';
import { useNavigate ,useParams  } from 'react-router-dom';

interface LocationHeaderProps {
  location: any;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
  viewMode: string;
  onViewModeChange: (mode: string) => void;
}

export const LocationHeader: React.FC<LocationHeaderProps> = ({
  location,
  timeRange,
  onTimeRangeChange,
  viewMode,
  onViewModeChange
}) => {

  const navigate = useNavigate();
  const { id } = useParams();

  const timeRanges = [
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
    { value: '90d', label: '90 days' }
  ];

  const viewModes = [
    { value: 'overview', label: 'Overview' },
    { value: 'performance', label: 'Performance' },
    { value: 'content', label: 'Content' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center py-3 text-sm text-gray-500">
          <span className="hover:text-blue-600 cursor-pointer transition-colors" onClick={()=>navigate('/dashboard')}>Dashboard</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-gray-900 font-medium">Location Dashboard</span>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-blue-600">#{id}</span>
        </div>

        {/* Main Header */}
        <div className="pb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 truncate">
                    {location.name}
                  </h1>
                  <div className="flex items-center space-x-4 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {location.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      Updated {location.lastUpdated}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 max-w-md">
                    {location.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Listing
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-600">
                Optimize
              </Button>
              <Button variant="outline" size="sm" className="px-3">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="bg-gray-100 rounded-lg p-1 flex">
                {viewModes.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => onViewModeChange(mode.value)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                      viewMode === mode.value
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Period:</span>
              <div className="bg-white border border-gray-200 rounded-lg p-1 flex">
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => onTimeRangeChange(range.value)}
                    className={`px-3 py-1.5 text-sm font-medium rounded transition-all ${
                      timeRange === range.value
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
