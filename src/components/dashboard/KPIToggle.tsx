
import React from 'react';
import { BarChart3, MessageSquare, Trophy } from 'lucide-react';

interface KPIToggleProps {
  activeKPI: string;
  onKPIChange: (kpi: string) => void;
}

export const KPIToggle: React.FC<KPIToggleProps> = ({ activeKPI, onKPIChange }) => {
  const kpis = [
    {
      id: 'insights',
      label: 'Insights',
      icon: BarChart3,
      description: 'Search performance & visibility' 
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: MessageSquare,
      description: 'Ratings & customer feedback'
    },
    {
      id: 'rankings',
      label: 'Rankings',
      icon: Trophy,
      description: 'Local search positions'
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-1 inline-flex">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        const isActive = activeKPI === kpi.id;
        
        return (
          <button
            key={kpi.id}
            onClick={() => onKPIChange(kpi.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
              isActive 
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="font-medium">{kpi.label}</span>
          </button>
        );
      })}
    </div>
  );
};
