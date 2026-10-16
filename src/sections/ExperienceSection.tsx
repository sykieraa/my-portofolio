import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { experienceData, type ExperienceItem } from '../data/experience';
import { easeSmooth } from '../utils/animationVariants';

export const ExperienceSection: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative min-h-screen w-full flex flex-col justify-center py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden"
    >
      {/* Background Grid & Highlights - Now Global in App.tsx */}

      <div className="relative z-10 max-w-5xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: easeSmooth }}
            className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold"
          >
            LEARNING & GROWING
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: easeSmooth }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
          >
            Experience Timeline
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.18, ease: easeSmooth }}
            className="font-sans text-sm sm:text-base text-neutral-400 max-w-lg"
          >
            A track record of shipping fast, elegant, and user-centric software solutions.
          </motion.p>
        </div>

        {/* Timeline List */}
        <div className="space-y-6 pt-4">
          {experienceData.map((exp: ExperienceItem, idx: number) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.9,
                delay: idx * 0.15,
                ease: easeSmooth,
              }}
              className="group p-6 sm:p-8 rounded-[28px] bg-[#0c0c10] border border-white/[0.08] hover:border-white/20 hover:bg-[#101015] transition-all duration-500 shadow-xl"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-white/[0.06]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-blue-400 uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">
                      {exp.type}
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight pt-1">
                    {exp.role}
                  </h3>
                  <p className="font-sans text-sm text-neutral-300 font-medium flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-neutral-400" />
                    <span>{exp.company}</span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-neutral-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      {exp.location}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/[0.06] self-start">
                  <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Description & Key Deliverables */}
              <div className="py-4 space-y-3">
                <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {exp.description}
                </p>

                <ul className="space-y-1.5 pt-1">
                  {exp.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Used */}
              <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-2">
                {exp.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="font-mono text-[11px] text-neutral-400 px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
