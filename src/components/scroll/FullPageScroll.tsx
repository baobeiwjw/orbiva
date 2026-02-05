'use client';

import { useRef, useEffect, useState, ReactNode, Children, cloneElement, isValidElement } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface FullPageScrollProps {
  children: ReactNode;
  className?: string;
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  isActive?: boolean;
  index?: number;
}

// 动画变体 - 淡入淡出 + 滑动
const sectionVariants = {
  hidden: { 
    opacity: 0, 
    y: 80,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    }
  },
  exit: { 
    opacity: 0, 
    y: -80,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    }
  }
};

// 子元素交错动画
const staggerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    }
  }
};

/**
 * 全屏滚动页面组件
 * 实现类似 CUDIS 的滚动劫持效果
 */
export default function FullPageScroll({ children, className = '' }: FullPageScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const childrenArray = Children.toArray(children);
  const totalSections = childrenArray.length;

  // 处理滚轮事件
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      const delta = e.deltaY;
      const threshold = 30;
      
      if (Math.abs(delta) < threshold) return;
      
      setIsScrolling(true);
      
      if (delta > 0 && currentSection < totalSections - 1) {
        setCurrentSection(prev => prev + 1);
      } else if (delta < 0 && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
      }
      
      setTimeout(() => setIsScrolling(false), 1000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentSection, totalSections, isScrolling]);

  // 处理触摸事件
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.touches[0].clientY);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;
      
      const touchEnd = e.changedTouches[0].clientY;
      const delta = touchStart - touchEnd;
      const threshold = 50;
      
      if (Math.abs(delta) < threshold) return;
      
      setIsScrolling(true);
      
      if (delta > 0 && currentSection < totalSections - 1) {
        setCurrentSection(prev => prev + 1);
      } else if (delta < 0 && currentSection > 0) {
        setCurrentSection(prev => prev - 1);
      }
      
      setTimeout(() => setIsScrolling(false), 1000);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentSection, totalSections, isScrolling, touchStart]);

  // 处理键盘事件
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentSection < totalSections - 1) {
          setIsScrolling(true);
          setCurrentSection(prev => prev + 1);
          setTimeout(() => setIsScrolling(false), 1000);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentSection > 0) {
          setIsScrolling(true);
          setCurrentSection(prev => prev - 1);
          setTimeout(() => setIsScrolling(false), 1000);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, totalSections, isScrolling]);

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden bg-[#050505] ${className}`}
    >
      {/* 导航指示器 */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {childrenArray.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isScrolling) {
                setIsScrolling(true);
                setCurrentSection(index);
                setTimeout(() => setIsScrolling(false), 1000);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSection 
                ? 'bg-[#22D3EE] scale-150' 
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* 滚动指示器 */}
      {currentSection < totalSections - 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}

      {/* 页面内容 */}
      <AnimatePresence mode="wait">
        {childrenArray.map((child, index) => {
          if (index !== currentSection) return null;
          
          return (
            <motion.div
              key={index}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              {isValidElement(child) 
                ? cloneElement(child as React.ReactElement<SectionProps>, { 
                    isActive: true,
                    index 
                  })
                : child
              }
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

/**
 * 页面区块组件
 */
export function ScrollSection({ children, className = '', isActive = false }: SectionProps) {
  return (
    <section className={`w-full h-full overflow-hidden ${className}`}>
      <motion.div
        variants={staggerVariants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </section>
  );
}

/**
 * 动画元素组件
 */
export function AnimatedItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export { staggerVariants, itemVariants, sectionVariants };
