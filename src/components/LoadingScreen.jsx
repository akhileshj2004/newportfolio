import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const LoadingScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('boot');      // boot → doors → welcome → exit
  const [muted, setMuted] = useState(false);
  const audioCtxRef = useRef(null);
  const mutedRef = useRef(false);

  // Keep ref in sync
  useEffect(() => { mutedRef.current = muted; }, [muted]);

  const playSfx = useCallback(() => {
    if (mutedRef.current) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = ctx;

      // Sci-fi hum / power-up sweep
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(60, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 1.5);
      osc1.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 2.5);
      gain1.gain.setValueAtTime(0, ctx.currentTime);
      gain1.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
      gain1.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2);
      gain1.gain.linearRampToValueAtTime(0, ctx.currentTime + 3);
      osc1.connect(gain1).connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 3);

      // High-frequency digital sweep
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(800, ctx.currentTime + 0.5);
      osc2.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 1.5);
      osc2.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 2.5);
      gain2.gain.setValueAtTime(0, ctx.currentTime + 0.5);
      gain2.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.8);
      gain2.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.8);
      osc2.connect(gain2).connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.5);
      osc2.stop(ctx.currentTime + 3);

      // Door slide whoosh (noise burst)
      const bufferSize = ctx.sampleRate * 0.8;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.5;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const noiseGain = ctx.createGain();
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1000;
      noiseFilter.Q.value = 0.5;
      noiseGain.gain.setValueAtTime(0, ctx.currentTime + 1.2);
      noiseGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1.4);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);
      noise.connect(noiseFilter).connect(noiseGain).connect(ctx.destination);
      noise.start(ctx.currentTime + 1.2);

      // Welcome chime
      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chime.type = 'sine';
      chime.frequency.setValueAtTime(880, ctx.currentTime + 2.5);
      chime.frequency.setValueAtTime(1100, ctx.currentTime + 2.7);
      chimeGain.gain.setValueAtTime(0, ctx.currentTime + 2.5);
      chimeGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2.6);
      chimeGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3.5);
      chime.connect(chimeGain).connect(ctx.destination);
      chime.start(ctx.currentTime + 2.5);
      chime.stop(ctx.currentTime + 3.5);
    } catch (e) {
      // Audio not supported, continue silently
    }
  }, []);

  useEffect(() => {
    // Phase timeline
    const timers = [];
    // Boot phase: 1s
    timers.push(setTimeout(() => {
      setPhase('doors');
      playSfx();
    }, 1000));
    // Doors open: starts at 1s, takes ~1.5s → welcome at 2.5s
    timers.push(setTimeout(() => setPhase('welcome'), 2500));
    // Exit after welcome text shown
    timers.push(setTimeout(() => setPhase('exit'), 4500));
    // Call onComplete 
    timers.push(setTimeout(() => onComplete?.(), 5200));

    return () => timers.forEach(clearTimeout);
  }, [playSfx, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'exit' ? (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[200] bg-[#030305] flex items-center justify-center overflow-hidden"
        >
          {/* Background grid */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[length:24px_24px]" />

          {/* Ambient glow */}
          <motion.div
            animate={{ opacity: phase === 'boot' ? 0.3 : 0.6 }}
            transition={{ duration: 1.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00FF41]/10 blur-[150px] rounded-full"
          />

          {/* ─── DOOR PANELS ─── */}
          {/* Left door */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: phase === 'doors' || phase === 'welcome' ? '-105%' : 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="absolute left-0 top-0 w-1/2 h-full bg-[#050507] border-r border-[#00FF41]/20 z-30 flex items-center justify-end overflow-hidden"
          >
            {/* Door panel details */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute border border-white/5 rounded-sm" style={{
                  left: `${10 + Math.random() * 60}%`, top: `${5 + i * 12}%`,
                  width: `${20 + Math.random() * 30}%`, height: '8%',
                }} />
              ))}
            </div>
            {/* Chevrons */}
            <div className="pr-6 text-[#00FF41]/30 font-mono text-6xl tracking-tighter select-none">
              ‹‹‹
            </div>
            {/* Edge glow */}
            <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-[#00FF41]/40 to-transparent shadow-[0_0_15px_rgba(0,255,65,0.3)]" />
          </motion.div>

          {/* Right door */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: phase === 'doors' || phase === 'welcome' ? '105%' : 0 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            className="absolute right-0 top-0 w-1/2 h-full bg-[#050507] border-l border-[#00FF41]/20 z-30 flex items-center justify-start overflow-hidden"
          >
            <div className="absolute inset-0 opacity-30">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute border border-white/5 rounded-sm" style={{
                  left: `${10 + Math.random() * 60}%`, top: `${5 + i * 12}%`,
                  width: `${20 + Math.random() * 30}%`, height: '8%',
                }} />
              ))}
            </div>
            <div className="pl-6 text-[#00FF41]/30 font-mono text-6xl tracking-tighter select-none">
              ›››
            </div>
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-[#00FF41]/40 to-transparent shadow-[0_0_15px_rgba(0,255,65,0.3)]" />
          </motion.div>

          {/* ─── CENTER CONTENT ─── */}
          <div className="relative z-20 flex flex-col items-center gap-6">
            {/* Boot phase: initializing text */}
            <AnimatePresence mode="wait">
              {phase === 'boot' && (
                <motion.div
                  key="boot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-10 h-10 border-2 border-[#00FF41]/40 border-t-[#00FF41] rounded-full animate-spin" />
                  <span className="font-mono text-sm text-[#00FF41]/60 tracking-widest uppercase">
                    Initializing System...
                  </span>
                </motion.div>
              )}

              {/* Welcome text */}
              {phase === 'welcome' && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '120px' }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="h-px bg-gradient-to-r from-transparent via-[#00FF41] to-transparent"
                  />
                  <h2 className="font-mono text-3xl md:text-5xl text-white tracking-tight text-center">
                    Welcome to{' '}
                    <span className="text-[#00FF41]" style={{ textShadow: '0 0 20px rgba(0,255,65,0.5)' }}>
                      Akhilesh's
                    </span>
                    <br />
                    <span className="text-[#00B4FF]" style={{ textShadow: '0 0 20px rgba(0,180,255,0.4)' }}>
                      Portfolio
                    </span>
                  </h2>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '120px' }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="h-px bg-gradient-to-r from-transparent via-[#00B4FF] to-transparent"
                  />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-500 font-mono text-xs tracking-widest uppercase mt-2"
                  >
                    [ system ready ]
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── MUTE BUTTON ─── */}
          <button
            onClick={() => setMuted(!muted)}
            className="fixed bottom-5 left-5 z-[210] w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-[#00FF41] hover:border-[#00FF41]/30 transition-all duration-300"
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none z-40 opacity-[0.03]" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
          }} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default LoadingScreen;
