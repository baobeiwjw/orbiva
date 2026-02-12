'use client';

import { useState, useRef, useCallback } from 'react';
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
  Cpu,
  Eye,
  Fingerprint,
  Zap,
  RotateCcw,
  Signal,
  ThermometerSun,
  Scan,
  Camera,
  Users,
  TrendingUp,
  FileText,
  Share2,
} from 'lucide-react';
import HandDrawnIcon from '@/components/ui/HandDrawnIcon';

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

// ========== VivaBox 规格数据 (使用翻译键) ==========
const vivaboxSpecsConfig = {
  dimensions: {
    sizeKey: 'specSize',
    weightKey: 'specWeight',
    thicknessKey: 'specThickness',
  },
  connectivity: {
    networkKey: 'specNetwork',
    bluetoothKey: 'specBluetooth',
    nfcKey: 'specNfc',
  },
  processing: {
    npuKey: 'specNpu',
    memoryKey: 'specMemory',
    storageKey: 'specStorage',
  },
  battery: {
    capacityKey: 'specBatteryCapacity',
    chargingKey: 'specCharging',
    standbyKey: 'specStandby',
  },
};

const vivaboxFaceAConfig = {
  nameKey: 'faceAName',
  descKey: 'faceADesc',
  features: [
    { icon: ThermometerSun, nameKey: 'faceAFeature1Name', descKey: 'faceAFeature1Desc' },
    { icon: Scan, nameKey: 'faceAFeature2Name', descKey: 'faceAFeature2Desc' },
    { icon: Fingerprint, nameKey: 'faceAFeature3Name', descKey: 'faceAFeature3Desc' },
    { icon: Zap, nameKey: 'faceAFeature4Name', descKey: 'faceAFeature4Desc' },
  ],
};

const vivaboxFaceBConfig = {
  nameKey: 'faceBName',
  descKey: 'faceBDesc',
  features: [
    { icon: Monitor, nameKey: 'faceBFeature1Name', descKey: 'faceBFeature1Desc' },
    { icon: Mic, nameKey: 'faceBFeature2Name', descKey: 'faceBFeature2Desc' },
    { icon: Camera, nameKey: 'faceBFeature3Name', descKey: 'faceBFeature3Desc' },
    { icon: Activity, nameKey: 'faceBFeature4Name', descKey: 'faceBFeature4Desc' },
  ],
};

// ========== HomeCare 生态产品数据 (使用翻译键) ==========
const homecareProductsConfig = [
  { 
    id: 'cushion', 
    nameKey: 'productCushion', 
    icon: Sofa, 
    descKey: 'productCushionDesc',
    featureKeys: ['productCushionF1', 'productCushionF2', 'productCushionF3', 'productCushionF4'],
    color: 'from-[#06B6D4] to-[#22D3EE]',
    specs: { sensorsKey: 'specSensors', batteryKey: 'specBattery6mo', syncKey: 'specRealtime' },
  },
  { 
    id: 'mirror', 
    nameKey: 'productMirror', 
    icon: Monitor, 
    descKey: 'productMirrorDesc',
    featureKeys: ['productMirrorF1', 'productMirrorF2', 'productMirrorF3', 'productMirrorF4'],
    color: 'from-[#4ADE80] to-[#67E8F9]',
    specs: { resolutionKey: 'specResolution4K', aiKey: 'specRealtime', privacyKey: 'specLocalProcess' },
  },
  { 
    id: 'sleep', 
    nameKey: 'productSleep', 
    icon: Bed, 
    descKey: 'productSleepDesc',
    featureKeys: ['productSleepF1', 'productSleepF2', 'productSleepF3', 'productSleepF4'],
    color: 'from-[#22D3EE] to-[#22D3EE]',
    specs: { accuracyKey: 'specAccuracy95', placementKey: 'specUnderMattress', batteryKey: 'specRechargeable' },
  },
  { 
    id: 'lactate', 
    nameKey: 'productLactate', 
    icon: Dumbbell, 
    descKey: 'productLactateDesc',
    featureKeys: ['productLactateF1', 'productLactateF2', 'productLactateF3', 'productLactateF4'],
    color: 'from-[#22D3EE] to-[#06B6D4]',
    specs: { methodKey: 'specNirMethod', accuracyKey: 'specLactateAccuracy', responseKey: 'specRealtime' },
  },
  { 
    id: 'hydration', 
    nameKey: 'productHydration', 
    icon: Droplet, 
    descKey: 'productHydrationDesc',
    featureKeys: ['productHydrationF1', 'productHydrationF2', 'productHydrationF3', 'productHydrationF4'],
    color: 'from-[#06B6D4] to-[#22D3EE]',
    specs: { capacityKey: 'specUniversalCup', batteryKey: 'specBattery3mo', waterprofKey: 'specIP67' },
  },
  { 
    id: 'scale', 
    nameKey: 'productScale', 
    icon: Activity, 
    descKey: 'productScaleDesc',
    featureKeys: ['productScaleF1', 'productScaleF2', 'productScaleF3', 'productScaleF4'],
    color: 'from-[#4ADE80] to-[#f43f5e]',
    specs: { electrodesKey: 'specElectrodes8', metricsKey: 'specMetrics15', usersKey: 'specUnlimited' },
  },
];

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
          className="absolute w-[130vw] h-[60vh] border border-[#22D3EE]/[0.05] rounded-[50%]"
        />
      </div>

      <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-[#22D3EE]/[0.02] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm">
            <HandDrawnIcon icon={Box} size="sm" variant="outline" />
            {t('products.heroTag')}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {t('products.heroTitle1')}
          <span className="block bg-gradient-to-r from-[#22D3EE] to-[#06B6D4] bg-clip-text text-transparent">
            {t('products.heroTitle2')}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.35}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto mb-8"
        >
          {t('products.heroSubtitle')}
        </motion.p>

        {/* 产品预览卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <div className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <span className="text-[#22D3EE] font-bold">VivaBox</span>
            <span className="text-white/40 ml-2">{t('products.vivaboxTag')}</span>
          </div>
          <div className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <span className="text-[#06B6D4] font-bold">{t('products.homecareCount')}</span>
            <span className="text-white/40 ml-2">{t('products.homecareProducts')}</span>
          </div>
          <div className="px-6 py-3 rounded-xl bg-white/[0.03] border border-white/[0.05]">
            <span className="text-[#4ADE80] font-bold">{t('products.twinTag')}</span>
            <span className="text-white/40 ml-2">{t('products.aiCompanion')}</span>
          </div>
        </motion.div>
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
          <span className="text-white/20 text-xs tracking-[0.3em] uppercase">{t('common.scroll')}</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ========== VivaBox 详情区块 ==========
function VivaBoxSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activeFace, setActiveFace] = useState<'A' | 'B'>('A');
  const { t } = useI18n();

  const currentFaceConfig = activeFace === 'A' ? vivaboxFaceAConfig : vivaboxFaceBConfig;

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#22D3EE]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* 左侧产品展示 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* 3D设备展示区 */}
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#22D3EE]/20 to-[#06B6D4]/10 rounded-3xl blur-3xl" />
              
              <motion.div
                animate={{ 
                  rotateY: activeFace === 'A' ? 0 : 180,
                }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-full h-full rounded-3xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-center perspective-1000"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-32 h-32 mx-auto rounded-2xl border-2 border-dashed border-white/20 bg-white/[0.03] flex flex-col items-center justify-center mb-6"
                  >
                    <span className="text-4xl font-light text-white/30">✕</span>
                    <span className="text-[10px] text-white/30 mt-1">占位图</span>
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white">VivaBox</h3>
                  <p className="text-white/40 mt-2">{t(`products.${currentFaceConfig.descKey}`)}</p>
                </div>
              </motion.div>

              {/* AB面切换按钮 */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                <button
                  onClick={() => setActiveFace('A')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFace === 'A'
                      ? 'bg-[#22D3EE] text-white'
                      : 'bg-white/[0.05] text-white/60 hover:bg-white/[0.1]'
                  }`}
                >
                  {t('products.faceA')}
                </button>
                <button
                  onClick={() => setActiveFace('B')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeFace === 'B'
                      ? 'bg-[#06B6D4] text-white'
                      : 'bg-white/[0.05] text-white/60 hover:bg-white/[0.1]'
                  }`}
                >
                  {t('products.faceB')}
                </button>
              </div>

              {/* 规格浮标 */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-sm"
              >
                <span className="text-[#22D3EE] font-medium">{t('products.specSize')}</span>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-sm"
              >
                <span className="text-[#06B6D4] font-medium">{t('products.specWeight')}</span>
              </motion.div>
            </div>

            {/* 规格参数网格 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-16 grid grid-cols-2 gap-4"
            >
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <HandDrawnIcon icon={Signal} size="sm" variant="filled" />
                <div className="text-sm font-medium text-white mt-2">{t('products.specNetwork')}</div>
                <div className="text-xs text-white/40">{t('products.highSpeedNetwork')}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <HandDrawnIcon icon={Cpu} size="sm" variant="filled" />
                <div className="text-sm font-medium text-white mt-2">{t('products.specNpu')}</div>
                <div className="text-xs text-white/40">{t('products.edgeAI')}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <HandDrawnIcon icon={Battery} size="sm" variant="filled" />
                <div className="text-sm font-medium text-white mt-2">{t('products.specStandby')}</div>
                <div className="text-xs text-white/40">{t('products.longBattery')}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <HandDrawnIcon icon={Zap} size="sm" variant="filled" />
                <div className="text-sm font-medium text-white mt-2">{t('products.specCharging')}</div>
                <div className="text-xs text-white/40">{t('products.convenientCharging')}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* 右侧信息 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D3EE]/10 text-[#22D3EE] text-sm font-medium mb-4">
              {t('products.vivaboxTag')}
            </span>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              VivaBox
              <span className="block text-xl font-normal text-white/40 mt-2">
                {t('products.vivaboxSubtitle')}
              </span>
            </h2>
            
            <p className="text-white/40 mb-8 text-lg">
              {t('products.vivaboxDesc')}
            </p>

            {/* 当前面的功能详情 */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFace}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-8"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <HandDrawnIcon icon={RotateCcw} size="sm" variant="outline" />
                  {t(`products.${currentFaceConfig.nameKey}`)}
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {currentFaceConfig.features.map((feature, index) => (
                    <motion.div
                      key={feature.nameKey}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] group hover:border-white/[0.1] transition-all"
                    >
                      <HandDrawnIcon icon={feature.icon} size="md" variant="filled" className="mb-3" />
                      <h4 className="font-medium text-white text-sm mb-1">{t(`products.${feature.nameKey}`)}</h4>
                      <p className="text-xs text-white/40">{t(`products.${feature.descKey}`)}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                {t('products.preOrder')}
              </Button>
              <Button variant="secondary">{t('products.vivaboxSpecs')}</Button>
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
      nameKey: 'twinPet',
      icon: 'placeholder',
      descKey: 'twinPetDesc',
      features: [
        { textKey: 'twinPetFeature1', icon: Heart },
        { textKey: 'twinPetFeature2', icon: Activity },
        { textKey: 'twinPetFeature3', icon: Sparkles },
        { textKey: 'twinPetFeature4', icon: Users },
      ],
      previewKey: 'twinPetPreview',
    },
    {
      id: 'medical',
      nameKey: 'twinMedical',
      icon: 'placeholder',
      descKey: 'twinMedicalDesc',
      features: [
        { textKey: 'twinMedicalFeature1', icon: Activity },
        { textKey: 'twinMedicalFeature2', icon: TrendingUp },
        { textKey: 'twinMedicalFeature3', icon: FileText },
        { textKey: 'twinMedicalFeature4', icon: Share2 },
      ],
      previewKey: 'twinMedicalPreview',
    },
  ];

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#4ADE80]/[0.02] rounded-full blur-[150px]" />
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
            <HandDrawnIcon icon={Brain} size="sm" variant="outline" />
            {t('products.twinTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('products.twinTitle')}
            <span className="bg-gradient-to-r from-[#4ADE80] to-[#67E8F9] bg-clip-text text-transparent">
              {t('products.twinTitle2')}
            </span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('products.twinDesc')}
          </p>
        </motion.div>

        {/* 切换按钮 */}
        <div className="flex justify-center gap-4 mb-12">
          {digitalTwinModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveTwinMode(mode.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all ${
                activeTwinMode === mode.id
                  ? 'bg-[#4ADE80] text-white'
                  : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.05] border border-white/[0.05]'
              }`}
            >
              <span className="inline-flex w-6 h-6 rounded border border-dashed border-white/20 bg-white/[0.03] items-center justify-center text-[10px] text-white/30">✕</span>
              {t(`products.${mode.nameKey}`)}
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
                    <motion.div
                      animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className="mb-6 flex flex-col items-center"
                    >
                      <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-white/20 bg-white/[0.03] flex items-center justify-center">
                        <span className="text-5xl font-light text-white/30">✕</span>
                      </div>
                      <span className="text-xs text-white/30 mt-2">占位图</span>
                    </motion.div>
                    <p className="text-white/40 text-sm">{t(`products.${mode.previewKey}`)}</p>
                  </div>
                </div>
                <div className="order-1 lg:order-2">
                  <h3 className="text-2xl font-bold text-white mb-4">{t(`products.${mode.nameKey}`)}</h3>
                  <p className="text-white/40 mb-8">{t(`products.${mode.descKey}`)}</p>
                  <ul className="space-y-4">
                    {mode.features.map((feature, index) => (
                      <motion.li
                        key={feature.textKey}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <HandDrawnIcon icon={feature.icon} size="md" variant="filled" />
                        <span className="text-white">{t(`products.${feature.textKey}`)}</span>
                      </motion.li>
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
  const [activeProduct, setActiveProduct] = useState<string | null>(null);
  const { t } = useI18n();

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
            <HandDrawnIcon icon={Wifi} size="sm" variant="outline" />
            {t('products.homecareTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('products.homecareTitle')}
            <span className="bg-gradient-to-r from-[#06B6D4] to-[#22D3EE] bg-clip-text text-transparent">
              {t('products.homecareTitle2')}
            </span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('products.homecareDesc')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {homecareProductsConfig.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setActiveProduct(activeProduct === product.id ? null : product.id)}
              className={`group p-6 rounded-3xl bg-white/[0.02] border transition-all duration-300 cursor-pointer ${
                activeProduct === product.id
                  ? 'border-[#06B6D4]/50 bg-white/[0.04]'
                  : 'border-white/[0.05] hover:border-[#06B6D4]/30'
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <HandDrawnIcon icon={product.icon} size="lg" variant="filled" />
                <div>
                  <h3 className="font-bold text-white text-lg group-hover:text-[#06B6D4] transition-colors">
                    {t(`products.${product.nameKey}`)}
                  </h3>
                  <p className="text-xs text-white/40">{t(`products.${product.descKey}`)}</p>
                </div>
              </div>
              
              {/* 功能标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.featureKeys.slice(0, 3).map((featureKey) => (
                  <span
                    key={featureKey}
                    className="px-3 py-1 text-xs rounded-full bg-white/[0.03] text-white/60 border border-white/[0.05]"
                  >
                    {t(`products.${featureKey}`)}
                  </span>
                ))}
              </div>

              {/* 展开的规格信息 */}
              <AnimatePresence>
                {activeProduct === product.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-white/[0.05]">
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(product.specs).map(([key, valueKey]) => (
                          <div key={key} className="text-center">
                            <div className="text-sm font-medium text-[#06B6D4]">{t(`products.${valueKey}`)}</div>
                            <div className="text-xs text-white/40">{t(`products.spec${key.charAt(0).toUpperCase() + key.slice(1)}Label`)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
            <HandDrawnIcon icon={Wifi} size="md" variant="filled" />
            <span className="text-white/60">{t('products.homecareConnect')}</span>
            <HandDrawnIcon icon={Bluetooth} size="sm" variant="outline" />
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
    { icon: Activity, textKey: 'appFeature1' },
    { icon: Brain, textKey: 'appFeature2' },
    { icon: Heart, textKey: 'appFeature3' },
    { icon: Shield, textKey: 'appFeature4' },
    { icon: Sparkles, textKey: 'appFeature5' },
  ];

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-[#22D3EE]/[0.02] rounded-full blur-[150px]" />
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
              <HandDrawnIcon icon={Smartphone} size="sm" variant="outline" />
              {t('products.appTag')}
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('products.appTitle')}
              <span className="block text-xl font-normal text-white/40 mt-2">
                {t('products.appSubtitle')}
              </span>
            </h2>
            
            <p className="text-white/40 mb-8 text-lg">
              {t('products.appDesc')}
            </p>

            <ul className="space-y-4 mb-8">
              {appFeatures.map((feature, index) => (
                <motion.li
                  key={feature.textKey}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <HandDrawnIcon icon={feature.icon} size="md" variant="filled" />
                  <span className="text-white">{t(`products.${feature.textKey}`)}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary">{t('products.appStore')}</Button>
              <Button variant="secondary">{t('products.googlePlay')}</Button>
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
                <div className="w-full h-full rounded-[2.5rem] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                  {/* 模拟App界面 */}
                  <div className="w-full h-full p-4 flex flex-col">
                    <div className="text-center mb-4">
                      <div className="text-xs text-white/40">{t('products.todayHealthScore')}</div>
                      <div className="text-4xl font-bold text-[#22D3EE]">87</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-white/20 bg-white/[0.03] flex items-center justify-center">
                          <span className="text-3xl font-light text-white/30">✕</span>
                        </div>
                        <span className="text-[10px] text-white/30 mt-1">占位图</span>
                      </motion.div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 rounded-lg bg-white/[0.05] text-center">
                        <Heart className="w-4 h-4 text-red-500 mx-auto mb-1" />
                        <div className="text-xs text-white">72</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/[0.05] text-center">
                        <Activity className="w-4 h-4 text-green-500 mx-auto mb-1" />
                        <div className="text-xs text-white">98%</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white/[0.05] text-center">
                        <Bed className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                        <div className="text-xs text-white">7.5h</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-sm"
              >
                <Heart className="w-4 h-4 text-red-500 inline mr-2" />
                <span className="text-white">{t('products.realtimeSync')}</span>
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
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-[#22D3EE]/[0.03] to-transparent rounded-full blur-[150px]" />
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
            className="w-48 h-16 mx-auto mb-8"
          >
            <img src="/logo.png" alt="Orbiva Logo" className="w-full h-full object-contain" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('products.ctaTitle1')}
            <span className="block bg-gradient-to-r from-[#22D3EE] to-[#06B6D4] bg-clip-text text-transparent">
              {t('products.ctaTitle2')}
            </span>
          </h2>

          <p className="text-white/40 text-lg mb-10 max-w-2xl mx-auto">
            {t('products.ctaDesc')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              {t('products.preOrder')}
            </Button>
            <Button variant="secondary" size="lg">
              {t('products.bookDemo')}
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
