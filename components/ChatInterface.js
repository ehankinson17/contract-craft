import React, { useState, useRef, useEffect } from 'react';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hi! Let me help you. Try asking me things like "What are the main risks?" or "Does this contract favor the other party?"',
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

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>Contract Assistant</h2>
        <div style={{ fontSize: '14px', color: '#64748b' }}>
          💡 Ask me anything about your contracts
        </div>
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
        border: '1px solid #e2e8f0',
        height: '600px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Messages Area */}
        <div style={{ 
          flex: 1, 
          padding: '24px', 
          overflowY: 'auto',
          borderBottom: '1px solid #e2e8f0'
        }}>
          {messages.map((message) => (
            <div key={message.id} style={{ 
              marginBottom: '16px',
              display: 'flex',
              justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: message.type === 'user' ? '#2563eb' : '#f1f5f9',
                color: message.type === 'user' ? 'white' : '#1e293b'
              }}>
                <div style={{ whiteSpace: 'pre-line', fontSize: '14px', lineHeight: '1.5' }}>
                  {message.content}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  opacity: 0.7, 
                  marginTop: '4px',
                  color: message.type === 'user' ? 'rgba(255,255,255,0.8)' : '#64748b'
                }}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
              <div style={{
                padding: '12px 16px',
                borderRadius: '12px',
                backgroundColor: '#f1f5f9',
                color: '#64748b'
              }}>
                <div style={{ fontSize: '14px' }}>🤖 Analyzing your question...</div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your contract... (e.g., 'What are the main risks in this NDA?')"
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                resize: 'none',
                minHeight: '44px',
                maxHeight: '120px'
              }}
              rows={1}
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isProcessing}
              style={{
                padding: '12px 24px',
                backgroundColor: (!inputValue.trim() || isProcessing) ? '#d1d5db' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: (!inputValue.trim() || isProcessing) ? 'not-allowed' : 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {isProcessing ? '🤖' : 'Send'}
            </button>
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
            💡 Try: "What risks should I watch for?" or "Is this contract balanced?"
          </div>
        </div>
      </div>
    </div>
  );
}