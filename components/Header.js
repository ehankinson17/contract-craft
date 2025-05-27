import React from 'react';

export default function Header({ userEmail, onLogout }) {
  return (
    <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Contract Craft</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '14px', color: '#64748b' }}>Welcome, {userEmail}</span>
          <button 
            onClick={onLogout}
            style={{
              backgroundColor: '#f1f5f9',
              color: '#475569',
              padding: '8px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}