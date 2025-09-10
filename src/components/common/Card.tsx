import React from 'react';
import { colors, radii, spacing } from '../../theme';

export type CardProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  ariaLabel?: string;
  role?: string;
};

// Card 애니메이션 스타일을 동적으로 주입 (최초 1회)
if (typeof window !== 'undefined' && !document.getElementById('card-anim-style')) {
  const style = document.createElement('style');
  style.id = 'card-anim-style';
  style.innerHTML = `
    .animated-card {
      transition: box-shadow 0.3s cubic-bezier(.4,0,.2,1), transform 0.25s cubic-bezier(.4,0,.2,1);
      will-change: box-shadow, transform;
    }
    .animated-card:focus-visible {
      outline: 2px solid ${colors.primary || '#2563eb'};
      outline-offset: 2px;
      box-shadow: 0 6px 24px 0 rgba(0,0,0,0.12);
      transform: translateY(-2px) scale(1.01);
    }
    .animated-card:hover {
      box-shadow: 0 8px 32px 0 rgba(0,0,0,0.14);
      transform: translateY(-2px) scale(1.01);
    }
    .animated-card:active {
      box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
      transform: scale(0.98);
    }
  `;
  document.head.appendChild(style);
}

export const Card: React.FC<CardProps> = ({ children, style, header, footer, ariaLabel, role }) => {
  return (
    <section
      role={role || 'region'}
      aria-label={ariaLabel}
      tabIndex={0}
      className="animated-card"
      style={{
        background: colors.white,
        borderRadius: radii.lg,
        boxShadow: '0 4px 16px 0 rgba(0,0,0,0.06)',
        padding: spacing.lg,
        marginBottom: spacing.lg,
        ...style,
      }}
    >
      {header && (
        <header style={{ marginBottom: spacing.md, fontWeight: 700 }}>{header}</header>
      )}
      <div>{children}</div>
      {footer && (
        <footer style={{ marginTop: spacing.md }}>{footer}</footer>
      )}
    </section>
  );
};
