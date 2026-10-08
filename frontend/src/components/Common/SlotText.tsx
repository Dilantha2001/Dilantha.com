import React, { type CSSProperties } from 'react';
import './SlotText.css';

interface SlotTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

export default function SlotText({ text, className = "", style }: SlotTextProps) {
  return (
    <span className={`rolling-text-root ${className}`} style={style}>
      {text.split("").map((char, index) => (
        <span 
          key={index} 
          className="rolling-char-track"
          style={{ '--char-index': index } as React.CSSProperties}
        >
          <span className="rolling-char primary">{char === " " ? "\u00A0" : char}</span>
          <span className="rolling-char clone" aria-hidden="true">{char === " " ? "\u00A0" : char}</span>
        </span>
      ))}
    </span>
  );
}
