import React, { useEffect, useRef, useState } from 'react';

const LiquidCursor = () => {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Array to store ongoing water ripples/streaks
    const ripples = [];
    let mouse = { x: -100, y: -100, vx: 0, vy: 0 };
    let lastMouse = { x: -100, y: -100 };
    let lastSpawn = 0;

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - lastMouse.x;
      mouse.vy = mouse.y - lastMouse.y;
      
      const speed = Math.sqrt(mouse.vx ** 2 + mouse.vy ** 2);
      
      const now = Date.now();
      // Spawn much more frequently for a continuous flow, but with tighter bounds
      if (speed > 1 && now - lastSpawn > 10) {
        ripples.push({
          x: mouse.x,
          y: mouse.y,
          vx: mouse.vx,
          vy: mouse.vy,
          radiusX: 1,
          radiusY: 1,
          // Stretch heavily along the motion vector (not a perfect circle)
          maxRadiusX: 5 + speed * 1.5,
          // Keep spread minimal across the motion vector
          maxRadiusY: 2 + Math.random() * 4 + speed * 0.1,
          life: 1,
          // Faster decay keeps the tail minimum
          decay: 0.04 + Math.random() * 0.02,
          colorPhase: Math.random() > 0.5 ? 'cyan' : 'lime'
        });
        lastSpawn = now;
      }

      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;
    };

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Create a trailing clear effect for the liquid tail
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(0, 0, width, height);

      // Switch to overlapping blend mode for the water caustics
      ctx.globalCompositeOperation = 'screen';

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        
        // Physics: expand radius fast initially
        r.radiusX += (r.maxRadiusX - r.radiusX) * 0.2;
        r.radiusY += (r.maxRadiusY - r.radiusY) * 0.2;
        r.life -= r.decay;

        if (r.life <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        // Calculate rotation angle to align elliptical stretch with velocity direction
        const angle = Math.atan2(r.vy, r.vx);

        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.rotate(angle);
        
        // Squish the rendering Y axis to turn the drawn circle into an ellipse
        ctx.scale(1, r.radiusY / Math.max(r.radiusX, 0.001));

        ctx.beginPath();
        // Since Y is scaled above, we just draw a circle using the X radius
        ctx.arc(0, 0, r.radiusX, 0, Math.PI * 2);
        
        // Transparent liquid gradient
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, r.radiusX);
        const lime = `rgba(0, 255, 65, ${r.life * 0.6})`;
        const cyan = `rgba(0, 180, 255, ${r.life * 0.6})`;
        const primary = r.colorPhase === 'cyan' ? cyan : lime;
        
        // Concentrated bright core fading sharply into fluid transparency
        gradient.addColorStop(0, `rgba(255, 255, 255, ${r.life * 0.3})`);
        gradient.addColorStop(0.3, primary);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.restore();
      }

      // Draw the core cursor drop (solid tiny drop trailing exactly at pointer)
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00FF41';
      ctx.fill();
      ctx.shadowBlur = 0;

      requestAnimationFrame(animate);
    };

    const frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  if (isMobile) return null;

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-[9900]"
      style={{ 
        mixBlendMode: 'color-dodge', 
        opacity: 0.9 
      }}
    />
  );
};

export default LiquidCursor;
