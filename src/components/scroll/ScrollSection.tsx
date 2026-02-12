'use client';

import { useRef, useState, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollSectionProps {
  children: ReactNode;
  className?: string;
  isFirst?: boolean;  // 是否是第一个区块（Hero）
  isLast?: boolean;   // 是否是最后一个区块
}

/**
 * 滚动区块包装组件
 * 实现区块之间的淡入淡出过渡效果
 * - 当区块从下往上进入视口时，逐渐淡入
 * - 当区块向上滚出视口时，逐渐淡出
 */
export default function ScrollSection({ 
  children, 
  className = '', 
  isFirst = false,
  isLast = false 
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: mounted ? sectionRef : undefined,
    offset: ['start end', 'end start'],
  });
  
  // 淡入淡出效果 - 调整关键帧位置使效果更明显
  // 关键帧说明：
  // 0: 区块完全在视口下方
  // 0.2: 区块刚进入视口底部边缘
  // 0.4: 区块进入视口中部，完全可见
  // 0.6: 区块中心开始接近视口顶部
  // 0.8: 区块大部分已离开视口顶部
  // 1: 区块完全离开视口上方
  
  // 第一个区块不需要淡入效果，最后一个区块不需要淡出效果
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    [
      isFirst ? 1 : 0,      // 起始完全透明
      isFirst ? 1 : 0.3,    // 开始淡入
      1,                     // 完全可见
      1,                     // 保持可见
      isLast ? 1 : 0.3,     // 开始淡出
      isLast ? 1 : 0        // 完全透明
    ]
  );
  
  // 从下往上移动进入，向上移出 - 增大位移距离
  const y = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.4, 0.6, 0.8, 1], 
    [
      isFirst ? 0 : 150,    // 起始位置更远
      isFirst ? 0 : 60,     // 开始移动
      0,                     // 到达位置
      0,                     // 保持位置
      isLast ? 0 : -60,     // 开始向上移出
      isLast ? 0 : -120     // 完全移出
    ]
  );
  
  // 缩放效果增强 - 增大缩放幅度
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [
      isFirst ? 1 : 0.85,   // 起始缩放更小
      isFirst ? 1 : 0.95,   // 开始放大
      1,                     // 正常大小
      1,                     // 保持大小
      isLast ? 1 : 0.95,    // 开始缩小
      isLast ? 1 : 0.85     // 缩小更明显
    ]
  );

  return (
    <section 
      ref={sectionRef} 
      className={`relative overflow-hidden bg-[#050505] ${className}`}
    >
      <motion.div 
        style={{ opacity, y, scale }}
        className="relative z-10 w-full h-full origin-center will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  );
}

/**
 * 页面包装组件
 * 为整个页面提供统一的背景和样式
 */
interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <main className={`relative bg-[#050505] ${className}`}>
      {/* 全局背景 */}
      <div className="fixed inset-0 bg-[#050505] -z-10" />
      {children}
    </main>
  );
}
