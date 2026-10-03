import React, { useState, useRef } from 'react';

const LETTERS = "0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ScrambleText({ text, className, style }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    let iteration = 0;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = window.setInterval(() => {
      setDisplayText(() => 
        text.split("")
          .map((letter, index) => {
            // Already resolved letters
            if(index < Math.floor(iteration) || letter === ' ') {
              return text[index];
            }
            // Letter currently scrambling (only 1 at a time to reduce animation intensity)
            if (index === Math.floor(iteration)) {
              return LETTERS[Math.floor(Math.random() * LETTERS.length)];
            }
            // Unreached letters stay original so the total width remains exactly the same
            return text[index];
          })
          .join("")
      );
      
      if(iteration >= text.length){ 
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 2; // Speed up slightly so it doesn't linger too long
    }, 40);
  };

  return (
    <span 
      onMouseEnter={handleMouseEnter} 
      className={className} 
      style={{ display: 'inline-block', cursor: 'default', ...style }}
    >
      {displayText}
    </span>
  );
}
