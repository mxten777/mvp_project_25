import React from 'react';
import { colors, spacing, fontSizes, radii } from '../../theme';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  ariaLabel?: string;
  ariaPressed?: boolean;
};

const variantStyles = {
  primary: {
    background: colors.primary,
    color: colors.white,
    border: 'none',
  },
  secondary: {
    background: colors.white,
    color: colors.primary,
    border: `1px solid ${colors.primary}`,
  },
  danger: {
    background: colors.danger,
    color: colors.white,
    border: 'none',
  },
};

const sizeStyles = {
  sm: {
    fontSize: fontSizes.sm,
    padding: `${spacing.xs} ${spacing.sm}`,
    borderRadius: radii.sm,
  },
  md: {
    fontSize: fontSizes.base,
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: radii.md,
  },
  lg: {
    fontSize: fontSizes.lg,
    padding: `${spacing.md} ${spacing.lg}`,
    borderRadius: radii.lg,
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  style,
  children,
  ariaLabel,
  ariaPressed,
  ...rest
}) => {
  // 동적 스타일 주입 (최초 1회)
  React.useEffect(() => {
    if (document.getElementById('button-anim-style')) return;
    const styleTag = document.createElement('style');
    styleTag.id = 'button-anim-style';
    styleTag.innerHTML = `
      .animated-btn:focus-visible {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px;
        box-shadow: 0 0 0 4px #3b82f633;
      }
      .animated-btn {
        transition: box-shadow 0.18s, transform 0.18s, background 0.18s, color 0.18s;
      }
      .animated-btn:hover:not(:disabled), .animated-btn:focus-visible:not(:disabled) {
        box-shadow: 0 4px 16px 0 #3b82f622;
        transform: translateY(-2px) scale(1.03);
        filter: brightness(1.04);
      }
      .animated-btn:active:not(:disabled) {
        transform: scale(0.98);
        filter: brightness(0.98);
      }
      .animated-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    `;
    document.head.appendChild(styleTag);
    return () => { document.head.removeChild(styleTag); };
  }, []);

  return (
    <button
      className="animated-btn"
      role="button"
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      tabIndex={0}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        fontWeight: 600,
        cursor: 'pointer',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
