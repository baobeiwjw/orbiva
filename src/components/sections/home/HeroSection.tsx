'use client';

import { useRef, lazy, Suspense, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';
import VideoModal from '@/components/ui/VideoModal';
import HandDrawnIcon from '@/components/ui/HandDrawnIcon';
import { ArrowRight, Play, Sparkles, Zap, Heart, Activity } from 'lucide-react';

// 懒加载3D场景组件
const ProductScene = lazy(() => import('@/components/3d/ProductScene'));

// 3D模型加载占位组件 - 使用Logo
function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* 脉冲环 - 不规则形状 */}
        <div className="absolute inset-0 -m-8">
          <div 
            className="w-32 h-32 rounded-[45%_55%_50%_50%] border border-[#4ADE80]/20 animate-ping" 
            style={{ animationDuration: '2.5s', transform: 'rotate(-5deg)' }} 
          />
        </div>
        <div className="relative w-32 h-12">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
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

// 动画变体 - 更自然的缓动
const fadeInUp = {
  hidden: { opacity: 0, y: 35, rotate: -1 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number],
    },
  }),
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: mounted ? containerRef : undefined,
    offset: ['start start', 'end start'],
  });

  // 视频 URL
  const videoUrl = 'https://public-read-1252768970.cos.ap-guangzhou.myqcloud.com/1%E6%9C%8831%E6%97%A5-%E5%8D%A1%E7%82%B9.mp4';

  // 视差和淡出效果
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  
  // 3D模型视差
  const model3DY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* 背景渐变 - 更不规则 */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0a0a0a] via-[#050505] to-black" />
      
      {/* 网格背景 - 不规则间距感 */}
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
      
      {/* 手绘风格装饰线 - 不对称椭圆 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.5, ease: 'easeOut' }}
          className="absolute w-[155vw] h-[78vh] border border-white/[0.025] rounded-[45%_55%_52%_48%]"
          style={{ transform: 'rotate(-6deg) translateX(-2%)' }}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.7, ease: 'easeOut' }}
          className="absolute w-[128vw] h-[62vh] border border-[#4ADE80]/[0.04] rounded-[52%_48%_55%_45%]"
          style={{ transform: 'rotate(-2deg) translateY(3%)' }}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.9, ease: 'easeOut' }}
          className="absolute w-[105vw] h-[48vh] border border-white/[0.018] rounded-[48%_52%_50%_50%]"
          style={{ transform: 'rotate(1deg) translateX(1%)' }}
        />
      </div>
      
      {/* 环境光效果 - 不规则形状和位置 */}
      <div 
        className="absolute top-[-5%] left-[18%] w-[580px] h-[520px] bg-[#4ADE80]/[0.025] rounded-[45%_55%_50%_50%] blur-[140px]" 
        style={{ transform: 'rotate(-8deg)' }}
      />
      <div 
        className="absolute bottom-[-8%] right-[20%] w-[480px] h-[420px] bg-[#86EFAC]/[0.018] rounded-[55%_45%_48%_52%] blur-[130px]"
        style={{ transform: 'rotate(5deg)' }}
      />

      {/* 主内容区域 */}
      <motion.div 
        style={{ y, opacity, scale }} 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 min-h-[80vh] py-24 pt-32">
          
          {/* 左侧文字内容 - 轻微不对称 */}
          <div className="flex-1 text-center lg:text-left max-w-xl" style={{ transform: 'rotate(-0.3deg)' }}>
            {/* Badge - 手绘风格 */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-7"
            >
              <Badge variant="accent" icon={<Sparkles className="w-4 h-4" style={{ transform: 'rotate(-5deg)' }} />}>
                健康科技 · 数字孪生 · 让生活更美好
              </Badge>
            </motion.div>

            {/* Main Headline - 更自然的措辞 */}
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.12}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-7 leading-tight tracking-tight"
            >
              <span className="block text-white/90" style={{ transform: 'rotate(0.2deg)' }}>
                你的健康，
              </span>
              <GradientText className="block" style={{ transform: 'rotate(-0.3deg)' }}>
                由你掌控
              </GradientText>
            </motion.h1>

            {/* Subtitle - 更口语化、真实的表达 */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.25}
              className="text-base sm:text-lg text-white/55 mb-9 leading-relaxed"
              style={{ transform: 'rotate(0.15deg)' }}
            >
              一个小方块，随身携带。它了解你的身体，
              <br className="hidden sm:block" />
              帮你预见健康变化，陪你养成好习惯。
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                立即购买
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={<Play className="w-5 h-5" style={{ transform: 'rotate(-3deg)' }} />}
                iconPosition="left"
                onClick={() => setIsVideoOpen(true)}
              >
                看看怎么用
              </Button>
            </motion.div>
            
            {/* 产品亮点 - 手绘风格图标 */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.55}
              className="mt-11 flex flex-wrap items-center justify-center lg:justify-start gap-7 text-sm"
            >
              <div className="flex items-center gap-2.5 text-white/45">
                <HandDrawnIcon icon={Heart} size="sm" variant="outline" animate={false} />
                <span>14天续航</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/45">
                <HandDrawnIcon icon={Activity} size="sm" variant="outline" animate={false} />
                <span>健康预测</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/45">
                <HandDrawnIcon icon={Zap} size="sm" variant="outline" animate={false} />
                <span>实时同步</span>
              </div>
            </motion.div>
          </div>

          {/* 右侧 3D 产品展示 */}
          <motion.div
            style={{ y: model3DY }}
            className="flex-shrink-0 w-full lg:w-[400px] xl:w-[450px]"
          >
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="relative w-full max-w-[300px] sm:max-w-[350px] lg:max-w-[400px] mx-auto"
              style={{ transform: 'rotate(1deg)' }}
            >
              {/* 发光效果 - 不规则 */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#4ADE80]/12 to-[#86EFAC]/8 rounded-[45%_55%_50%_50%] blur-[75px] opacity-60" 
                style={{ transform: 'rotate(-5deg)' }}
              />
              
              {/* 3D 场景容器 */}
              <div className="relative w-full pb-[100%]">
                <div className="absolute inset-0">
                  <Suspense fallback={<SceneFallback />}>
                    <ProductScene
                      modelUrl="/cube.glb"
                      className="w-full h-full"
                      autoRotate={true}
                      rotateSpeed={0.22}
                      enableZoom={true}
                      showEllipse={false}
                      cameraPosition={[0, 0, 5]}
                    />
                  </Suspense>
                </div>
              </div>

              {/* 浮动信息卡片 - 右上 - 不规则形状 */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="absolute right-0 top-1/4 translate-x-1/2 hidden xl:block z-10"
                style={{ transform: 'translateX(50%) rotate(2deg)' }}
              >
                <div className="px-4 py-3 rounded-[18px_22px_20px_16px] bg-white/[0.025] backdrop-blur-xl border border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <HandDrawnIcon icon={Zap} size="md" variant="filled" animate={false} />
                    <div>
                      <p className="text-[#86EFAC] font-semibold text-lg">89%</p>
                      <p className="text-white/45 text-xs">预测准确率</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 浮动信息卡片 - 左下 */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={1.15}
                className="absolute left-0 bottom-1/4 -translate-x-1/2 hidden xl:block z-10"
                style={{ transform: 'translateX(-50%) rotate(-3deg)' }}
              >
                <div className="px-4 py-3 rounded-[20px_16px_18px_22px] bg-white/[0.025] backdrop-blur-xl border border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <HandDrawnIcon icon={Sparkles} size="md" variant="filled" animate={false} />
                    <div>
                      <p className="text-[#4ADE80] font-semibold text-lg">14天</p>
                      <p className="text-white/45 text-xs">预测周期</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* 底部滚动指示器 - 手绘感 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ transform: 'translateX(-50%) rotate(-2deg)' }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/25 text-xs tracking-widest" style={{ letterSpacing: '0.2em' }}>
            向下滑动
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-[#4ADE80]/30 to-transparent" />
        </motion.div>
      </motion.div>

      {/* 视频弹窗 */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={videoUrl}
        title="看看 Orbiva 怎么用"
      />
    </section>
  );
}
