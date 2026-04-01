import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const Portal = ({ position, isOpen, origin }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
      className={`fixed w-16 h-28 bg-electric-blue border-2 border-white rounded-[100%] z-[95] shadow-[0_0_30px_rgba(0,180,255,0.8)] flex items-center justify-center overflow-hidden`}
      style={{ ...position, transformOrigin: origin }}
    >
      {/* Inner portal swirl */}
      <div className="absolute inset-1 bg-obsidian rounded-[100%] overflow-hidden">
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(0,180,255,0.5),transparent)] animate-[spin_2s_linear_infinite]" />
        <div className="absolute inset-2 bg-black rounded-[100%] shadow-[inset_0_0_20px_rgba(0,180,255,1)]" />
      </div>
    </motion.div>
  );
};

const CyberPenguin = () => {
  const controls = useAnimation();
  const [activePortal, setActivePortal] = useState(null);
  const [isWaddling, setIsWaddling] = useState(false);
  const [sequenceActive, setSequenceActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);
  const mutedRef = useRef(isMuted);

  useEffect(() => { mutedRef.current = isMuted; }, [isMuted]);

  const playSqueak = useCallback(() => {
    if (mutedRef.current) return;
    try {
      if (!audioCtxRef.current) {
         audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.08);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) { }
  }, []);

  useEffect(() => {
    if (!sequenceActive) return;

    let isMounted = true;

    // Trigger audio ctx
    playSqueak();

    const runSequence = async () => {
      // Small initial delay
      await new Promise(r => setTimeout(r, 2000));
      if (!isMounted) return;

      // 1. Initialize Penguin off-screen at bottom right
      await controls.set({ right: '-100px', bottom: '20px', x: 0, y: 0, opacity: 0, scale: 0.2 });

      // 2. Open Bottom Right Portal
      setActivePortal('br');
      await new Promise(r => setTimeout(r, 600));
      if (!isMounted) return;

      // 3. Emerge & Start Waddle Left
      playSqueak();
      setIsWaddling(true);
      await controls.start({
        right: '80px',
        opacity: 1,
        scale: 0.6, // Smaller penguin
        transition: { duration: 1.5, ease: "easeOut" }
      });
      setActivePortal(null); // Close BR Portal

      // 4. Walk across to Bottom Left
      await new Promise(r => setTimeout(r, 300));
      if (!isMounted) return;
      await controls.start({
        right: 'calc(100vw - 120px)',
        transition: { duration: 12, ease: "linear" }
      });
      setIsWaddling(false);

      // 5. Open Bottom Left Portal
      setActivePortal('bl');
      await new Promise(r => setTimeout(r, 600));
      if (!isMounted) return;

      // 6. Enter BL Portal
      playSqueak();
      setIsWaddling(true);
      await controls.start({
        right: 'calc(100vw + 50px)',
        opacity: 0,
        scale: 0.1,
        transition: { duration: 1.2, ease: "easeIn" }
      });
      setIsWaddling(false);
      setActivePortal(null); // Close BL Portal
      
      // End of sequence, allow triggering again
      if (isMounted) setSequenceActive(false);
    };

    runSequence();

    return () => { isMounted = false; };
  }, [controls, sequenceActive]);

  return (
    <>
      {/* Trigger Button & Mute Toggle */}
      {!sequenceActive && (
        <div className="fixed bottom-4 left-4 z-[100] flex items-center gap-2">
          <button
            onClick={() => setSequenceActive(true)}
            className="px-4 py-2 text-xs font-mono rounded-lg bg-obsidian/90 border border-cyber-lime/40 text-cyber-lime overflow-hidden group hover:border-cyber-lime transition-all backdrop-blur-md shadow-[0_0_15px_rgba(0,255,65,0.2)] relative"
          >
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] animate-[neon-sweep_2.5s_linear_infinite]" />
            <span className="relative z-10 flex items-center gap-2">
              <span>Tap for surprise</span>
            </span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-lg border border-white/20 text-gray-400 hover:text-white bg-obsidian/80 backdrop-blur-md transition-colors w-8 h-8 flex items-center justify-center"
            title="Toggle Penguin Sound"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      )}
      <Portal position={{ bottom: '10px', right: '10px' }} isOpen={activePortal === 'br'} origin="bottom right" />
      <Portal position={{ bottom: '10px', left: '10px' }} isOpen={activePortal === 'bl'} origin="bottom left" />

      <motion.div
        animate={controls}
        className="fixed z-[100] pointer-events-none drop-shadow-[0_0_15px_rgba(0,180,255,0.8)]"
      >
        <motion.div 
          className="relative w-12 h-[60px]"
          animate={isWaddling ? { rotate: [-8, 8, -8], y: [-4, 0, -4] } : { rotate: 0, y: 0 }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
          style={{ transformOrigin: 'bottom center' }}
        >
          {/* Back Flipper (Right side) */}
          <motion.div 
            className="absolute top-[26px] right-[-4px] w-4 h-8 bg-gray-900 rounded-full origin-top"
            animate={isWaddling ? { rotate: [40, 80, 40] } : { rotate: 30 }}
            transition={{ repeat: Infinity, duration: 0.3 }}
          />
          
          {/* Body */}
          <div className="absolute inset-0 bg-black rounded-t-[30px] rounded-b-[20px] shadow-[inset_-5px_0_10px_rgba(255,255,255,0.2)]" />
          
          {/* Belly */}
          <div className="absolute bottom-1 left-2 right-1 top-6 bg-gray-200 rounded-t-[20px] rounded-b-[15px]" />
          
          {/* Beak */}
          <div className="absolute top-[20px] left-[-8px] w-5 h-3 bg-orange-500 rounded-l-full z-10 shadow-sm" />

          {/* Cyber Visor */}
          <div className="absolute top-[10px] left-[-2px] right-3 h-[8px] bg-cyber-lime shadow-[0_0_12px_#00FF41] rounded-full z-10 overflow-hidden">
             <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-white/60 blur-[1px] animate-[ping_2s_infinite]" />
          </div>

          {/* Front Flipper (Left side / "Hand" shaking) */}
          <motion.div 
            className="absolute top-[28px] left-[8px] w-5 h-[34px] bg-[#111] rounded-full origin-top z-20 shadow-[2px_2px_5px_rgba(0,0,0,0.5)] border border-gray-800"
            animate={isWaddling ? { rotate: [-50, 20, -50] } : { rotate: -10 }}
            transition={{ repeat: Infinity, duration: 0.3, ease: "linear" }}
          />

          {/* Feet */}
          <motion.div 
            className="absolute bottom-[-6px] left-0 w-6 h-3 bg-orange-500 rounded-full z-0"
            animate={isWaddling ? { y: [0, -4, 0] } : { y: 0 }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
          />
          <motion.div 
            className="absolute bottom-[-6px] right-[2px] w-6 h-3 bg-orange-600 rounded-full z-0"
            animate={isWaddling ? { y: [0, -4, 0] } : { y: 0 }}
            transition={{ repeat: Infinity, duration: 0.6, delay: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </>
  );
};

export default CyberPenguin;
