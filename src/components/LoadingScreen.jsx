import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── 3D Cube face transforms ─── */
const CUBE = 118;
const HALF = CUBE / 2;
const cubeFaces = [
  { tf: `translateZ(${HALF}px)` },
  { tf: `rotateY(180deg) translateZ(${HALF}px)` },
  { tf: `rotateY(90deg) translateZ(${HALF}px)` },
  { tf: `rotateY(-90deg) translateZ(${HALF}px)` },
  { tf: `rotateX(90deg) translateZ(${HALF}px)` },
  { tf: `rotateX(-90deg) translateZ(${HALF}px)` },
];

/* ─── Diagonal accent lines that frame the screen ─── */
const BOOT_LINES = [
  'NEURAL INTERFACE … CONNECTED',
  'DECRYPTING IDENTITY MATRIX',
  'AI CORE INITIALIZED',
  'WELCOME, OPERATOR',
];

/* ────────────────────────────────────────────────────── */
const LoadingScreen = ({ onComplete }) => {
  const canvasRef   = useRef(null);
  const [lines,   setLines]   = useState([]);
  const [phase,   setPhase]   = useState('boot'); // boot | flash | exit

  /* ── Canvas: matrix rain ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const charset = 'アイウエカキクケサシスセタチツテ01@#$%&ABCDEFabcdef';
    const cols  = Math.floor(window.innerWidth / 18);
    const drops = Array.from({ length: cols }, () => -Math.floor(Math.random() * 40));

    let raf;
    const tick = () => {
      ctx.fillStyle = 'rgba(5, 5, 7, 0.09)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((y, i) => {
        const ch = charset[Math.floor(Math.random() * charset.length)];
        const py = y * 18;
        ctx.font = '11px "Fira Code", monospace';
        // bright head
        ctx.fillStyle = `rgba(0, 255, 65, ${(Math.random() * 0.25 + 0.08).toFixed(2)})`;
        ctx.fillText(ch, i * 18, py);
        drops[i] = py > canvas.height + 50 ? 0 : drops[i] + 1;
      });

      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  /* ── Boot text ── */
  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => setLines(prev => [...prev, line]), 180 + i * 310);
    });
  }, []);

  /* ── Phase timeline (total ≈ 2.4 s) ── */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('flash'),  1450);
    const t2 = setTimeout(() => setPhase('exit'),   1850);
    const t3 = setTimeout(() => onComplete?.(),     2400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [onComplete]);

  /* ──────────────────────────────────────────────────── */
  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="intro"
          exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.04 }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] bg-[#050507] flex items-center justify-center overflow-hidden"
        >
          {/* ── Matrix canvas ── */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.38 }}
          />

          {/* ── Deep radial glow ── */}
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="absolute pointer-events-none"
            style={{
              width: 600, height: 600,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,180,255,0.13) 0%, transparent 68%)',
            }}
          />

          {/* ══════════════ 3D Scene ══════════════ */}
          <div className="relative z-20 flex items-center justify-center" style={{ perspective: '700px' }}>

            {/* Outer orbit – Y axis */}
            <motion.div
              animate={{ rotateY: [0, 360] }}
              transition={{ repeat: Infinity, duration: 3.6, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: 300, height: 300,
                borderRadius: '50%',
                border: '1.5px solid rgba(0,180,255,0.65)',
                boxShadow: '0 0 22px rgba(0,180,255,0.45), inset 0 0 22px rgba(0,180,255,0.06)',
              }}
            />

            {/* Mid orbit – X axis */}
            <motion.div
              animate={{ rotateX: [0, 360] }}
              transition={{ repeat: Infinity, duration: 2.9, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: 224, height: 224,
                borderRadius: '50%',
                border: '1.5px solid rgba(0,255,65,0.55)',
                boxShadow: '0 0 16px rgba(0,255,65,0.3)',
              }}
            />

            {/* Inner orbit – Z axis */}
            <motion.div
              animate={{ rotateZ: [0, 360] }}
              transition={{ repeat: Infinity, duration: 2.1, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: 158, height: 158,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.22)',
                boxShadow: '0 0 10px rgba(255,255,255,0.12)',
              }}
            />

            {/* Wireframe cube */}
            <motion.div
              animate={{ rotateX: [15, 375], rotateY: [0, 360] }}
              transition={{ repeat: Infinity, duration: 4.2, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: CUBE, height: CUBE,
                transformStyle: 'preserve-3d',
              }}
            >
              {cubeFaces.map((face, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: CUBE, height: CUBE,
                    border: '1px solid rgba(0,255,65,0.58)',
                    boxShadow: '0 0 8px rgba(0,255,65,0.22)',
                    transform: face.tf,
                    backgroundColor: 'rgba(0,255,65,0.018)',
                  }}
                />
              ))}
            </motion.div>

            {/* Central core orb */}
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ repeat: Infinity, duration: 1.3, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                width: 20, height: 20,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #fff 0%, rgba(0,180,255,0.9) 55%)',
                boxShadow:
                  '0 0 28px rgba(0,180,255,1), 0 0 60px rgba(0,180,255,0.6), 0 0 100px rgba(0,180,255,0.25)',
              }}
            />

            {/* Targeting crosshairs */}
            {[0, 90, 180, 270].map(deg => (
              <div
                key={deg}
                style={{
                  position: 'absolute',
                  width: 1, height: 36,
                  background: 'rgba(0,255,65,0.35)',
                  transformOrigin: 'top center',
                  transform: `rotate(${deg}deg) translateY(-160px)`,
                }}
              />
            ))}
          </div>
          {/* ═════════════════════════════════════ */}

          {/* ── Horizontal scan line ── */}
          <motion.div
            animate={{ y: [-900, 900] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: 'linear' }}
            className="absolute left-0 right-0 pointer-events-none z-30"
            style={{
              height: 2,
              background:
                'linear-gradient(90deg, transparent, rgba(0,255,65,0.55) 20%, rgba(0,255,65,0.55) 80%, transparent)',
              filter: 'blur(1px)',
            }}
          />

          {/* ── HUD corner brackets ── */}
          {[
            'top-6 left-6 border-t-2 border-l-2',
            'top-6 right-6 border-t-2 border-r-2',
            'bottom-6 left-6 border-b-2 border-l-2',
            'bottom-6 right-6 border-b-2 border-r-2',
          ].map((cls, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 + i * 0.04, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`absolute w-14 h-14 border-cyber-lime/50 ${cls}`}
            />
          ))}

          {/* ── Corner accent dots ── */}
          {[
            'top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6',
          ].map((pos, i) => (
            <motion.div
              key={`dot-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.4, 1] }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
              className={`absolute w-1.5 h-1.5 bg-cyber-lime rounded-full ${pos}`}
              style={{ boxShadow: '0 0 8px rgba(0,255,65,0.8)' }}
            />
          ))}

          {/* ── Top label ── */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 font-mono text-[11px] text-electric-blue/60 tracking-[0.55em] uppercase select-none"
          >
            ◆ NEURAL CORE ◆
          </motion.div>

          {/* ── Left data readout ── */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="absolute left-10 top-1/2 -translate-y-1/2 space-y-2 font-mono select-none"
            style={{ fontSize: 10, color: 'rgba(0,180,255,0.32)', lineHeight: 1.8 }}
          >
            <div>LAT: 15.36°N</div>
            <div>LON: 75.12°E</div>
            <div>ALT: 562m</div>
            <div>SEC: AES-256</div>
          </motion.div>

          {/* ── Right data readout ── */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="absolute right-10 top-1/2 -translate-y-1/2 space-y-2 font-mono text-right select-none"
            style={{ fontSize: 10, color: 'rgba(0,255,65,0.3)', lineHeight: 1.8 }}
          >
            <div>CPU: 0.4%</div>
            <div>MEM: 4.2G</div>
            <div>VER: 2.0.0</div>
            <div>NET: ██</div>
          </motion.div>

          {/* ── Boot log ── */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 space-y-1.5">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="font-mono select-none"
                style={{
                  fontSize: 11,
                  color: i === lines.length - 1
                    ? 'rgba(0,255,65,0.9)'
                    : 'rgba(255,255,255,0.18)',
                }}
              >
                <span style={{ color: 'rgba(0,180,255,0.5)', marginRight: 8 }}>›</span>
                {line}
              </motion.div>
            ))}
          </div>

          {/* ── Scanline CRT texture ── */}
          <div
            className="absolute inset-0 pointer-events-none z-30 opacity-[0.035]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,1) 2px, rgba(0,255,65,1) 4px)',
            }}
          />

          {/* ── FLASH finale ── */}
          {phase === 'flash' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.6, 0] }}
              transition={{ duration: 0.42 }}
              className="absolute inset-0 z-50 flex items-center justify-center"
              style={{ background: 'rgba(0,255,65,0.04)' }}
            >
              <motion.span
                initial={{ scale: 0.65, opacity: 0 }}
                animate={{ scale: [0.65, 1.1, 1], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 0.42 }}
                className="font-mono font-black tracking-[0.2em] select-none"
                style={{
                  fontSize: 58,
                  color: '#fff',
                  textShadow:
                    '0 0 50px rgba(0,255,65,1), 0 0 100px rgba(0,255,65,0.6), 0 0 160px rgba(0,255,65,0.25)',
                }}
              >
                ONLINE
              </motion.span>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
