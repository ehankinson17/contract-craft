import { useState } from 'react';

export default function Landing() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Coming Soon Banner */}
      <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '8px 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600' }}>🚀 Coming Soon: Attorney Support Portal</span>
        </div>
      </div>

      {/* Header */}
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Contract Craft</h1>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button 
              onClick={() => window.location.href = '/login'}
              style={{
                backgroundColor: 'transparent',
                color: '#475569',
                padding: '8px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Log In
            </button>
            <button 
              onClick={() => window.location.href = '/login'}
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ padding: '80px 24px', textAlign: 'center', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px', lineHeight: '1.1' }}>
            AI-Powered Commercial Contract Review for Growing Businesses
          </h1>
          <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '40px', lineHeight: '1.6' }}>
            Get professional analysis of your commercial contracts immediately. Our AI reviews NDAs, MSAs, SOWs, and more—with attorney backup when you need it.
          </p>
          <button 
            onClick={() => window.location.href = '/login'}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '16px 32px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: '600',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            Start Free Analysis
          </button>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px', color: '#1e293b' }}>
            Everything You Need for Commercial Contract Success
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '32px', 
              borderRadius: '12px', 
              textAlign: 'center',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>AI Contract Analysis</h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.5' }}>Advanced AI reviews your commercial contracts for risks, missing clauses, and unfavorable terms immediately.</p>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '32px', 
              borderRadius: '12px', 
              textAlign: 'center',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>👥</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>Attorney Support</h3>
              <div style={{ 
                backgroundColor: '#fef3c7', 
                color: '#92400e', 
                fontSize: '12px', 
                fontWeight: '600', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                marginBottom: '12px',
                display: 'inline-block'
              }}>
                COMING SOON
              </div>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.5' }}>Get human legal review when AI isn't enough. Licensed attorneys available for complex commercial issues.</p>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '32px', 
              borderRadius: '12px', 
              textAlign: 'center',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>Risk Scoring & Reports</h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.5' }}>Clear risk scores and actionable recommendations. Download professional reports for your team.</p>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '32px', 
              borderRadius: '12px', 
              textAlign: 'center',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>Commercial Contract Types</h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.5' }}>NDAs, MSAs, SOWs, Order Forms, and more. Each analysis is tailored to your specific commercial contract type.</p>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '32px', 
              borderRadius: '12px', 
              textAlign: 'center',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>Enterprise Security</h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.5' }}>Bank-level encryption and security. Your commercial contracts are never stored or shared.</p>
            </div>

            <div style={{ 
              backgroundColor: 'white', 
              padding: '32px', 
              borderRadius: '12px', 
              textAlign: 'center',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>💰</div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>Transparent Pricing</h3>
              <p style={{ fontSize: '16px', color: '#64748b', lineHeight: '1.5' }}>One simple price: $25,000/year for unlimited AI analysis plus attorney support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Section */}
      <section style={{ padding: '60px 24px', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#64748b', marginBottom: '32px' }}>
            Trusted by Growing Tech Companies
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ 
              backgroundColor: 'white', 
              padding: '24px 48px', 
              borderRadius: '12px', 
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
                Faros.ai
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                Engineering Intelligence Platform
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: '#1e293b' }}>
            Simple, Transparent Pricing
          </h2>
          <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '48px' }}>
            One plan for commercial contract success. Everything included. No surprises.
          </p>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '48px', 
            borderRadius: '16px', 
            border: '2px solid #2563eb',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
              Professional Plan
            </h3>
            <div style={{ marginBottom: '24px' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold', color: '#2563eb' }}>$25,000</span>
              <span style={{ fontSize: '18px', color: '#64748b' }}>/year</span>
            </div>
            <ul style={{ textAlign: 'left', marginBottom: '32px', listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
                <span style={{ fontSize: '16px', color: '#374151' }}>Unlimited AI commercial contract analysis</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
                <span style={{ fontSize: '16px', color: '#374151' }}>2 hours attorney support/month (additional available)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
                <span style={{ fontSize: '16px', color: '#374151' }}>All commercial contract types (NDA, MSA, SOW, etc)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
                <span style={{ fontSize: '16px', color: '#374151' }}>Risk scoring and detailed reports</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
                <span style={{ fontSize: '16px', color: '#374151' }}>Priority customer support</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: '#10b981', fontSize: '16px' }}>✓</span>
                <span style={{ fontSize: '16px', color: '#374151' }}>Enterprise security & compliance</span>
              </li>
            </ul>
            <button 
              onClick={() => window.location.href = '/login'}
              style={{
                width: '100%',
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '16px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', backgroundColor: '#1e293b' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: 'white', marginBottom: '16px' }}>
            Ready to Transform Your Commercial Contract Process?
          </h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '32px' }}>
            Join growing businesses who trust Contract Craft for their commercial legal needs.
          </p>
          <button 
            onClick={() => window.location.href = '/login'}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '16px 32px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: '600'
            }}
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '14px' }}>
            © 2025 Contract Craft. All rights reserved. • Specializing in Commercial Contract Intelligence
          </p>
        </div>
      </footer>
    </div>
  );
}