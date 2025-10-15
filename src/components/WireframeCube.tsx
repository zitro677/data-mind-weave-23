const WireframeCube = () => {
  return (
    <div className="relative w-64 h-64 perspective-1000">
      <div className="absolute inset-0 preserve-3d animate-rotate-cube">
        {/* Front face */}
        <div className="absolute inset-0 border border-accent/30 translate-z-32">
          <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-1 p-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-accent/10 border border-accent/20"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
        
        {/* Back face */}
        <div className="absolute inset-0 border border-accent/30 rotate-y-180 translate-z-32">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-accent/40 font-mono text-xs">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>{'> '}{Math.random().toString(16).substring(2, 10)}</div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Left face */}
        <div className="absolute inset-0 border border-accent/30 rotate-y-90 translate-z-32" />
        
        {/* Right face */}
        <div className="absolute inset-0 border border-accent/30 rotate-y-270 translate-z-32" />
        
        {/* Top face */}
        <div className="absolute inset-0 border border-accent/30 rotate-x-90 translate-z-32" />
        
        {/* Bottom face */}
        <div className="absolute inset-0 border border-accent/30 rotate-x-270 translate-z-32" />
      </div>
    </div>
  );
};

export default WireframeCube;
