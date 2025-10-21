import { useEffect, useRef } from 'react';

// Lightweight Canvas-based PixelBlast background (no three.js)
const PixelBlast = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = Math.floor(rect?.width || window.innerWidth);
      const h = Math.floor(rect?.height || window.innerHeight);
      canvas.width = Math.max(1, w * dpr);
      canvas.height = Math.max(1, h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    type Particle = {
      x: number;
      y: number;
      angle: number;
      radius: number;
      speed: number;
      hue: number;
      alpha: number;
      size: number;
    };

    const makeParticles = (count = 420): Particle[] => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const maxR = Math.min(w, h) * 0.6;
      const cx = w / 2;
      const cy = h / 2;
      return Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * maxR;
        const hue = Math.random() > 0.5 ? 280 : 310; // accent & magenta hues
        return {
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
          angle,
          radius,
          speed: 0.001 + Math.random() * 0.004,
          hue,
          alpha: 0.35 + Math.random() * 0.45,
          size: 0.6 + Math.random() * 1.8,
        };
      });
    };

    let particles = makeParticles();

    let raf = 0;
    const render = (t: number) => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      // Faint fade for nice trails
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.angle += p.speed * (1 + Math.sin(t * 0.0005) * 0.5);
        p.radius *= 0.9995 + Math.sin(t * 0.001) * 0.0005;
        if (p.radius < 12) p.radius = Math.random() * Math.min(w, h) * 0.6 + 12;
        p.x = cx + Math.cos(p.angle) * p.radius;
        p.y = cy + Math.sin(p.angle) * p.radius;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 12);
        grad.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${p.alpha})`);
        grad.addColorStop(1, `hsla(${p.hue}, 100%, 60%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    // Prime canvas with a dark base to match background
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      // Cleanup particles to free memory
      particles = [];
    };
  }, []);

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

export default PixelBlast;
