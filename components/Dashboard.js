import React from 'react';

export default function Dashboard({ onStartAnalysis }) {
  const stats = [
    { title: 'Active Contracts', value: '12', icon: '📄' },
    { title: 'Pending Review', value: '3', icon: '⏰' },
    { title: 'Completed', value: '28', icon: '✅' },
    { title: 'Attorney Hours', value: '18/24', icon: '👥' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Dashboard</h2>
        <button 
          onClick={onStartAnalysis}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          ➕ New Analysis
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        {stats.map((stat, index) => (
          <div key={index} style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
            border: '1px solid #e2e8f0' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 8px 0' }}>{stat.title}</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>{stat.value}</p>
              </div>
              <div style={{ fontSize: '32px' }}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}