import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navigationData, type NavItem } from '../data/navigation';
import { profileData } from '../data/profile';
import { easeSmooth } from '../utils/animationVariants';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-5 left-0 right-0 z-40 flex justify-center px-4 sm:px-6 pointer-events-none">
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: easeSmooth }}
          className={`pointer-events-auto w-full max-w-5xl h-14 sm:h-16 rounded-2xl sm:rounded-full px-5 sm:px-8 flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'bg-[#0b0b0e]/90 backdrop-blur-xl border border-white/12 shadow-2xl shadow-black/80'
              : 'bg-[#0f0f13]/70 backdrop-blur-lg border border-white/[0.08] shadow-lg shadow-black/40'
          }`}
        >
          {/* Left Brand / Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2 group"
          >
            <span className="font-mono text-sm sm:text-base font-semibold text-neutral-300 group-hover:text-white transition-colors duration-300">
              {profileData.brand}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            {navigationData.map((item: NavItem) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative px-4 py-2 font-mono text-xs sm:text-[13px] tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-white font-medium' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {item.label}

                  {/* Active Indicator Underline */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-1 left-4 right-4 h-[2px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white rounded-lg bg-white/[0.04] border border-white/[0.08] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-black/85 backdrop-blur-xl md:hidden flex flex-col justify-center px-8"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col space-y-6"
            >
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                Navigation
              </span>
              {navigationData.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    className="flex items-center justify-between text-left group py-2"
                  >
                    <span
                      className={`font-display text-2xl font-semibold tracking-wide transition-colors ${
                        isActive ? 'text-white' : 'text-neutral-400 group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                    <ArrowUpRight
                      className={`w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${
                        isActive ? 'text-white' : 'text-neutral-600'
                      }`}
                    />
                  </button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
