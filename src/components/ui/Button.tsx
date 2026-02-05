'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { forwardRef, useId } from 'react';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

// 3D绿色按钮SVG背景组件 - Orbiva logo风格（黄绿渐变）
const Button3DSvgBg = ({ id }: { id: string }) => (
  <div className="absolute inset-0 rounded-xl overflow-hidden">
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* 主渐变 - Orbiva绿色风格（从亮黄绿到翠绿） */}
        <linearGradient id={`btn-gradient-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C4F06E" />
          <stop offset="20%" stopColor="#9BE85A" />
          <stop offset="50%" stopColor="#6DD54B" />
          <stop offset="80%" stopColor="#4AC76D" />
          <stop offset="100%" stopColor="#32B86B" />
        </linearGradient>
        
        {/* 横向渐变 - 增加层次感 */}
        <linearGradient id={`btn-gradient-h-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5CD97A" />
          <stop offset="30%" stopColor="#7DE85F" />
          <stop offset="70%" stopColor="#7DE85F" />
          <stop offset="100%" stopColor="#5CD97A" />
        </linearGradient>
        
        {/* 顶部高光渐变 */}
        <linearGradient id={`btn-highlight-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        
        {/* 底部阴影渐变 */}
        <linearGradient id={`btn-shadow-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="60%" stopColor="rgba(0,0,0,0.05)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
        </linearGradient>
      </defs>
      
      {/* 底部阴影层 - 3D立体感 */}
      <rect
        x="0"
        y="2"
        width="100"
        height="100"
        fill="rgba(40,80,50,0.25)"
      />
      
      {/* 主按钮背景 */}
      <rect
        x="0"
        y="0"
        width="100"
        height="98"
        fill={`url(#btn-gradient-${id})`}
      />
      
      {/* 横向渐变叠加 */}
      <rect
        x="0"
        y="0"
        width="100"
        height="98"
        fill={`url(#btn-gradient-h-${id})`}
        opacity="0.3"
      />
      
      {/* 底部深色边缘 - 增强3D感 */}
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill={`url(#btn-shadow-${id})`}
      />
      
      {/* 顶部高光层 - 玻璃质感 */}
      <rect
        x="2"
        y="2"
        width="96"
        height="40"
        fill={`url(#btn-highlight-${id})`}
      />
    </svg>
    
    {/* 顶部边缘高光线 - 使用CSS实现固定圆角 */}
    <div className="absolute top-[2px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    
    {/* 内部光晕边框 */}
    <div className="absolute inset-[2px] rounded-[10px] border border-[rgba(200,245,120,0.3)]" />
    
    {/* 外发光效果 */}
    <div className="absolute inset-0 rounded-xl shadow-[0_1px_4px_rgba(109,213,75,0.4),0_2px_8px_rgba(74,199,109,0.2)]" />
  </div>
);

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
    const uniqueId = useId();
    
    const baseStyles =
      'relative inline-flex items-center justify-center font-medium transition-all duration-300 overflow-visible';

    const variants = {
      primary:
        'text-white hover:brightness-110',
      secondary:
        'text-white hover:brightness-110',
      outline:
        'text-white hover:brightness-110',
      ghost:
        'bg-transparent text-foreground-muted hover:text-foreground hover:bg-background-secondary rounded-full',
    };

    const sizes = {
      sm: 'px-5 py-2 text-sm gap-2 min-w-[100px] h-[36px]',
      md: 'px-6 py-2.5 text-base gap-2 min-w-[130px] h-[42px]',
      lg: 'px-8 py-3 text-lg gap-3 min-w-[160px] h-[48px]',
    };

    // 非 ghost 变体使用SVG背景
    const useSvgBg = variant !== 'ghost';

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.03, y: -2 }}
        whileTap={{ scale: 0.97, y: 1 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {useSvgBg && <Button3DSvgBg id={uniqueId} />}
        {icon && iconPosition === 'left' && (
          <span className="flex-shrink-0 relative z-10">{icon}</span>
        )}
        <span className="relative z-10 font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">{children}</span>
        {icon && iconPosition === 'right' && (
          <motion.span
            className="flex-shrink-0 relative z-10"
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
