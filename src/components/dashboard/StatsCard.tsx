import React from 'react';
import { Card } from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  isLoading = false,
}) => {
  return (
    <Card className="h-full">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          {isLoading ? (
            <div className="animate-pulse h-8 w-16 bg-gray-200 rounded mt-1"></div>
          ) : (
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          )}
          {change && (
            <div className="flex items-center mt-1">
              <span
                className={`text-xs font-medium ${
                  change.isPositive ? 'text-success-600' : 'text-error-600'
                }`}
              >
                {change.isPositive ? '+' : '-'}
                {change.value}%
              </span>
              <span className="text-xs text-gray-500 ml-1">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-full bg-primary-100 text-primary-600">
          {icon}
        </div>
      </div>
    </Card>
  );
};