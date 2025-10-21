import { useEffect } from 'react';

const SplashCursor = () => {
  useEffect(() => {
    const createSplash = (e: MouseEvent) => {
      const splash = document.createElement('div');
      splash.className = 'splash-cursor';
      splash.style.left = `${e.clientX}px`;
      splash.style.top = `${e.clientY}px`;
      
      document.body.appendChild(splash);
      
      // Create multiple ripples
      for (let i = 0; i < 8; i++) {
        const ripple = document.createElement('div');
        ripple.className = 'splash-ripple';
        ripple.style.setProperty('--rotation', `${i * 45}deg`);
        ripple.style.animationDelay = `${i * 0.05}s`;
        splash.appendChild(ripple);
      }
      
      setTimeout(() => {
        splash.remove();
      }, 1000);
    };

    document.addEventListener('click', createSplash);
    
    return () => {
      document.removeEventListener('click', createSplash);
    };
  }, []);

  return null;
};

export default SplashCursor;
