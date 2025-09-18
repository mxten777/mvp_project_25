import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  ariaLabel?: string;
  ariaPressed?: boolean;
};

const variantClass: Record<string, string> = {
  primary:
    'bg-primary text-white border-none hover:bg-primary-dark focus:ring-2 focus:ring-primary-light',
  secondary:
    'bg-white text-primary border border-primary hover:bg-primary-light hover:text-white focus:ring-2 focus:ring-primary-light',
  danger:
    'bg-danger text-white border-none hover:bg-red-600 focus:ring-2 focus:ring-danger',
};

const sizeClass: Record<string, string> = {
  sm: 'text-sm px-2.5 py-1.5 rounded-md',
  md: 'text-base px-4 py-2 rounded-lg',
  lg: 'text-lg px-6 py-3 rounded-xl',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  ariaLabel,
  ariaPressed,
  className = '',
  ...rest
}) => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      className={`font-semibold shadow-card transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${variantClass[variant]} ${sizeClass[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
