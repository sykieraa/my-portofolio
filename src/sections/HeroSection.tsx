import React from 'react';
import { motion } from 'framer-motion';
import { HangingLanyard } from '../components/HangingLanyard';
import { profileData } from '../data/profile';
import { easeSmooth } from '../utils/animationVariants';

export const HeroSection: React.FC = () => {

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 sm:pt-32 pb-12 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Background Grid dan Highlights sekarang di App.tsx untuk seluruh halaman */}

      {/* Main Two-Column Hero Composition */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center my-auto">
        
        {/* Left Column: Typography Hierarchy & Technical Metadata */}
        <div className="lg:col-span-7 flex flex-col space-y-6 sm:space-y-7 order-2 lg:order-1">
          
          {/* Availability Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: easeSmooth }}
            className="flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span className="font-mono text-xs sm:text-sm text-neutral-400 tracking-widest uppercase font-semibold">
              + {profileData.availability.status}
            </span>
          </motion.div>

          {/* Oversized Display Typography */}
          <div className="flex flex-col tracking-tight select-none">
            {/* "Frontend" (Fade In) */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.3, ease: easeSmooth }}
              className="text-[52px] sm:text-[72px] md:text-[88px] lg:text-[104px] font-extrabold tracking-[-0.06em] leading-[0.92] text-white select-none"
            >
              {profileData.role.primary}
            </motion.h1>

            {/* "Developer" (Slide in from Right) */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.1, delay: 0.55, ease: easeSmooth }}
                className="font-display text-5xl sm:text-7xl md:text-8xl font-black text-neutral-400 leading-none tracking-tight block"
              >
                {profileData.role.secondary}
              </motion.span>
            </div>
          </div>

          {/* Subtitle with Blinking Cursor (Slide in from Left) */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.8, ease: easeSmooth }}
              className="flex items-center gap-1 font-mono text-sm sm:text-base text-neutral-300 font-medium"
            >
              <span>{profileData.role.badge}</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                className="w-2.5 h-0.5 bg-neutral-300 inline-block"
              />
            </motion.div>
          </div>

          {/* Description Paragraph (Slide UP) */}
          <div className="overflow-hidden">
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 1.05, ease: easeSmooth }}
              className="font-sans text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed"
            >
              {profileData.bio.hero}
            </motion.p>
          </div>

          {/* Technology Pills (Staggered Slide UP) */}
          <div className="flex flex-wrap gap-2.5 pt-2">
            {profileData.role.techPills.map((pill, idx) => (
              <motion.div
                key={pill}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.25 + idx * 0.1,
                  ease: easeSmooth,
                }}
                className="px-4 py-1.5 rounded-full bg-[#111116] border border-white/[0.08] hover:border-white/20 transition-colors"
              >
                <span className="font-mono text-xs text-neutral-300 tracking-wide font-medium">
                  {pill}
                </span>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Right Column: Physical Hanging ID Card / Lanyard Object */}
        <div className="lg:col-span-5 flex justify-center items-center mt-6 lg:mt-0 order-1 lg:order-2">
          <HangingLanyard />
        </div>

      </div>


    </section>
  );
};
