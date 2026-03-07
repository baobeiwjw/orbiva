'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  animate?: boolean;
  style?: React.CSSProperties;
}

export default function GradientText({
  children,
  className,
  as: Component = 'span',
  animate = false,
  style,
}: GradientTextProps) {
  const baseStyles =
    'bg-gradient-to-r from-[#00D4FF] via-[#00F5A0] to-[#00F5A0] bg-clip-text text-transparent';

  if (animate) {
    return (
      <motion.span
        className={cn(baseStyles, 'animate-gradient bg-[length:200%_auto]', className)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={style}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <Component className={cn(baseStyles, className)} style={style}>{children}</Component>
  );
}
