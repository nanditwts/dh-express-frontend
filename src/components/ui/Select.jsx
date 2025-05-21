import React, { forwardRef } from "react";
import { clsx } from "clsx";

export const Select = forwardRef(
  ({ label, error, className, options, onChange, value, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-1 text-left"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={clsx(
            "shadow-sm rounded-md w-full py-2 px-3 border border-gray-300 bg-white focus:ring-primary-500 focus:border-primary-500",
            {
              "border-error-300 focus:ring-error-500 focus:border-error-500":
                error,
            },
            className
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
