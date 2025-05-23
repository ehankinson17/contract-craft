import { useState } from 'react';
<<<<<<< HEAD
import { validateLogin } from './users';
=======
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
<<<<<<< HEAD
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    // Validate credentials against our user database
    const result = validateLogin(email, password);
    
    if (result.success) {
      // Store login status and user info
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', result.user.email);
      localStorage.setItem('userName', result.user.name);
=======

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Super simple login - just check if they entered something
    if (email && password) {
      // Store login status
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
      
      // Redirect to app
      window.location.href = '/app';
    } else {
<<<<<<< HEAD
      // Show error message
      setError(result.error);
      setIsLoading(false);
=======
      alert('Please enter email and password');
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '48px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', width: '100%', maxWidth: '400px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>Contract Craft</h1>
          <p style={{ fontSize: '16px', color: '#64748b' }}>Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email"
<<<<<<< HEAD
              required
=======
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
<<<<<<< HEAD
              required
            />
          </div>

          {error && (
            <div style={{ 
              marginBottom: '16px', 
              padding: '12px', 
              backgroundColor: '#fef2f2', 
              border: '1px solid #fecaca', 
              borderRadius: '6px',
              color: '#dc2626',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: isLoading ? '#d1d5db' : '#2563eb',
=======
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#2563eb',
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '600',
<<<<<<< HEAD
              cursor: isLoading ? 'not-allowed' : 'pointer',
              marginBottom: '16px'
            }}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
=======
              cursor: 'pointer',
              marginBottom: '16px'
            }}
          >
            Sign In
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              backgroundColor: 'transparent',
              color: '#6b7280',
              border: 'none',
              fontSize: '14px',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            ← Back to homepage
          </button>
        </div>

        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #e0f2fe' }}>
          <p style={{ fontSize: '12px', color: '#0369a1', margin: 0, textAlign: 'center' }}>
<<<<<<< HEAD
            <strong>Secure Access:</strong> Only authorized users can access Contract Craft
=======
            <strong>Demo:</strong> Enter any email and password to access the app
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
          </p>
        </div>
      </div>
    </div>
  );
}