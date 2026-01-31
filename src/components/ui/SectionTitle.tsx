'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import GradientText from './GradientText';

interface SectionTitleProps {
  label?: string;
  title: string;
  highlightedText?: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export default function SectionTitle({
  label,
  title,
  highlightedText,
  description,
  className,
  align = 'center',
}: SectionTitleProps) {
  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div className={cn('max-w-3xl', alignStyles[align], align === 'center' && 'mx-auto', className)}>
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-4 text-sm font-medium tracking-widest text-accent uppercase"
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
      >
        {title}{' '}
        {highlightedText && <GradientText>{highlightedText}</GradientText>}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-foreground-muted"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
