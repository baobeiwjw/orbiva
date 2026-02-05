'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient-border';
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function Card({
  children,
  className,
  variant = 'default',
  hover = true,
  onClick,
  style,
}: CardProps) {
  const baseStyles = 'rounded-2xl p-6 transition-all duration-300';

  const variants = {
    default: 'bg-background-secondary border border-border',
    glass: 'glass',
    'gradient-border': 'gradient-border',
  };

  const hoverStyles = hover
    ? 'hover:border-[#22D3EE]/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:-translate-y-1'
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      onClick={onClick}
      style={style}
    >
      {children}
    </motion.div>
  );
}
