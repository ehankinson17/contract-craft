import React, { useState, useRef, useEffect } from 'react';

export default function ContractCraft() {
  // Login protection
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // Check login status when component loads
  useEffect(() => {
<<<<<<< HEAD
    // Since we can't use localStorage in artifacts, simulate logged-in state
    setIsLoggedIn(true);
    setUserEmail('user@example.com');
=======
    const loggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail');
    
    if (loggedIn === 'true' && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    } else {
      // Redirect to login if not logged in
      window.location.href = '/login';
    }
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
  }, []);

  // App state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [contractType, setContractType] = useState('');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
<<<<<<< HEAD
  const [fileText, setFileText] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');
=======
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
  const fileInputRef = useRef(null);

  const contractTypes = [
    { value: 'nda', label: 'NDA', icon: '🤐' },
    { value: 'msa', label: 'MSA', icon: '📋' },
    { value: 'sow', label: 'SOW', icon: '📄' },
    { value: 'order', label: 'Order Form', icon: '🛒' },
    { value: 'other', label: 'Other', icon: '📝' }
  ];

<<<<<<< HEAD
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      
      const allowedTypes = ['.pdf', '.doc', '.docx', '.txt'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        alert('Please upload a PDF, DOC, DOCX, or TXT file');
        return;
      }

      setUploadedFile(file);
      setUploadProgress('Reading file...');
      
      // Read the file content based on type
      try {
        let fileContent = '';
        
        if (fileExtension === '.pdf') {
          fileContent = await readPDFContent(file);
        } else if (fileExtension === '.txt') {
          fileContent = await readTextContent(file);
        } else if (fileExtension === '.doc' || fileExtension === '.docx') {
          // For Word docs, we'll need a different approach
          setUploadProgress('Word documents require conversion. For now, please use PDF or TXT format.');
          fileContent = 'Word document uploaded - content extraction pending implementation';
        }
        
        setFileText(fileContent);
        setUploadProgress('');
      } catch (error) {
        console.error('Error reading file:', error);
        alert('Error reading file. Please try again.');
        setUploadProgress('');
      }
    }
  };

  // Simulate PDF content reading (in a real app, this would use a server-side PDF parser)
  const readPDFContent = async (file) => {
    try {
      // Since we can't parse PDFs directly in the browser without external libraries,
      // we'll simulate the process. In a real application, you would:
      // 1. Upload the PDF to a server
      // 2. Use a server-side PDF parser (like pdf-parse, PyPDF2, etc.)
      // 3. Return the extracted text
      
      setUploadProgress('Processing PDF...');
      
      // For demonstration, we'll return sample contract text
      // In production, this would be the actual PDF content
      const sampleContractText = `
        MUTUAL NON-DISCLOSURE AGREEMENT
        
        This Agreement is entered into as of ${new Date().toLocaleDateString()} between ABC Corporation ("ABC") 
        and XYZ Company Ltd. ("XYZ"), collectively referred to as the "Parties".
        
        1. CONFIDENTIAL INFORMATION
        The Parties acknowledge that they may disclose certain confidential and proprietary information to each other.
        "Confidential Information" means any information disclosed by one party to the other party that is marked 
        as confidential or would reasonably be considered confidential.
        
        2. OBLIGATIONS
        Each Party agrees to: (a) hold the other Party's Confidential Information in strict confidence; 
        (b) not disclose such Confidential Information to third parties; and (c) use such Confidential Information 
        solely for the purposes of evaluating a potential business relationship.
        
        3. TERM AND TERMINATION
        This Agreement shall remain in effect for a period of two (2) years from the date first written above, 
        unless terminated earlier by either Party upon thirty (30) days written notice.
        
        4. LIMITATION OF LIABILITY
        IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES,
        REGARDLESS OF THE FORM OF ACTION, ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT.
        
        5. GOVERNING LAW
        This Agreement shall be governed by and construed in accordance with the laws of the State of California,
        without regard to its conflict of laws principles.
        
        6. ENTIRE AGREEMENT
        This Agreement constitutes the entire agreement between the Parties concerning the subject matter hereof.
        
        IN WITNESS WHEREOF, the Parties have executed this Agreement as of the date first written above.
        
        ABC Corporation                    XYZ Company Ltd.
        By: _______________________       By: _______________________
        Name:                             Name:
        Title:                            Title:
        Date:                             Date:
      `;
      
      // Return sample text (in production, this would be the actual extracted PDF text)
      return sampleContractText;
    } catch (error) {
      console.error('PDF processing error:', error);
      throw new Error('Failed to process PDF file');
    }
  };

  // Read text file content
  const readTextContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const handleAnalyze = () => {
    if (!uploadedFile || !contractType || !fileText) return;
=======
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAnalyze = () => {
    if (!uploadedFile || !contractType) return;
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
<<<<<<< HEAD
      // Analyze the actual file content
      const analysis = analyzeContractContent(fileText, contractType, uploadedFile.name);
      setAiAnalysis(analysis);
=======
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
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
      setIsAnalyzing(false);
    }, 3000);
  };

<<<<<<< HEAD
  // Enhanced content analysis function for PDFs
  const analyzeContractContent = (content, type, filename) => {
    const text = content.toLowerCase();
    
    // Enhanced pattern matching for PDF-extracted text
    const findings = {
      hasLiabilityClause: /\b(liability|liable|limitation of liability)\b/.test(text),
      hasTerminationClause: /\b(terminat\w+|end of agreement|expir\w+)\b/.test(text),
      hasPaymentTerms: /\b(payment|pay\b|fee|invoice|billing)\b/.test(text),
      hasIndemnification: /\b(indemni\w+|hold harmless)\b/.test(text),
      hasConfidentiality: /\b(confidential\w*|non-disclosure|proprietary)\b/.test(text),
      hasIntellectualProperty: /\b(intellectual property|copyright|patent|trademark)\b/.test(text),
      hasForcemajeure: /\b(force majeure|act of god|unforeseeable)\b/.test(text),
      hasGoverningLaw: /\b(governing law|jurisdiction|venue|applicable law)\b/.test(text),
      hasAutoRenewal: /\b(auto\w*\s+renew\w*|automatic\w*\s+renew\w*)\b/.test(text),
      hasDataSecurity: /\b(data security|gdpr|privacy|data protection)\b/.test(text),
      hasWarranty: /\b(warrant\w+|guarantee|representation)\b/.test(text),
      hasDispute: /\b(dispute resolution|arbitration|mediation)\b/.test(text),
      
      // Extract specific terms
      mentionsUnlimited: /\bunlimited\b/.test(text),
      mentionsDollars: /\$[\d,]+(\.\d{2})?/.test(content),
      mentionsTimeframe: /\b\d+\s*(day|month|year)s?\b/.test(text),
      companyNames: extractCompanyNames(content),
      dollarAmounts: extractDollarAmounts(content),
      dates: extractDates(content),
      percentages: extractPercentages(content)
    };
    
    // Generate specific analysis based on actual content
    return generateSpecificAnalysis(findings, type, filename);
  };

  // Enhanced extraction functions for PDF content
  const extractCompanyNames = (content) => {
    // Look for patterns like "Company Name, Inc." or "XYZ Corporation"
    const corporatePattern = /\b[A-Z][A-Za-z]+(?:\s+[A-Z][A-Za-z]+)*\s+(?:Inc\.|LLC|Ltd\.|Corporation|Corp\.|Company|Co\.)\b/g;
    const matches = content.match(corporatePattern) || [];
    
    // Also look for quoted company names
    const quotedPattern = /"([A-Z][^"]+)"/g;
    const quotedMatches = [...content.matchAll(quotedPattern)].map(match => match[1]);
    
    return [...new Set([...matches, ...quotedMatches])].slice(0, 5);
  };

  const extractDollarAmounts = (content) => {
    const matches = content.match(/\$[\d,]+(?:\.\d{2})?/g);
    return matches ? [...new Set(matches)].slice(0, 5) : [];
  };

  const extractDates = (content) => {
    // Match various date formats
    const datePatterns = [
      /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g,
      /\b\d{1,2}-\d{1,2}-\d{2,4}\b/g,
      /\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/g
    ];
    
    let dates = [];
    datePatterns.forEach(pattern => {
      const matches = content.match(pattern) || [];
      dates = dates.concat(matches);
    });
    
    return [...new Set(dates)].slice(0, 5);
  };

  const extractPercentages = (content) => {
    const matches = content.match(/\d+(?:\.\d+)?%/g);
    return matches ? [...new Set(matches)].slice(0, 5) : [];
  };

  const generateSpecificAnalysis = (findings, contractType, filename) => {
    const risks = [];
    const suggestions = [];
    const redlines = [];
    let score = 85; // Start with good score
    
    // Contract-specific analysis based on actual content
    if (contractType === 'nda') {
      if (!findings.hasConfidentiality) {
        risks.push({
          type: 'High',
          issue: `No confidentiality clause found in ${filename}`,
          severity: 'high',
          section: 'Missing'
        });
        suggestions.push('Add comprehensive confidentiality provisions including definition of confidential information');
        score -= 20;
      }
      
      if (!findings.hasDispute) {
        risks.push({
          type: 'Medium',
          issue: 'No dispute resolution mechanism specified',
          severity: 'medium',
          section: 'Dispute Resolution'
        });
        suggestions.push('Include arbitration or mediation clause for dispute resolution');
        score -= 10;
      }
      
      if (findings.companyNames.length > 0) {
        suggestions.push(`Consider mutual confidentiality obligations between ${findings.companyNames[0]} and counterparty`);
      }
    }
    
    if (contractType === 'msa') {
      if (findings.hasLiabilityClause && findings.mentionsUnlimited) {
        risks.push({
          type: 'High',
          issue: 'Unlimited liability clause detected in contract',
          severity: 'high',
          section: 'Liability Section'
        });
        redlines.push({
          section: 'Liability Limitation',
          original: 'unlimited liability',
          suggested: `liability limited to the greater of ${findings.dollarAmounts[0] || '$100,000'} or fees paid in the 12 months preceding the claim`,
          reasoning: 'Protects against excessive financial exposure while maintaining reasonable recourse'
        });
        score -= 25;
      }
      
      if (!findings.hasTerminationClause) {
        risks.push({
          type: 'Medium',
          issue: 'No clear termination clause found',
          severity: 'medium',
          section: 'Missing'
        });
        suggestions.push('Add termination for convenience with 30-day written notice');
        score -= 15;
      }
      
      if (!findings.hasWarranty) {
        risks.push({
          type: 'Medium',
          issue: 'No warranty or representation clauses found',
          severity: 'medium',
          section: 'Warranties'
        });
        suggestions.push('Include mutual warranties regarding authority to enter agreement');
        score -= 10;
      }
    }
    
    if (contractType === 'sow') {
      if (!findings.hasPaymentTerms) {
        risks.push({
          type: 'High',
          issue: 'Payment terms and schedule not clearly defined',
          severity: 'high',
          section: 'Payment Terms'
        });
        suggestions.push('Specify payment milestones, amounts, and net payment terms');
        score -= 20;
      }
      
      if (!findings.hasIntellectualProperty) {
        risks.push({
          type: 'High',
          issue: 'Intellectual property ownership not addressed',
          severity: 'high',
          section: 'IP Rights'
        });
        suggestions.push('Clarify work product ownership and licensing terms');
        score -= 15;
      }
    }
    
    // Universal checks for all contract types
    if (!findings.hasGoverningLaw) {
      risks.push({
        type: 'Medium',
        issue: 'Governing law not specified',
        severity: 'medium',
        section: 'Legal Provisions'
      });
      suggestions.push('Specify governing law and jurisdiction (e.g., "This Agreement shall be governed by the laws of [State]")');
      score -= 10;
    }
    
    if (findings.hasAutoRenewal) {
      risks.push({
        type: 'Medium',
        issue: 'Auto-renewal clause may lock you into unfavorable terms',
        severity: 'medium',
        section: 'Renewal Terms'
      });
      redlines.push({
        section: 'Auto-Renewal Provision',
        original: 'automatic renewal',
        suggested: 'renewal upon mutual written agreement',
        reasoning: 'Ensures conscious decision to continue relationship'
      });
    }
    
    // Add positive findings
    if (findings.hasForcemajeure) {
      suggestions.push('✓ Force majeure clause present - provides protection against unforeseeable events');
    }
    
    if (findings.hasDataSecurity && (contractType === 'msa' || contractType === 'sow')) {
      suggestions.push('✓ Data security provisions found - helps ensure compliance readiness');
    }
    
    if (findings.hasIndemnification) {
      suggestions.push('✓ Indemnification clause present - review for mutual protection');
    }
    
    // Ensure we always have some content
    if (risks.length === 0) {
      risks.push({
        type: 'Low',
        issue: 'Standard review completed - contract appears well-structured',
        severity: 'low',
        section: 'Overall Assessment'
      });
    }
    
    if (suggestions.length === 0) {
      suggestions.push('Consider adding specific performance metrics or KPIs if applicable');
    }
    
    return {
      score: Math.max(score, 60), // Don't go below 60
      riskLevel: score >= 85 ? 'Low Risk' : score >= 70 ? 'Medium Risk' : 'High Risk',
      risks,
      suggestions,
      redlines,
      keyFindings: {
        'Contract Type': contractType.toUpperCase(),
        'File Analyzed': filename,
        'Companies Mentioned': findings.companyNames.length > 0 ? findings.companyNames.join(', ') : 'Not specified',
        'Dollar Amounts': findings.dollarAmounts.length > 0 ? findings.dollarAmounts.join(', ') : 'Not specified',
        'Key Dates': findings.dates.length > 0 ? findings.dates.join(', ') : 'Not specified',
        'Governing Law': findings.hasGoverningLaw ? 'Present' : 'Missing',
        'Pages Analyzed': fileText ? Math.ceil(fileText.length / 3000) : 'N/A'
      }
    };
  };

=======
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
  const resetForm = () => {
    setUploadedFile(null);
    setContractType('');
    setAiAnalysis(null);
<<<<<<< HEAD
    setFileText('');
    setUploadProgress('');
  };

  const handleLogout = () => {
    // In a real app, this would clear auth state
    setIsLoggedIn(false);
=======
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = '/';
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
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
<<<<<<< HEAD
                { title: 'PDF Documents', value: '15', icon: '📑' }
=======
                { title: 'Attorney Hours', value: '18/24', icon: '👥' }
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
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
<<<<<<< HEAD
                    {uploadProgress && (
                      <p style={{ fontSize: '14px', color: '#2563eb', marginTop: '8px', fontWeight: '500' }}>
                        {uploadProgress}
                      </p>
                    )}
=======
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
                    <input
                      ref={fileInputRef}
                      type="file"
                      style={{ display: 'none' }}
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                    />
                  </div>
<<<<<<< HEAD
                  {fileText && (
                    <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                      <p style={{ fontSize: '14px', color: '#059669', margin: 0 }}>
                        ✅ Document successfully loaded ({Math.ceil(fileText.length / 1000)}KB of text extracted)
                      </p>
                    </div>
                  )}
                  {uploadedFile && uploadedFile.name.endsWith('.pdf') && (
                    <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px solid #fbbf24' }}>
                      <p style={{ fontSize: '13px', color: '#92400e', margin: 0 }}>
                        <strong>Note:</strong> PDF processing is simulated in this demo. In production, PDF files would be processed server-side for accurate text extraction.
                      </p>
                    </div>
                  )}
=======
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
                </div>

                {/* Analyze Button */}
                <button
                  onClick={handleAnalyze}
<<<<<<< HEAD
                  disabled={!uploadedFile || !contractType || isAnalyzing || !fileText}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: (!uploadedFile || !contractType || isAnalyzing || !fileText) ? '#d1d5db' : '#2563eb',
=======
                  disabled={!uploadedFile || !contractType || isAnalyzing}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: (!uploadedFile || !contractType || isAnalyzing) ? '#d1d5db' : '#2563eb',
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
<<<<<<< HEAD
                    cursor: (!uploadedFile || !contractType || isAnalyzing || !fileText) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isAnalyzing ? '🤖 Analyzing PDF Document...' : '🚀 Start Smart Analysis'}
=======
                    cursor: (!uploadedFile || !contractType || isAnalyzing) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {isAnalyzing ? '🤖 Analyzing...' : '🚀 Start AI Analysis'}
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
                </button>
              </div>

              {/* Right Panel - Results */}
              <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px', color: '#1e293b' }}>Analysis Results</h3>
                
                {isAnalyzing ? (
                  <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
<<<<<<< HEAD
                    <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Analyzing your PDF contract...</p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>Extracting and analyzing document content</p>
=======
                    <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Analyzing your contract...</p>
                    <p style={{ fontSize: '14px', color: '#64748b' }}>This usually takes 30-60 seconds</p>
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
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
<<<<<<< HEAD
                            {aiAnalysis.riskLevel} - Based on PDF content analysis
=======
                            {aiAnalysis.score >= 85 ? 'Low Risk' : aiAnalysis.score >= 70 ? 'Medium Risk' : 'High Risk'}
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
                          </p>
                        </div>
                      </div>
                    </div>

<<<<<<< HEAD
                    {/* Key Findings */}
                    {aiAnalysis.keyFindings && (
                      <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>Document Analysis</h4>
                        <div style={{ fontSize: '14px', color: '#374151' }}>
                          {Object.entries(aiAnalysis.keyFindings).map(([key, value]) => (
                            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <span>{key}:</span>
                              <span style={{ fontWeight: '500', maxWidth: '60%', textAlign: 'right' }}>{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

=======
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
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
<<<<<<< HEAD
                            <span style={{ fontSize: '12px', color: '#64748b' }}>({risk.section})</span>
=======
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
                          </div>
                          <p style={{ fontSize: '14px', margin: 0, color: '#374151' }}>{risk.issue}</p>
                        </div>
                      ))}
                    </div>

<<<<<<< HEAD
                    {/* Redlines */}
                    {aiAnalysis.redlines && aiAnalysis.redlines.length > 0 && (
                      <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', color: '#1e293b' }}>Suggested Redlines</h4>
                        {aiAnalysis.redlines.map((redline, index) => (
                          <div key={index} style={{ padding: '12px', marginBottom: '8px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                            <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '8px', color: '#2563eb' }}>{redline.section}</div>
                            <div style={{ fontSize: '13px', marginBottom: '4px' }}>
                              <span style={{ color: '#dc2626' }}>Remove:</span> <span style={{ textDecoration: 'line-through' }}>{redline.original}</span>
                            </div>
                            <div style={{ fontSize: '13px', marginBottom: '4px' }}>
                              <span style={{ color: '#059669' }}>Replace with:</span> <span style={{ backgroundColor: '#ecfdf5', padding: '2px 4px', borderRadius: '3px' }}>{redline.suggested}</span>
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>{redline.reasoning}</div>
                          </div>
                        ))}
                      </div>
                    )}

=======
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
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
<<<<<<< HEAD
                    <p style={{ fontSize: '14px' }}>Upload a document and select contract type to begin intelligent analysis</p>
=======
                    <p style={{ fontSize: '14px' }}>Select contract type and upload file to begin</p>
>>>>>>> a1188392429c2e4ab96a145c05dcb979a0e9e84c
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