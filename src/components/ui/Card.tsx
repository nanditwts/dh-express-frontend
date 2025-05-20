import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  footer?: React.ReactNode;
  icon?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  className,
  footer,
  icon,
}) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow overflow-hidden',
        className
      )}
    >
      {(title || icon) && (
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex items-center">
          {icon && <div className="mr-3 text-primary-600">{icon}</div>}
          {title && (
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {title}
            </h3>
          )}
        </div>
      )}
      <div className="px-4 py-5 sm:p-6">{children}</div>
      {footer && (
        <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};