import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { profileData } from '../data/profile';

export const HangingLanyard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Raw mouse coordinates relative to card center (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // High-inertia physical spring physics
  const springConfig = { damping: 20, stiffness: 120, mass: 1.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Derived 3D transform values
  const rotateX = useTransform(smoothY, [-1, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [-1, 1], [-12, 12]);
  const rotateZ = useTransform(smoothX, [-1, 1], [-4, 4]);
  const translateX = useTransform(smoothX, [-1, 1], [-14, 14]);
  const glareOpacity = useTransform(smoothY, [-1, 0, 1], [0.35, 0.15, 0.45]);
  const glarePosition = useTransform(smoothX, [-1, 1], ['-20%', '120%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(Math.max(-1, Math.min(1, x)));
    mouseY.set(Math.max(-1, Math.min(1, y)));
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col items-center justify-start h-[480px] sm:h-[540px] md:h-[580px] w-full max-w-sm mx-auto select-none"
      style={{ perspective: 1200 }}
    >
      {/* Hanging Lanyard Strap from Top */}
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={!isMobile ? { x: translateX, rotateZ } : undefined}
        className="relative flex flex-col items-center z-10 origin-top"
      >
        {/* Top Ceiling Anchor Clip */}
        <div className="w-8 h-3 bg-[#1e1e24] rounded-b-md border-b border-x border-neutral-700 shadow-md" />

        {/* Woven Fabric Strap with Technical Text */}
        <div className="w-5 sm:w-6 h-28 sm:h-36 bg-[#0e0e12] border-x border-neutral-800 shadow-inner flex flex-col items-center justify-around py-2 overflow-hidden">
          <span className="font-mono text-[8px] sm:text-[9px] text-neutral-500 font-bold uppercase tracking-widest rotate-90 whitespace-nowrap">
            3D CARD
          </span>
          <span className="font-mono text-[7px] text-neutral-600 font-semibold uppercase tracking-wider rotate-90 whitespace-nowrap">
            ARC
          </span>
          <span className="font-mono text-[8px] sm:text-[9px] text-neutral-500 font-bold uppercase tracking-widest rotate-90 whitespace-nowrap">
            3D CARD
          </span>
        </div>

        {/* Metallic Lobster Clasp / Clip Assembly */}
        <div className="flex flex-col items-center -mt-1 z-20">
          {/* Metal Swivel Ring */}
          <div className="w-4 h-4 rounded-full border-2 border-neutral-400 bg-neutral-800 shadow-sm" />
          {/* Metal Spring Hook */}
          <div className="w-2.5 h-6 bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-400 rounded-sm -mt-1 shadow-md" />
        </div>
      </motion.div>

      {/* Hanging ID Card Badge */}
      <motion.div
        initial={{ y: -160, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{
          duration: 1.3,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.25,
        }}
        style={
          !isMobile
            ? {
                x: translateX,
                rotateX,
                rotateY,
                rotateZ,
                transformStyle: 'preserve-3d',
              }
            : undefined
        }
        className={`relative -mt-2 z-20 w-[240px] sm:w-[270px] md:w-[290px] h-[340px] sm:h-[380px] md:h-[400px] origin-top transition-shadow duration-500 ${
          isMobile ? 'animate-float-slow' : ''
        }`}
      >
        {/* Physical Badge Body */}
        <div
          className={`w-full h-full rounded-[24px] bg-[#f4f4f5] p-3.5 sm:p-4 shadow-2xl flex flex-col relative overflow-hidden transition-all duration-300 ${
            isHovered
              ? 'shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.15)]'
              : 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.85)]'
          }`}
          style={{
            border: '2px solid rgba(255, 255, 255, 0.85)',
          }}
        >
          {/* Top Hole Punch for Lanyard Clip */}
          <div className="w-10 h-2.5 bg-[#050505] rounded-full mx-auto mb-2.5 shadow-inner border border-neutral-300/40" />

          {/* Photo Frame with Monochrome Studio Portrait */}
          <div className="relative flex-1 w-full rounded-[16px] overflow-hidden bg-neutral-900 border border-neutral-300">
            <img
              src={profileData.assets.portrait}
              alt={profileData.assets.portraitAlt}
              className="w-full h-full object-cover grayscale contrast-125 brightness-95"
              loading="eager"
            />

            {/* Subtle Vignette on Photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Card Badge Watermark / Header */}
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span className="font-mono text-[9px] text-white/90 uppercase tracking-widest font-semibold bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                VERIFIED ID
              </span>
              <span className="font-mono text-[9px] text-neutral-300 font-bold tracking-wider bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                2026
              </span>
            </div>
          </div>

          {/* Dynamic Light Sheen / Specular Glare */}
          <motion.div
            style={{
              opacity: glareOpacity,
              left: glarePosition,
            }}
            className="absolute inset-0 w-[160%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-25 pointer-events-none"
          />
        </div>

        {/* Realistic Card Drop Shadow on Background */}
        <div className="absolute -bottom-8 left-6 right-6 h-6 bg-black/60 blur-xl rounded-full pointer-events-none" />
      </motion.div>
    </div>
  );
};
