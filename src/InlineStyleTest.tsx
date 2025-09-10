import React from 'react';

const InlineStyleTest: React.FC = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#dc2626' }}>
        Inline Style Test
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#374151' }}>
        This text uses inline styles instead of Tailwind
      </p>
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        backgroundColor: '#3b82f6', 
        color: '#ffffff',
        borderRadius: '0.5rem'
      }}>
        This box should be blue with white text using inline styles
      </div>
      <button style={{
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#10b981',
        color: 'white',
        borderRadius: '0.25rem'
      }}>
        Inline Style Button
      </button>
    </div>
  );
};

export default InlineStyleTest;
