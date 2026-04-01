import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Terminal, Unlock, Lock, Cpu } from 'lucide-react';

const LoadingScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('idle'); // idle -> boot -> welcome -> doors -> exit
  const [muted, setMuted] = useState(false);
  const [terminalLines, setTerminalLines] = useState([]);
  const audioCtxRef = useRef(null);
  const mutedRef = useRef(muted);

  useEffect(() => { mutedRef.current = muted; }, [muted]);

  const playSound = useCallback((config) => {
    if (mutedRef.current) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      config(ctx);
    } catch (e) {
      // Ignore if audio isn't supported / allowed
    }
  }, []);

  const playBootSound = () => playSound((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(40, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 1.0);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.2);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.2);
  });

  const playKeystrokeSound = () => playSound((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(600 + Math.random() * 400, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + 0.01);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  });

  const playWelcomeSound = () => playSound((ctx) => {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, ctx.currentTime);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1108.73, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.0);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    osc1.start(ctx.currentTime);
    osc2.start(ctx.currentTime + 0.1);
    osc1.stop(ctx.currentTime + 2.0);
    osc2.stop(ctx.currentTime + 2.0);
  });

  const playDoorSound = () => playSound((ctx) => {
    const bufferSize = ctx.sampleRate * 2.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 2.0);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.0);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);
    
    noise.connect(filter).connect(gain).connect(ctx.destination);
    noise.start(ctx.currentTime);
    
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(50, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(20, ctx.currentTime + 2.0);
    oscGain.gain.setValueAtTime(0, ctx.currentTime);
    oscGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.2);
    oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.0);
    
    osc.connect(oscGain).connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 2.5);
  });

  const playUnlockSound = () => playSound((ctx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.setValueAtTime(1800, ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
    
    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.3);
  });

  const initializeSequence = () => {
    if (phase !== 'idle') return;

    // Trigger audio context creation
    playSound(() => {});

    setPhase('unlocking');
    playUnlockSound();

    setTimeout(() => {
      setPhase('boot');
      playBootSound();

      const lines = [
        "INITIALIZING NEURAL LINK...",
        "PROXY ESTABLISHED: 104.22.4.10",
        "BYPASSING SECURITY PROTOCOLS...",
        "DECRYPTING ENCLAVE...",
        "VERIFYING IDENTITY...",
        "ACCESS GRANTED."
      ];
      let currentLine = 0;
      
      const interval = setInterval(() => {
        if (currentLine < lines.length) {
          setTerminalLines(prev => [...prev, lines[currentLine]]);
          currentLine++;
          playKeystrokeSound();
        } else {
          clearInterval(interval);
          
          setTimeout(() => {
            setPhase('welcome');
            playWelcomeSound();
          }, 600);
          
          setTimeout(() => {
            setPhase('doors');
            playDoorSound();
          }, 3000);

          setTimeout(() => {
            setPhase('exit');
          }, 4500);

          setTimeout(() => {
            onComplete?.();
          }, 5500);
        }
      }, 280);
    }, 600); // Wait for unlocking animation and sound
  };

  return (
    <AnimatePresence>
      {phase !== 'exit' && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[200] bg-[#050507] flex items-center justify-center overflow-hidden"
        >
          {/* Cyberpunk grid background behind doors */}
          <div className="absolute inset-0 bg-[radial-gradient(rgba(0,180,255,0.08)_1px,transparent_1px)] bg-[length:30px_30px]" />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-lime/10 blur-[150px] rounded-full pointer-events-none" />

          {/* LEFT DOOR */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: phase === 'doors' ? '-100%' : 0 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute left-0 top-0 w-[55vw] h-full bg-[#08080A] shadow-2xl z-30 overflow-hidden"
            style={{ 
              clipPath: 'polygon(0 0, 82% 0, 100% 50%, 82% 100%, 0 100%)',
              borderRight: '1px solid rgba(0,255,65,0.1)'
            }}
          >
            <div className="absolute right-[15%] top-1/2 -translate-y-1/2 text-cyber-lime/10 font-mono text-[10vw] font-bold select-none rotate-90 opacity-10 whitespace-nowrap">L-01</div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[30%] h-[120%] bg-gradient-to-l from-cyber-lime/10 to-transparent" />
            {/* Tech details */}
            <div className="absolute left-[10%] top-[10%] w-[100px] h-2 border-b border-l border-white/20" />
            <div className="absolute left-[10%] bottom-[10%] w-[100px] h-2 border-t border-l border-white/20" />
          </motion.div>

          {/* RIGHT DOOR */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: phase === 'doors' ? '100%' : 0 }}
            transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute right-0 top-0 w-[55vw] h-full bg-[#08080A] shadow-2xl z-30 overflow-hidden"
            style={{ 
              clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 18% 100%, 0 50%)',
              borderLeft: '1px solid rgba(0,180,255,0.1)'
            }}
          >
            <div className="absolute left-[15%] top-1/2 -translate-y-1/2 text-electric-blue/10 font-mono text-[10vw] font-bold select-none -rotate-90 opacity-10 whitespace-nowrap">R-02</div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-[120%] bg-gradient-to-r from-electric-blue/10 to-transparent" />
            {/* Tech details */}
            <div className="absolute right-[10%] top-[10%] w-[100px] h-2 border-b border-r border-white/20" />
            <div className="absolute right-[10%] bottom-[10%] w-[100px] h-2 border-t border-r border-white/20" />
          </motion.div>

          {/* CENTER INTERFACE (z-50) */}
          <AnimatePresence mode="wait">
            {(phase === 'idle' || phase === 'unlocking' || phase === 'boot' || phase === 'welcome') && (
              <motion.div
                key="interface"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                transition={{ duration: 0.5 }}
                className="relative z-50 flex flex-col items-center justify-center p-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] min-w-[350px] min-h-[250px]"
              >
                { (phase === 'idle' || phase === 'unlocking') && (
                  <motion.button
                    onClick={initializeSequence}
                    whileHover={{ scale: phase === 'idle' ? 1.05 : 1 }}
                    whileTap={{ scale: phase === 'idle' ? 0.95 : 1 }}
                    className="flex flex-col items-center gap-4 text-cyber-lime font-mono group w-full h-full justify-center relative cursor-pointer"
                  >
                    <div className="relative w-28 h-28 flex items-center justify-center mb-2">
                      {/* Scanning ring effect */}
                      {phase === 'idle' && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                          className="absolute inset-0 rounded-full border-2 border-dashed border-cyber-lime/30 opacity-80"
                        />
                      )}
                      
                      {/* Inner glowing circle */}
                      <div className={`w-20 h-20 rounded-full border flex items-center justify-center transition-all duration-300 z-10 
                        ${phase === 'idle' 
                          ? 'border-cyber-lime/50 bg-cyber-lime/5 group-hover:bg-cyber-lime/20 shadow-[0_0_15px_rgba(0,255,65,0.2)] group-hover:shadow-[0_0_25px_rgba(0,255,65,0.5)]' 
                          : 'border-white bg-white/20 shadow-[0_0_30px_rgba(255,255,255,0.6)] scale-110'}`}
                      >
                        {phase === 'idle' ? (
                          <Lock size={32} className="group-hover:scale-110 transition-transform" />
                        ) : (
                          <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            <Unlock size={38} className="text-white" />
                          </motion.div>
                        )}
                      </div>
                    </div>

                    <span className={`text-xl tracking-widest font-bold transition-colors duration-300 block 
                      ${phase === 'unlocking' ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]'}`}
                    >
                      {phase === 'idle' ? 'TAP TO INITIALIZE' : 'ACCESS GRANTED...'}
                    </span>
                    <span className="text-xs text-gray-400 tracking-wider">
                      {phase === 'idle' ? 'SYSTEM LOCKED' : 'DISENGAGING SECURITY...'}
                    </span>
                  </motion.button>
                )}

                { phase === 'boot' && (
                  <div className="w-full h-full flex flex-col items-start gap-2 font-mono text-sm max-w-[300px]">
                    <div className="flex items-center gap-2 text-electric-blue mb-4">
                      <Terminal size={18} />
                      <span className="tracking-widest">SYSTEM.BOOT()</span>
                    </div>
                    {terminalLines.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={i === terminalLines.length - 1 && line === "ACCESS GRANTED." ? "text-cyber-lime font-bold mt-4 animate-pulse" : "text-gray-300"}
                      >
                        <span className="text-electric-blue/50 mr-2">{'>'}</span> {line}
                      </motion.div>
                    ))}
                    <motion.div
                      animate={{ opacity: [1, 0] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-3 h-4 bg-cyber-lime mt-1"
                    />
                  </div>
                )}

                { phase === 'welcome' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center gap-4 py-4"
                  >
                    <Cpu size={48} className="text-cyber-lime mb-2" style={{ filter: 'drop-shadow(0 0 15px rgba(0,255,65,0.6))' }} />
                    <h2 className="text-3xl md:text-4xl font-mono font-bold text-white tracking-tight leading-tight">
                      Welcome to <br />
                      <span className="text-cyber-lime drop-shadow-[0_0_10px_rgba(0,255,65,0.6)]">Akhilesh's</span>
                      <br />
                      <span className="text-electric-blue drop-shadow-[0_0_10px_rgba(0,180,255,0.6)]">Portfolio</span>
                    </h2>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent my-2" />
                    <span className="text-xs font-mono text-cyber-lime tracking-widest">[ SECURITY CLEARED ]</span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* MUTE BUTTON */}
          <button
            onClick={() => setMuted(!muted)}
            className="absolute bottom-5 left-5 z-[210] w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-cyber-lime hover:border-cyber-lime/30 transition-all duration-300"
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* SCANLINE OVERLAY */}
          <div className="absolute inset-0 pointer-events-none z-[100] opacity-[0.03]" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
          }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
