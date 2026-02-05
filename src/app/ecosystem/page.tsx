'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';
import {
  Leaf,
  Gift,
  Shield,
  Heart,
  Activity,
  Moon,
  Pill,
  Users,
  Database,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Coins,
  RefreshCw,
  Lock,
  Share2,
  Award,
  Zap,
  TrendingUp,
  Wallet,
  Key,
  FileText,
  Globe,
  ArrowDown,
  ArrowUp,
  CircleDot,
  Hexagon,
  ChevronRight,
  Cpu,
  Link2,
  Eye,
  DollarSign,
  ShieldCheck,
  BarChart3,
  Timer,
  Fingerprint,
  Network,
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

// ========== 数据配置（使用 key 供后续翻译使用） ==========
const healthTasksConfig = [
  {
    icon: Activity,
    titleKey: 'task1Title',
    descKey: 'task1Desc',
    points: 50,
    freqKey: 'daily',
    category: 'exercise',
    progress: 75,
  },
  {
    icon: Moon,
    titleKey: 'task2Title',
    descKey: 'task2Desc',
    points: 30,
    freqKey: 'daily',
    category: 'sleep',
    progress: 60,
  },
  {
    icon: Pill,
    titleKey: 'task3Title',
    descKey: 'task3Desc',
    points: 20,
    freqKey: 'daily',
    category: 'medication',
    progress: 90,
  },
  {
    icon: Heart,
    titleKey: 'task4Title',
    descKey: 'task4Desc',
    points: 15,
    freqKey: 'daily',
    category: 'vitals',
    progress: 45,
  },
  {
    icon: Database,
    titleKey: 'task5Title',
    descKey: 'task5Desc',
    points: 100,
    freqKey: 'monthly',
    category: 'data',
    progress: 30,
  },
  {
    icon: Users,
    titleKey: 'task6Title',
    descKey: 'task6Desc',
    points: 10,
    freqKey: 'eachTime',
    category: 'social',
    progress: 85,
  },
];

const rewardCategoriesConfig = [
  {
    titleKey: 'rewardCat1',
    itemKeys: ['rewardCat1Item1', 'rewardCat1Item2', 'rewardCat1Item3', 'rewardCat1Item4'],
    icon: Heart,
    color: 'from-[#4ADE80] to-[#67E8F9]',
  },
  {
    titleKey: 'rewardCat2',
    itemKeys: ['rewardCat2Item1', 'rewardCat2Item2', 'rewardCat2Item3', 'rewardCat2Item4'],
    icon: Gift,
    color: 'from-[#06B6D4] to-[#22D3EE]',
  },
  {
    titleKey: 'rewardCat3',
    itemKeys: ['rewardCat3Item1', 'rewardCat3Item2', 'rewardCat3Item3', 'rewardCat3Item4'],
    icon: Hexagon,
    color: 'from-[#22D3EE] to-[#22D3EE]',
  },
];

const dataSovereigntyRightsConfig = [
  {
    icon: Key,
    titleKey: 'right1Title',
    descKey: 'right1Desc',
    detailKey: 'right1Detail',
  },
  {
    icon: Lock,
    titleKey: 'right2Title',
    descKey: 'right2Desc',
    detailKey: 'right2Detail',
  },
  {
    icon: Share2,
    titleKey: 'right3Title',
    descKey: 'right3Desc',
    detailKey: 'right3Detail',
  },
  {
    icon: Wallet,
    titleKey: 'right4Title',
    descKey: 'right4Desc',
    detailKey: 'right4Detail',
  },
];

const ecosystemFlowStepsConfig = [
  {
    step: 1,
    titleKey: 'flow1Title',
    descKey: 'flow1Desc',
    icon: Database,
    color: '#22D3EE',
  },
  {
    step: 2,
    titleKey: 'flow2Title',
    descKey: 'flow2Desc',
    icon: Shield,
    color: '#06B6D4',
  },
  {
    step: 3,
    titleKey: 'flow3Title',
    descKey: 'flow3Desc',
    icon: Key,
    color: '#4ADE80',
  },
  {
    step: 4,
    titleKey: 'flow4Title',
    descKey: 'flow4Desc',
    icon: Coins,
    color: '#f59e0b',
  },
  {
    step: 5,
    titleKey: 'flow5Title',
    descKey: 'flow5Desc',
    icon: Gift,
    color: '#22D3EE',
  },
  {
    step: 6,
    titleKey: 'flow6Title',
    descKey: 'flow6Desc',
    icon: RefreshCw,
    color: '#22D3EE',
  },
];

const web3FeaturesConfig = [
  {
    titleKey: 'hltTitle',
    descKey: 'hltDesc',
    icon: Coins,
    color: '#f59e0b',
    detailKeys: ['hltDetail1', 'hltDetail2', 'hltDetail3', 'hltDetail4'],
    stats: { value: '1.2M+', labelKey: 'hltStats' },
  },
  {
    titleKey: 'nftTitle',
    descKey: 'nftDesc',
    icon: Hexagon,
    color: '#22D3EE',
    detailKeys: ['nftDetail1', 'nftDetail2', 'nftDetail3', 'nftDetail4'],
    stats: { value: '50K+', labelKey: 'nftStats' },
  },
  {
    titleKey: 'daoTitle',
    descKey: 'daoDesc',
    icon: Users,
    color: '#06B6D4',
    detailKeys: ['daoDetail1', 'daoDetail2', 'daoDetail3', 'daoDetail4'],
    stats: { value: '10K+', labelKey: 'daoStats' },
  },
];

// 代币经济学数据
const tokenomicsDataConfig = [
  { categoryKey: 'tokenPool1', percentage: 40, color: '#22D3EE', descKey: 'tokenPool1Desc' },
  { categoryKey: 'tokenPool2', percentage: 25, color: '#06B6D4', descKey: 'tokenPool2Desc' },
  { categoryKey: 'tokenPool3', percentage: 20, color: '#4ADE80', descKey: 'tokenPool3Desc' },
  { categoryKey: 'tokenPool4', percentage: 10, color: '#f59e0b', descKey: 'tokenPool4Desc' },
  { categoryKey: 'tokenPool5', percentage: 5, color: '#22D3EE', descKey: 'tokenPool5Desc' },
];

// 数据主权闭环节点配置
const dataLoopNodesConfig = [
  {
    id: 'collect',
    titleKey: 'loop1Title',
    subtitleKey: 'loop1Subtitle',
    icon: Database,
    color: '#22D3EE',
    descKey: 'loop1Desc',
  },
  {
    id: 'process',
    titleKey: 'loop2Title',
    subtitleKey: 'loop2Subtitle',
    icon: Cpu,
    color: '#06B6D4',
    descKey: 'loop2Desc',
  },
  {
    id: 'confirm',
    titleKey: 'loop3Title',
    subtitleKey: 'loop3Subtitle',
    icon: Link2,
    color: '#4ADE80',
    descKey: 'loop3Desc',
  },
  {
    id: 'authorize',
    titleKey: 'loop4Title',
    subtitleKey: 'loop4Subtitle',
    icon: Key,
    color: '#f59e0b',
    descKey: 'loop4Desc',
  },
  {
    id: 'share',
    titleKey: 'loop5Title',
    subtitleKey: 'loop5Subtitle',
    icon: Eye,
    color: '#22D3EE',
    descKey: 'loop5Desc',
  },
  {
    id: 'reward',
    titleKey: 'loop6Title',
    subtitleKey: 'loop6Subtitle',
    icon: DollarSign,
    color: '#67E8F9',
    descKey: 'loop6Desc',
  },
];

// 隐私保护技术配置
const privacyTechnologiesConfig = [
  {
    titleKey: 'privacy1Title',
    icon: ShieldCheck,
    descKey: 'privacy1Desc',
    detailKey: 'privacy1Detail',
  },
  {
    titleKey: 'privacy2Title',
    icon: Network,
    descKey: 'privacy2Desc',
    detailKey: 'privacy2Detail',
  },
  {
    titleKey: 'privacy3Title',
    icon: Lock,
    descKey: 'privacy3Desc',
    detailKey: 'privacy3Detail',
  },
  {
    titleKey: 'privacy4Title',
    icon: Fingerprint,
    descKey: 'privacy4Desc',
    detailKey: 'privacy4Detail',
  },
];

// ========== Hero 区块 ==========
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
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
          className="absolute w-[130vw] h-[60vh] border border-[#22D3EE]/[0.06] rounded-[50%]"
        />
      </div>

      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[400px] bg-[#22D3EE]/[0.02] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm">
            <HandDrawnIcon icon={Leaf} size="sm" variant="outline" />
            {t('ecosystem.heroTag')}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {t('ecosystem.heroTitle1')}
          <span className="bg-gradient-to-r from-[#22D3EE] to-[#06B6D4] bg-clip-text text-transparent">
            {t('ecosystem.heroTitle2')}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.35}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto mb-8"
        >
          {t('ecosystem.heroSubtitle')}
        </motion.p>

        {/* 核心概念 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: Coins, text: 'Health Token', color: '#f59e0b' },
            { icon: Hexagon, text: 'Data NFT', color: '#22D3EE' },
            { icon: Users, text: 'Health DAO', color: '#06B6D4' },
          ].map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05]"
            >
              <HandDrawnIcon icon={item.icon} size="sm" variant="outline" />
              <span className="text-white/60 text-sm">{item.text}</span>
            </motion.div>
          ))}
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

// ========== Web3 健康激励 ==========
function Web3IncentiveSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activeFeature, setActiveFeature] = useState(0);
  const [showTokenomics, setShowTokenomics] = useState(false);
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#22D3EE]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <HandDrawnIcon icon={Hexagon} size="sm" variant="outline" />
            {t('ecosystem.web3Tag')}
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('ecosystem.web3Title1')}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#06B6D4] bg-clip-text text-transparent">{t('ecosystem.web3Title2')}</span>
          </h2>

          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('ecosystem.web3Subtitle')}
          </p>
        </motion.div>

        {/* Web3特性卡片 - 增强版 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {web3FeaturesConfig.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setActiveFeature(index)}
              className={`relative p-6 rounded-3xl cursor-pointer transition-all duration-300 overflow-hidden ${
                activeFeature === index
                  ? 'bg-gradient-to-br from-[#22D3EE]/10 to-[#06B6D4]/10 border-2 border-[#22D3EE]/50 shadow-lg shadow-[#22D3EE]/10'
                  : 'bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1]'
              }`}
            >
              {/* 背景光效 - 选中时显示 */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: activeFeature === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px]"
                style={{ backgroundColor: `${feature.color}20` }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <HandDrawnIcon icon={feature.icon} size="lg" variant="filled" className={`transition-all duration-300 ${
                        activeFeature === index ? 'scale-110' : ''
                      }`} />
                    <div>
                      <h3 className="font-bold text-white">{t(`ecosystem.${feature.titleKey}`)}</h3>
                      <p className="text-xs text-white/40">{t(`ecosystem.${feature.descKey}`)}</p>
                    </div>
                  </div>

                  {/* 统计数据 */}
                  <div className="text-right">
                    <div className="text-lg font-bold" style={{ color: feature.color }}>{feature.stats.value}</div>
                    <div className="text-xs text-white/30">{t(`ecosystem.${feature.stats.labelKey}`)}</div>
                  </div>
                </div>

                {/* 详情内容 - 始终显示 */}
                <div className="pt-4 border-t border-white/[0.05] space-y-2">
                  {feature.detailKeys.map((detailKey) => (
                    <div key={detailKey} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: feature.color }} />
                      {t(`ecosystem.${detailKey}`)}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 代币经济学 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div
            onClick={() => setShowTokenomics(!showTokenomics)}
            className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] cursor-pointer hover:border-[#22D3EE]/30 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <HandDrawnIcon icon={BarChart3} size="lg" variant="filled" />
                <div>
                  <h3 className="font-bold text-white">{t('ecosystem.tokenomicsTitle')}</h3>
                  <p className="text-sm text-white/40">{t('ecosystem.tokenomicsSupply')}</p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: showTokenomics ? 90 : 0 }}
                className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center"
              >
                <ChevronRight className="w-4 h-4 text-white/40" />
              </motion.div>
            </div>

            <AnimatePresence>
              {showTokenomics && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-6 mt-6 border-t border-white/[0.05]">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* 分配比例条 */}
                      <div className="space-y-4">
                        {tokenomicsDataConfig.map((item, index) => (
                          <div key={item.categoryKey}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-white/60">{t(`ecosystem.${item.categoryKey}`)}</span>
                              <span className="text-sm font-medium" style={{ color: item.color }}>{item.percentage}%</span>
                            </div>
                            <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.percentage}%` }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                                className="h-full rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                            </div>
                            <p className="text-xs text-white/30 mt-1">{t(`ecosystem.${item.descKey}`)}</p>
                          </div>
                        ))}
                      </div>

                      {/* 关键指标 */}
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { labelKey: 'circulation', value: '120M', subValue: '12%' },
                          { labelKey: 'stakingApy', value: '8.5%', subKey: 'annual' },
                          { labelKey: 'burnMechanism', value: '2%', subKey: 'transactionFee' },
                          { labelKey: 'releaseCycle', value: t('ecosystem.years10'), subKey: 'linearRelease' },
                        ].map((stat) => (
                          <div key={stat.labelKey} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                            <div className="text-xs text-white/40 mb-1">{t(`ecosystem.${stat.labelKey}`)}</div>
                            <div className="text-xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-[#22D3EE]">{stat.subValue || t(`ecosystem.${stat.subKey}`)}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 健康任务列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <HandDrawnIcon icon={Zap} size="sm" variant="filled" />
            {t('ecosystem.healthTasksTitle')}
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthTasksConfig.map((task, index) => (
              <motion.div
                key={task.titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#22D3EE]/30 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <HandDrawnIcon icon={task.icon} size="md" variant="filled" />
                  <span className="px-2 py-1 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] text-xs font-medium">
                    +{task.points} HLT
                  </span>
                </div>
                <h4 className="font-medium text-white text-sm mb-1">{t(`ecosystem.${task.titleKey}`)}</h4>
                <p className="text-xs text-white/40">{t(`ecosystem.${task.descKey}`)}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-white/30">{t(`ecosystem.${task.freqKey}`)}</span>
                  <div className="w-16 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                    <div className="h-full bg-[#22D3EE] rounded-full" style={{ width: `${task.progress}%` }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 数据主权闭环 ==========
function DataSovereigntySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activeRight, setActiveRight] = useState<number | null>(null);
  const [activeLoopNode, setActiveLoopNode] = useState<number>(0);
  const { t } = useI18n();

  // 自动轮播闭环节点
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveLoopNode((prev) => (prev + 1) % dataLoopNodesConfig.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#06B6D4]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <HandDrawnIcon icon={Shield} size="sm" variant="outline" />
            {t('ecosystem.sovereigntyTag')}
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('ecosystem.sovereigntyTitle1')}
            <span className="bg-gradient-to-r from-[#06B6D4] to-[#22D3EE] bg-clip-text text-transparent">{t('ecosystem.sovereigntyTitle2')}</span>
          </h2>

          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('ecosystem.sovereigntySubtitle')}
          </p>
        </motion.div>

        {/* 权利卡片 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {dataSovereigntyRightsConfig.map((right, index) => (
            <motion.div
              key={right.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => setActiveRight(activeRight === index ? null : index)}
              className={`group p-6 rounded-3xl cursor-pointer transition-all duration-300 ${
                activeRight === index
                  ? 'bg-gradient-to-br from-[#06B6D4]/10 to-[#22D3EE]/10 border border-[#06B6D4]/30'
                  : 'bg-white/[0.02] border border-white/[0.05] hover:border-[#06B6D4]/30'
              }`}
            >
              <HandDrawnIcon icon={right.icon} size="xl" variant="filled" className="mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-bold text-white mb-2 text-center">{t(`ecosystem.${right.titleKey}`)}</h3>
              <p className="text-sm text-white/40 text-center">{t(`ecosystem.${right.descKey}`)}</p>

              <AnimatePresence>
                {activeRight === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-4 border-t border-white/[0.05]">
                      <p className="text-xs text-white/50">{t(`ecosystem.${right.detailKey}`)}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* 数据主权闭环图解 - 简洁流程展示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]"
        >
          <h3 className="text-xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
            <HandDrawnIcon icon={RefreshCw} size="sm" variant="outline" />
            {t('ecosystem.dataLoopTitle')}
          </h3>

          {/* 横向流程展示 */}
          <div className="relative">
            {/* 连接线 */}
            <div className="absolute top-8 left-[8%] right-[8%] h-0.5 bg-gradient-to-r from-[#22D3EE]/20 via-[#06B6D4]/40 to-[#22D3EE]/20 hidden md:block" />

            {/* 流程节点 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-2">
              {dataLoopNodesConfig.map((node, index) => {
                const isActive = activeLoopNode === index;
                const NodeIcon = node.icon;

                return (
                  <motion.div
                    key={node.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onClick={() => setActiveLoopNode(index)}
                    className="relative cursor-pointer group"
                  >
                    {/* 节点图标 */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          boxShadow: isActive ? `0 0 25px ${node.color}40` : 'none',
                        }}
                        transition={{ duration: 0.3 }}
                        className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${
                          isActive 
                            ? 'border-2' 
                            : 'border border-white/10 group-hover:border-white/20'
                        }`}
                        style={{
                          backgroundColor: isActive ? `${node.color}25` : `${node.color}10`,
                          borderColor: isActive ? node.color : undefined,
                        }}
                      >
                        <NodeIcon className="w-7 h-7" style={{ color: node.color }} />

                        {/* 序号角标 */}
                        <div
                          className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: node.color,
                            color: '#000'
                          }}
                        >
                          {index + 1}
                        </div>
                      </motion.div>

                      {/* 标题 */}
                      <h4 className={`text-sm font-medium text-center transition-colors ${
                        isActive ? 'text-white' : 'text-white/60'
                      }`}>
                        {t(`ecosystem.${node.titleKey}`)}
                      </h4>
                      <p className="text-xs text-white/30 text-center mt-1 hidden md:block">
                        {t(`ecosystem.${node.subtitleKey}`)}
                      </p>
                    </div>

                    {/* 箭头连接符（除了最后一个） */}
                    {index < dataLoopNodesConfig.length - 1 && (
                      <div className="absolute top-8 -right-1 text-white/20 hidden lg:block">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* 循环箭头指示 */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05]">
                <RefreshCw className="w-4 h-4 text-[#22D3EE] animate-spin" style={{ animationDuration: '4s' }} />
                <span className="text-xs text-white/40">{t('ecosystem.continuousCycle')}</span>
              </div>
            </div>
          </div>

          {/* 当前选中节点详情 */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLoopNode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-8 p-6 rounded-2xl border border-white/[0.05]"
              style={{ backgroundColor: `${dataLoopNodesConfig[activeLoopNode].color}08` }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${dataLoopNodesConfig[activeLoopNode].color}20` }}
                >
                  {(() => {
                    const ActiveIcon = dataLoopNodesConfig[activeLoopNode].icon;
                    return <ActiveIcon className="w-6 h-6" style={{ color: dataLoopNodesConfig[activeLoopNode].color }} />;
                  })()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded"
                      style={{ backgroundColor: dataLoopNodesConfig[activeLoopNode].color, color: '#000' }}
                    >
                      {t('ecosystem.step')} {activeLoopNode + 1}
                    </span>
                    <h4 className="font-bold text-white">{t(`ecosystem.${dataLoopNodesConfig[activeLoopNode].titleKey}`)}</h4>
                  </div>
                  <p className="text-sm text-white/40 mt-1">{t(`ecosystem.${dataLoopNodesConfig[activeLoopNode].subtitleKey}`)}</p>
                </div>
              </div>
              <p className="text-white/60 mt-4 pl-16">{t(`ecosystem.${dataLoopNodesConfig[activeLoopNode].descKey}`)}</p>
            </motion.div>
          </AnimatePresence>

          {/* 步骤指示器 */}
          <div className="flex justify-center gap-2 mt-6">
            {dataLoopNodesConfig.map((node, index) => (
              <button
                key={index}
                onClick={() => setActiveLoopNode(index)}
                className={`h-1.5 rounded-full transition-all ${
                  activeLoopNode === index 
                    ? 'w-8' 
                    : 'w-1.5 hover:bg-white/40'
                }`}
                style={{
                  backgroundColor: activeLoopNode === index ? node.color : 'rgba(255,255,255,0.2)'
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 隐私保护技术 ==========
function PrivacyTechSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activeTech, setActiveTech] = useState<number | null>(null);
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#4ADE80]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <HandDrawnIcon icon={Lock} size="sm" variant="outline" />
            {t('ecosystem.privacyTag')}
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('ecosystem.privacyTitle1')}
            <span className="bg-gradient-to-r from-[#4ADE80] to-[#67E8F9] bg-clip-text text-transparent">{t('ecosystem.privacyTitle2')}</span>
          </h2>

          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('ecosystem.privacySubtitle')}
          </p>
        </motion.div>

        {/* 隐私技术网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {privacyTechnologiesConfig.map((tech, index) => (
            <motion.div
              key={tech.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setActiveTech(index)}
              onMouseLeave={() => setActiveTech(null)}
              className="relative group"
            >
              <div className={`p-6 rounded-3xl transition-all duration-300 ${
                activeTech === index
                  ? 'bg-gradient-to-br from-[#4ADE80]/10 to-[#22D3EE]/10 border border-[#4ADE80]/30 scale-105'
                  : 'bg-white/[0.02] border border-white/[0.05]'
              }`}>
                {/* 背景动画 */}
                {activeTech === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-3xl overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#4ADE80]/10 rounded-full blur-[40px]" />
                  </motion.div>
                )}

                <div className="relative z-10">
                  <HandDrawnIcon icon={tech.icon} size="lg" variant="filled" className="mb-4 group-hover:scale-110 transition-transform duration-300" />

                  <h3 className="font-bold text-white mb-2">{t(`ecosystem.${tech.titleKey}`)}</h3>
                  <p className="text-sm text-white/40 mb-4">{t(`ecosystem.${tech.descKey}`)}</p>

                  <AnimatePresence>
                    {activeTech === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-white/[0.05]">
                          <p className="text-xs text-white/50">{t(`ecosystem.${tech.detailKey}`)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 安全承诺 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-[#4ADE80]/5 to-[#22D3EE]/5 border border-white/[0.05]"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, labelKey: 'endToEndEncryption', value: 'AES-256' },
              { icon: Timer, labelKey: 'dataRetention', valueKey: 'userControlled' },
              { icon: FileText, labelKey: 'compliance', value: 'GDPR / PDPA' },
            ].map((item) => (
              <div key={item.labelKey} className="flex items-center gap-4">
                <HandDrawnIcon icon={item.icon} size="lg" variant="filled" />
                <div>
                  <div className="text-xs text-white/40">{t(`ecosystem.${item.labelKey}`)}</div>
                  <div className="font-bold text-white">{item.value || t(`ecosystem.${item.valueKey}`)}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 生态价值循环 ==========
function EcosystemFlowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#4ADE80]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <HandDrawnIcon icon={RefreshCw} size="sm" variant="outline" />
            {t('ecosystem.flowTag')}
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('ecosystem.flowTitle1')}
            <span className="bg-gradient-to-r from-[#4ADE80] to-[#67E8F9] bg-clip-text text-transparent">{t('ecosystem.flowTitle2')}</span>
          </h2>

          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('ecosystem.flowSubtitle')}
          </p>
        </motion.div>

        {/* 流程步骤 - 环形布局 */}
        <div className="relative max-w-4xl mx-auto">
          {/*/!* 中心 *!/*/}
          {/*<motion.div*/}
          {/*  initial={{ scale: 0, opacity: 0 }}*/}
          {/*  animate={isInView ? { scale: 1, opacity: 1 } : {}}*/}
          {/*  transition={{ delay: 0.3 }}*/}
          {/*  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-[#4ADE80]/20 to-[#22D3EE]/20 border border-white/[0.1] flex items-center justify-center z-10"*/}
          {/*>*/}
          {/*  <span className="text-sm font-medium text-white/80">Orbiva</span>*/}
          {/*</motion.div>*/}

          {/* 步骤环 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {ecosystemFlowStepsConfig.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <span className="font-bold text-sm" style={{ color: item.color }}>{item.step}</span>
                  </div>
                  <HandDrawnIcon icon={item.icon} size="md" variant="filled" />
                </div>
                <h3 className="font-bold text-white mb-2">{t(`ecosystem.${item.titleKey}`)}</h3>
                <p className="text-sm text-white/40">{t(`ecosystem.${item.descKey}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 数据统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '1.2M+', labelKey: 'statsTokens', color: '#f59e0b' },
              { value: '50+', labelKey: 'statsInstitutions', color: '#22D3EE' },
              { value: '5,000+', labelKey: 'statsProjects', color: '#06B6D4' },
              { value: '98%', labelKey: 'statsSatisfaction', color: '#22D3EE' },
            ].map((stat) => (
              <div key={stat.labelKey}>
                <div className="text-3xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-sm text-white/40 mt-1">{t(`ecosystem.${stat.labelKey}`)}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 积分兑换商城 ==========
function RewardsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-[#22D3EE]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <HandDrawnIcon icon={Gift} size="sm" variant="outline" />
            {t('ecosystem.rewardsTag')}
          </span>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('ecosystem.rewardsTitle1')}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#06B6D4] bg-clip-text text-transparent">{t('ecosystem.rewardsTitle2')}</span>
          </h2>
        </motion.div>

        {/* 奖励类别 */}
        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {rewardCategoriesConfig.map((category, index) => (
            <motion.div
              key={category.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]"
            >
              <HandDrawnIcon icon={category.icon} size="xl" variant="filled" className="mb-6" />
              <h3 className="text-xl font-bold text-white mb-4">{t(`ecosystem.${category.titleKey}`)}</h3>
              <ul className="space-y-3">
                {category.itemKeys.map((itemKey) => (
                  <li key={itemKey} className="flex items-center gap-2 text-sm text-white/50">
                    <CheckCircle2 className="w-4 h-4 text-[#22D3EE]" />
                    {t(`ecosystem.${itemKey}`)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* 积分卡片预览 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#22D3EE]/10 to-[#06B6D4]/10 border border-white/[0.1]">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#22D3EE] to-[#06B6D4] flex items-center justify-center mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">{t('ecosystem.healthMaster')}</h3>
              <p className="text-[#22D3EE] font-medium">Platinum Level</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-white/40">{t('ecosystem.availablePoints')}</span>
                <span className="text-2xl font-bold text-[#22D3EE]">12,580 HLT</span>
              </div>
              <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '75%' } : {}}
                  transition={{ delay: 0.7, duration: 1 }}
                  className="h-full bg-gradient-to-r from-[#22D3EE] to-[#06B6D4] rounded-full"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">{t('ecosystem.toNextLevel')}</span>
                <span className="text-white">2,420 HLT</span>
              </div>
            </div>

            <Button variant="primary" className="w-full">
              {t('ecosystem.enterPointsMall')}
            </Button>
          </div>
        </motion.div>
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
            className="w-32 h-32 mx-auto mb-8 rounded-2xl overflow-hidden"
          >
            <Image src="/logo.png" alt="Orbiva Logo" width={128} height={128} className="w-full h-full object-cover" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('ecosystem.ctaTitle1')}
            <span className="block bg-gradient-to-r from-[#22D3EE] to-[#06B6D4] bg-clip-text text-transparent">
              {t('ecosystem.ctaTitle2')}
            </span>
          </h2>

          <p className="text-white/40 text-lg mb-10 max-w-2xl mx-auto">
            {t('ecosystem.ctaSubtitle')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              {t('ecosystem.joinNow')}
            </Button>
            <Button variant="secondary" size="lg">
              {t('ecosystem.learnMoreBenefits')}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 主页面 ==========
export default function EcosystemPage() {
  return (
    <main className="relative bg-[#050505]">
      <div className="fixed inset-0 bg-[#050505] -z-10" />

      {/* Hero */}
      <HeroSection />

      {/* Web3 Incentive */}
      <ScrollSectionWrapper>
        <Web3IncentiveSection />
      </ScrollSectionWrapper>

      {/* Data Sovereignty */}
      <ScrollSectionWrapper>
        <DataSovereigntySection />
      </ScrollSectionWrapper>

      {/* Privacy Tech */}
      <ScrollSectionWrapper>
        <PrivacyTechSection />
      </ScrollSectionWrapper>

      {/* Ecosystem Flow */}
      <ScrollSectionWrapper>
        <EcosystemFlowSection />
      </ScrollSectionWrapper>

      {/* Rewards */}
      <ScrollSectionWrapper>
        <RewardsSection />
      </ScrollSectionWrapper>

      {/* CTA */}
      <ScrollSectionWrapper isLast>
        <CTASection />
      </ScrollSectionWrapper>
    </main>
  );
}
