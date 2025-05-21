import React from "react";
import { clsx } from "clsx";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  icon,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          // Variants
          "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500":
            variant === "primary",
          "bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500":
            variant === "secondary",
          "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primary-500":
            variant === "outline",
          "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500":
            variant === "ghost",
          "bg-error-600 text-white hover:bg-error-700 focus:ring-error-500":
            variant === "danger",
          // Sizes
          "px-2.5 py-1.5 text-sm": size === "sm",
          "px-4 py-2 text-sm": size === "md",
          "px-6 py-3 text-base": size === "lg",
          // States
          "opacity-75 cursor-not-allowed": isLoading || disabled,
        },
        className
      )}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <svg
          className="w-4 h-4 mr-2 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!isLoading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};
