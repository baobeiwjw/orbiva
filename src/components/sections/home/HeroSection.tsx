'use client';

import { useRef, lazy, Suspense, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';
import VideoModal from '@/components/ui/VideoModal';
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react';

// 懒加载3D场景组件
const ProductScene = lazy(() => import('@/components/3d/ProductScene'));

// 3D模型加载占位组件 - CUDIS 风格
function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* 脉冲环 */}
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

// 动画变体
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      delay,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // 视频 URL
  const videoUrl = 'https://public-read-1252768970.cos.ap-guangzhou.myqcloud.com/1%E6%9C%8831%E6%97%A5-%E5%8D%A1%E7%82%B9.mp4';

  // 视差和淡出效果
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);
  
  // 3D模型视差 - 稍微快一点
  const model3DY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* 背景渐变 */}
      <div className="absolute inset-0 bg-gradient-radial from-[#0a0a0a] via-[#050505] to-black" />
      
      {/* 网格背景 - 更微妙 */}
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
      
      {/* 大椭圆装饰线 - CUDIS 风格 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* 最外层椭圆 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute w-[150vw] h-[80vh] border border-white/[0.03] rounded-[50%]"
          style={{ transform: 'rotate(-5deg)' }}
        />
        {/* 中间椭圆 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="absolute w-[130vw] h-[65vh] border border-[#06B6D4]/[0.05] rounded-[50%]"
          style={{ transform: 'rotate(-3deg)' }}
        />
        {/* 内层椭圆 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.9 }}
          className="absolute w-[110vw] h-[50vh] border border-white/[0.02] rounded-[50%]"
          style={{ transform: 'rotate(-1deg)' }}
        />
      </div>
      
      {/* 环境光效果 */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#06B6D4]/[0.03] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7C3AED]/[0.02] rounded-full blur-[120px]" />

      {/* 主内容区域 */}
      <motion.div 
        style={{ y, opacity, scale }} 
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[80vh] py-24 pt-32">
          
          {/* 左侧文字内容 */}
          <div className="flex-1 text-center lg:text-left max-w-xl">
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-6"
            >
              <Badge variant="accent" icon={<Sparkles className="w-4 h-4" />}>
                AI 驱动 · 数字孪生 · 健康革命
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.15}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight"
            >
              <span className="block text-white/90">AI驱动的</span>
              <GradientText className="block">数字孪生健康生态</GradientText>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
              className="text-base sm:text-lg text-white/50 mb-8 leading-relaxed"
            >
              Orbiva 通过 AI 驱动的 VivaBox 智能小方块，
              <br className="hidden sm:block" />
              构建您的数字健康分身，预见未来健康状态
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.45}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                立即体验
              </Button>
              <Button
                variant="secondary"
                size="lg"
                icon={<Play className="w-5 h-5" />}
                iconPosition="left"
                onClick={() => setIsVideoOpen(true)}
              >
                观看演示
              </Button>
            </motion.div>
            
            {/* 产品亮点 */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.6}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm"
            >
              <div className="flex items-center gap-2 text-white/40">
                <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                <span>14天续航</span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                <span>AI健康预测</span>
              </div>
              <div className="flex items-center gap-2 text-white/40">
                <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                <span>实时数据同步</span>
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
            >
              {/* 发光效果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4]/10 to-[#7C3AED]/10 rounded-full blur-[80px] opacity-50" />
              
              {/* 3D 场景容器 - 固定宽高比 */}
              <div className="relative w-full pb-[100%]">
                <div className="absolute inset-0">
                  <Suspense fallback={<SceneFallback />}>
                    <ProductScene
                      modelUrl="/cube.glb"
                      className="w-full h-full"
                      autoRotate={true}
                      rotateSpeed={0.25}
                      enableZoom={true}
                      showEllipse={false}
                      cameraPosition={[0, 0, 5]}
                    />
                  </Suspense>
                </div>
              </div>

              {/* 浮动信息卡片 - 右上 */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={1}
                className="absolute right-0 top-1/4 translate-x-1/2 hidden xl:block z-10"
              >
                <div className="px-4 py-3 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#06B6D4]/20 to-[#7C3AED]/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#06B6D4]" />
                    </div>
                    <div>
                      <p className="text-[#7C3AED] font-semibold text-lg">89%</p>
                      <p className="text-white/40 text-xs">健康预测准确率</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 浮动信息卡片 - 左下 */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                custom={1.2}
                className="absolute left-0 bottom-1/4 -translate-x-1/2 hidden xl:block z-10"
              >
                <div className="px-4 py-3 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#06B6D4]/20 to-[#7C3AED]/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#7C3AED]" />
                    </div>
                    <div>
                      <p className="text-[#06B6D4] font-semibold text-lg">14天</p>
                      <p className="text-white/40 text-xs">健康预测周期</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* 底部滚动指示器 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-white/20 text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>

      {/* 视频弹窗 */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={videoUrl}
        title="Orbiva 产品演示"
      />
    </section>
  );
}
