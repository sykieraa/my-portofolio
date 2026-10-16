import React from 'react';
import { motion } from 'framer-motion';
import type { CertificateItem } from '../data/certificates';
import { easeSmooth } from '../utils/animationVariants';

interface CertificateCardProps {
  certificate: CertificateItem;
  isCenter: boolean;
  onSelect: (certificate: CertificateItem) => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  isCenter,
  onSelect,
}) => {
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Only open lightbox on desktop/medium screens and up
    if (window.innerWidth > 768) {
      onSelect(certificate);
    }
  };

  return (
    <motion.div
      animate={{
        scale: isCenter ? 1.04 : 0.94,
        opacity: isCenter ? 1 : 0.6,
      }}
      transition={{ duration: 0.5, ease: easeSmooth }}
      role="group"
      className={`group relative w-[300px] sm:w-[340px] md:w-[380px] flex-shrink-0 rounded-[28px] overflow-hidden transition-all duration-500 flex flex-col justify-between ${
        isCenter
          ? 'bg-[#0e0e12] border border-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.06)] ring-1 ring-white/10'
          : 'bg-[#0a0a0d] border border-white/[0.07] shadow-xl hover:border-white/15'
      }`}
    >
      {/* Top Certificate Document Preview */}
      <div className="p-4 pb-0">
        <div
          className="relative aspect-[1.42/1] w-full rounded-[18px] overflow-hidden bg-white p-2 shadow-inner cursor-pointer md:hover:scale-[1.02] transition-transform duration-500"
          onClick={handleImageClick}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleImageClick(e as unknown as React.MouseEvent);
            }
          }}
        >
          <img
            src={certificate.image}
            alt={certificate.title}
            className="w-full h-full object-contain pointer-events-none"
            loading="lazy"
          />
        </div>
      </div>

      {/* Certificate Meta Details */}
      <div className="p-5 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5 text-center">
          <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-wide uppercase line-clamp-2 leading-snug">
            {certificate.title}
          </h3>
          <p className="font-mono text-[11px] text-neutral-400">
            {certificate.issuer} • {certificate.date}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
