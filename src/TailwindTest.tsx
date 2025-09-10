import React from 'react';

const TailwindTest: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem' }}>
        Tailwind Test
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#374151' }}>
        This is a test component with inline styles.
      </p>
      <div style={{ 
        marginTop: '1rem', 
        padding: '1rem', 
        backgroundColor: '#fee2e2', 
        color: '#b91c1c', 
        borderRadius: '0.5rem' 
      }}>
        This box has a red background and red text using inline styles.
      </div>
      <button style={{ 
        marginTop: '1rem', 
        padding: '0.5rem 1rem', 
        backgroundColor: '#3b82f6', 
        color: 'white', 
        borderRadius: '0.25rem',
        border: 'none',
        cursor: 'pointer' 
      }}>
        Test Button
      </button>
    </div>
  );
};

export default TailwindTest;
