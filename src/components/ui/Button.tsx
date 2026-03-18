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
      'relative inline-flex items-center justify-center font-medium transition-all duration-300 overflow-hidden rounded-[400px]';

    const variants = {
      primary:
        'bg-gradient-to-br from-[#00C7CC] via-[#00F686] to-[#00C7CC] text-[#060010] hover:brightness-110',
      secondary:
        'bg-gradient-to-br from-[#00C7CC] via-[#00F686] to-[#00C7CC] text-[#060010] hover:brightness-110',
      outline:
        'bg-gradient-to-br from-[#00C7CC] via-[#00F686] to-[#00C7CC] text-[#060010] hover:brightness-110',
      ghost:
        'bg-transparent text-foreground-muted hover:text-foreground hover:bg-background-secondary rounded-full',
    };

    const sizes = {
      sm: 'px-[30px] py-[10px] text-base gap-2 h-[44px]',
      md: 'px-8 py-3 text-base gap-2 h-[48px]',
      lg: 'px-10 py-4 text-lg gap-3 h-[56px]',
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97, y: 1 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="flex-shrink-0">{icon}</span>
        )}
        <span className="font-extrabold font-['Urbanist']">{children}</span>
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
