import React from 'react';
// import { colors, spacing, fontSizes, radii } from '../../theme';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input: React.FC<InputProps> = ({ label, error, className = '', id, ...rest }) => {
  const inputId = id || React.useId();
  const errorId = error ? `${inputId}-error` : undefined;
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-1 font-semibold text-sm text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={`w-full px-3.5 py-2 text-base border ${error ? 'border-danger' : 'border-gray-300 dark:border-gray-700'} rounded-md outline-none box-border focus:ring-2 focus:ring-primary-light focus:border-primary transition shadow-input bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 ${className}`}
        {...rest}
      />
      {error && (
        <div id={errorId} className="text-danger text-sm mt-1">{error}</div>
      )}
    </div>
  );
};
