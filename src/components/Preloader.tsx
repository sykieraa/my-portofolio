import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Code2 } from 'lucide-react';
import { profileData } from '../data/profile';
import { easeSmooth } from '../utils/animationVariants';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Staggered timeline steps
    const timer1 = setTimeout(() => setStep(1), 300); // 3 circles
    const timer2 = setTimeout(() => setStep(2), 700); // Welcome to my (from left)
    const timer3 = setTimeout(() => setStep(3), 1100); // Portfolio Website (slide up)
    const timer4 = setTimeout(() => setStep(4), 1500); // Domain url (slide down)
    const timer5 = setTimeout(() => setStep(5), 2600); // Exit animation starts
    const timer6 = setTimeout(() => onComplete(), 3400); // Fully finished

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {step < 5 && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -40,
            transition: { duration: 0.9, ease: easeSmooth },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white select-none px-4"
        >
          {/* Subtle Technical Grid in Background */}
          <div className="absolute inset-0 bg-tech-grid opacity-25 pointer-events-none" />

          {/* Central Composition Container */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-lg space-y-6">
            
            {/* Step 1: Three Small Circular Icons/Buttons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Terminal, delay: 0 },
                { icon: Code2, delay: 0.1 },
                { icon: Sparkles, delay: 0.2 },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={step >= 1 ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: item.delay,
                    ease: easeSmooth,
                  }}
                  className="w-10 h-10 rounded-full bg-[#111115] border border-white/10 flex items-center justify-center text-neutral-400 shadow-lg shadow-black/50"
                >
                  <item.icon className="w-4 h-4 text-neutral-300" />
                </motion.div>
              ))}
            </div>

            {/* Step 2: "Welcome to my" (Slide in from Left) */}
            <div className="overflow-hidden">
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                animate={step >= 2 ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.85, ease: easeSmooth }}
                className="font-mono text-sm sm:text-base tracking-[0.25em] text-neutral-400 uppercase"
              >
                Welcome to my
              </motion.p>
            </div>

            {/* Step 3: "Portfolio Website" (Slide UP) */}
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ opacity: 0, y: 45 }}
                animate={step >= 3 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.95, ease: easeSmooth }}
                className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-white"
              >
                Portfolio Website
              </motion.h1>
            </div>

            {/* Step 4: URL / Domain (Slide DOWN) */}
            <div className="overflow-hidden pt-2">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={step >= 4 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.85, ease: easeSmooth }}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.07]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-neutral-400 tracking-wider">
                  {profileData.brand}
                </span>
              </motion.div>
            </div>

          </div>

          {/* Minimal Bottom Loading Bar Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={step >= 1 ? { scaleX: 1 } : {}}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-12 w-32 h-[1.5px] bg-gradient-to-r from-transparent via-neutral-500 to-transparent origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
