import type { Variants, Easing } from 'framer-motion';

export const easeSmooth: Easing = [0.16, 1, 0.3, 1];

export const transitionSmooth = {
  duration: 0.9,
  ease: easeSmooth,
};

export const transitionSlow = {
  duration: 1.1,
  ease: easeSmooth,
};

export const transitionQuick = {
  duration: 0.45,
  ease: easeSmooth,
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitionSmooth,
  },
};

export const slideUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionSmooth,
  },
};

export const slideFromLeftVariant: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitionSmooth,
  },
};

export const slideFromRightVariant: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitionSmooth,
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};
