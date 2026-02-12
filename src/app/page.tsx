'use client';

import { useRef, lazy, Suspense, ReactNode, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import VideoModal from '@/components/ui/VideoModal';
import { useI18n } from '@/lib/i18n';
import { 
  ArrowRight, Play, Sparkles, Zap, Box, Cpu, Coins, Heart, Brain, Shield, Activity, Moon,
  User, Eye, Dumbbell, Coffee, Pizza, BedDouble, Pill, TrendingUp, TrendingDown, AlertTriangle,
  CheckCircle, ChevronRight, Gift, Users, FlaskConical, LucideIcon
} from 'lucide-react';
import HandDrawnIcon from '@/components/ui/HandDrawnIcon';

// 懒加载组件
const ProductScene = lazy(() => import('@/components/3d/ProductScene'));

// 3D模型加载占位组件
function SceneFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 -m-8">
          <div className="w-32 h-32 rounded-full border border-[#22D3EE]/20 animate-ping" style={{ animationDuration: '2s' }} />
        </div>
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#22D3EE]/20 to-[#06B6D4]/20 backdrop-blur flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-6 h-6 text-[#22D3EE]" />
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
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] as [number, number, number, number],
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
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] as [number, number, number, number],
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: mounted ? sectionRef : undefined,
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
  icon: LucideIcon;
  stats: string;
  color: string;
  size: string;
  features?: string[];
}; index: number }) {
  const sizeClasses = {
    large: 'md:col-span-2 md:row-span-2',
    medium: 'md:col-span-1 md:row-span-2',
    small: 'md:col-span-1 md:row-span-1',
  };

  // 根据卡片大小选择图标尺寸
  const iconSize = item.size === 'large' ? 'lg' : item.size === 'medium' ? 'md' : 'sm';

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
      {/* 背景光效 - 改为草绿色 */}
      <div 
        className="absolute -top-24 -right-24 w-48 h-48 
          bg-gradient-to-br from-[#4ADE80] to-[#4ADE80]/30
          rounded-full blur-3xl opacity-0 
          group-hover:opacity-15 
          transition-opacity duration-700"
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
          {/* 草绿色手绘风格图标 */}
          <HandDrawnIcon 
            icon={item.icon} 
            size={iconSize as 'sm' | 'md' | 'lg'} 
            variant="filled" 
            animate={true}
          />
          
          <div className="text-right">
            <span className="text-sm font-semibold text-[#4ADE80]">
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
                className="px-3 py-1 text-xs rounded-[12px_16px_14px_10px] bg-[#4ADE80]/5 text-[#4ADE80]/80 border border-dashed border-[#4ADE80]/20"
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
          className="absolute bottom-0 left-0 right-0 h-[2px]
            bg-gradient-to-r from-[#4ADE80] to-[#86EFAC]
            origin-left"
        />
      </div>
    </motion.div>
  );
}

// ========== Hero 区块 - 去AI味优化版 ==========
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useI18n();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  // 视频 URL
  const videoUrl = 'https://public-read-1252768970.cos.ap-guangzhou.myqcloud.com/1%E6%9C%8831%E6%97%A5-%E5%8D%A1%E7%82%B9.mp4';
  
  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 纯黑背景 + 微噪点纹理增加质感 */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* 有机形状装饰 - 不对称，更自然 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* 左上角有机斑块 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.4 } : {}}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute -top-20 -left-32 w-[500px] h-[400px]"
          style={{
            background: 'radial-gradient(ellipse at 30% 40%, rgba(34, 211, 238, 0.03) 0%, transparent 70%)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'rotate(-12deg)',
          }}
        />
        {/* 右下角有机斑块 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.3 } : {}}
          transition={{ duration: 2.5, delay: 0.8 }}
          className="absolute -bottom-10 -right-20 w-[450px] h-[350px]"
          style={{
            background: 'radial-gradient(ellipse at 60% 50%, rgba(74, 222, 128, 0.025) 0%, transparent 65%)',
            borderRadius: '30% 70% 70% 30% / 30% 52% 48% 70%',
            transform: 'rotate(8deg)',
          }}
        />
        {/* 中间偏右的微弱光晕 */}
        <div 
          className="absolute top-1/3 right-1/4 w-[300px] h-[250px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(6, 182, 212, 0.02) 0%, transparent 60%)',
            borderRadius: '40% 60% 55% 45% / 55% 40% 60% 45%',
          }}
        />
      </div>

      {/* 主内容 - 打破对称，左重右轻 */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 py-24">
          
          {/* 左侧文字 - 不规则间距，更有层次 */}
          <div className="flex-1 text-center lg:text-left max-w-2xl lg:pl-4">
            {/* 小标签 - 手写风格边框 */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.1}
              className="mb-6 lg:mb-7"
            >
              <span className="inline-flex items-center gap-2.5 px-4 py-2 text-white/50 text-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: '8px 12px 8px 14px', // 不对称圆角
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
                {t('home.heroTagNew')}
              </span>
            </motion.div>

            {/* 主标题 - 更有个性的排版 */}
            <motion.h1
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.2}
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white mb-5 leading-[1.15] tracking-tight"
            >
              <span className="block text-white/85 mb-1">{t('home.heroTitle1New')}</span>
              <span className="block text-[#22D3EE]">
                {t('home.heroTitle2New')}
              </span>
              <span className="block text-white/60 text-2xl sm:text-3xl lg:text-[1.75rem] font-medium mt-3">
                {t('home.heroTitle3New')}
              </span>
            </motion.h1>

            {/* 描述文案 - 更口语化、真实 */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.35}
              className="text-base sm:text-lg text-white/35 mb-8 leading-relaxed max-w-lg"
            >
              {t('home.heroDescNew1')}<br className="hidden sm:block" />
              {t('home.heroDescNew2')}<br className="hidden sm:block" />
              <span className="text-white/50">{t('home.heroDescNew3')}</span>
            </motion.p>

            {/* CTA按钮 - 主次分明，不对称 */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.5}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
            >
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                {t('home.heroCTA1')}
              </Button>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="group flex items-center gap-2 px-5 py-3 text-white/40 hover:text-white/60 transition-colors"
              >
                <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                  <Play className="w-3.5 h-3.5 ml-0.5" />
                </span>
                <span className="text-sm">{t('home.heroCTA2')}</span>
              </button>
            </motion.div>
            
            {/* 真实数据/社会证明 - 更接地气 */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0.65}
              className="mt-10 lg:mt-12"
            >
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm">
                {/* 真实用户反馈风格 */}
                <div className="flex items-center gap-2 text-white/30">
                  <span className="text-lg">👨‍⚕️</span>
                  <span>{t('home.heroProof1')}</span>
                </div>
                <div className="flex items-center gap-2 text-white/30">
                  <span className="text-lg">🔬</span>
                  <span>{t('home.heroProof2')}</span>
                </div>
              </div>
              {/* 用户评价片段 */}
              <div className="mt-4 flex items-start gap-3 p-3 rounded-xl bg-white/[0.015] border border-white/[0.03] max-w-md mx-auto lg:mx-0">
                <span className="text-2xl mt-0.5">💬</span>
                <div>
                  <p className="text-white/40 text-sm leading-relaxed italic">
                    {t('home.heroTestimonial')}
                  </p>
                  <p className="text-white/25 text-xs mt-1">{t('home.heroTestimonialAuthor')}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 右侧 3D - 稍微偏移打破对称 */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.4}
            className="flex-shrink-0 w-full lg:w-[420px] xl:w-[480px] lg:-mr-8"
          >
            <div className="relative w-full max-w-[380px] lg:max-w-[420px] mx-auto">
              <div className="relative w-full pb-[115%]">
                <div className="absolute inset-0">
                  <Suspense fallback={<SceneFallback />}>
                    <ProductScene
                      modelUrl="/cube.glb"
                      className="w-full h-full"
                      autoRotate={true}
                      rotateSpeed={0.15}
                      enableZoom={false}
                      showEllipse={false}
                      cameraPosition={[0, 0, 6]}
                    />
                  </Suspense>
                </div>
              </div>

              {/* 浮动卡片 - 更自然的位置和样式 */}
              <motion.div
                initial={{ opacity: 0, y: 15, rotate: 2 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: 2 } : {}}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute right-2 top-[22%] hidden xl:block z-10"
              >
                <div className="px-3.5 py-2.5 rounded-lg bg-[#0a0a0a]/80 backdrop-blur border border-white/[0.06]"
                  style={{ borderRadius: '10px 14px 12px 8px' }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex w-6 h-6 rounded border border-dashed border-white/15 bg-white/[0.03] items-center justify-center text-[10px] text-white/25">✕</span>
                    <div>
                      <p className="text-[#67E8F9] font-medium text-sm">{t('home.heroPetMode')}</p>
                      <p className="text-white/30 text-xs">{t('home.heroPetModeDesc')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15, rotate: -3 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: -3 } : {}}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute left-0 bottom-[28%] hidden xl:block z-10"
              >
                <div className="px-3.5 py-2.5 rounded-lg bg-[#0a0a0a]/80 backdrop-blur border border-white/[0.06]"
                  style={{ borderRadius: '8px 12px 14px 10px' }}
                >
                  <div className="flex items-center gap-2.5">
                    <Activity className="w-5 h-5 text-[#4ADE80]" />
                    <div>
                      <p className="text-[#4ADE80] font-medium text-sm">{t('home.hero30DayPredict')}</p>
                      <p className="text-white/30 text-xs">{t('home.hero30DayPredictDesc')}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 滚动指示 - 更简约 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1.5">
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1.5 rounded-full bg-white/30" 
            />
          </div>
        </motion.div>
      </motion.div>

      {/* 视频弹窗 */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={videoUrl}
        title={t('home.heroVideoTitle')}
      />
    </div>
  );
}

// ========== 生命预览交互 Demo - 去AI味优化版 ==========
function LifePreviewSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();
  const [dayValue, setDayValue] = useState(0);
  const [scenario, setScenario] = useState<'risk' | 'improve'>('risk');
  
  // 根据天数和场景计算健康指标
  const calculateMetrics = useCallback(() => {
    const progress = dayValue / 30;
    
    if (scenario === 'risk') {
      return {
        skinHealth: Math.max(30, 85 - progress * 55),
        eyeCircles: Math.min(90, 10 + progress * 80),
        bodyFat: Math.min(32, 22 + progress * 10),
        energy: Math.max(25, 80 - progress * 55),
        sleepQuality: Math.max(35, 85 - progress * 50),
        heartRate: Math.min(95, 68 + progress * 27),
        stressLevel: Math.min(85, 30 + progress * 55),
      };
    } else {
      return {
        skinHealth: Math.min(95, 60 + progress * 35),
        eyeCircles: Math.max(5, 60 - progress * 55),
        bodyFat: Math.max(18, 28 - progress * 10),
        energy: Math.min(95, 50 + progress * 45),
        sleepQuality: Math.min(92, 55 + progress * 37),
        heartRate: Math.max(62, 82 - progress * 20),
        stressLevel: Math.max(15, 70 - progress * 55),
        lungCapacity: Math.min(95, 65 + progress * 30),
      };
    }
  }, [dayValue, scenario]);
  
  const metrics = calculateMetrics();
  
  const getAvatarState = () => {
    if (scenario === 'risk') {
      if (dayValue < 10) return { mood: 'placeholder', desc: t('home.moodGood'), color: 'text-green-400' };
      if (dayValue < 20) return { mood: 'placeholder', desc: t('home.moodTired'), color: 'text-yellow-400' };
      return { mood: 'placeholder', desc: t('home.moodAdjust'), color: 'text-red-400' };
    } else {
      if (dayValue < 10) return { mood: 'placeholder', desc: t('home.moodStart'), color: 'text-cyan-400' };
      if (dayValue < 20) return { mood: 'placeholder', desc: t('home.moodProgress'), color: 'text-cyan-400' };
      return { mood: 'placeholder', desc: t('home.moodGreat'), color: 'text-green-400' };
    }
  };
  
  const avatarState = getAvatarState();

  return (
    <div ref={ref} className="relative py-20 lg:py-28 min-h-screen flex flex-col justify-center">
      {/* 背景 - 不对称有机形状 */}
      <div className="absolute inset-0 bg-[#050505]">
        <div 
          className="absolute top-[15%] left-[10%] w-[500px] h-[400px] opacity-40"
          style={{
            background: 'radial-gradient(ellipse at 40% 50%, rgba(34, 211, 238, 0.03) 0%, transparent 60%)',
            borderRadius: '60% 40% 50% 50% / 40% 50% 50% 60%',
            transform: 'rotate(-15deg)',
          }}
        />
        <div 
          className="absolute bottom-[20%] right-[5%] w-[400px] h-[350px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(74, 222, 128, 0.025) 0%, transparent 55%)',
            borderRadius: '40% 60% 45% 55% / 55% 45% 55% 45%',
            transform: 'rotate(10deg)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 - 更自然的排版 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 lg:mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            <span className="text-white/70">{t('home.lifePreviewTitle1')}</span>
            <span className="text-[#22D3EE]"> {dayValue} </span>
            <span className="text-white/70">{t('home.lifePreviewTitle2')}</span>
          </h2>
          
          <p className="text-white/35 max-w-md mx-auto text-base">
            {t('home.lifePreviewSubtitle')}
          </p>
        </motion.div>

        {/* 场景切换 - 更朴素的样式 */}
        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => { setScenario('risk'); setDayValue(0); }}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl transition-all duration-300 ${
              scenario === 'risk'
                ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                : 'bg-white/[0.02] border border-white/[0.04] text-white/40 hover:text-white/60'
            }`}
          >
            <span className="inline-flex w-5 h-5 rounded border border-dashed border-white/20 bg-white/[0.03] items-center justify-center text-[10px] text-white/30">✕</span>
            <span className="text-sm font-medium">{t('home.scenarioRisk')}</span>
          </button>
          <button
            onClick={() => { setScenario('improve'); setDayValue(0); }}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl transition-all duration-300 ${
              scenario === 'improve'
                ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                : 'bg-white/[0.02] border border-white/[0.04] text-white/40 hover:text-white/60'
            }`}
          >
            <span className="inline-flex w-5 h-5 rounded border border-dashed border-white/20 bg-white/[0.03] items-center justify-center text-[10px] text-white/30">✕</span>
            <span className="text-sm font-medium">{t('home.scenarioImprove')}</span>
          </button>
        </div>

        {/* 主内容区 - 不对称布局 */}
        <div className="grid lg:grid-cols-[1fr_1.2fr_1fr] gap-6 lg:gap-8 items-center">
          {/* 左侧行为 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-3"
          >
            <p className="text-sm text-white/40 mb-3 flex items-center gap-2">
              {scenario === 'risk' ? t('home.behaviorDoingNow') : t('home.behaviorHabits')}
            </p>
            
            {scenario === 'risk' ? (
              <>
                <BehaviorCard icon={BedDouble} label={t('home.sleepLabel')} value={t('home.sleepRiskValue')} color="red" />
                <BehaviorCard icon={Coffee} label={t('home.caffeine')} value={t('home.caffeineValue')} color="orange" />
                <BehaviorCard icon={Pizza} label={t('home.dietLabel')} value={t('home.dietRiskValue')} color="red" />
              </>
            ) : (
              <>
                <BehaviorCard icon={Dumbbell} label={t('home.exerciseLabel')} value={t('home.exerciseGoodValue')} color="green" />
                <BehaviorCard icon={Pill} label={t('home.supplementLabel')} value={t('home.supplementGoodValue')} color="cyan" />
                <BehaviorCard icon={BedDouble} label={t('home.scheduleLabel')} value={t('home.sleepGoodValue')} color="green" />
              </>
            )}
          </motion.div>

          {/* 中间形象 - 简化 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-[280px] mx-auto">
              {/* 简单的背景光晕 */}
              <div className={`absolute inset-4 rounded-full blur-2xl transition-colors duration-700 ${
                scenario === 'risk' 
                  ? dayValue > 20 ? 'bg-red-500/8' : dayValue > 10 ? 'bg-yellow-500/8' : 'bg-green-500/6'
                  : dayValue > 20 ? 'bg-green-500/10' : 'bg-cyan-500/6'
              }`} />
              
              {/* 中心内容 */}
              <div className="absolute inset-6 rounded-2xl bg-white/[0.015] border border-white/[0.04] flex flex-col items-center justify-center"
                style={{ borderRadius: '20px 24px 22px 18px' }}
              >
                <motion.div 
                  key={avatarState.mood}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="mb-3 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-xl border-2 border-dashed border-white/20 bg-white/[0.03] flex items-center justify-center">
                    <span className="text-2xl font-light text-white/30">✕</span>
                  </div>
                  <span className="text-[10px] text-white/30 mt-1">占位图</span>
                </motion.div>
                <span className={`font-medium text-base ${avatarState.color}`}>
                  {avatarState.desc}
                </span>
                <span className="text-white/30 text-sm mt-1">
                  {t('home.dayLabel')} {dayValue} {t('home.dayUnit')}
                </span>
                
                {/* 简化的健康分 */}
                <div className="mt-4 px-3 py-1.5 rounded-lg bg-white/[0.03]">
                  <span className="text-xs text-white/40">{t('home.overallScore')} </span>
                  <span className={`font-bold ${
                    metrics.energy > 70 ? 'text-green-400' : metrics.energy > 40 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {Math.round(metrics.energy)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 右侧指标 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-3"
          >
            <p className="text-sm text-white/40 mb-3 flex items-center gap-2">
              {t('home.bodyChangePrediction')}
            </p>
            
            <MetricBar label={t('home.skinHealth')} value={metrics.skinHealth} icon={User} color={metrics.skinHealth > 60 ? 'green' : metrics.skinHealth > 40 ? 'yellow' : 'red'} />
            <MetricBar label={t('home.sleepQuality')} value={metrics.sleepQuality} icon={Moon} color={metrics.sleepQuality > 60 ? 'green' : metrics.sleepQuality > 40 ? 'yellow' : 'red'} />
            <MetricBar label={t('home.energyLevel')} value={metrics.energy} icon={Zap} color={metrics.energy > 60 ? 'green' : metrics.energy > 40 ? 'yellow' : 'red'} />
            <MetricBar label={t('home.stressLevel')} value={metrics.stressLevel} icon={Brain} color={metrics.stressLevel < 40 ? 'green' : metrics.stressLevel < 60 ? 'yellow' : 'red'} inverted />
          </motion.div>
        </div>

        {/* 时间滑块 - 简化 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <div className="relative px-2">
            <div className="flex justify-between text-xs text-white/25 mb-2">
              <span>{t('home.today')}</span>
              <span>10{t('home.dayUnit')}</span>
              <span>20{t('home.dayUnit')}</span>
              <span>30{t('home.dayUnit')}</span>
            </div>
            
            <div className="relative h-2 bg-white/[0.04] rounded-full overflow-hidden">
              <motion.div
                className={`absolute left-0 top-0 h-full rounded-full ${
                  scenario === 'risk'
                    ? 'bg-gradient-to-r from-green-500/80 via-yellow-500/80 to-red-500/80'
                    : 'bg-gradient-to-r from-cyan-500/60 via-cyan-400/70 to-green-500/80'
                }`}
                style={{ width: `${(dayValue / 30) * 100}%` }}
              />
              
              <input
                type="range"
                min="0"
                max="30"
                value={dayValue}
                onChange={(e) => setDayValue(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-md cursor-pointer pointer-events-none"
                style={{ left: `calc(${(dayValue / 30) * 100}% - 8px)` }}
              />
            </div>
          </div>
          
          {/* 底部说明 - 更低调 */}
          <p className="text-center text-white/20 text-xs mt-5">
            {t('home.predictionNote')}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// 行为卡片组件
function BehaviorCard({ icon: Icon, label, value, color }: { 
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  value: string; 
  color: 'red' | 'orange' | 'green' | 'cyan';
}) {
  const colorClasses = {
    red: 'from-red-500/20 to-red-500/5 border-red-500/20 text-red-400',
    orange: 'from-orange-500/20 to-orange-500/5 border-orange-500/20 text-orange-400',
    green: 'from-green-500/20 to-green-500/5 border-green-500/20 text-green-400',
    cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-400',
  };
  
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r ${colorClasses[color]} border`}>
      <Icon className="w-5 h-5" />
      <div className="flex-1">
        <div className="text-sm text-white/60">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}

// 指标进度条组件
function MetricBar({ label, value, icon: Icon, color, inverted = false }: { 
  label: string; 
  value: number; 
  icon: React.ComponentType<{ className?: string }>;
  color: 'green' | 'yellow' | 'red';
  inverted?: boolean;
}) {
  const colorClasses = {
    green: 'from-green-500 to-emerald-500',
    yellow: 'from-yellow-500 to-orange-500',
    red: 'from-red-500 to-rose-500',
  };
  
  const displayValue = inverted ? 100 - value : value;
  
  return (
    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-white/40" />
          <span className="text-sm text-white/60">{label}</span>
        </div>
        <motion.span 
          className={`font-semibold ${
            color === 'green' ? 'text-green-400' : color === 'yellow' ? 'text-yellow-400' : 'text-red-400'
          }`}
          key={Math.round(value)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {Math.round(inverted ? value : displayValue)}%
        </motion.span>
      </div>
      <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${colorClasses[color]}`}
          initial={{ width: 0 }}
          animate={{ width: `${displayValue}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// ========== 核心入口区块 - 去AI味优化版 ==========
function QuickAccessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  const accessItems = [
    {
      id: 'hardware',
      icon: Box,
      titleKey: 'accessHardwareTitle',
      subtitleKey: 'accessHardwareSubtitle',
      descKey: 'accessHardwareDesc',
      href: '/products',
    },
    {
      id: 'twin',
      icon: Users,
      titleKey: 'accessTwinTitle',
      subtitleKey: 'accessTwinSubtitle',
      descKey: 'accessTwinDesc',
      href: '/technology',
    },
    {
      id: 'rewards',
      icon: Gift,
      titleKey: 'accessRewardsTitle',
      subtitleKey: 'accessRewardsSubtitle',
      descKey: 'accessRewardsDesc',
      href: '/ecosystem',
    },
  ];

  return (
    <div ref={ref} className="relative py-20 lg:py-28 min-h-[80vh] flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        {/* 不对称有机背景 */}
        <div 
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 45% 50%, rgba(74, 222, 128, 0.02) 0%, transparent 60%)',
            borderRadius: '55% 45% 40% 60% / 60% 40% 60% 40%',
            transform: 'rotate(-5deg)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* 标题 - 简化 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {t('home.quickAccessTitle')}
          </h2>
          <p className="text-white/35 text-base">
            {t('home.quickAccessSubtitle')}
          </p>
        </motion.div>

        {/* 卡片 - 不对称网格 */}
        <div className="grid md:grid-cols-3 gap-4 lg:gap-5">
          {accessItems.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.href}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-white/[0.015] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-400 cursor-pointer"
              style={{ borderRadius: index === 0 ? '16px 20px 18px 14px' : index === 1 ? '18px 16px 20px 16px' : '14px 18px 16px 20px' }}
            >
              {/* 手绘风格图标 */}
              <div className="mb-4">
                <HandDrawnIcon icon={item.icon} size="lg" variant="filled" animate={true} />
              </div>
              
              <span className="text-xs text-white/30 uppercase tracking-wider">{t(`home.${item.subtitleKey}`)}</span>
              <h3 className="text-xl font-semibold text-white mt-1 mb-2 group-hover:text-[#67E8F9] transition-colors">
                {t(`home.${item.titleKey}`)}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed">
                {t(`home.${item.descKey}`)}
              </p>
              
              <div className="mt-4 flex items-center text-white/30 group-hover:text-[#22D3EE] transition-colors text-sm">
                <span>{t('home.learnMore')}</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== Bento Features 区块 - 去AI味优化版 ==========
function BentoFeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  const bentoItems = [
    {
      id: 'hardware',
      titleKey: 'bentoBox',
      subtitleKey: 'bentoBoxSubtitle',
      descKey: 'bentoBoxDesc',
      icon: Box,
      statsKey: 'bentoBoxStats',
      color: 'from-[#22D3EE] to-[#22D3EE]/50',
      size: 'large',
      featureKeys: ['bentoBoxF1', 'bentoBoxF2', 'bentoBoxF3'],
    },
    {
      id: 'digital-twin',
      titleKey: 'bentoTwinNew',
      subtitleKey: 'bentoTwinNewSubtitle',
      descKey: 'bentoTwinNewDesc',
      icon: Cpu,
      statsKey: 'bentoTwinNewStats',
      color: 'from-[#06B6D4] to-[#06B6D4]/50',
      size: 'medium',
      featureKeys: ['bentoTwinNewF1', 'bentoTwinNewF2'],
    },
    {
      id: 'rewards',
      titleKey: 'bentoRewardsNew',
      subtitleKey: 'bentoRewardsNewSubtitle',
      descKey: 'bentoRewardsNewDesc',
      icon: Coins,
      statsKey: 'bentoRewardsNewStats',
      color: 'from-[#4ADE80] to-[#4ADE80]/50',
      size: 'medium',
      featureKeys: ['bentoRewardsNewF1', 'bentoRewardsNewF2'],
    },
    {
      id: 'heart',
      titleKey: 'bentoHeartNew',
      subtitleKey: 'bentoHeartNewSubtitle',
      descKey: 'bentoHeartNewDesc',
      icon: Heart,
      statsKey: 'bentoHeartNewStats',
      color: 'from-[#ef4444] to-[#ef4444]/50',
      size: 'small',
    },
    {
      id: 'sleep',
      titleKey: 'bentoSleepNew',
      subtitleKey: 'bentoSleepNewSubtitle',
      descKey: 'bentoSleepNewDesc',
      icon: Moon,
      statsKey: 'bentoSleepNewStats',
      color: 'from-[#22D3EE] to-[#22D3EE]/50',
      size: 'small',
    },
    {
      id: 'ai',
      titleKey: 'bentoAINew',
      subtitleKey: 'bentoAINewSubtitle',
      descKey: 'bentoAINewDesc',
      icon: Brain,
      statsKey: 'bentoAINewStats',
      color: 'from-[#06b6d4] to-[#06b6d4]/50',
      size: 'small',
    },
    {
      id: 'security',
      titleKey: 'bentoSecurityNew',
      subtitleKey: 'bentoSecurityNewSubtitle',
      descKey: 'bentoSecurityNewDesc',
      icon: Shield,
      statsKey: 'bentoSecurityNewStats',
      color: 'from-[#4ADE80] to-[#4ADE80]/50',
      size: 'small',
    },
  ];

  // 将 bentoItems 转换为 BentoCard 需要的格式
  const processedBentoItems = bentoItems.map(item => ({
    ...item,
    title: t(`home.${item.titleKey}`),
    subtitle: t(`home.${item.subtitleKey}`),
    description: t(`home.${item.descKey}`),
    stats: t(`home.${item.statsKey}`),
    features: item.featureKeys?.map(key => t(`home.${key}`)),
  }));

  return (
    <div ref={ref} className="relative py-20 lg:py-28 min-h-screen flex flex-col justify-center">
      {/* 背景 */}
      <div className="absolute inset-0 bg-[#050505]">
        <div 
          className="absolute top-[10%] left-[15%] w-[400px] h-[350px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 40% 50%, rgba(34, 211, 238, 0.02) 0%, transparent 55%)',
            borderRadius: '50% 50% 40% 60% / 60% 40% 60% 40%',
            transform: 'rotate(-8deg)',
          }}
        />
        <div 
          className="absolute bottom-[15%] right-[10%] w-[350px] h-[300px] opacity-25"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.02) 0%, transparent 50%)',
            borderRadius: '40% 60% 50% 50% / 50% 50% 50% 50%',
            transform: 'rotate(12deg)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            {t('home.bentoTitle')}
          </h2>
          <p className="text-white/35 max-w-lg mx-auto text-base">
            {t('home.bentoSubtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[minmax(160px,auto)]">
          {processedBentoItems.map((item, index) => (
            <BentoCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* 底部 - 简化的社会证明 */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-5 py-3 rounded-xl bg-white/[0.015] border border-white/[0.03]"
            style={{ borderRadius: '10px 14px 12px 16px' }}
          >
            <div className="flex items-center gap-2">
              <HandDrawnIcon icon={Shield} size="sm" variant="outline" animate={false} />
              <span className="text-white/40 text-sm">{t('home.bentoGDPR')}</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2">
              <HandDrawnIcon icon={FlaskConical} size="sm" variant="outline" animate={false} />
              <span className="text-white/40 text-sm">{t('home.bentoNTU')}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== AI 预测区块 - 去AI味优化版 ==========
function AIPredictionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  const predictionItems = [
    { labelKey: 'aiHeartPrediction', value: '95%', color: '#ef4444' },
    { labelKey: 'aiSleepPrediction', value: '89%', color: '#22D3EE' },
    { labelKey: 'aiStressPrediction', value: '87%', color: '#4ADE80' },
  ];

  return (
    <div ref={ref} className="relative py-20 lg:py-28 min-h-[85vh] flex items-center">
      {/* 背景 */}
      <div className="absolute inset-0 bg-[#050505]">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[450px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 50% 45%, rgba(74, 222, 128, 0.025) 0%, transparent 55%)',
            borderRadius: '45% 55% 50% 50% / 50% 45% 55% 50%',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm text-white/30 mb-3 block">{t('home.aiTagNew')}</span>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              {t('home.aiTitle1New')}<br />
              <span className="text-[#4ADE80]">{t('home.aiTitle2New')}</span>
            </h2>

            <p className="text-white/35 text-base mb-6 leading-relaxed max-w-md">
              {t('home.aiDescNew1')}<br />
              <span className="text-white/50">{t('home.aiDescNew2')}</span>
            </p>

            <div className="space-y-3 mb-6">
              {predictionItems.map((item, index) => (
                <motion.div
                  key={item.labelKey}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.08 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.015] border border-white/[0.03]"
                  style={{ borderRadius: index === 0 ? '10px 12px 10px 8px' : index === 1 ? '8px 10px 12px 10px' : '10px 8px 10px 12px' }}
                >
                  <span className="text-white/50 text-sm">{t(`home.${item.labelKey}`)}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: item.value } : {}}
                        transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                    <span className="text-white/70 font-medium text-sm w-10">{item.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              {t('home.startHealthPrediction')}
            </Button>
            
            <p className="text-white/20 text-xs mt-3">
              {t('home.aiPredictionNote')}
            </p>
          </motion.div>

          {/* 右侧 - 简化的可视化 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-sm mx-auto">
              {/* 简单背景 */}
              <div className="absolute inset-0 rounded-2xl bg-white/[0.01] border border-white/[0.03]"
                style={{ borderRadius: '18px 22px 20px 16px' }}
              />
              
              <div className="relative w-full h-full p-8 flex flex-col justify-center">
                {/* 中心数字 */}
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-white mb-1">
                    89<span className="text-2xl text-white/40">{t('home.scoreUnit')}</span>
                  </div>
                  <div className="text-white/35 text-sm">{t('home.overallHealthScore')}</div>
                </div>
                
                {/* 简化的指标 */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: '72', unit: 'bpm', labelKey: 'heartRateLabel' },
                    { value: '7.5', unit: 'h', labelKey: 'sleepLabel2' },
                    { value: '6k', unitKey: 'stepsUnit', labelKey: 'exerciseLabel2' },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="text-center"
                    >
                      <span className="inline-flex w-8 h-8 rounded border border-dashed border-white/15 bg-white/[0.03] items-center justify-center text-xs text-white/25 mb-1">✕</span>
                      <div className="text-white font-medium text-lg">
                        {stat.value}<span className="text-xs text-white/30 ml-0.5">{stat.unitKey ? t(`home.${stat.unitKey}`) : stat.unit}</span>
                      </div>
                      <div className="text-white/25 text-xs">{t(`home.${stat.labelKey}`)}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ========== CTA 区块 - 去AI味优化版 ==========
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-20 lg:py-28 min-h-[80vh] flex items-center">
      {/* 背景 */}
      <div className="absolute inset-0 bg-[#050505]">
        <div 
          className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] opacity-25"
          style={{
            background: 'radial-gradient(ellipse at 50% 70%, rgba(34, 211, 238, 0.03) 0%, transparent 55%)',
            borderRadius: '50% 50% 45% 55% / 40% 40% 60% 60%',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Logo图标 */}
          <div className="mb-6 flex justify-center">
            <div className="w-48 h-16">
              <Image src="/logo.png" alt="Orbiva" width={384} height={128} className="w-full h-full object-contain" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('home.ctaTitleNew')}
          </h2>
          
          <p className="text-white/35 text-base mb-8 max-w-md mx-auto leading-relaxed">
            {t('home.ctaDescNew1')}<br />
            {t('home.ctaDescNew2')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              {t('home.ctaFreeTrial')}
            </Button>
            <button className="px-5 py-3 text-white/40 hover:text-white/60 transition-colors text-sm">
              {t('home.ctaBookOffline')}
            </button>
          </div>

          {/* 价格 - 更朴素的展示 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white/[0.015] border border-white/[0.03]"
            style={{ borderRadius: '12px 16px 14px 10px' }}
          >
            <span className="text-[#22D3EE] text-2xl font-bold">{t('home.ctaPrice')}</span>
            <span className="text-white/30 text-sm">{t('home.ctaPriceStart')}</span>
            <span className="text-white/15">|</span>
            <span className="text-white/30 text-sm">{t('home.ctaPriceNote')}</span>
          </motion.div>
          
          {/* 小字说明 */}
          <p className="text-white/15 text-xs mt-6">
            {t('home.ctaPriceInfo')}
          </p>
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
      
      {/* 生命预览交互 Demo - 新增 */}
      <ScrollSectionWrapper>
        <LifePreviewSection />
      </ScrollSectionWrapper>
      
      {/* 核心入口 - 新增 */}
      <ScrollSectionWrapper>
        <QuickAccessSection />
      </ScrollSectionWrapper>
      
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
