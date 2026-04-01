import React, { useState, useEffect } from 'react';
import { Terminal, Menu, X, Home, Code, FlaskConical, Cpu, Trophy, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: "Home", href: "#home", icon: <Home className="w-4 h-4" /> },
  { label: "Projects", href: "#projects", icon: <Code className="w-4 h-4" /> },
  { label: "Research", href: "#experience", icon: <FlaskConical className="w-4 h-4" /> },
  { label: "Skills", href: "#skills", icon: <Cpu className="w-4 h-4" /> },
  { label: "Milestones", href: "#achievements", icon: <Trophy className="w-4 h-4" /> },
  { label: "Contact", href: "#contact", icon: <Mail className="w-4 h-4" /> },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      
      // Track active section
      const sections = navLinks.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection('#' + sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop: Right-side vertical navbar */}
      <motion.nav
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-1 py-4 px-2 rounded-2xl border transition-all duration-500
          ${scrolled
            ? 'bg-obsidian/80 backdrop-blur-xl border-white/10 shadow-[0_0_40px_rgba(0,255,65,0.06)]'
            : 'bg-obsidian/40 backdrop-blur-md border-white/5'}
        `}
      >
        {/* Logo */}
        <a href="#home" className="flex items-center justify-center mb-3 pb-3 border-b border-white/10 w-full group">
          <Terminal className="w-5 h-5 text-cyber-lime group-hover:animate-pulse" />
        </a>

        {navLinks.map((link, idx) => {
          const isActive = activeSection === link.href;
          return (
            <a
              key={link.label}
              href={link.href}
              className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 group
                ${isActive
                  ? 'bg-cyber-lime/15 text-cyber-lime shadow-[0_0_12px_rgba(0,255,65,0.15)]'
                  : 'text-gray-500 hover:text-cyber-lime hover:bg-white/5'}
              `}
            >
              {/* Active indicator bar */}
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -right-2 w-0.5 h-5 bg-cyber-lime rounded-full shadow-[0_0_8px_rgba(0,255,65,0.6)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              {link.icon}

              {/* Tooltip */}
              <span className="absolute right-14 px-3 py-1.5 text-xs font-mono text-white bg-obsidian/90 backdrop-blur-md border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap shadow-xl translate-x-2 group-hover:translate-x-0">
                {link.label}
                <span className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-obsidian/90 border-r border-t border-white/10 rotate-45" />
              </span>
            </a>
          );
        })}
      </motion.nav>

      {/* Mobile: Floating bottom-right hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed bottom-6 right-6 z-50 md:hidden w-12 h-12 rounded-full bg-obsidian/80 backdrop-blur-xl border border-cyber-lime/30 flex items-center justify-center text-cyber-lime shadow-[0_0_20px_rgba(0,255,65,0.15)] active:scale-95 transition-transform"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile: Full-screen overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden bg-dark-charcoal/95 backdrop-blur-xl flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center gap-4"
            >
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15 + idx * 0.05 }}
                  className="flex items-center gap-3 text-lg font-mono text-gray-400 hover:text-cyber-lime transition-colors py-2"
                >
                  <span className="text-cyber-lime">{link.icon}</span>
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
