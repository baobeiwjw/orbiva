'use client';

import React, {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ScrollContextType {
  scrollYProgress: MotionValue<number>;
  currentSection: number;
  totalSections: number;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollContext must be used within ScrollProvider');
  }
  return context;
}

interface ScrollProviderProps {
  children: ReactNode;
  totalSections: number;
}

export function ScrollProvider({ children, totalSections }: ScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      const section = Math.min(
        Math.floor(value * totalSections),
        totalSections - 1
      );
      setCurrentSection(section);
    });
    return () => unsubscribe();
  }, [scrollYProgress, totalSections]);

  return (
    <ScrollContext.Provider value={{ scrollYProgress, currentSection, totalSections }}>
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${totalSections * 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {children}
        </div>
      </div>
    </ScrollContext.Provider>
  );
}

// 滚动区块组件
interface ScrollSectionProps {
  index: number;
  children: ReactNode;
  className?: string;
}

export function ScrollSection({ index, children, className = '' }: ScrollSectionProps) {
  const { scrollYProgress, totalSections } = useScrollContext();
  
  // 计算每个 section 的进度范围
  const sectionStart = index / totalSections;
  const sectionEnd = (index + 1) / totalSections;
  
  // 创建淡入淡出效果
  const opacity = useTransform(
    scrollYProgress,
    [
      sectionStart - 0.1,
      sectionStart,
      sectionEnd - 0.1,
      sectionEnd,
    ],
    [0, 1, 1, 0]
  );
  
  // 向上滑入效果
  const y = useTransform(
    scrollYProgress,
    [
      sectionStart - 0.1,
      sectionStart,
      sectionEnd - 0.1,
      sectionEnd,
    ],
    [50, 0, 0, -50]
  );

  // 缩放效果
  const scale = useTransform(
    scrollYProgress,
    [
      sectionStart - 0.1,
      sectionStart,
      sectionEnd - 0.1,
      sectionEnd,
    ],
    [0.95, 1, 1, 0.95]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className={`absolute inset-0 flex items-center justify-center ${className}`}
    >
      {children}
    </motion.div>
  );
}

// 固定背景组件 - 不随滚动淡出
interface FixedBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function FixedBackground({ children, className = '' }: FixedBackgroundProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      {children}
    </div>
  );
}
