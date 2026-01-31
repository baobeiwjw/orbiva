'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';
import {
  Box,
  Sparkles,
  Heart,
  Brain,
  Battery,
  Shield,
  Bluetooth,
  Mic,
  Smartphone,
  Wifi,
  ArrowRight,
  Check,
  Monitor,
  Sofa,
  Bed,
  Dumbbell,
  Droplet,
  Activity,
} from 'lucide-react';

// ========== 动画变体 ==========
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

// ========== 滚动区块包装组件 ==========
function ScrollSectionWrapper({ 
  children, 
  className = '', 
  isLast = false 
}: { 
  children: React.ReactNode; 
  className?: string; 
  isLast?: boolean;
}) {
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

// ========== Hero 区块 ==========
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* 背景 */}
      <div className="absolute inset-0 bg-[#050505]" />
      
      {/* 椭圆装饰 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute w-[160vw] h-[80vh] border border-white/[0.04] rounded-[50%]"
          style={{ transform: 'rotate(-5deg)' }}
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute w-[130vw] h-[60vh] border border-[#7C3AED]/[0.05] rounded-[50%]"
        />
      </div>

      <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-[#7C3AED]/[0.02] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm">
            <Box className="w-4 h-4 text-[#7C3AED]" />
            {t('products', 'heroTag')}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {t('products', 'heroTitle1')}
          <span className="block bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
            {t('products', 'heroTitle2')}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.35}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto"
        >
          {t('products', 'heroSubtitle')}
        </motion.p>
      </div>

      {/* 滚动指示器 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
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
    </div>
  );
}

// ========== VivaBox 区块 ==========
function VivaBoxSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  const vivaboxFeatures = [
    { icon: Mic, title: t('products', 'featureVoice'), description: t('products', 'featureVoiceDesc') },
    { icon: Heart, title: t('products', 'featureSensor'), description: t('products', 'featureSensorDesc') },
    { icon: Brain, title: t('products', 'featurePredict'), description: t('products', 'featurePredictDesc') },
    { icon: Battery, title: t('products', 'featureBattery'), description: t('products', 'featureBatteryDesc') },
    { icon: Shield, title: t('products', 'featurePrivacy'), description: t('products', 'featurePrivacyDesc') },
    { icon: Bluetooth, title: t('products', 'featureConnect'), description: t('products', 'featureConnectDesc') },
  ];

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7C3AED]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 左侧产品展示 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/10 rounded-3xl blur-3xl" />
              
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full rounded-3xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-28 h-28 mx-auto rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center mb-6"
                  >
                    <Sparkles className="w-14 h-14 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white">VivaBox</h3>
                  <p className="text-white/40">{t('products', 'vivaboxSubtitle')}</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-sm"
              >
                <span className="text-[#7C3AED] font-medium">{t('products', 'vivaboxSmall')}</span>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-sm"
              >
                <span className="text-[#06B6D4] font-medium">{t('products', 'vivaboxWeight')}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* 右侧信息 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-sm font-medium mb-4">
              {t('products', 'vivaboxTag')}
            </span>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('products', 'vivaboxTitle')}
              <span className="block text-xl font-normal text-white/40 mt-2">
                {t('products', 'vivaboxSubtitle')}
              </span>
            </h2>
            
            <p className="text-white/40 mb-8 text-lg">
              {t('products', 'vivaboxDesc')}
            </p>

            {/* Bento 特性卡片 */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {vivaboxFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.08 }}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] group hover:border-white/[0.1] transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20 flex items-center justify-center mb-3">
                    <feature.icon className="w-5 h-5 text-[#7C3AED]" />
                  </div>
                  <h4 className="font-medium text-white text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-white/40">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                {t('products', 'vivaboxBuy')}
              </Button>
              <Button variant="secondary">{t('products', 'vivaboxSpecs')}</Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ========== 数字孪生区块 ==========
function DigitalTwinSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activeTwinMode, setActiveTwinMode] = useState('pet');
  const { t } = useI18n();

  const digitalTwinModes = [
    {
      id: 'pet',
      name: t('products', 'twinPet'),
      description: t('products', 'twinPetDesc'),
      features: [
        t('products', 'twinPetFeature1'),
        t('products', 'twinPetFeature2'),
        t('products', 'twinPetFeature3'),
        t('products', 'twinPetFeature4'),
      ],
      preview: '🐱',
    },
    {
      id: 'medical',
      name: t('products', 'twinMedical'),
      description: t('products', 'twinMedicalDesc'),
      features: [
        t('products', 'twinMedicalFeature1'),
        t('products', 'twinMedicalFeature2'),
        t('products', 'twinMedicalFeature3'),
        t('products', 'twinMedicalFeature4'),
      ],
      preview: '📊',
    },
  ];

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#EC4899]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <Brain className="w-4 h-4 text-[#EC4899]" />
            {t('products', 'twinTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('products', 'twinTitle')}
            <span className="bg-gradient-to-r from-[#EC4899] to-[#a78bfa] bg-clip-text text-transparent">
              {t('products', 'twinTitle2')}
            </span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('products', 'twinDesc')}
          </p>
        </motion.div>

        {/* 切换按钮 */}
        <div className="flex justify-center gap-4 mb-12">
          {digitalTwinModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveTwinMode(mode.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all ${
                activeTwinMode === mode.id
                  ? 'bg-[#EC4899] text-white'
                  : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.05] border border-white/[0.05]'
              }`}
            >
              {mode.name}
            </button>
          ))}
        </div>

        {/* 内容 */}
        <AnimatePresence mode="wait">
          {digitalTwinModes
            .filter((mode) => mode.id === activeTwinMode)
            .map((mode) => (
              <motion.div
                key={mode.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 lg:order-1">
                  <div className="p-12 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-center">
                    <div className="text-8xl mb-6">{mode.preview}</div>
                    <p className="text-white/40">{mode.name} {t('products', 'twinPreview')}</p>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl font-bold text-white mb-4">{mode.name}</h3>
                  <p className="text-white/40 mb-8">{mode.description}</p>
                  <ul className="space-y-3">
                    {mode.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-[#EC4899]/20 flex items-center justify-center">
                          <Check className="w-4 h-4 text-[#EC4899]" />
                        </div>
                        <span className="text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ========== HomeCare 生态 Bento Grid ==========
function HomeCareSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  const homecareProducts = [
    { id: 'cushion', name: t('products', 'productCushion'), icon: Sofa, features: [t('products', 'productCushionF1'), t('products', 'productCushionF2'), t('products', 'productCushionF3')] },
    { id: 'mirror', name: t('products', 'productMirror'), icon: Monitor, features: [t('products', 'productMirrorF1'), t('products', 'productMirrorF2'), t('products', 'productMirrorF3')] },
    { id: 'sleep', name: t('products', 'productSleep'), icon: Bed, features: [t('products', 'productSleepF1'), t('products', 'productSleepF2'), t('products', 'productSleepF3')] },
    { id: 'lactate', name: t('products', 'productLactate'), icon: Dumbbell, features: [t('products', 'productLactateF1'), t('products', 'productLactateF2'), t('products', 'productLactateF3')] },
    { id: 'hydration', name: t('products', 'productHydration'), icon: Droplet, features: [t('products', 'productHydrationF1'), t('products', 'productHydrationF2'), t('products', 'productHydrationF3')] },
    { id: 'scale', name: t('products', 'productScale'), icon: Activity, features: [t('products', 'productScaleF1'), t('products', 'productScaleF2'), t('products', 'productScaleF3')] },
  ];

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <Wifi className="w-4 h-4 text-[#06B6D4]" />
            {t('products', 'homecareTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('products', 'homecareTitle')}
            <span className="bg-gradient-to-r from-[#06B6D4] to-[#7C3AED] bg-clip-text text-transparent">
              {t('products', 'homecareTitle2')}
            </span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('products', 'homecareDesc')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {homecareProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#06B6D4]/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] flex items-center justify-center">
                  <product.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-white text-lg group-hover:text-[#06B6D4] transition-colors">
                  {product.name}
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 text-xs rounded-full bg-white/[0.03] text-white/60 border border-white/[0.05]"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 连接提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <Wifi className="w-6 h-6 text-[#06B6D4]" />
            <span className="text-white/60">{t('products', 'homecareConnect')}</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== App 区块 ==========
function AppSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  const appFeatures = [
    t('products', 'appFeature1'),
    t('products', 'appFeature2'),
    t('products', 'appFeature3'),
    t('products', 'appFeature4'),
    t('products', 'appFeature5'),
  ];

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-[#3b82f6]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 左侧内容 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
              <Smartphone className="w-4 h-4 text-[#3b82f6]" />
              {t('products', 'appTag')}
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('products', 'appTitle')}
              <span className="block text-xl font-normal text-white/40 mt-2">
                {t('products', 'appSubtitle')}
              </span>
            </h2>
            
            <p className="text-white/40 mb-8 text-lg">
              {t('products', 'appDesc')}
            </p>

            <ul className="space-y-4 mb-8">
              {appFeatures.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#3b82f6]/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#3b82f6]" />
                  </div>
                  <span className="text-white">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary">{t('products', 'appStore')}</Button>
              <Button variant="secondary">{t('products', 'googlePlay')}</Button>
            </div>
          </motion.div>

          {/* 右侧手机展示 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative max-w-xs mx-auto">
              <div className="relative rounded-[3rem] bg-white/[0.02] border-4 border-white/[0.05] p-4 aspect-[9/19]">
                <div className="w-full h-full rounded-[2.5rem] bg-[#0a0a0a] flex items-center justify-center">
                  <div className="text-center">
                    <Smartphone className="w-16 h-16 text-[#3b82f6] mx-auto mb-4" />
                    <p className="text-white/40">{t('products', 'appPreview')}</p>
                  </div>
                </div>
              </div>
              
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-sm"
              >
                <Heart className="w-4 h-4 text-red-500 inline mr-2" />
                <span className="text-white">72 bpm</span>
              </motion.div>
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

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('products', 'ctaTitle1')}
            <span className="block bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
              {t('products', 'ctaTitle2')}
            </span>
          </h2>

          <p className="text-white/40 text-lg mb-10 max-w-2xl mx-auto">
            {t('products', 'ctaDesc')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              {t('common', 'buyNow')}
            </Button>
            <Button variant="secondary" size="lg">
              {t('products', 'bookDemo')}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 主页面 ==========
export default function ProductsPage() {
  return (
    <main className="relative bg-[#050505]">
      <div className="fixed inset-0 bg-[#050505] -z-10" />
      
      {/* Hero */}
      <HeroSection />
      
      {/* VivaBox */}
      <ScrollSectionWrapper>
        <VivaBoxSection />
      </ScrollSectionWrapper>
      
      {/* Digital Twin */}
      <ScrollSectionWrapper>
        <DigitalTwinSection />
      </ScrollSectionWrapper>
      
      {/* HomeCare */}
      <ScrollSectionWrapper>
        <HomeCareSection />
      </ScrollSectionWrapper>
      
      {/* App */}
      <ScrollSectionWrapper>
        <AppSection />
      </ScrollSectionWrapper>
      
      {/* CTA */}
      <ScrollSectionWrapper isLast>
        <CTASection />
      </ScrollSectionWrapper>
    </main>
  );
}
