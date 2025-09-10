import React from 'react';

const SimpleTailwindTest: React.FC = () => {
  return (
    <div style={{ padding: '2rem', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '1rem' }}>
        Simple Tailwind Test
      </h1>
      <div style={{ 
        padding: '1rem', 
        marginTop: '1rem', 
        backgroundColor: '#3b82f6', 
        color: 'white', 
        borderRadius: '0.5rem' 
      }}>
        This should be a blue box with white text
      </div>
    </div>
  );
};

export default SimpleTailwindTest;
