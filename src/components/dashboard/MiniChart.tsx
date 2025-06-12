
import React from 'react';

interface MiniChartProps {
  data: number[];
  type: 'line' | 'bar' | 'area';
  color: string;
}

export const MiniChart: React.FC<MiniChartProps> = ({ data, type, color }) => {
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue || 1;
  
  const normalizedData = data.map(value => ((value - minValue) / range) * 100);
  
  const colorClasses = {
    blue: 'stroke-blue-500 fill-blue-100',
    yellow: 'stroke-yellow-500 fill-yellow-100',
    purple: 'stroke-purple-500 fill-purple-100',
    green: 'stroke-green-500 fill-green-100'
  };

  if (type === 'bar') {
    return (
      <div className="h-12 flex items-end space-x-1">
        {normalizedData.map((value, index) => (
          <div
            key={index}
            className={`flex-1 bg-${color}-500 rounded-t`}
            style={{ height: `${Math.max(value, 5)}%` }}
          />
        ))}
      </div>
    );
  }

  const points = normalizedData.map((value, index) => 
    `${(index * 100) / (data.length - 1)},${100 - value}`
  ).join(' ');

  return (
    <div className="h-12 w-full">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {type === 'area' && (
          <path
            d={`M ${points} L 100,100 L 0,100 Z`}
            className={colorClasses[color as keyof typeof colorClasses]}
            strokeWidth="2"
          />
        )}
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          points={points}
          className={`text-${color}-500`}
        />
        {normalizedData.map((value, index) => (
          <circle
            key={index}
            cx={(index * 100) / (data.length - 1)}
            cy={100 - value}
            r="2"
            className={`fill-${color}-500`}
          />
        ))}
      </svg>
    </div>
  );
};
