import React from 'react';
import { motion } from 'motion/react';

/* Anti-gravity spring — pages lift in and settle, float out upward */
const variants = {
  initial: { opacity: 0, y: 28, scale: 0.985, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0,  scale: 1,     filter: 'blur(0px)' },
  exit:    { opacity: 0, y: -20, scale: 0.99,  filter: 'blur(2px)' },
};

const spring = {
  type: 'spring' as const,
  stiffness: 340,
  damping: 28,
  mass: 0.9,
};

const exitTransition = {
  duration: 0.22,
  ease: [0.4, 0, 1, 1] as [number, number, number, number],
};

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className = '' }: Props) => (
  <motion.div
    variants={variants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{
      opacity:  { duration: 0.4, ease: 'easeOut' },
      y:        spring,
      scale:    spring,
      filter:   { duration: 0.35 },
    }}
    className={`pt-20 ${className}`}
  >
    {children}
  </motion.div>
);
