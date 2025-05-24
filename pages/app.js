import React, { useState, useRef, useEffect } from 'react';

export default function ContractCraft() {
  // Login protection
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Check login status when component loads
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');
    
    if (loggedIn === 'true' && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    } else {
      // Redirect to login if not logged in
      window.location.href = '/login';
    }
  }, []);

  // App state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [contractType, setContractType] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);

  const contractTypes = [
    { value: 'nda', label: 'NDA', icon: '🤐' },
    { value: 'msa', label: 'MSA', icon: '📋' },
    { value: 'sow', label: 'SOW', icon: '📄' },
    { value: 'order', label: 'Order Form', icon: '🛒' },
    { value: 'other', label: 'Other', icon: '📝' }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAnalyze = () => {
    if (!uploadedFile || !contractType) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const results = {
        nda: {
          score: 85,
          risks: [
            { type: 'Medium', issue: 'Definition of confidential information could be more specific' },
            { type: 'Low', issue: 'No mutual confidentiality provisions' }
          ],
          suggestions: [
            'Add specific exclusions for publicly available information',
            'Include return/destruction of confidential materials clause'
          ]
        },
        msa: {
          score: 72,
          risks: [
            { type: 'High', issue: 'Unlimited liability exposure detected' },
            { type: 'Medium', issue: 'Auto-renewal clause may lock you in' }
          ],
          suggestions: [
            'Add liability cap equal to 12 months of fees',
            'Require 60-day notice for non-renewal'
          ]
        },
        sow: {
          score: 78,
          risks: [
            { type: 'High', issue: 'Scope creep risk - deliverables not clearly defined' },
            { type: 'Medium', issue: 'Payment milestones tied to subjective approvals' }
          ],
          suggestions: [
            'Define specific, measurable deliverables',
            'Add change order process for scope changes'
          ]
        },
        order: {
          score: 88,
          risks: [
            { type: 'Medium', issue: 'No cancellation policy specified' },
            { type: 'Low', issue: 'Shipping terms could be more favorable' }
          ],
          suggestions: [
            'Add cancellation window and fees',
            'Negotiate FOB destination terms'
          ]
        },
        other: {
          score: 75,
          risks: [
            { type: 'High', issue: 'Contract type unclear - may affect enforceability' },
            { type: 'Medium', issue: 'Standard legal provisions missing' }
          ],
          suggestions: [
            'Clarify the nature and purpose of agreement',
            'Add standard force majeure clause'
          ]
        }
      };

      setAiAnalysis(results[contractType] || results.other);
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetForm = () => {
    setUploadedFile(null);
    setContractType('');
    setAiAnalysis(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = '/';
  };

  // Show loading while checking login
  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
          <p style={{ fontSize: '16px', color: '#64748b' }}>Checking access...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Contract Craft</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '14px', color: '#64748b' }}>Welcome, {userEmail}</span>
            <button 
              onClick={handleLogout}
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

      {/* Navigation */}
      <nav style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', gap: '32px' }}>
            {['dashboard', 'upload', 'contracts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '16px 4px',
                  borderBottom: activeTab === tab ? '3px solid #2563eb' : '3px solid transparent',
                  fontWeight: '600',
                  fontSize: '14px',
                  textTransform: 'capitalize',
                  color: activeTab === tab ? '#2563eb' : '#64748b',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Dashboard</h2>
              <button 
                onClick={() => setActiveTab('upload')}
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
              {[
                { title: 'Active Contracts', value: '12', icon: '📄' },
                { title: 'Pending Review', value: '3', icon: '⏰' },
                { title: 'Completed', value: '28', icon: '✅' },
                { title: 'Attorney Hours', value: '18/24', icon: '👥' }
              ].map((stat, index) => (
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
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>New Contract Analysis</h2>
              {(uploadedFile || contractType) && (
                <button onClick={resetForm} style={{ padding: '8px 16px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer' }}>
                  🔄 Start Over
                </button>
              )}
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '32px' }}>
              
              {/* Left Panel - Input */}
              <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                
                {/* Contract Type Selection */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
                    Step 1: Select Contract Type
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                    {contractTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => setContractType(type.value)}
                        style={{
                          padding: '20px 12px',
                          border: '2px solid',
                          borderColor: contractType === type.value ? '#2563eb' : '#e2e8f0',
                          borderRadius: '12px',
                          backgroundColor: contractType === type.value ? '#eff6ff' : 'white',
                          cursor: 'pointer',
                          textAlign: 'center'
                        }}
                      >
                        <div style={{ fontSize: '32px', marginBottom: '8px' }}>{type.icon}</div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: contractType === type.value ? '#2563eb' : '#1e293b' }}>
                          {type.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* File Upload */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
                    Step 2: Upload Contract File
                  </h3>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: '2px dashed #cbd5e1',
                      borderRadius: '12px',
                      padding: '32px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      backgroundColor: uploadedFile ? '#f0fdf4' : '#fafafa'
                    }}
                  >
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                      {uploadedFile ? '✅' : '📤'}
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                      {uploadedFile ? uploadedFile.name : 'Click to upload or drag file here'}
                    </p>
                    <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                      PDF, DOC, DOCX, TXT up to 10MB
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      style={{ display: 'none' }}
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
                  disabled={!uploadedFile || !contractType || isAnalyzing}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: (!uploadedFile || !contractType || isAnalyzing) ? '#d1d5db' : '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: (!uploadedFile || !contractType || isAnalyzing) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isAnalyzing ? '🤖 Analyzing...' : '🚀 Start AI Analysis'}
                </button>
              </div>

              {/* Right Panel - Results */}
              <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: '#1e293b' }}>Analysis Results</h3>
                
                {isAnalyzing ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
                    <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Analyzing your contract...</p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>This usually takes 30-60 seconds</p>
                  </div>
                ) : aiAnalysis ? (
                  <div>
                    {/* Score */}
                    <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', marginBottom: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#2563eb' }}>{aiAnalysis.score}/100</div>
                        <div>
                          <p style={{ fontWeight: '600', margin: '0 0 4px 0' }}>Contract Risk Score</p>
                          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                            {aiAnalysis.score >= 85 ? 'Low Risk' : aiAnalysis.score >= 70 ? 'Medium Risk' : 'High Risk'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Risks */}
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>Key Issues Found</h4>
                      {aiAnalysis.risks.map((risk, index) => (
                        <div key={index} style={{
                          padding: '12px',
                          marginBottom: '8px',
                          borderRadius: '8px',
                          borderLeft: '4px solid',
                          borderLeftColor: risk.type === 'High' ? '#ef4444' : risk.type === 'Medium' ? '#f59e0b' : '#3b82f6',
                          backgroundColor: risk.type === 'High' ? '#fef2f2' : risk.type === 'Medium' ? '#fefbeb' : '#eff6ff'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span>{risk.type === 'High' ? '🔴' : risk.type === 'Medium' ? '🟡' : '🔵'}</span>
                            <span style={{ fontWeight: '600', fontSize: '14px' }}>{risk.type} Risk</span>
                          </div>
                          <p style={{ fontSize: '14px', margin: 0, color: '#374151' }}>{risk.issue}</p>
                        </div>
                      ))}
                    </div>

                    {/* Suggestions */}
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>Recommendations</h4>
                      {aiAnalysis.suggestions.map((suggestion, index) => (
                        <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                          <span style={{ color: '#10b981' }}>✅</span>
                          <span style={{ fontSize: '14px', color: '#374151' }}>{suggestion}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                      <button style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                        📧 Request Attorney Review
                      </button>
                      <button style={{
                        flex: 1,
                        padding: '12px',
                        backgroundColor: 'white',
                        color: '#374151',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}>
                        📄 Download Report
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                    <p style={{ fontSize: '16px', fontWeight: '500' }}>Ready to analyze your contract</p>
                    <p style={{ fontSize: '14px' }}>Select contract type and upload file to begin</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Contracts Tab */}
        {activeTab === 'contracts' && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', marginBottom: '16px' }}>Contract Library</h2>
            <p style={{ color: '#64748b' }}>Contract management coming soon...</p>
          </div>
        )}
      </main>
    </div>
  );
}