'use client';

import { useRef, lazy, Suspense, ReactNode, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';

// 懒加载组件
const ProductScene = lazy(() => import('@/components/3d/ProductScene'));

// 3D模型加载占位组件 - 使用Logo，手绘风格动画
function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 -m-8">
          <div 
            className="w-32 h-32 rounded-[45%_55%_50%_50%] border border-[#4ADE80]/20 animate-ping" 
            style={{ animationDuration: '2.5s', transform: 'rotate(-3deg)' }} 
          />
        </div>
        <div className="relative w-32 h-12">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <Image
              src="/logo.png"
              alt="Loading"
              fill
              sizes="128px"
              className="object-contain"
            />
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
  const sectionEnd = (index + 1) / total;
  
  // 淡入淡出 - 更自然的过渡
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, sectionStart - 0.06),
      sectionStart + 0.06,
      sectionEnd - 0.12,
      sectionEnd,
    ],
    [0, 1, 1, 0]
  );
  
  // 向上滑入 - 带微妙旋转
  const y = useTransform(
    scrollYProgress,
    [
      Math.max(0, sectionStart - 0.06),
      sectionStart + 0.06,
      sectionEnd - 0.12,
      sectionEnd,
    ],
    [70, 0, 0, -70]
  );

  // 缩放
  const scale = useTransform(
    scrollYProgress,
    [
      Math.max(0, sectionStart - 0.06),
      sectionStart + 0.06,
      sectionEnd - 0.12,
      sectionEnd,
    ],
    [0.92, 1, 1, 0.92]
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
  const totalSections = sections.length + 1;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ['start start', 'end end'],
  });

  // 3D模型动画
  const modelOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3],
    [1, 1, 0]
  );
  
  const modelScale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35],
    [1, 1.08, 0.85]
  );
  
  const modelY = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, -90]
  );

  const modelRotate = useTransform(
    scrollYProgress,
    [0, 0.3],
    [0, 5]
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-[#050505]"
      style={{ height: `${totalSections * 100}vh` }}
    >
      {/* 固定视口 */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* 背景层 */}
        <div className="absolute inset-0">
          {/* 背景渐变 */}
          <div className="absolute inset-0 bg-gradient-radial from-[#0a0a0a] via-[#050505] to-black" />
          
          {/* 网格背景 - 不规则 */}
          <div 
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '58px 62px',
              transform: 'rotate(-0.5deg)',
            }}
          />
          
          {/* 手绘风格椭圆装饰 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, delay: 0.5 }}
              className="absolute w-[155vw] h-[78vh] border border-white/[0.025] rounded-[45%_55%_52%_48%]"
              style={{ transform: 'rotate(-6deg) translateX(-2%)' }}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.8, delay: 0.7 }}
              className="absolute w-[128vw] h-[62vh] border border-[#4ADE80]/[0.04] rounded-[52%_48%_55%_45%]"
              style={{ transform: 'rotate(-2deg) translateY(3%)' }}
            />
          </div>
          
          {/* 环境光 - 不规则形状 */}
          <div 
            className="absolute top-[-5%] left-[18%] w-[580px] h-[520px] bg-[#4ADE80]/[0.025] rounded-[45%_55%_50%_50%] blur-[140px]" 
            style={{ transform: 'rotate(-8deg)' }}
          />
          <div 
            className="absolute bottom-[-8%] right-[20%] w-[480px] h-[420px] bg-[#86EFAC]/[0.018] rounded-[55%_45%_48%_52%] blur-[130px]"
            style={{ transform: 'rotate(5deg)' }}
          />
        </div>

        {/* 3D模型层 */}
        <motion.div
          style={{ opacity: modelOpacity, scale: modelScale, y: modelY, rotate: modelRotate }}
          className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] z-20"
        >
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/12 to-[#86EFAC]/8 rounded-[45%_55%_50%_50%] blur-[75px] opacity-55"
            style={{ transform: 'rotate(-5deg)' }}
          />
          <Suspense fallback={<SceneFallback />}>
            <ProductScene
              modelUrl="/cube.glb"
              className="w-full h-full"
              autoRotate={true}
              rotateSpeed={0.22}
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

      {/* 滚动进度指示器 - 手绘风格 */}
      <motion.div
        className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        style={{ transform: 'translateY(-50%) rotate(-2deg)' }}
      >
        {Array.from({ length: totalSections }).map((_, i) => {
          const sectionStart = i / totalSections;
          const sectionEnd = (i + 1) / totalSections;
          
          return (
            <motion.div
              key={i}
              className="relative"
              style={{ transform: `rotate(${(i - 1) * 3}deg)` }}
            >
              <motion.div
                className="w-2.5 h-2.5 rounded-[40%_60%_55%_45%] border border-white/20 transition-colors duration-300"
                style={{
                  background: useTransform(
                    scrollYProgress,
                    [sectionStart, sectionStart + 0.05, sectionEnd - 0.05, sectionEnd],
                    ['transparent', '#4ADE80', '#4ADE80', 'transparent']
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
