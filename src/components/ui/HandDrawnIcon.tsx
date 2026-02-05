'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface HandDrawnIconProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'filled' | 'outline';
  className?: string;
  animate?: boolean;
}

/**
 * 草绿色手绘风格图标组件
 * 特点：不规则圆角、虚线边框、轻微倾斜 - 去AI味儿设计
 */
export default function HandDrawnIcon({
  icon: Icon,
  size = 'md',
  variant = 'default',
  className = '',
  animate = true,
}: HandDrawnIconProps) {
  const sizeConfig = {
    sm: {
      container: 'w-8 h-8',
      icon: 'w-4 h-4',
    },
    md: {
      container: 'w-10 h-10',
      icon: 'w-5 h-5',
    },
    lg: {
      container: 'w-12 h-12',
      icon: 'w-6 h-6',
    },
    xl: {
      container: 'w-16 h-16',
      icon: 'w-8 h-8',
    },
  };

  const config = sizeConfig[size];

  // 随机化一些值来增加手绘感（但保持一致性用固定种子）
  const rotations = [-3, -2, -1, 1, 2, 3];
  const randomRotation = rotations[Math.floor(Icon.displayName?.length || 0) % rotations.length];

  // 不规则圆角变体 - 更多有机感
  const borderRadiusVariants = [
    'rounded-[40%_60%_55%_45%/55%_45%_60%_40%]',
    'rounded-[45%_55%_60%_40%/60%_40%_55%_45%]',
    'rounded-[55%_45%_50%_50%/50%_50%_45%_55%]',
    'rounded-[50%_50%_55%_45%/45%_55%_50%_50%]',
  ];
  const borderRadius = borderRadiusVariants[(Icon.displayName?.length || 0) % borderRadiusVariants.length];

  const variantStyles = {
    default: `
      border-2 border-dashed border-[#4ADE80]
      bg-transparent
      hover:border-[#86EFAC] hover:bg-[#4ADE80]/5
    `,
    filled: `
      border-2 border-[#4ADE80]/30
      bg-[#4ADE80]/10
      hover:bg-[#4ADE80]/20
    `,
    outline: `
      border border-[#4ADE80]/50
      bg-transparent
      hover:border-[#86EFAC]
    `,
  };

  return (
    <motion.div
      className={`
        relative ${config.container} ${borderRadius}
        ${variantStyles[variant]}
        flex items-center justify-center
        transition-all duration-300
        ${className}
      `}
      style={{ transform: `rotate(${randomRotation}deg)` }}
      whileHover={animate ? { scale: 1.1, rotate: randomRotation + 2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {/* 图标 */}
      <Icon 
        className={`${config.icon} text-[#4ADE80]`}
        strokeWidth={1.5}
        style={{ transform: `rotate(${-randomRotation}deg)` }} // 反向旋转使图标正
      />
    </motion.div>
  );
}

/**
 * 内联手绘图标 - 用于文本中
 */
export function InlineHandDrawnIcon({
  icon: Icon,
  className = '',
}: {
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center justify-center ${className}`}>
      <Icon 
        className="w-5 h-5 text-[#4ADE80]"
        strokeWidth={1.5}
        style={{ transform: 'rotate(-2deg)' }}
      />
    </span>
  );
}
