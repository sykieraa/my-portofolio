import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, ShieldCheck, ZoomIn, ZoomOut } from 'lucide-react';
import type { CertificateItem } from '../data/certificates';
import { easeSmooth } from '../utils/animationVariants';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    setIsZoomed(false);
  }, [certificate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
    };

    if (certificate) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [certificate, onClose, isZoomed]);

  const isPdf = certificate?.image.toLowerCase().endsWith('.pdf');

  return (
    <>
      <AnimatePresence>
        {certificate && (
          <motion.div
            key="certificate-modal-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: easeSmooth }}
            className="relative z-10 w-full max-w-[90vw] max-h-[90vh] rounded-[32px] bg-[#0d0d11] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden text-white flex flex-col"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/[0.08] flex-shrink-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest font-semibold">
                  Official Credential Verification
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/[0.08] hover:bg-white/20 border border-white/15 text-neutral-300 hover:text-white transition-all"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto flex flex-col px-6 sm:px-8 py-6">
              {/* Certificate Image Frame */}
              <div className="rounded-xl overflow-hidden bg-white shadow-2xl border border-white/20 mb-6 flex items-center justify-center">
                {isPdf ? (
                  <iframe
                    src={certificate.image}
                    title={certificate.title}
                    className="w-full h-[75vh] rounded-lg"
                  />
                ) : (
                  <div
                    onClick={() => {
                      if (isDesktop) setIsZoomed(true);
                    }}
                    className={`w-full flex items-center justify-center min-h-[75vh] bg-white relative group select-none ${
                      isDesktop ? 'cursor-zoom-in' : ''
                    }`}
                    title={isDesktop ? 'Click to zoom in' : undefined}
                  >
                    <img
                      src={certificate.image}
                      alt={certificate.title}
                      className={`w-full h-auto max-h-[75vh] object-contain transition-transform duration-300 ${
                        isDesktop ? 'group-hover:scale-[1.01]' : ''
                      }`}
                    />

                    {/* Desktop Hover Hint */}
                    {isDesktop && (
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none flex items-center gap-1.5 bg-black/75 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-mono shadow-lg border border-white/10">
                        <ZoomIn className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Click to zoom</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

            {/* Certificate Metadata */}
            <div className="flex flex-col gap-4 pt-4 border-t border-white/[0.08]">
              <div className="space-y-1">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                  {certificate.title}
                </h3>
                <p className="font-mono text-xs text-neutral-400">
                  Issued by <span className="text-white font-medium">{certificate.issuer}</span> • {certificate.date}
                </p>
                <p className="font-mono text-[11px] text-neutral-500">
                  Credential ID: <span className="text-neutral-300">{certificate.credentialId || 'N/A'}</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
                <a
                  href={certificate.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all shadow-md"
                >
                  <span>View Full Asset</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
    </AnimatePresence>

      {/* Lightbox Fullscreen View (Desktop Only) */}
      <AnimatePresence>
        {isZoomed && isDesktop && !isPdf && certificate && (
          <motion.div
            key="certificate-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out select-none"
          >
            {/* Top Bar Hint & Close Button */}
            <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
              <span className="hidden sm:inline-flex text-xs font-mono text-white/70 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
                Click image or ESC to zoom out
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(false);
                }}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all shadow-xl hover:scale-105 active:scale-95"
                aria-label="Zoom out certificate"
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Fullscreen Expanded Certificate Image */}
            <motion.img
              src={certificate.image}
              alt={certificate.title}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: easeSmooth }}
              className="max-w-[96vw] max-h-[92vh] object-contain rounded-xl shadow-2xl border border-white/10"
              onClick={() => setIsZoomed(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
