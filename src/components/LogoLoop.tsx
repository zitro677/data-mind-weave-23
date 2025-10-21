import React from 'react';

interface LogoLoopProps {
  items: string[];
  speed?: number;
}

const LogoLoop: React.FC<LogoLoopProps> = ({ items, speed = 30 }) => {
  return (
    <div className="logo-loop-container">
      <div className="logo-loop-track" style={{ animationDuration: `${speed}s` }}>
        {/* First set of items */}
        {items.map((item, idx) => (
          <span key={`first-${idx}`} className="logo-loop-item">
            {item}
          </span>
        ))}
        {/* Duplicate set for seamless loop */}
        {items.map((item, idx) => (
          <span key={`second-${idx}`} className="logo-loop-item">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
