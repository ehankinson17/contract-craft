import React, { useState, useEffect } from 'react';
import { addUser, getAllUsers, deleteUser, isAdmin } from './users';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // New user form data
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    name: '',
    role: 'user'
  });

  // Get current admin email from localStorage
  const adminEmail = localStorage.getItem('userEmail');

  // Check if current user is admin
  useEffect(() => {
    if (!adminEmail || !isAdmin(adminEmail)) {
      setError('Access denied. Admin privileges required.');
      return;
    }
    loadUsers();
  }, [adminEmail]);

  const loadUsers = () => {
    const result = getAllUsers(adminEmail);
    if (result.success) {
      setUsers(result.users);
    } else {
      setError(result.error);
    }
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    const result = addUser(newUser, adminEmail);
    
    if (result.success) {
      setMessage(result.message);
      setNewUser({ email: '', password: '', name: '', role: 'user' });
      setShowAddForm(false);
      loadUsers(); // Refresh user list
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  const handleDeleteUser = (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"?`)) {
      const result = deleteUser(userId, adminEmail);
      
      if (result.success) {
        setMessage(result.message);
        loadUsers(); // Refresh user list
      } else {
        setError(result.error);
      }
    }
  };

  const clearMessages = () => {
    setMessage('');
    setError('');
  };

  // If not admin, show access denied
  if (!adminEmail || !isAdmin(adminEmail)) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2 style={{ color: '#dc2626' }}>Access Denied</h2>
        <p>You need administrator privileges to access this page.</p>
        <button 
          onClick={() => window.location.href = '/app'}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Back to App
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#1e293b', fontSize: '28px' }}>User Management</h1>
        <button 
          onClick={() => window.location.href = '/app'}
          style={{
            backgroundColor: '#6b7280',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Back to App
        </button>
      </div>

      {/* Messages */}
      {message && (
        <div style={{
          backgroundColor: '#dcfce7',
          border: '1px solid #bbf7d0',
          color: '#166534',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {message}
          <button onClick={clearMessages} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>×</button>
        </div>
      )}

      {error && (
        <div style={{
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {error}
          <button onClick={clearMessages} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}>×</button>
        </div>
      )}

      {/* Add User Button */}
      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={{
            backgroundColor: '#059669',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          {showAddForm ? 'Cancel' : '+ Add New User'}
        </button>
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '30px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#1e293b' }}>Add New User</h3>
          
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleAddUser}
              disabled={isLoading}
              style={{
                backgroundColor: isLoading ? '#d1d5db' : '#2563eb',
                color: 'white',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontWeight: '600'
              }}
            >
              {isLoading ? 'Adding User...' : 'Add User'}
            </button>
          </div>
        </div>
      )}

      {/* Users List */}
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          backgroundColor: '#f8fafc',
          padding: '16px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <h3 style={{ margin: 0, color: '#1e293b' }}>Current Users ({users.length})</h3>
        </div>

        {users.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
            No users found
          </div>
        ) : (
          <div>
            {users.map((user, index) => (
              <div
                key={user.id}
                style={{
                  padding: '16px',
                  borderBottom: index < users.length - 1 ? '1px solid #f1f5f9' : 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: '600', color: '#1e293b', marginBottom: '4px' }}>
                    {user.name}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '14px', marginBottom: '4px' }}>
                    {user.email}
                  </div>
                  <div style={{
                    display: 'inline-block',
                    backgroundColor: user.role === 'admin' ? '#dbeafe' : '#f0fdf4',
                    color: user.role === 'admin' ? '#1d4ed8' : '#166534',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {user.role}
                  </div>
                </div>

                <div>
                  {user.email !== adminEmail && (
                    <button
                      onClick={() => handleDeleteUser(user.id, user.name)}
                      style={{
                        backgroundColor: '#dc2626',
                        color: 'white',
                        padding: '6px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px'
                      }}
                    >
                      Delete
                    </button>
                  )}
                  {user.email === adminEmail && (
                    <span style={{ color: '#6b7280', fontSize: '12px', fontStyle: 'italic' }}>
                      (You)
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}