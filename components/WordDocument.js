import React, { useState } from 'react';

export default function WordDocument({ analysis }) {
  const [acceptedTokens, setAcceptedTokens] = useState({});

  const acceptChange = (tokenId) => {
    setAcceptedTokens(prev => ({ ...prev, [tokenId]: true }));
  };

  const rejectChange = (tokenId) => {
    setAcceptedTokens(prev => ({ ...prev, [tokenId]: false }));
  };

  // Parse HTML string into individual tokens
  const parseTokens = (htmlString, sectionIndex) => {
    const tokens = [];
    let tokenId = 0;
    
    // Split by HTML tags to get text and change segments
    const parts = htmlString.split(/(<span class='[^']+'>.*?<\/span>)/);
    
    parts.forEach((part, index) => {
      if (part.includes("class='addition'")) {
        const content = part.replace(/<[^>]*>/g, '');
        tokens.push({
          id: `${sectionIndex}-add-${tokenId++}`,
          type: 'addition',
          content: content,
          originalHtml: part
        });
      } else if (part.includes("class='strikethrough'")) {
        const content = part.replace(/<[^>]*>/g, '');
        tokens.push({
          id: `${sectionIndex}-del-${tokenId++}`,
          type: 'strikethrough', 
          content: content,
          originalHtml: part
        });
      } else if (part.trim()) {
        tokens.push({
          id: `${sectionIndex}-text-${tokenId++}`,
          type: 'text',
          content: part,
          originalHtml: part
        });
      }
    });
    
    return tokens;
  };

  // Render a token based on its state
  const renderToken = (token) => {
    const isAccepted = acceptedTokens[token.id];
    const isRejected = acceptedTokens[token.id] === false;

    if (token.type === 'text') {
      return <span key={token.id}>{token.content}</span>;
    }

    if (token.type === 'addition') {
      if (isRejected) {
        return null; // Hide rejected additions
      }
      return (
        <span
          key={token.id}
          style={{
            backgroundColor: isAccepted ? '#dcfce7' : '#e6f3ff',
            color: isAccepted ? '#166534' : '#0066cc',
            textDecoration: isAccepted ? 'none' : 'underline',
            padding: '1px 2px',
            borderRadius: '2px',
            border: isAccepted ? '1px solid #16a34a' : 'none'
          }}
        >
          {token.content}
        </span>
      );
    }

    if (token.type === 'strikethrough') {
      if (isAccepted) {
        return null; // Hide accepted deletions
      }
      return (
        <span
          key={token.id}
          style={{
            backgroundColor: isRejected ? '#fef2f2' : '#ffe6e6',
            color: isRejected ? '#166534' : '#cc0000',
            textDecoration: isRejected ? 'none' : 'line-through',
            padding: '1px 2px',
            borderRadius: '2px',
            border: isRejected ? '1px solid #dc2626' : 'none'
          }}
        >
          {token.content}
        </span>
      );
    }

    return null;
  };

  // Download the edited document with markups
  const downloadDocument = () => {
    let content = `STATEMENT OF WORK - REVISED EDITION\n`;
    content += `Generated: ${new Date().toLocaleDateString()}\n`;
    content += `Client: Acme Corporation\n`;
    content += `Vendor: SmartCloud Inc.\n`;
    content += `Original Date: March 1, 2025\n\n`;
    content += `${'='.repeat(60)}\n`;
    content += `CHANGE SUMMARY\n`;
    content += `${'='.repeat(60)}\n\n`;

    const acceptedChanges = [];
    const rejectedChanges = [];
    const pendingChanges = [];

    // Process each section
    analysis.redlinedContent.forEach((section, sectionIndex) => {
      const tokens = parseTokens(section.redlined, sectionIndex);
      const changeTokens = tokens.filter(t => t.type !== 'text');
      
      changeTokens.forEach(token => {
        const changeInfo = {
          section: section.section,
          type: token.type,
          content: token.content
        };
        
        if (acceptedTokens[token.id] === true) {
          acceptedChanges.push(changeInfo);
        } else if (acceptedTokens[token.id] === false) {
          rejectedChanges.push(changeInfo);
        } else {
          pendingChanges.push(changeInfo);
        }
      });
    });

    // Add change summary
    content += `ACCEPTED CHANGES (${acceptedChanges.length}):\n`;
    acceptedChanges.forEach((change, index) => {
      content += `${index + 1}. [${change.section}] ${change.type === 'addition' ? 'ADDED' : 'REMOVED'}: "${change.content}"\n`;
    });

    content += `\nREJECTED CHANGES (${rejectedChanges.length}):\n`;
    rejectedChanges.forEach((change, index) => {
      content += `${index + 1}. [${change.section}] ${change.type === 'addition' ? 'REJECTED ADD' : 'KEPT ORIGINAL'}: "${change.content}"\n`;
    });

    content += `\nPENDING REVIEW (${pendingChanges.length}):\n`;
    pendingChanges.forEach((change, index) => {
      content += `${index + 1}. [${change.section}] ${change.type === 'addition' ? 'PENDING ADD' : 'PENDING REMOVE'}: "${change.content}"\n`;
    });

    content += `\n${'='.repeat(60)}\n`;
    content += `FINAL DOCUMENT WITH MARKUPS\n`;
    content += `${'='.repeat(60)}\n\n`;

    // Generate the final document content
    analysis.redlinedContent.forEach((section, sectionIndex) => {
      content += `${section.section}\n`;
      content += `${'-'.repeat(section.section.length)}\n\n`;

      const tokens = parseTokens(section.redlined, sectionIndex);
      let sectionText = '';
      
      tokens.forEach(token => {
        if (token.type === 'text') {
          sectionText += token.content;
        } else if (token.type === 'addition') {
          const isAccepted = acceptedTokens[token.id];
          const isRejected = acceptedTokens[token.id] === false;
          
          if (isAccepted) {
            sectionText += `[ADDED: ${token.content}]`;
          } else if (isRejected) {
            sectionText += `[REJECTED ADD: ${token.content}]`;
          } else {
            sectionText += `[PENDING ADD: ${token.content}]`;
          }
        } else if (token.type === 'strikethrough') {
          const isAccepted = acceptedTokens[token.id];
          const isRejected = acceptedTokens[token.id] === false;
          
          if (isAccepted) {
            sectionText += `[REMOVED: ${token.content}]`;
          } else if (isRejected) {
            sectionText += `[KEPT: ${token.content}]`;
          } else {
            sectionText += `[PENDING REMOVE: ${token.content}]`;
          }
        }
      });

      content += sectionText + '\n\n';

      // Add section-specific comments
      if (section.comments && section.comments.length > 0) {
        content += `ANALYSIS NOTES for ${section.section}:\n`;
        section.comments.forEach((comment, index) => {
          content += `  • ${comment.text}\n`;
        });
        content += '\n';
      }
    });

    // Add footer
    content += `\n${'='.repeat(60)}\n`;
    content += `Document processed by Contract Craft AI\n`;
    content += `Review completed: ${new Date().toLocaleString()}\n`;
    content += `Total changes: ${acceptedChanges.length + rejectedChanges.length + pendingChanges.length}\n`;
    content += `Status: ${acceptedChanges.length} accepted, ${rejectedChanges.length} rejected, ${pendingChanges.length} pending\n`;

    // Create and download the file
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Contract-Revised-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!analysis?.isDemoDocument) return null;

  // Get all tokens from all sections for counting
  const allTokens = analysis.redlinedContent.flatMap((section, index) => 
    parseTokens(section.redlined, index)
  );
  
  const changeTokens = allTokens.filter(t => t.type !== 'text');
  const acceptedCount = Object.values(acceptedTokens).filter(Boolean).length;

  return (
    <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '8px' }}>
      <div style={{
        backgroundColor: '#2563eb',
        color: 'white',
        padding: '12px 20px',
        borderRadius: '6px 6px 0 0',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <span style={{ fontWeight: '600' }}>
          📄 Contract Analysis - Track Changes ({acceptedCount}/{changeTokens.length} changes accepted)
        </span>
      </div>

      <div style={{
        backgroundColor: 'white',
        maxWidth: '850px',
        margin: '0 auto',
        padding: '60px 80px',
        minHeight: '800px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        fontFamily: 'Calibri, Arial, sans-serif',
        fontSize: '12pt',
        lineHeight: '1.5'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '18pt', margin: '0 0 10px 0' }}>STATEMENT OF WORK</h1>
          <p style={{ margin: '5px 0', fontSize: '11pt' }}><strong>Client:</strong> Acme Corporation</p>
          <p style={{ margin: '5px 0', fontSize: '11pt' }}><strong>Vendor:</strong> SmartCloud Inc.</p>
          <p style={{ margin: '5px 0', fontSize: '11pt' }}><strong>Date:</strong> March 1, 2025</p>
        </div>

        {analysis.redlinedContent.map((section, sectionIndex) => {
          const tokens = parseTokens(section.redlined, sectionIndex);
          const changeTokens = tokens.filter(t => t.type !== 'text');
          
          return (
            <div key={sectionIndex} style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '14pt', fontWeight: 'bold', marginBottom: '15px', color: '#000' }}>
                {section.section}
              </h3>

              <div style={{ marginBottom: '20px', textAlign: 'justify' }}>
                {tokens.map(renderToken)}
              </div>

              {changeTokens.length > 0 && (
                <div style={{
                  backgroundColor: '#f8f9fa',
                  padding: '15px',
                  borderRadius: '4px',
                  border: '1px solid #e9ecef',
                  marginTop: '15px'
                }}>
                  <div style={{ fontSize: '11pt', fontWeight: '600', marginBottom: '10px', color: '#495057' }}>
                    🔧 Review Individual Changes for {section.section}:
                  </div>

                  {changeTokens.map((token) => {
                    const isAccepted = acceptedTokens[token.id];
                    const isRejected = acceptedTokens[token.id] === false;
                    const isPending = !isAccepted && !isRejected;

                    return (
                      <div key={token.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 12px',
                        marginBottom: '6px',
                        backgroundColor: isAccepted ? '#f0fdf4' : isRejected ? '#fef2f2' : '#fffbeb',
                        border: `1px solid ${isAccepted ? '#bbf7d0' : isRejected ? '#fecaca' : '#fed7aa'}`,
                        borderRadius: '4px'
                      }}>
                        <div style={{ flex: 1 }}>
                          <span style={{
                            fontSize: '10pt',
                            fontWeight: '600',
                            color: token.type === 'addition' ? '#166534' : '#dc2626',
                            marginRight: '8px'
                          }}>
                            {token.type === 'addition' ? '+ ADD:' : '- REMOVE:'}
                          </span>
                          <span style={{ fontSize: '10pt', color: '#374151' }}>
                            "{token.content}"
                          </span>
                        </div>

                        <div style={{ display: 'flex', gap: '6px' }}>
                          {isPending && (
                            <>
                              <button
                                onClick={() => acceptChange(token.id)}
                                style={{
                                  padding: '4px 8px',
                                  backgroundColor: '#16a34a',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '3px',
                                  fontSize: '9pt',
                                  cursor: 'pointer',
                                  fontWeight: '600'
                                }}
                              >
                                ✓ Accept
                              </button>
                              <button
                                onClick={() => rejectChange(token.id)}
                                style={{
                                  padding: '4px 8px',
                                  backgroundColor: '#dc2626',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '3px',
                                  fontSize: '9pt',
                                  cursor: 'pointer',
                                  fontWeight: '600'
                                }}
                              >
                                ✗ Reject
                              </button>
                            </>
                          )}

                          {isAccepted && (
                            <span style={{
                              padding: '4px 8px',
                              fontSize: '9pt',
                              fontWeight: '600',
                              color: '#16a34a'
                            }}>
                              ✓ Accepted
                            </span>
                          )}

                          {isRejected && (
                            <span style={{
                              padding: '4px 8px',
                              fontSize: '9pt',
                              fontWeight: '600',
                              color: '#dc2626'
                            }}>
                              ✗ Rejected
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {section.comments && section.comments.length > 0 && (
                <div style={{
                  backgroundColor: '#eff6ff',
                  padding: '12px',
                  borderRadius: '4px',
                  border: '1px solid #dbeafe',
                  marginTop: '10px'
                }}>
                  <div style={{ fontSize: '10pt', fontWeight: '600', marginBottom: '8px', color: '#1e40af' }}>
                    💬 Why these changes were suggested:
                  </div>
                  {section.comments.map((comment, commentIndex) => (
                    <div key={commentIndex} style={{
                      fontSize: '9pt',
                      color: '#1e40af',
                      marginBottom: '4px',
                      paddingLeft: '8px'
                    }}>
                      • {comment.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        <div style={{
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: '1px solid #ccc',
          textAlign: 'center',
          fontSize: '10pt',
          color: '#666'
        }}>
          Contract Analysis completed by Contract Craft AI • Page 1 of 1
        </div>
      </div>

      {/* Download Section at Bottom */}
      <div style={{
        backgroundColor: '#f8fafc',
        padding: '20px',
        borderRadius: '0 0 8px 8px',
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0'
      }}>
        <button
          onClick={downloadDocument}
          style={{
            background: '#2563eb',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          📥 Download Revised Document
        </button>
        <p style={{ 
          fontSize: '12px', 
          color: '#64748b', 
          margin: '8px 0 0 0' 
        }}>
          Downloads a complete document with all your accepted/rejected changes marked up
        </p>
      </div>
    </div>
  );
}