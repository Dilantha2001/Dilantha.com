import { useState, useRef, useEffect, type CSSProperties } from 'react';

const DIGITS = "0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

export default function ScrambleText({ text, className, style }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [prevText, setPrevText] = useState(text);
  const elementRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<number | null>(null);

  if (text !== prevText) {
    setPrevText(text);
    setDisplayText(text);
  }

  const runScramble = () => {
    let iteration = 0;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = window.setInterval(() => {
      setDisplayText(() => 
        text.split("")
          .map((char, index) => {
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

  // Automatic trigger when visible in viewport (No hover required!)
  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          runScramble();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  return (
    <span 
      ref={elementRef}
      onMouseEnter={runScramble}
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
