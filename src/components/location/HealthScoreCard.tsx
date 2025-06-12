
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap, 
  ArrowRight,
  Info,
  Camera,
  MapPin,
  FileText
} from 'lucide-react';

interface HealthScoreCardProps {
  score: number;
  suggestions: Array<{
    type: string;
    priority: 'high' | 'medium' | 'low';
    description: string;
  }>;
}

export const HealthScoreCard: React.FC<HealthScoreCardProps> = ({ score, suggestions }) => {
  const [showDetails, setShowDetails] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreStatus = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (score >= 70) return { label: 'Good', color: 'bg-blue-100 text-blue-800' };
    if (score >= 50) return { label: 'Fair', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Needs Work', color: 'bg-red-100 text-red-800' };
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Info className="w-4 h-4 text-blue-500" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'photos': return <Camera className="w-4 h-4" />;
      case 'hours': return <Clock className="w-4 h-4" />;
      case 'posts': return <FileText className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const status = getScoreStatus(score);

  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Health Score</h3>
        <Badge className={status.color}>
          {status.label}
        </Badge>
      </div>

      {/* Score Display */}
      <div className="text-center mb-6">
        <div className={`text-5xl font-bold ${getScoreColor(score)} mb-2`}>
          {score}%
        </div>
        <Progress value={score} className="h-3 mb-3" />
        <p className="text-sm text-gray-600">
          Your listing optimization score
        </p>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3 mb-4">
        <Button 
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
          onClick={() => setShowDetails(!showDetails)}
        >
          <Zap className="w-4 h-4 mr-2" />
          AI Auto-Optimize
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setShowDetails(!showDetails)}
        >
          View Detailed Report
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Suggestions Preview */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          Quick Wins ({suggestions.length})
        </h4>
        {suggestions.slice(0, showDetails ? suggestions.length : 2).map((suggestion, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
            <div className="flex items-center space-x-2">
              {getPriorityIcon(suggestion.priority)}
              {getSuggestionIcon(suggestion.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 truncate">
                {suggestion.description}
              </p>
            </div>
            <Button size="sm" variant="ghost" className="px-2">
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        ))}
        
        {suggestions.length > 2 && !showDetails && (
          <button 
            onClick={() => setShowDetails(true)}
            className="w-full text-sm text-blue-600 hover:text-blue-700 py-2"
          >
            +{suggestions.length - 2} more suggestions
          </button>
        )}
      </div>
    </Card>
  );
};
