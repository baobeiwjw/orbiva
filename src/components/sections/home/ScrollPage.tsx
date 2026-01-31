'use client';

import { useRef, lazy, Suspense, ReactNode } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// 懒加载组件
const ProductScene = lazy(() => import('@/components/3d/ProductScene'));

// 3D模型加载占位组件
function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 -m-8">
          <div className="w-32 h-32 rounded-full border border-[#06B6D4]/20 animate-ping" style={{ animationDuration: '2s' }} />
        </div>
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#06B6D4]/20 to-[#7C3AED]/20 backdrop-blur flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-6 h-6 text-[#06B6D4]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// 滚动区块 Props
interface ScrollSectionProps {
  children: ReactNode;
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}

// 单个滚动区块
function ScrollSection({ children, scrollYProgress, index, total }: ScrollSectionProps) {
  const sectionStart = index / total;
  const sectionPeak = (index + 0.5) / total;
  const sectionEnd = (index + 1) / total;
  
  // 淡入淡出
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, sectionStart - 0.05),
      sectionStart + 0.05,
      sectionEnd - 0.1,
      sectionEnd,
    ],
    [0, 1, 1, 0]
  );
  
  // 向上滑入
  const y = useTransform(
    scrollYProgress,
    [
      Math.max(0, sectionStart - 0.05),
      sectionStart + 0.05,
      sectionEnd - 0.1,
      sectionEnd,
    ],
    [80, 0, 0, -80]
  );

  // 缩放
  const scale = useTransform(
    scrollYProgress,
    [
      Math.max(0, sectionStart - 0.05),
      sectionStart + 0.05,
      sectionEnd - 0.1,
      sectionEnd,
    ],
    [0.9, 1, 1, 0.9]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}

// 主页滚动容器
interface ScrollPageProps {
  heroContent: ReactNode;
  sections: ReactNode[];
}

export default function ScrollPage({ heroContent, sections }: ScrollPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSections = sections.length + 1; // +1 for hero
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 3D模型始终显示，但有独立的动画
  const modelOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3],
    [1, 1, 0]
  );
  
  const modelScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35],
    [1, 1.1, 0.8]
  );
  
  const modelY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, -100]
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-[#050505]"
      style={{ height: `${totalSections * 100}vh` }}
    >
      {/* 固定视口 */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 背景层 - 始终可见 */}
        <div className="absolute inset-0">
          {/* 背景渐变 */}
          <div className="absolute inset-0 bg-gradient-radial from-[#0a0a0a] via-[#050505] to-black" />
          
          {/* 网格背景 */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }}
          />
          
          {/* 椭圆装饰 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute w-[150vw] h-[80vh] border border-white/[0.03] rounded-[50%]"
              style={{ transform: 'rotate(-5deg)' }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.7 }}
              className="absolute w-[130vw] h-[65vh] border border-[#06B6D4]/[0.05] rounded-[50%]"
              style={{ transform: 'rotate(-3deg)' }}
            />
          </div>
          
          {/* 环境光 */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#06B6D4]/[0.03] rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7C3AED]/[0.02] rounded-full blur-[120px]" />
        </div>

        {/* 3D模型层 - 独立动画 */}
        <motion.div
          style={{ opacity: modelOpacity, scale: modelScale, y: modelY }}
          className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] z-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/10 to-[#7C3AED]/10 rounded-full blur-[80px] opacity-50" />
          <Suspense fallback={<SceneFallback />}>
            <ProductScene
              modelUrl="/cube.glb"
              className="w-full h-full"
              autoRotate={true}
              rotateSpeed={0.25}
              enableZoom={false}
              showEllipse={false}
              cameraPosition={[0, 0, 5]}
            />
          </Suspense>
        </motion.div>

        {/* Hero 内容层 */}
        <ScrollSection
          scrollYProgress={scrollYProgress}
          index={0}
          total={totalSections}
        >
          {heroContent}
        </ScrollSection>

        {/* 其他区块 */}
        {sections.map((section, index) => (
          <ScrollSection
            key={index}
            scrollYProgress={scrollYProgress}
            index={index + 1}
            total={totalSections}
          >
            {section}
          </ScrollSection>
        ))}
      </div>

      {/* 滚动进度指示器 */}
      <motion.div
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        {Array.from({ length: totalSections }).map((_, i) => {
          const sectionStart = i / totalSections;
          const sectionEnd = (i + 1) / totalSections;
          
          return (
            <motion.div
              key={i}
              className="relative"
            >
              <motion.div
                className="w-2 h-2 rounded-full border border-white/20 transition-colors duration-300"
                style={{
                  background: useTransform(
                    scrollYProgress,
                    [sectionStart, sectionStart + 0.05, sectionEnd - 0.05, sectionEnd],
                    ['transparent', '#06B6D4', '#06B6D4', 'transparent']
                  ),
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
