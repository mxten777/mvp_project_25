import React from 'react';

export type CardProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  ariaLabel?: string;
  role?: string;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ children, header, footer, ariaLabel, role, className = '' }) => {
  return (
    <section
      role={role || 'region'}
      aria-label={ariaLabel}
      tabIndex={0}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-card p-6 mb-6 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
    >
      {header && (
        <header className="mb-4 font-bold text-lg">{header}</header>
      )}
      <div>{children}</div>
      {footer && (
        <footer className="mt-4">{footer}</footer>
      )}
    </section>
  );
};
