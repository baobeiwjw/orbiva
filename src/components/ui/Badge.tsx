'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent' | 'success' | 'outline';
  icon?: React.ReactNode;
}

export default function Badge({
  children,
  className,
  variant = 'default',
  icon,
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium';

  const variants = {
    default: 'bg-background-tertiary text-foreground-muted border border-border',
    accent: 'bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/20',
    success: 'bg-[#00F5A0]/10 text-[#00F5A0] border border-[#00F5A0]/20',
    outline: 'bg-transparent border border-border text-foreground-muted',
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(baseStyles, variants[variant], className)}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </motion.span>
  );
}
