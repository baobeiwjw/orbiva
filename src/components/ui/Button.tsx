'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      icon,
      iconPosition = 'right',
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 overflow-hidden';

    const variants = {
      primary:
        'bg-gradient-to-r from-accent to-accent-secondary text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:scale-[1.02]',
      secondary:
        'bg-background-secondary text-foreground border border-border hover:border-accent hover:bg-background-tertiary',
      outline:
        'bg-transparent border border-accent text-accent hover:bg-accent hover:text-white',
      ghost:
        'bg-transparent text-foreground-muted hover:text-foreground hover:bg-background-secondary',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm gap-2',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-3',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: variant === 'primary' ? 1.02 : 1 }}
        whileTap={{ scale: 0.98 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {icon && iconPosition === 'right' && (
          <motion.span
            className="flex-shrink-0"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
