import React from 'react';
import { clsx } from 'clsx';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({
  enabled,
  onChange,
  label,
  disabled = false,
}) => {
  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={() => !disabled && onChange(!enabled)}
        className={clsx(
          'relative inline-flex h-6 w-11 items-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2',
          {
            'bg-primary-600 focus:ring-primary-500': enabled && !disabled,
            'bg-gray-200 focus:ring-gray-500': !enabled && !disabled,
            'bg-gray-300 cursor-not-allowed': disabled,
          }
        )}
        disabled={disabled}
        aria-pressed={enabled}
      >
        <span
          className={clsx('sr-only', {
            'text-opacity-40': disabled,
          })}
        >
          {label || (enabled ? 'Enable' : 'Disable')}
        </span>
        <span
          className={clsx(
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
            {
              'translate-x-5': enabled,
              'translate-x-0': !enabled,
            }
          )}
        />
      </button>
      {label && (
        <span
          className={clsx('ml-3 text-sm', {
            'text-gray-900': !disabled,
            'text-gray-500': disabled,
          })}
        >
          {label}
        </span>
      )}
    </div>
  );
};