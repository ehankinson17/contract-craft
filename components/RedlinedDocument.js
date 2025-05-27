import React from 'react';

export default function RedlinedDocument({ analysis }) {
  if (!analysis || !analysis.isDemoDocument) {
    return null;
  }

  console.log('Full analysis object:', analysis);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', fontSize: '12px' }}>
      <h2>DEBUG: Raw Data Structure</h2>
      
      <div style={{ backgroundColor: '#f0f0f0', padding: '10px', marginBottom: '20px' }}>
        <strong>Analysis object keys:</strong> {Object.keys(analysis).join(', ')}<br/>
        <strong>Has redlinedContent:</strong> {analysis.redlinedContent ? 'YES' : 'NO'}<br/>
        <strong>RedlinedContent length:</strong> {analysis.redlinedContent?.length || 0}<br/>
      </div>

      {analysis.redlinedContent?.map((section, index) => (
        <div key={index} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
          <h3 style={{ color: 'blue' }}>Section {index}: {section.section}</h3>
          
          <div style={{ backgroundColor: '#fff3cd', padding: '10px', margin: '10px 0' }}>
            <strong>Raw redlined content:</strong><br/>
            <pre style={{ whiteSpace: 'pre-wrap', fontSize: '10px' }}>
              {section.redlined || 'NO REDLINED CONTENT FOUND'}
            </pre>
          </div>
          
          <div style={{ backgroundColor: '#d1ecf1', padding: '10px', margin: '10px 0' }}>
            <strong>Comments ({section.comments?.length || 0}):</strong><br/>
            {section.comments?.map((comment, i) => (
              <div key={i}>#{comment.id}: {comment.text}</div>
            )) || 'No comments'}
          </div>

          <div style={{ backgroundColor: '#f8d7da', padding: '10px', margin: '10px 0' }}>
            <strong>Rendered HTML test:</strong><br/>
            <div 
              style={{ border: '1px solid red', padding: '5px' }}
              dangerouslySetInnerHTML={{ 
                __html: section.redlined || 'NO CONTENT TO RENDER'
              }}
            />
          </div>
        </div>
      )) || <div>NO REDLINED CONTENT ARRAY FOUND</div>}
    </div>
  );
}