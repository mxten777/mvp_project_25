import React from 'react';
import { colors, spacing, fontSizes, radii } from '../../theme';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input: React.FC<InputProps> = ({ label, error, className = '', id, ...rest }) => {
  // id가 없으면 자동 생성
  const inputId = id || React.useId();
  const errorId = error ? `${inputId}-error` : undefined;
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={inputId}
          className="block mb-1 font-semibold text-sm text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={errorId}
        className={`w-full px-3.5 py-2 text-base border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md outline-none box-border focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition ${className}`}
        {...rest}
      />
      {error && (
        <div id={errorId} className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
};
