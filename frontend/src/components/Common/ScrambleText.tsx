import { useState, useRef, useEffect, type CSSProperties } from 'react';

const DIGITS = "0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

export default function ScrambleText({ text, className, style }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const handleMouseEnter = () => {
    let iteration = 0;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = window.setInterval(() => {
      setDisplayText(() => 
        text.split("")
          .map((char, index) => {
            // Never scramble non-numeric characters like '.', '%', '+', 'K', 'M' to avoid layout shifting
            if (!/\d/.test(char) || char === ' ') {
              return char;
            }
            if (index < Math.floor(iteration)) {
              return text[index];
            }
            if (index === Math.floor(iteration)) {
              return DIGITS[Math.floor(Math.random() * DIGITS.length)];
            }
            return text[index];
          })
          .join("")
      );
      
      if (iteration >= text.length) { 
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
      
      iteration += 1 / 2;
    }, 40);
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setDisplayText(text);
  };

  return (
    <span 
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
      className={className} 
      style={{ 
        display: 'inline-block', 
        cursor: 'default',
        fontVariantNumeric: 'tabular-nums',
        fontFeatureSettings: '"tnum"',
        ...style 
      }}
    >
      {displayText}
    </span>
  );
}
