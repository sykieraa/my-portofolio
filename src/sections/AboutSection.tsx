import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowUpRight } from 'lucide-react';
import { profileData } from '../data/profile';
import { easeSmooth } from '../utils/animationVariants';

export const AboutSection: React.FC = () => {
  const handleScrollToPortfolio = () => {
    const portSec = document.getElementById('portfolio');
    if (portSec) {
      portSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Background Grid and Highlights - Now Global in App.tsx */}

      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-16">
        
        {/* Main Grid: Left (Typography & Content) / Right (Circular Portrait) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Col 7): Name, Bio, Quote, CTA Buttons */}
          <div className="lg:col-span-7 flex flex-col space-y-6 order-2 lg:order-1">
            
            {/* Label: ABOUT ME */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: easeSmooth }}
              className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold"
            >
              ABOUT ME
            </motion.span>

            {/* Display Name (3 stacked lines: Rifqi / Muhammad / Aliya) */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: 0.12, ease: easeSmooth }}
              className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]"
            >
              <div>{profileData.name.first}</div>
              <div>{profileData.name.middle}</div>
              <div>{profileData.name.last}</div>
            </motion.div>

            {/* Bio Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: 0.24, ease: easeSmooth }}
              className="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl"
            >
              {profileData.bio.about}
            </motion.p>

            {/* Quote Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: 0.32, ease: easeSmooth }}
              className="p-4 sm:p-5 rounded-2xl bg-[#0e0e12] border border-white/[0.08] max-w-xl"
            >
              <p className="font-sans text-xs sm:text-sm italic text-neutral-300">
                "{profileData.bio.quote}"
              </p>
            </motion.div>

            {/* Action Buttons: [Download CV] & [View Projects ↗] */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, delay: 0.36, ease: easeSmooth }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href={profileData.assets.cvFile}
                download={`${profileData.name.full}-CV.pdf`}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all duration-300 shadow-lg shadow-white/10"
              >
                <FileText className="w-4 h-4" />
                <span>Download CV</span>
              </a>

              <button
                onClick={handleScrollToPortfolio}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#121217] hover:bg-[#1a1a22] border border-white/15 text-white font-medium text-xs sm:text-sm transition-all duration-300 group"
              >
                <span>View Projects</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </motion.div>

          </div>

          {/* Right Column (Col 5): Large Circular Portrait with Ambient Light */}
          <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.1, delay: 0.2, ease: easeSmooth }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-2.5 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-[0_0_80px_rgba(255,255,255,0.06)]"
            >
              {/* Inner Circular Photo */}
              <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900 border border-white/20 relative">
                <img
                  src={profileData.assets.about}
                  alt={profileData.assets.portraitAlt}
                  className="w-full h-full object-cover grayscale contrast-125 brightness-95 hover:scale-105 transition-transform duration-700"
                  style={{ objectPosition: 'center 40%' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
