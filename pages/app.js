import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header.js';
import Navigation from '../components/Navigation.js';
import Dashboard from '../components/Dashboard.js';
import ChatInterface from '../components/ChatInterface.js';
import Contracts from '../components/Contracts.js';
import WordDocument from '../components/WordDocument.js';
import AdminPanel from './adminpanel';
import { isAdmin } from '../data/users';


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
 const [activeTab, setActiveTab] = useState('new');
 const [uploadedFile, setUploadedFile] = useState(null);
 const [detectedContractType, setDetectedContractType] = useState('');
 const [aiAnalysis, setAiAnalysis] = useState(null);
 const [isAnalyzing, setIsAnalyzing] = useState(false);
 const fileInputRef = useRef(null);


 // Chat state for the sidebar
 const [messages, setMessages] = useState([
   {
     id: 1,
     type: 'assistant',
     content: 'Hi! I can help you analyze your contracts. Upload a file and I\'ll guide you through the key points to review.',
     timestamp: new Date()
   }
 ]);
 const [inputValue, setInputValue] = useState('');
 const [isProcessing, setIsProcessing] = useState(false);
 const messagesEndRef = useRef(null);


 const scrollToBottom = () => {
   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
 };


 useEffect(() => {
   scrollToBottom();
 }, [messages]);


 const handleFileUpload = (event) => {
   const file = event.target.files[0];
   if (file) {
     setUploadedFile(file);
     // Auto-detect contract type based on filename/content
     const filename = file.name.toLowerCase();
     let detectedType = 'other';
    
     if (filename.includes('nda') || filename.includes('confidential')) {
       detectedType = 'nda';
     } else if (filename.includes('msa') || filename.includes('master')) {
       detectedType = 'msa';
     } else if (filename.includes('sow') || filename.includes('statement') || filename.includes('work')) {
       detectedType = 'sow';
     } else if (filename.includes('order') || filename.includes('purchase')) {
       detectedType = 'order';
     }
    
     setDetectedContractType(detectedType);
   }
 };


 const handleAnalyze = () => {
   if (!uploadedFile) return;
  
   setIsAnalyzing(true);
  
   setTimeout(() => {
     // Check if this is the demo SOW
     const isDemoSOW = uploadedFile.name.toLowerCase().includes('sample sow') ||
                       uploadedFile.name.toLowerCase().includes('demo');
    
     if (isDemoSOW) {
       // Demo SOW with redlines data
       setAiAnalysis({
         type: 'Statement of Work',
         score: 68,
         isDemoDocument: true,
         redlinedContent: [
           {
             section: "1. Overview",
             redlined: "SmartCloud will provide Acme Corporation with <span class='addition'>exclusive</span> access to its <span class='strikethrough'>platform</span> <span class='addition'>cloud-based productivity platform (\"Platform\")</span> to improve business productivity and performance <span class='strikethrough'>using cloud technology</span> <span class='addition'>as detailed in Exhibit A (Technical Specifications)</span>.",
             comments: [
               { id: 1, text: "Added 'exclusive' to clarify access rights and prevent conflicts" },
               { id: 2, text: "Defined 'Platform' as capitalized term for consistency throughout contract" },
               { id: 3, text: "Referenced technical specifications exhibit for clarity" }
             ]
           },
           {
             section: "2. Scope of Services",
             redlined: "SmartCloud will deliver the <span class='strikethrough'>software services</span> <span class='addition'>Platform services listed in Exhibit B</span> to Acme Corporation for usage across <span class='strikethrough'>its teams</span> <span class='addition'>up to 500 named users</span>. <span class='strikethrough'>This includes features such as dashboards, analytics, and integrations.</span> <span class='addition'>Core features include: (a) customizable dashboards with real-time data visualization, (b) advanced analytics and reporting tools, (c) API integrations with Acme's existing CRM and ERP systems, and (d) mobile application access.</span>",
             comments: [
               { id: 4, text: "Specific user limit prevents scope creep and defines commercial terms" },
               { id: 5, text: "Detailed feature list prevents disputes about what's included" },
               { id: 6, text: "Reference to exhibits provides detailed specifications" }
             ]
           },
           {
             section: "3. Deliverables",
             redlined: "• <span class='strikethrough'>Access to the SmartCloud software</span> <span class='addition'>Platform access within 5 business days of contract execution</span><br/>• <span class='strikethrough'>Support as needed</span> <span class='addition'>8x5 technical support (M-F, 8AM-6PM EST) with 4-hour response time for critical issues</span><br/>• Monthly performance reports <span class='addition'>delivered by the 5th business day of each month, including usage analytics, system uptime metrics, and security incident summaries</span><br/><span class='addition'>• Initial onboarding and training for up to 10 administrators<br/>• 99.5% uptime SLA with service credits for failures</span>",
             comments: [
               { id: 7, text: "Specific timelines prevent delays and set expectations" },
               { id: 8, text: "Defined support hours and response times for accountability" },
               { id: 9, text: "Added SLA with financial consequences for poor performance" }
             ]
           },
           {
             section: "4. Timeline",
             redlined: "The services will begin <span class='strikethrough'>after the contract is signed</span> <span class='addition'>on the Effective Date as defined in Section 12</span>. <span class='strikethrough'>Delivery of the platform will occur promptly.</span> <span class='addition'>Platform access will be provided within 5 business days of: (a) contract execution, (b) receipt of initial payment, and (c) completion of security and technical requirements validation.</span>",
             comments: [
               { id: 10, text: "Eliminated vague 'promptly' with specific business day requirement" },
               { id: 11, text: "Added clear conditions precedent for service delivery" }
             ]
           },
           {
             section: "6. Payment Terms",
             redlined: "<span class='strikethrough'>Client agrees to pay the agreed-upon subscription fee.</span> <span class='addition'>Client will pay $50,000 annually, invoiced quarterly in advance ($12,500 per quarter). Payment is due within 30 days of invoice date.</span> <span class='strikethrough'>Additional costs may apply for extra features.</span> <span class='addition'>Additional features not included in Exhibit B will be quoted separately and require written approval. Late payments incur 1.5% monthly interest charges.</span>",
             comments: [
               { id: 12, text: "Specific pricing eliminates disputes and provides payment clarity" },
               { id: 13, text: "Added late payment penalties to encourage timely payment" },
               { id: 14, text: "Clear process for additional features prevents surprise charges" }
             ]
           },
           {
             section: "8. Termination",
             redlined: "Either party may terminate <span class='strikethrough'>at any time with notice</span> <span class='addition'>this agreement: (a) for convenience with 90 days written notice, (b) for material breach with 30 days cure period, or (c) immediately for insolvency or bankruptcy</span>. <span class='addition'>Upon termination, Client retains access for 30 days to export data. Prepaid fees are non-refundable except for SmartCloud material breach.</span>",
             comments: [
               { id: 15, text: "Specific termination periods prevent abrupt service interruptions" },
               { id: 16, text: "Data export rights protect client's business continuity" },
               { id: 17, text: "Clear refund policy prevents payment disputes" }
             ]
           }
         ],
         risks: [
           { type: 'High', issue: 'Vague deliverables and timelines create disputes' },
           { type: 'High', issue: 'Unlimited scope allows excessive costs' },
           { type: 'Medium', issue: 'No SLA or performance guarantees' },
           { type: 'Medium', issue: 'Unclear termination and refund terms' }
         ],
         suggestions: [
           'Added specific user limits and feature definitions',
           'Included measurable SLA with service credits',
           'Defined clear payment terms and late fees',
           'Added data export rights and termination procedures'
         ]
       });
     } else {
       // Regular analysis for other documents
       const results = {
         nda: {
           type: 'Non-Disclosure Agreement',
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
           type: 'Master Service Agreement',
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
           type: 'Statement of Work',
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
           type: 'Order Form',
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
           type: 'Contract',
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
      
       setAiAnalysis(results[detectedContractType] || results.other);
     }
    
     setIsAnalyzing(false);
   }, 3000);
 };


 const resetForm = () => {
   setUploadedFile(null);
   setDetectedContractType('');
   setAiAnalysis(null);
 };


 const handleLogout = () => {
   localStorage.removeItem('isLoggedIn');
   localStorage.removeItem('userEmail');
   window.location.href = '/';
 };


 const handleStartAnalysis = () => {
   setActiveTab('new');
 };


 // Chat functions
 const handleSend = async () => {
   if (!inputValue.trim() || isProcessing) return;


   const userMessage = {
     id: messages.length + 1,
     type: 'user',
     content: inputValue,
     timestamp: new Date()
   };


   setMessages(prev => [...prev, userMessage]);
   setInputValue('');
   setIsProcessing(true);


   // Simulate AI processing
   setTimeout(() => {
     const response = generateResponse(inputValue);
     const assistantMessage = {
       id: messages.length + 2,
       type: 'assistant',
       content: response,
       timestamp: new Date()
     };
     setMessages(prev => [...prev, assistantMessage]);
     setIsProcessing(false);
   }, 1500);
 };


 const generateResponse = (question) => {
   const lowerQ = question.toLowerCase();
  
   if (lowerQ.includes('risk') || lowerQ.includes('dangerous') || lowerQ.includes('problem')) {
     return "Based on typical contract patterns, here are common risks to watch for:\n\n• Unlimited liability clauses\n• Auto-renewal terms\n• Broad indemnification requirements\n• Unclear termination rights\n• Missing force majeure provisions\n\nWould you like me to focus on any specific area?";
   }
  
   if (lowerQ.includes('nda') || lowerQ.includes('confidential')) {
     return "For NDAs, I typically look for:\n\n✅ Clear definition of confidential information\n✅ Mutual confidentiality (both parties protected)\n✅ Reasonable time limits (2-5 years typical)\n✅ Return/destruction clauses\n✅ Exclusions for publicly available info\n\nDo you have a specific NDA clause you'd like me to review?";
   }
  
   if (lowerQ.includes('favor') || lowerQ.includes('unfair') || lowerQ.includes('balanced')) {
     return "To assess contract balance, I examine:\n\n• Risk allocation between parties\n• Payment terms and conditions\n• Termination rights (are they mutual?)\n• Liability caps and limitations\n• Change order processes\n\nMost contracts favor one party - the key is ensuring the terms are reasonable for the value exchanged.";
   }
  
   if (lowerQ.includes('price') || lowerQ.includes('cost') || lowerQ.includes('payment')) {
     return "For pricing and payment terms, watch for:\n\n🔍 Payment schedules and milestones\n🔍 Late payment penalties\n🔍 Currency and conversion rates\n🔍 Expense reimbursement policies\n🔍 Price adjustment mechanisms\n\nWhat specific payment terms are you concerned about?";
   }
  
   return "I can help you analyze various aspects of your contracts. Try asking me about:\n\n• Risk assessment\n• Contract balance and fairness\n• Specific clauses (NDAs, payment terms, etc.)\n• Industry standards\n• Negotiation suggestions\n\nWhat would you like to explore?";
 };


 const handleKeyPress = (e) => {
   if (e.key === 'Enter' && !e.shiftKey) {
     e.preventDefault();
     handleSend();
   }
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
     <Header userEmail={userEmail} onLogout={handleLogout} />
     <Navigation activeTab={activeTab} onTabChange={setActiveTab} isAdmin={isAdmin(userEmail)} />


     {/* Main Content */}
     <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
      
       {/* New Tab */}
       {activeTab === 'new' && (
         <div>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
             <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>New Contract Analysis</h2>
             {uploadedFile && (
               <button onClick={resetForm} style={{ padding: '8px 16px', backgroundColor: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer' }}>
                 🔄 Start Over
               </button>
             )}
           </div>
          
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px' }}>
            
             {/* Main Panel */}
             <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
              
               {/* File Upload */}
               <div style={{ marginBottom: '32px' }}>
                 <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#1e293b' }}>
                   Upload Contract File
                 </h3>
                 <div
                   onClick={() => fileInputRef.current?.click()}
                   style={{
                     border: '2px dashed #cbd5e1',
                     borderRadius: '12px',
                     padding: '48px 32px',
                     textAlign: 'center',
                     cursor: 'pointer',
                     backgroundColor: uploadedFile ? '#f0fdf4' : '#fafafa',
                     transition: 'all 0.2s'
                   }}
                 >
                   <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                     {uploadedFile ? '✅' : '📤'}
                   </div>
                   <p style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>
                     {uploadedFile ? uploadedFile.name : 'Click to upload or drag file here'}
                   </p>
                   {detectedContractType && (
                     <p style={{ fontSize: '14px', color: '#2563eb', fontWeight: '600', marginBottom: '8px' }}>
                       📋 Detected: {detectedContractType.toUpperCase()}
                     </p>
                   )}
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
                 disabled={!uploadedFile || isAnalyzing}
                 style={{
                   width: '100%',
                   padding: '16px',
                   backgroundColor: (!uploadedFile || isAnalyzing) ? '#d1d5db' : '#2563eb',
                   color: 'white',
                   border: 'none',
                   borderRadius: '8px',
                   fontSize: '16px',
                   fontWeight: '600',
                   cursor: (!uploadedFile || isAnalyzing) ? 'not-allowed' : 'pointer',
                   marginBottom: '32px'
                 }}
               >
                 {isAnalyzing ? '🤖 Analyzing...' : '🚀 Start AI Analysis'}
               </button>


               {/* Results */}
               {isAnalyzing ? (
                 <div style={{ textAlign: 'center', padding: '40px 0' }}>
                   <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
                   <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Analyzing your contract...</p>
                   <p style={{ fontSize: '14px', color: '#64748b' }}>This usually takes 30-60 seconds</p>
                 </div>
               ) : aiAnalysis ? (
                 <div>
                   {/* Contract Type & Score */}
                   <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', marginBottom: '24px' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                       <div style={{ fontSize: '36px', fontWeight: 'bold', color: aiAnalysis.score >= 70 ? '#f59e0b' : '#ef4444' }}>{aiAnalysis.score}/100</div>
                       <div>
                         <p style={{ fontWeight: '600', margin: '0 0 4px 0' }}>Contract Risk Score</p>
                         <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                           {aiAnalysis.score >= 85 ? 'Low Risk' : aiAnalysis.score >= 70 ? 'Medium Risk' : 'High Risk'}
                         </p>
                       </div>
                     </div>
                     <p style={{ fontSize: '14px', color: '#2563eb', fontWeight: '600', margin: 0 }}>
                       📋 Document Type: {aiAnalysis.type}
                     </p>
                   </div>


                   {/* Redlined Document or Standard Analysis */}
                   {aiAnalysis.isDemoDocument ? (
                     <WordDocument analysis={aiAnalysis} />
                   ) : (
                     // Standard risk analysis for non-demo documents
                     <div>
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
                     </div>
                   )}


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
                 <div style={{
                   textAlign: 'center',
                   padding: '40px 20px',
                   color: '#64748b',
                   backgroundColor: '#eff6ff',
                   borderRadius: '12px',
                   border: '1px solid #dbeafe'
                 }}>
                   <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                   <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>Ready to analyze your contract</p>
                   <p style={{ fontSize: '14px' }}>Upload a file and I'll automatically detect the type and analyze the risks</p>
                 </div>
               )}
             </div>


             {/* Chat Panel */}
             <div style={{
               backgroundColor: 'white',
               borderRadius: '12px',
               boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
               border: '1px solid #e2e8f0',
               height: '600px',
               display: 'flex',
               flexDirection: 'column'
             }}>
              
               {/* Chat Header */}
               <div style={{
                 padding: '16px 20px',
                 borderBottom: '1px solid #e2e8f0',
                 fontWeight: '600',
                 color: '#1e293b',
                 fontSize: '16px'
               }}>
                 🤖 Contract Assistant
               </div>
              
               {/* Messages Area */}
               <div style={{
                 flex: 1,
                 padding: '16px',
                 overflowY: 'auto'
               }}>
                 {messages.map((message) => (
                   <div key={message.id} style={{
                     marginBottom: '12px',
                     display: 'flex',
                     justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                   }}>
                     <div style={{
                       maxWidth: '85%',
                       padding: '8px 12px',
                       borderRadius: '8px',
                       backgroundColor: message.type === 'user' ? '#2563eb' : '#f1f5f9',
                       color: message.type === 'user' ? 'white' : '#1e293b'
                     }}>
                       <div style={{ whiteSpace: 'pre-line', fontSize: '14px', lineHeight: '1.4' }}>
                         {message.content}
                       </div>
                     </div>
                   </div>
                 ))}
                
                 {isProcessing && (
                   <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '12px' }}>
                     <div style={{
                       padding: '8px 12px',
                       borderRadius: '8px',
                       backgroundColor: '#f1f5f9',
                       color: '#64748b'
                     }}>
                       <div style={{ fontSize: '14px' }}>🤖 Thinking...</div>
                     </div>
                   </div>
                 )}
                
                 <div ref={messagesEndRef} />
               </div>


               {/* Input Area */}
               <div style={{ padding: '12px', borderTop: '1px solid #e2e8f0' }}>
                 <div style={{ display: 'flex', gap: '8px' }}>
                   <input
                     value={inputValue}
                     onChange={(e) => setInputValue(e.target.value)}
                     onKeyPress={handleKeyPress}
                     placeholder="Ask about your contract..."
                     style={{
                       flex: 1,
                       padding: '8px 12px',
                       border: '1px solid #e2e8f0',
                       borderRadius: '6px',
                       fontSize: '14px'
                     }}
                   />
                   <button
                     onClick={handleSend}
                     disabled={!inputValue.trim() || isProcessing}
                     style={{
                       padding: '8px 16px',
                       backgroundColor: (!inputValue.trim() || isProcessing) ? '#d1d5db' : '#2563eb',
                       color: 'white',
                       border: 'none',
                       borderRadius: '6px',
                       fontSize: '14px',
                       cursor: (!inputValue.trim() || isProcessing) ? 'not-allowed' : 'pointer'
                     }}
                   >
                     Send
                   </button>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )}


       {/* Dashboard */}
       {activeTab === 'dashboard' && (
         <Dashboard onStartAnalysis={handleStartAnalysis} />
       )}


       {/* Previous Contracts */}
       {activeTab === 'previous-contracts' && (
         <Contracts />
       )}

       {/* Admin Panel */}
       {activeTab === 'admin' && (
         <AdminPanel />
       )}
     </main>
   </div>
 );
}