'use client';
import { useState } from 'react';

export default function TruncatedText({ text, maxLength = 150 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!text) return null;
  
  if (text.length <= maxLength || isExpanded) {
    return (
      <div>
        <p className="text-gray-200 whitespace-pre-line">{text}</p>
        {text.length > maxLength && isExpanded && (
          <button 
            onClick={() => setIsExpanded(false)}
            className="text-blue-400 hover:underline mt-2 text-sm font-medium"
          >
            Show Less
          </button>
        )}
      </div>
    );
  }
  
  return (
    <div>
      <p className="text-gray-200 whitespace-pre-line">{text.substring(0, maxLength)}...</p>
      <button 
        onClick={() => setIsExpanded(true)}
        className="text-blue-400 hover:underline mt-2 text-sm font-medium"
      >
        Read More
      </button>
    </div>
  );
}