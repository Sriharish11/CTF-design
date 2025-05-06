
import React, { useState, useEffect } from 'react';

interface TerminalTextProps {
  text: string;
  typingSpeed?: number;
  className?: string;
}

const TerminalText: React.FC<TerminalTextProps> = ({ 
  text, 
  typingSpeed = 30,
  className = "" 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentIndex < text.length && isTyping) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typingSpeed);
      
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, text, typingSpeed, isTyping]);

  return (
    <span className={`${className} ${isTyping ? 'terminal-text' : ''}`}>
      {displayedText}
    </span>
  );
};

export default TerminalText;
