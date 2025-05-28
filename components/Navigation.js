import React from 'react';

export default function Navigation({ activeTab, onTabChange, isAdmin }) {
  const tabs = ['new', 'dashboard', 'previous-contracts'];
  if (isAdmin) {
    tabs.push('admin');
  }
  
  const getTabLabel = (tab) => {
    switch(tab) {
      case 'new': return 'New';
      case 'dashboard': return 'Dashboard';
      case 'previous-contracts': return 'Previous Contracts';
      case 'admin': return 'Admin';
      default: return tab;
    }
  };

  return (
    <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: '32px' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              style={{
                padding: '16px 4px',
                borderBottom: activeTab === tab ? '3px solid #2563eb' : '3px solid transparent',
                fontWeight: '600',
                fontSize: '14px',
                color: activeTab === tab ? '#2563eb' : '#64748b',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {getTabLabel(tab)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}