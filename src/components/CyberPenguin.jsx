import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

/* ── Messages the penguin mutters while walking ─────────── */
const MSGS = [
  "sudo pet me 🐟",
  "I run on fish.py",
  "while(alive) { waddle(); }",
  "git commit -m 'waddled'",
  "I prefer Linux 🐧",
  "404: nap not found",
  "Ctrl+W... my wings!",
  "const me = new MVP()",
  "npm install fish",
  "Hello, World! 🐾",
  "kernel panic: cute",
  "Yes I'm open source",
];

/* ── Enhanced Portal with spinning halo + particle sparks ── */
const Portal = ({ position, isOpen, origin }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        key="portal"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.45, type: 'spring', stiffness: 260, damping: 18 }}
        className="fixed z-[95] flex items-center justify-center"
        style={{ width: 64, height: 112, transformOrigin: origin, ...position }}
      >
        {/* Outer spinning halo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
          className="absolute"
          style={{
            width: 80, height: 128,
            borderRadius: '100%',
            border: '2px solid transparent',
            background: 'linear-gradient(black, black) padding-box, conic-gradient(from 0deg, rgba(0,180,255,0) 0%, rgba(0,180,255,0.9) 40%, rgba(0,255,65,0.7) 60%, rgba(0,180,255,0) 100%) border-box',
            boxShadow: '0 0 24px rgba(0,180,255,0.6)',
          }}
        />
        {/* Second halo (counter-spin) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
          className="absolute"
          style={{
            width: 70, height: 118,
            borderRadius: '100%',
            border: '1px solid transparent',
            background: 'linear-gradient(black, black) padding-box, conic-gradient(from 180deg, rgba(0,255,65,0) 0%, rgba(0,255,65,0.5) 50%, rgba(0,255,65,0) 100%) border-box',
          }}
        />
        {/* Portal body */}
        <div
          className="absolute overflow-hidden"
          style={{
            width: 64, height: 112, borderRadius: '100%',
            border: '2px solid rgba(255,255,255,0.9)',
            boxShadow: '0 0 40px rgba(0,180,255,0.9), inset 0 0 30px rgba(0,180,255,0.6)',
          }}
        >
          <div className="absolute inset-0 bg-black rounded-[100%]" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className="absolute inset-0"
            style={{ background: 'conic-gradient(from 0deg, transparent, rgba(0,180,255,0.35), transparent)' }}
          />
          <div
            className="absolute inset-3 rounded-[100%]"
            style={{ background: 'radial-gradient(ellipse, rgba(0,100,255,0.4) 0%, rgba(0,0,0,0.9) 70%)', boxShadow: 'inset 0 0 25px rgba(0,180,255,1)' }}
          />
        </div>
        {/* Particle sparks */}
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <motion.div
            key={deg}
            animate={{
              x: [0, Math.cos((deg * Math.PI) / 180) * 38],
              y: [0, Math.sin((deg * Math.PI) / 180) * 55],
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
            }}
            transition={{ repeat: Infinity, duration: 1.1, delay: (deg / 360) * 1.1, ease: 'easeOut' }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: deg % 120 === 0 ? 'rgba(0,255,65,1)' : 'rgba(0,180,255,1)',
              boxShadow: `0 0 8px ${deg % 120 === 0 ? 'rgba(0,255,65,1)' : 'rgba(0,180,255,1)'}`,
            }}
          />
        ))}
        {/* Ground ring */}
        <div
          className="absolute"
          style={{
            bottom: -4, width: 40, height: 8, borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0,180,255,0.5) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    )}
  </AnimatePresence>
);

/* ── Speech Bubble ────────────────────────────────────────── */
const SpeechBubble = ({ text }) => (
  <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.75 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -8, scale: 0.75 }}
    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    className="absolute font-mono text-[10px] text-cyber-lime bg-[#0a0a0c] border border-cyber-lime/50 rounded-xl px-3 py-1.5 whitespace-nowrap select-none pointer-events-none"
    style={{
      bottom: '100%', left: '50%', transform: 'translateX(-50%)',
      marginBottom: 10,
      boxShadow: '0 0 14px rgba(0,255,65,0.35)',
      zIndex: 110,
    }}
  >
    {text}
    {/* Tail */}
    <div
      className="absolute"
      style={{
        bottom: -6, left: '50%', transform: 'translateX(-50%)',
        width: 0, height: 0,
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: '6px solid rgba(0,255,65,0.5)',
      }}
    />
  </motion.div>
);

/* ── Penguin body component ───────────────────────────────── */
const PenguinBody = ({ isWaddling, isParty, onClick }) => (
  <motion.div
    className="relative cursor-pointer select-none"
    style={{ width: 48, height: 64 }}
    animate={isWaddling ? { rotate: [-8, 8, -8], y: [-4, 0, -4] } : { rotate: 0, y: 0 }}
    transition={{ repeat: Infinity, duration: 0.55, ease: 'easeInOut' }}
    style={{ transformOrigin: 'bottom center', width: 48, height: 64 }}
    onClick={onClick}
    whileTap={{ scale: 0.85 }}
  >
    {/* Party hat */}
    {isParty && (
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        className="absolute -top-5 left-1/2 -translate-x-1/2 z-30"
        style={{ width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '20px solid #ff3366', filter: 'drop-shadow(0 0 6px #ff3366)' }}
      >
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full"
          style={{ boxShadow: '0 0 6px yellow', marginTop: -12, marginLeft: -4 }}
        />
      </motion.div>
    )}

    {/* Antenna */}
    <div className="absolute z-30" style={{ top: -14, left: 22 }}>
      <div className="w-px h-3.5 bg-electric-blue/80" />
      <motion.div
        animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 0.7 + Math.random() * 0.3 }}
        className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-electric-blue"
        style={{ boxShadow: '0 0 8px rgba(0,180,255,1), 0 0 16px rgba(0,180,255,0.5)' }}
      />
    </div>

    {/* Back flipper */}
    <motion.div
      className="absolute bg-gray-900 rounded-full"
      style={{ top: 26, right: -5, width: 14, height: 30, transformOrigin: 'top center' }}
      animate={isWaddling ? { rotate: [35, 75, 35] } : { rotate: 28 }}
      transition={{ repeat: Infinity, duration: 0.3 }}
    />

    {/* Body */}
    <div
      className="absolute inset-0 rounded-t-[30px] rounded-b-[20px]"
      style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #000 60%)', boxShadow: 'inset -5px 0 10px rgba(255,255,255,0.15), inset 3px 0 6px rgba(0,0,0,0.8)' }}
    />

    {/* Belly */}
    <div
      className="absolute rounded-t-[20px] rounded-b-[15px]"
      style={{ bottom: 2, left: 8, right: 4, top: 20, background: 'linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 100%)' }}
    />

    {/* Circuit lines on belly */}
    <div className="absolute overflow-hidden" style={{ bottom: 4, left: 9, right: 5, top: 26, opacity: 0.35, borderRadius: 10 }}>
      <div style={{ height: 1, background: 'rgba(0,180,255,0.8)', marginTop: 3 }} />
      <div style={{ height: 1, width: '66%', background: 'rgba(0,255,65,0.8)', marginTop: 4 }} />
      <div style={{ height: 1, background: 'rgba(0,180,255,0.8)', marginTop: 3 }} />
      <div style={{ height: 1, width: '50%', background: 'rgba(0,255,65,0.6)', marginTop: 3 }} />
    </div>

    {/* Belly dot (LED) */}
    <motion.div
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ repeat: Infinity, duration: 1.1 }}
      className="absolute rounded-full"
      style={{ bottom: 8, left: 18, width: 5, height: 5, background: '#00FF41', boxShadow: '0 0 6px #00FF41' }}
    />

    {/* Beak */}
    <div
      className="absolute z-20"
      style={{ top: 21, left: -9, width: 18, height: 11, background: 'linear-gradient(90deg, #e07000, #f59000)', borderRadius: '40% 50% 50% 40%', boxShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}
    />

    {/* Cyber visor */}
    <div
      className="absolute z-10 overflow-hidden"
      style={{ top: 10, left: -3, right: 10, height: 9, borderRadius: 12, background: 'linear-gradient(90deg, #00FF41, #00d4ff)', boxShadow: '0 0 16px rgba(0,255,65,0.9), 0 0 30px rgba(0,255,65,0.4)' }}
    >
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
        className="absolute inset-0 w-1/3"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)' }}
      />
    </div>

    {/* Eye gleam */}
    <div className="absolute z-20 bg-white rounded-full" style={{ top: 8, left: 2, width: 5, height: 5, boxShadow: '0 0 4px white' }}>
      <div className="absolute inset-[1px] bg-black rounded-full" />
      <div className="absolute top-px right-px w-1 h-1 bg-white rounded-full opacity-80" />
    </div>

    {/* Front flipper */}
    <motion.div
      className="absolute z-20 rounded-full"
      style={{ top: 26, left: 6, width: 18, height: 32, background: '#111', transformOrigin: 'top center', border: '1px solid #333', boxShadow: '2px 2px 6px rgba(0,0,0,0.6)' }}
      animate={isWaddling ? { rotate: [-50, 22, -50] } : { rotate: -10 }}
      transition={{ repeat: Infinity, duration: 0.3, ease: 'linear' }}
    />

    {/* Feet */}
    <motion.div
      className="absolute rounded-full"
      style={{ bottom: -6, left: 0, width: 22, height: 11, background: '#e07000', zIndex: 0 }}
      animate={isWaddling ? { y: [0, -5, 0] } : { y: 0 }}
      transition={{ repeat: Infinity, duration: 0.55, delay: 0 }}
    />
    <motion.div
      className="absolute rounded-full"
      style={{ bottom: -6, right: 1, width: 22, height: 11, background: '#c06000', zIndex: 0 }}
      animate={isWaddling ? { y: [0, -5, 0] } : { y: 0 }}
      transition={{ repeat: Infinity, duration: 0.55, delay: 0.28 }}
    />

    {/* Shadow */}
    <div
      className="absolute -bottom-3 left-1/2 -translate-x-1/2 opacity-25"
      style={{ width: 40, height: 8, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', filter: 'blur(4px)' }}
    />
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════ */
const CyberPenguin = () => {
  const controls = useAnimation();
  const [activePortal, setActivePortal] = useState(null);
  const [isWaddling, setIsWaddling] = useState(false);
  const [sequenceActive, setSequenceActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [message, setMessage] = useState(null);
  const [clickCount, setClickCount] = useState(0);
  const [penguinTapped, setPenguinTapped] = useState(false);
  const audioCtxRef = useRef(null);
  const mutedRef = useRef(isMuted);
  const msgTimerRef = useRef(null);

  useEffect(() => { mutedRef.current = isMuted; }, [isMuted]);
  const isParty = clickCount >= 3;

  /* ── Audio ── */
  const playSound = useCallback((type = 'squeak') => {
    if (mutedRef.current) return;
    try {
      if (!audioCtxRef.current)
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (type === 'squeak') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1100, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1900, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.25);
      } else if (type === 'pop') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.18);
      }
      osc.connect(gain).connect(ctx.destination);
    } catch (_) {}
  }, []);

  /* ── Show a speech bubble message ── */
  const showMsg = useCallback((custom) => {
    clearTimeout(msgTimerRef.current);
    const txt = custom ?? MSGS[Math.floor(Math.random() * MSGS.length)];
    setMessage(txt);
    msgTimerRef.current = setTimeout(() => setMessage(null), 2800);
  }, []);

  /* ── Tap the walking penguin ── */
  const handlePenguinTap = useCallback(() => {
    if (!isWaddling) return;
    setPenguinTapped(true);
    playSound('pop');
    showMsg();
    setTimeout(() => setPenguinTapped(false), 400);
  }, [isWaddling, playSound, showMsg]);

  /* ── Main walk sequence ── */
  useEffect(() => {
    if (!sequenceActive) return;
    let alive = true;

    const newCount = clickCount + 1;
    setClickCount(newCount);

    const run = async () => {
      // initial squeak & message
      playSound('squeak');

      await new Promise(r => setTimeout(r, 500));
      if (!alive) return;

      await controls.set({
        right: '-80px', bottom: '22px',
        x: 0, y: 0, opacity: 0, scale: 0.15, scaleX: 1,
      });

      // Open entry portal
      setActivePortal('br');
      await new Promise(r => setTimeout(r, 550));
      if (!alive) return;

      // Emerge from portal
      playSound('squeak');
      setIsWaddling(true);
      showMsg();

      await controls.start({
        right: '90px', opacity: 1, scale: 0.62,
        transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
      });
      setActivePortal(null);

      // Walk across screen — show mid-walk message halfway
      const walkDuration = 10_000;
      setTimeout(() => { if (alive) showMsg(); }, walkDuration / 2);

      await controls.start({
        right: 'calc(100vw - 130px)',
        transition: { duration: walkDuration / 1000, ease: 'linear' },
      });
      setIsWaddling(false);

      // Open exit portal
      setActivePortal('bl');
      await new Promise(r => setTimeout(r, 580));
      if (!alive) return;

      // Enter exit portal
      playSound('squeak');
      setIsWaddling(true);
      await controls.start({
        right: 'calc(100vw + 60px)',
        opacity: 0,
        scale: 0.1,
        transition: { duration: 1.1, ease: 'easeIn' },
      });
      setIsWaddling(false);
      setActivePortal(null);
      setMessage(null);

      if (alive) setSequenceActive(false);
    };

    run();
    return () => {
      alive = false;
      clearTimeout(msgTimerRef.current);
    };
  }, [sequenceActive]); // eslint-disable-line

  /* ═══════════════════════════════ JSX ══════════════════════ */
  return (
    <>
      {/* ── Trigger Button ── */}
      {!sequenceActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="fixed bottom-4 left-4 z-[100] flex items-center gap-2"
        >
          <button
            onClick={() => setSequenceActive(true)}
            className="relative flex items-center gap-2 px-4 py-2 text-xs font-mono rounded-lg bg-[#0a0a0c]/90 border text-cyber-lime overflow-hidden backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              borderColor: isParty ? 'rgba(255,51,102,0.7)' : 'rgba(0,255,65,0.4)',
              boxShadow: isParty
                ? '0 0 20px rgba(255,51,102,0.35)'
                : '0 0 15px rgba(0,255,65,0.2)',
            }}
          >
            {/* Shimmer sweep */}
            <motion.div
              animate={{ x: ['-120%', '220%'] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'linear', repeatDelay: 0.8 }}
              className="absolute inset-0"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)', width: '40%' }}
            />

            {/* Penguin icon — bounces */}
            <motion.span
              animate={{ y: [-2, 1, -2] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
              style={{ fontSize: 16, display: 'inline-block' }}
            >
              🐧
            </motion.span>

            <span className="relative z-10" style={{ color: isParty ? '#ff3366' : undefined }}>
              {isParty ? '🎉 Again?!' : 'Tap for surprise'}
            </span>

            {/* Click counter badge */}
            {clickCount > 0 && (
              <motion.span
                key={clickCount}
                initial={{ scale: 1.6 }}
                animate={{ scale: 1 }}
                className="relative z-10 text-[9px] px-1.5 py-0.5 rounded-full border font-bold"
                style={{
                  background: 'rgba(0,255,65,0.12)',
                  borderColor: 'rgba(0,255,65,0.35)',
                  color: 'rgba(0,255,65,0.9)',
                }}
              >
                ×{clickCount}
              </motion.span>
            )}
          </button>

          {/* Mute toggle */}
          <button
            onClick={() => setIsMuted(v => !v)}
            title="Toggle penguin SFX"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/15 text-gray-500 hover:text-white bg-[#0a0a0c]/80 backdrop-blur-md transition-colors"
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        </motion.div>
      )}

      {/* ── Portals ── */}
      <Portal position={{ bottom: '12px', right: '12px' }} isOpen={activePortal === 'br'} origin="bottom right" />
      <Portal position={{ bottom: '12px', left: '12px' }} isOpen={activePortal === 'bl'} origin="bottom left" />

      {/* ── Penguin ── */}
      <motion.div
        animate={controls}
        className="fixed z-[102]"
        style={{
          filter: isParty
            ? 'drop-shadow(0 0 18px rgba(255,51,102,0.8)) drop-shadow(0 0 8px rgba(0,180,255,0.6))'
            : 'drop-shadow(0 0 16px rgba(0,180,255,0.75)) drop-shadow(0 0 6px rgba(0,255,65,0.4))',
        }}
      >
        {/* Speech bubble */}
        <div className="relative">
          <AnimatePresence>
            {message && <SpeechBubble key={message} text={message} />}
          </AnimatePresence>

          {/* Tap-flash ring on click */}
          <AnimatePresence>
            {penguinTapped && (
              <motion.div
                key="tap"
                initial={{ scale: 0.6, opacity: 0.9 }}
                animate={{ scale: 2.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-full border-2 border-cyber-lime pointer-events-none"
                style={{ boxShadow: '0 0 20px rgba(0,255,65,0.8)' }}
              />
            )}
          </AnimatePresence>

          <PenguinBody
            isWaddling={isWaddling}
            isParty={isParty}
            onClick={handlePenguinTap}
          />
        </div>
      </motion.div>

      {/* ── Party confetti if 3+ clicks ── */}
      <AnimatePresence>
        {isParty && sequenceActive && (
          <>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, y: -20, x: Math.random() * window.innerWidth, scale: 1 }}
                animate={{ opacity: 0, y: window.innerHeight, x: `calc(${Math.random() * window.innerWidth}px + ${(Math.random() - 0.5) * 200}px)`, rotate: Math.random() * 720 }}
                transition={{ duration: 2.5 + Math.random() * 2, delay: Math.random() * 1.5, ease: 'easeIn', repeat: Infinity, repeatDelay: Math.random() * 2 }}
                className="fixed z-[99] pointer-events-none text-xl"
                style={{ top: 0 }}
              >
                {['🎉', '✨', '🐧', '💚', '⭐', '🎊', '💙', '🌟'][i]}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CyberPenguin;
