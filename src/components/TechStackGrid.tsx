import React from 'react';
import { motion } from 'framer-motion';
import { techStackData, type TechItem } from '../data/techStack';
import { easeSmooth } from '../utils/animationVariants';

// Dedicated TechIcon component loading from /assets/icon/ folder with .ico priority
const TechIcon: React.FC<{ tech: TechItem }> = ({ tech }) => {
  const [attempt, setAttempt] = React.useState<number>(0);

  // Priority: .ico first, then .svg, then .png fallback
  const candidates = React.useMemo(
    () => [
      tech.icon || `/assets/icon/${tech.id}.ico`,
      `/assets/icon/${tech.id}.svg`,
      `/assets/icon/${tech.id}.png`,
    ],
    [tech.icon, tech.id]
  );

  if (attempt >= candidates.length) {
    return (
      <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-400 font-mono text-xs font-bold uppercase shadow-inner">
        {tech.name.slice(0, 2)}
      </div>
    );
  }

  return (
    <img
      src={candidates[attempt]}
      alt={`${tech.name} icon`}
      className="w-11 h-11 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110 select-none"
      onError={() => setAttempt((prev) => prev + 1)}
    />
  );
};

export const TechStackGrid: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {techStackData.map((tech: TechItem, idx: number) => (
          <motion.div
            key={tech.id}
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: idx * 0.07,
              ease: easeSmooth,
            }}
            whileHover={{
              y: -6,
              scale: 1.03,
              transition: { duration: 0.35, ease: 'easeOut' },
            }}
            className="group relative flex flex-col items-center justify-center p-6 rounded-[24px] bg-[#0c0c10] border border-white/[0.08] hover:border-white/20 hover:bg-[#111117] transition-colors duration-400 shadow-lg hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.05)] cursor-default"
          >
            {/* Ambient hover glow inside card */}
            <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 bg-gradient-to-b from-white/[0.04] to-transparent transition-opacity duration-500 pointer-events-none" />

            {/* Brand Icon */}
            <div className="h-14 w-14 flex items-center justify-center transition-transform duration-400 group-hover:scale-110">
              <TechIcon tech={tech} />
            </div>

            {/* Technology Name */}
            <span className="font-display text-sm sm:text-base font-semibold text-neutral-200 group-hover:text-white mt-4 transition-colors text-center">
              {tech.name}
            </span>

            {/* Proficiency Tag */}
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mt-1">
              {tech.level}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
