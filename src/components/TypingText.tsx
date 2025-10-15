import { useEffect, useState } from 'react';

interface TypingTextProps {
  text: string;
  className?: string;
}

const TypingText = ({ text, className = '' }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return (
    <div className={`font-mono ${className}`}>
      {displayedText}
      <span className="inline-block w-0.5 h-5 bg-accent ml-1 animate-pulse" />
    </div>
  );
};

export default TypingText;
