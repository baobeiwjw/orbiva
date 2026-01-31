'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  animate?: boolean;
}

export default function GradientText({
  children,
  className,
  as: Component = 'span',
  animate = false,
}: GradientTextProps) {
  const baseStyles =
    'bg-gradient-to-r from-accent via-accent-secondary to-accent-tertiary bg-clip-text text-transparent';

  if (animate) {
    return (
      <motion.span
        className={cn(baseStyles, 'animate-gradient bg-[length:200%_auto]', className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <Component className={cn(baseStyles, className)}>{children}</Component>
  );
}
