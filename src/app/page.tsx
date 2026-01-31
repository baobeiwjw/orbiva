'use client';

import { useRef, lazy, Suspense, ReactNode, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Button from '@/components/ui/Button';
import VideoModal from '@/components/ui/VideoModal';
import { useI18n } from '@/lib/i18n';
import { ArrowRight, Play, Sparkles, Zap, Box, Cpu, Coins, Heart, Brain, Shield, Activity, Moon } from 'lucide-react';

// 懒加载组件
const ProductScene = lazy(() => import('@/components/3d/ProductScene'));

// 3D模型加载占位组件
function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 -m-8">
          <div className="w-32 h-32 rounded-full border border-[#7C3AED]/20 animate-ping" style={{ animationDuration: '2s' }} />
        </div>
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 backdrop-blur flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-6 h-6 text-[#7C3AED]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ========== 动画变体 ==========
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      delay,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

// ========== 滚动区块包装组件 ==========
interface ScrollSectionWrapperProps {
  children: ReactNode;
  className?: string;
  isLast?: boolean;
}

function ScrollSectionWrapper({ children, className = '', isLast = false }: ScrollSectionWrapperProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.35, 0.65, 0.8, 1], 
    [0, 0.5, 1, 1, isLast ? 1 : 0.5, isLast ? 1 : 0]
  );
  
  const y = useTransform(
    scrollYProgress, 
    [0, 0.2, 0.35, 0.65, 0.8, 1], 
    [100, 40, 0, 0, isLast ? 0 : -40, isLast ? 0 : -100]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.35, 0.65, 0.8, 1],
    [0.9, 0.95, 1, 1, isLast ? 1 : 0.95, isLast ? 1 : 0.9]
  );

  return (
    <section ref={sectionRef} className={`relative min-h-screen overflow-hidden scroll-section ${className}`}>
      <motion.div 
        style={{ opacity, y, scale }}
        className="relative z-10 w-full h-full origin-center will-change-transform"
      >
        {children}
      </motion.div>
    </section>
  );
}

// ========== Bento 卡片组件 ==========
function BentoCard({ item, index }: { item: {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  stats: string;
  color: string;
  size: string;
  features?: string[];
}; index: number }) {
  const Icon = item.icon;
  
  const sizeClasses = {
    large: 'md:col-span-2 md:row-span-2',
    medium: 'md:col-span-1 md:row-span-2',
    small: 'md:col-span-1 md:row-span-1',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className={`
        group relative overflow-hidden rounded-3xl
        bg-white/[0.02] backdrop-blur-sm
        border border-white/[0.05]
        hover:border-white/[0.1]
        transition-all duration-500
        ${sizeClasses[item.size as keyof typeof sizeClasses]}
        ${item.size === 'large' ? 'p-8' : item.size === 'medium' ? 'p-6' : 'p-5'}
      `}
    >
      {/* 背景光效 */}
      <div 
        className={`
          absolute -top-24 -right-24 w-48 h-48 
          bg-gradient-to-br ${item.color}
          rounded-full blur-3xl opacity-0 
          group-hover:opacity-20 
          transition-opacity duration-700
        `}
      />
      
      {/* 网格纹理 */}
      <div 
        className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* 内容 */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className={`
            w-12 h-12 rounded-2xl 
            bg-gradient-to-br ${item.color}
            flex items-center justify-center
            group-hover:scale-110 transition-transform duration-300
          `}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          <div className="text-right">
            <span className={`
              text-sm font-semibold
              bg-gradient-to-r ${item.color} bg-clip-text text-transparent
            `}>
              {item.stats}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <span className="text-xs text-white/40 uppercase tracking-wider">
            {item.subtitle}
          </span>
          <h3 className={`
            font-bold text-white mt-1 mb-2
            group-hover:text-white transition-colors
            ${item.size === 'large' ? 'text-2xl' : item.size === 'medium' ? 'text-xl' : 'text-lg'}
          `}>
            {item.title}
          </h3>
          <p className={`
            text-white/50 leading-relaxed
            ${item.size === 'small' ? 'text-sm line-clamp-2' : 'text-sm'}
          `}>
            {item.description}
          </p>
        </div>

        {item.features && item.size !== 'small' && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 text-xs rounded-full bg-white/[0.05] text-white/60 border border-white/[0.05]"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          className={`
            absolute bottom-0 left-0 right-0 h-[2px]
            bg-gradient-to-r ${item.color}
            origin-left
          `}
        />
      </div>
    </motion.div>
  );
}

// ========== Hero 区块 ==========
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useI18n();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  // 视频 URL
  const videoUrl = 'https://public-read-1252768970.cos.ap-guangzhou.myqcloud.com/1%E6%9C%8831%E6%97%A5-%E5%8D%A1%E7%82%B9.mp4';
  
  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 纯黑背景 */}
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* 椭圆装饰 - 参考 CUDIS 风格 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute w-[160vw] h-[80vh] border border-white/[0.04] rounded-[50%]"
          style={{ transform: 'rotate(-8deg)' }}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute w-[140vw] h-[65vh] border border-[#7C3AED]/[0.06] rounded-[50%]"
          style={{ transform: 'rotate(-4deg)' }}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="absolute w-[120vw] h-[50vh] border border-white/[0.03] rounded-[50%]"
          style={{ transform: 'rotate(-2deg)' }}
        />
      </div>
      
      {/* 微妙的环境光 */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-[#7C3AED]/[0.02] rounded-full blur-[150px]" />

      {/* 主内容 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16 py-24">
          
          {/* 左侧文字 */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.1}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm">
                <Sparkles className="w-4 h-4 text-[#7C3AED]" />
                {t('home', 'heroBadge')}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.2}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
            >
              <span className="block">{t('home', 'heroTitle1')}</span>
              <span className="block bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                {t('home', 'heroTitle2')}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.35}
              className="text-lg sm:text-xl text-white/40 mb-10 leading-relaxed"
            >
              {t('home', 'heroSubtitle')}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.5}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
            >
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                {t('home', 'tryNow')}
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                icon={<Play className="w-5 h-5" />} 
                iconPosition="left"
                onClick={() => setIsVideoOpen(true)}
              >
                {t('home', 'watchDemo')}
              </Button>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.65}
              className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm"
            >
              <div className="flex items-center gap-2 text-white/30">
                <div className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                <span>{t('home', 'heroFeature1')}</span>
              </div>
              <div className="flex items-center gap-2 text-white/30">
                <div className="w-2 h-2 rounded-full bg-[#06B6D4]" />
                <span>{t('home', 'heroFeature2')}</span>
              </div>
              <div className="flex items-center gap-2 text-white/30">
                <div className="w-2 h-2 rounded-full bg-[#EC4899]" />
                <span>{t('home', 'heroFeature3')}</span>
              </div>
            </motion.div>
          </div>

          {/* 右侧 3D */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.4}
            className="flex-shrink-0 w-full lg:w-[450px] xl:w-[500px]"
          >
            <div className="relative w-full max-w-[400px] lg:max-w-[450px] mx-auto">
              <div className="relative w-full pb-[120%]">
                <div className="absolute inset-0">
                  <Suspense fallback={<SceneFallback />}>
                    <ProductScene
                      modelUrl="/cube.glb"
                      className="w-full h-full"
                      autoRotate={true}
                      rotateSpeed={0.2}
                      enableZoom={false}
                      showEllipse={false}
                      cameraPosition={[0, 0, 6]}
                    />
                  </Suspense>
                </div>
              </div>

              {/* 浮动数据卡片 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.2 }}
                className="absolute right-0 top-1/4 translate-x-1/4 hidden xl:block z-10"
              >
                <div className="px-4 py-3 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#7C3AED]" />
                    </div>
                    <div>
                      <p className="text-[#7C3AED] font-semibold text-lg">89%</p>
                      <p className="text-white/30 text-xs">{t('home', 'healthPrediction')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.4 }}
                className="absolute left-0 bottom-1/3 -translate-x-1/4 hidden xl:block z-10"
              >
                <div className="px-4 py-3 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#06B6D4]/20 to-[#7C3AED]/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#06B6D4]" />
                    </div>
                    <div>
                      <p className="text-[#06B6D4] font-semibold text-lg">14{t('common', 'days')}</p>
                      <p className="text-white/30 text-xs">{t('home', 'predictionCycle')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 滚动指示器 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-white/20 text-xs tracking-[0.3em] uppercase">{t('common', 'scroll')}</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>

      {/* 视频弹窗 */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={videoUrl}
        title="Orbiva 产品演示"
      />
    </div>
  );
}

// ========== Bento Features 区块 ==========
function BentoFeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  const bentoItems = [
    {
      id: 'hardware',
      title: t('home', 'bentoHardwareTitle'),
      subtitle: t('home', 'bentoHardwareSubtitle'),
      description: t('home', 'bentoHardwareDesc'),
      icon: Box,
      stats: t('home', 'bentoHardwareStats'),
      color: 'from-[#7C3AED] to-[#7C3AED]/50',
      size: 'large',
      features: [t('home', 'bentoHardwareFeature1'), t('home', 'bentoHardwareFeature2'), t('home', 'bentoHardwareFeature3')],
    },
    {
      id: 'digital-twin',
      title: t('home', 'bentoTwinTitle'),
      subtitle: t('home', 'bentoTwinSubtitle'),
      description: t('home', 'bentoTwinDesc'),
      icon: Cpu,
      stats: t('home', 'bentoTwinStats'),
      color: 'from-[#06B6D4] to-[#06B6D4]/50',
      size: 'medium',
      features: [t('home', 'bentoTwinFeature1'), t('home', 'bentoTwinFeature2')],
    },
    {
      id: 'rewards',
      title: t('home', 'bentoRewardsTitle'),
      subtitle: t('home', 'bentoRewardsSubtitle'),
      description: t('home', 'bentoRewardsDesc'),
      icon: Coins,
      stats: t('home', 'bentoRewardsStats'),
      color: 'from-[#EC4899] to-[#EC4899]/50',
      size: 'medium',
      features: [t('home', 'bentoRewardsFeature1'), t('home', 'bentoRewardsFeature2')],
    },
    {
      id: 'heart',
      title: t('home', 'bentoHeartTitle'),
      subtitle: t('home', 'bentoHeartSubtitle'),
      description: t('home', 'bentoHeartDesc'),
      icon: Heart,
      stats: t('home', 'bentoHeartStats'),
      color: 'from-[#ef4444] to-[#ef4444]/50',
      size: 'small',
    },
    {
      id: 'sleep',
      title: t('home', 'bentoSleepTitle'),
      subtitle: t('home', 'bentoSleepSubtitle'),
      description: t('home', 'bentoSleepDesc'),
      icon: Moon,
      stats: t('home', 'bentoSleepStats'),
      color: 'from-[#3b82f6] to-[#3b82f6]/50',
      size: 'small',
    },
    {
      id: 'ai',
      title: t('home', 'bentoAITitle'),
      subtitle: t('home', 'bentoAISubtitle'),
      description: t('home', 'bentoAIDesc'),
      icon: Brain,
      stats: t('home', 'bentoAIStats'),
      color: 'from-[#06b6d4] to-[#06b6d4]/50',
      size: 'small',
    },
    {
      id: 'security',
      title: t('home', 'bentoSecurityTitle'),
      subtitle: t('home', 'bentoSecuritySubtitle'),
      description: t('home', 'bentoSecurityDesc'),
      icon: Shield,
      stats: t('home', 'bentoSecurityStats'),
      color: 'from-[#22c55e] to-[#22c55e]/50',
      size: 'small',
    },
  ];

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex flex-col justify-center">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#7C3AED]/[0.015] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#06B6D4]/[0.015] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] mb-6"
          >
            <Zap className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-sm text-white/60">{t('home', 'featuresTag')}</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('home', 'featuresTitle1')}
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
              {t('home', 'featuresTitle2')}
            </span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('home', 'featuresSubtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[minmax(180px,auto)]">
          {bentoItems.map((item, index) => (
            <BentoCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* 底部信息 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <div className="flex -space-x-2">
              {[Heart, Activity, Sparkles].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 flex items-center justify-center border-2 border-[#050505]"
                >
                  <Icon className="w-5 h-5 text-[#7C3AED]" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-white font-medium">{t('home', 'trustedBy')}</div>
              <div className="text-sm text-white/40">{t('home', 'securityGuarantee')}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== AI 预测区块 ==========
function AIPredictionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  const predictionItems = [
    { label: t('home', 'aiHRV'), value: '95%', color: '#ef4444' },
    { label: t('home', 'aiSleep'), value: '89%', color: '#3b82f6' },
    { label: t('home', 'aiStress'), value: '87%', color: '#EC4899' },
  ];

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      {/* 背景 */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#EC4899]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 左侧内容 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] mb-6"
            >
              <Brain className="w-4 h-4 text-[#EC4899]" />
              <span className="text-sm text-white/60">{t('home', 'aiTag')}</span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {t('home', 'aiTitle1')}
              <span className="block bg-gradient-to-r from-[#EC4899] to-[#a78bfa] bg-clip-text text-transparent">
                {t('home', 'aiTitle2')}
              </span>
            </h2>

            <p className="text-white/40 text-lg mb-8 leading-relaxed">
              {t('home', 'aiSubtitle')}
            </p>

            <div className="space-y-4 mb-8">
              {predictionItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <span className="text-white/60">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: item.value } : {}}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                    <span className="text-white font-medium w-12">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              {t('home', 'startPrediction')}
            </Button>
          </motion.div>

          {/* 右侧可视化 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#EC4899]/20 to-[#a78bfa]/10 rounded-3xl blur-3xl" />
              
              <div className="relative w-full h-full rounded-3xl bg-white/[0.02] border border-white/[0.05] p-8 flex flex-col justify-center">
                {/* 模拟健康数据可视化 */}
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <div className="text-6xl font-bold text-white mb-2">89<span className="text-2xl text-white/60">%</span></div>
                    <div className="text-white/40">{t('home', 'healthPrediction')}</div>
                  </div>
                  
                  <div className="flex justify-around">
                    {[
                      { icon: Heart, value: '72', unit: 'bpm', color: '#ef4444' },
                      { icon: Activity, value: '8.2', unit: 'h', color: '#3b82f6' },
                      { icon: Zap, value: '45', unit: '%', color: '#7C3AED' },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6 + i * 0.1 }}
                        className="text-center"
                      >
                        <div 
                          className="w-12 h-12 rounded-xl mb-2 mx-auto flex items-center justify-center"
                          style={{ backgroundColor: `${stat.color}20` }}
                        >
                          <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                        </div>
                        <div className="text-white font-bold">{stat.value}<span className="text-xs text-white/40 ml-1">{stat.unit}</span></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ========== CTA 区块 ==========
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      {/* 背景 */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-[#7C3AED]/[0.03] to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('home', 'ctaTitle1')}
            <span className="block bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
              {t('home', 'ctaTitle2')}
            </span>
          </h2>

          <p className="text-white/40 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            {t('home', 'ctaSubtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              {t('common', 'buyNow')}
            </Button>
            <Button variant="secondary" size="lg">
              {t('home', 'bookDemo')}
            </Button>
          </div>

          {/* 价格信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-white/[0.03] border border-white/[0.05]"
          >
            <span className="text-[#7C3AED] text-3xl font-bold">¥1,299</span>
            <span className="text-white/40">{t('home', 'priceFrom')}</span>
            <div className="w-px h-8 bg-white/10" />
            <span className="text-white/60">{t('home', 'returnPolicy')}</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 主页 ==========
export default function Home() {
  return (
    <main className="relative bg-[#050505]">
      {/* 全局背景 */}
      <div className="fixed inset-0 bg-[#050505] -z-10" />
      
      {/* Hero */}
      <HeroSection />
      
      {/* Bento Features */}
      <ScrollSectionWrapper>
        <BentoFeaturesSection />
      </ScrollSectionWrapper>
      
      {/* AI Prediction */}
      <ScrollSectionWrapper>
        <AIPredictionSection />
      </ScrollSectionWrapper>
      
      {/* CTA */}
      <ScrollSectionWrapper isLast>
        <CTASection />
      </ScrollSectionWrapper>
    </main>
  );
}
