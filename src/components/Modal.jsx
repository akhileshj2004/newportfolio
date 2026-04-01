import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 28, delay: 0.05 },
  },
  exit: {
    opacity: 0, scale: 0.9, y: 30,
    transition: { duration: 0.2 },
  },
};

const Modal = ({ isOpen, onClose, children, title, accent = 'cyber-lime' }) => {
  if (!isOpen) return null;

  const accentColors = {
    'cyber-lime': { border: 'border-t-[#00FF41]/60', glow: 'shadow-[0_0_40px_rgba(0,255,65,0.08)]', text: 'text-[#00FF41]' },
    'electric-blue': { border: 'border-t-[#00B4FF]/60', glow: 'shadow-[0_0_40px_rgba(0,180,255,0.08)]', text: 'text-[#00B4FF]' },
    'purple': { border: 'border-t-purple-500/60', glow: 'shadow-[0_0_40px_rgba(168,85,247,0.08)]', text: 'text-purple-400' },
  };
  const colors = accentColors[accent] || accentColors['cyber-lime'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#0A0A0F]/95 backdrop-blur-xl border border-white/10 ${colors.border} border-t-2 rounded-2xl ${colors.glow} p-6`}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all z-10"
            >
              <X size={16} />
            </button>

            {/* Decorative top glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-16 bg-[#00FF41]/10 blur-[40px] pointer-events-none rounded-full" />

            {/* Title */}
            {title && (
              <h3 className={`font-mono text-xl font-bold mb-4 pr-8 ${colors.text}`}>
                {title}
              </h3>
            )}

            {/* Content */}
            <div className="relative z-10">
              {children}
            </div>

            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden">
              <div className="w-full h-full" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.015) 2px, rgba(0,255,65,0.015) 4px)',
              }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
