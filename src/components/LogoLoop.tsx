import React from 'react';

interface LogoItem {
  name: string;
  icon: React.ReactNode;
}

interface LogoLoopProps {
  items: LogoItem[];
  speed?: number;
}

const LogoLoop: React.FC<LogoLoopProps> = ({ items, speed = 30 }) => {
  return (
    <div className="logo-loop-container">
      <div className="logo-loop-track" style={{ animationDuration: `${speed}s` }}>
        {/* First set of items */}
        {items.map((item, idx) => (
          <span key={`first-${idx}`} className="logo-loop-item">
            <span className="logo-loop-icon">{item.icon}</span>
            <span>{item.name}</span>
          </span>
        ))}
        {/* Duplicate set for seamless loop */}
        {items.map((item, idx) => (
          <span key={`second-${idx}`} className="logo-loop-item">
            <span className="logo-loop-icon">{item.icon}</span>
            <span>{item.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default LogoLoop;
