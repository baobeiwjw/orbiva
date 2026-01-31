'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
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
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
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

// ========== 数据 ==========
const healthTasksConfig = [
  { icon: Activity, titleKey: 'task1Title', descKey: 'task1Desc', pointsKey: 'task1Points', freqKey: 'task1Freq' },
  { icon: Moon, titleKey: 'task2Title', descKey: 'task2Desc', pointsKey: 'task2Points', freqKey: 'task2Freq' },
  { icon: Pill, titleKey: 'task3Title', descKey: 'task3Desc', pointsKey: 'task3Points', freqKey: 'task3Freq' },
  { icon: Heart, titleKey: 'task4Title', descKey: 'task4Desc', pointsKey: 'task4Points', freqKey: 'task4Freq' },
  { icon: Database, titleKey: 'task5Title', descKey: 'task5Desc', pointsKey: 'task5Points', freqKey: 'task5Freq' },
  { icon: Users, titleKey: 'task6Title', descKey: 'task6Desc', pointsKey: 'task6Points', freqKey: 'task6Freq' },
];

const rewardCategoriesConfig = [
  { titleKey: 'rewardCat1', itemKeys: ['rewardCat1Item1', 'rewardCat1Item2', 'rewardCat1Item3', 'rewardCat1Item4'] },
  { titleKey: 'rewardCat2', itemKeys: ['rewardCat2Item1', 'rewardCat2Item2', 'rewardCat2Item3', 'rewardCat2Item4'] },
  { titleKey: 'rewardCat3', itemKeys: ['rewardCat3Item1', 'rewardCat3Item2', 'rewardCat3Item3', 'rewardCat3Item4'] },
];

const dataRightsConfig = [
  { icon: Lock, titleKey: 'right1Title', descKey: 'right1Desc' },
  { icon: Shield, titleKey: 'right2Title', descKey: 'right2Desc' },
  { icon: Share2, titleKey: 'right3Title', descKey: 'right3Desc' },
  { icon: Gift, titleKey: 'right4Title', descKey: 'right4Desc' },
];

const ecosystemFlowConfig = [
  { step: 1, titleKey: 'flow1Title', descKey: 'flow1Desc', icon: Shield },
  { step: 2, titleKey: 'flow2Title', descKey: 'flow2Desc', icon: Lock },
  { step: 3, titleKey: 'flow3Title', descKey: 'flow3Desc', icon: Database },
  { step: 4, titleKey: 'flow4Title', descKey: 'flow4Desc', icon: Gift },
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
          className="absolute w-[130vw] h-[60vh] border border-[#7C3AED]/[0.06] rounded-[50%]"
        />
      </div>

      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[400px] bg-[#7C3AED]/[0.02] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm">
            <Leaf className="w-4 h-4 text-[#7C3AED]" />
            {t('ecosystem', 'heroTag')}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {t('ecosystem', 'heroTitle1')}
          <span className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
            {t('ecosystem', 'heroTitle2')}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.35}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto"
        >
          {t('ecosystem', 'heroSubtitle')}
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
          <span className="text-white/20 text-xs tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ========== 健康激励计划 Bento Grid ==========
function HealthIncentiveSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7C3AED]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <Coins className="w-4 h-4 text-[#7C3AED]" />
            {t('ecosystem', 'incentiveTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('ecosystem', 'incentiveTitle')}
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('ecosystem', 'incentiveDesc')}
          </p>
        </motion.div>

        {/* 任务 Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {healthTasksConfig.map((task, index) => (
            <motion.div
              key={task.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#7C3AED]/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
                  <task.icon className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-medium">
                  {t('ecosystem', task.freqKey)}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#7C3AED] transition-colors">
                {t('ecosystem', task.titleKey)}
              </h3>
              <p className="text-sm text-white/40 mb-4">{t('ecosystem', task.descKey)}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                <span className="text-white/40 text-sm">{t('ecosystem', 'pointsReward')}</span>
                <span className="text-[#7C3AED] font-bold">+{t('ecosystem', task.pointsKey)} {t('ecosystem', 'points')}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 奖励类目 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">{t('ecosystem', 'canExchange')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {rewardCategoriesConfig.map((category, index) => (
              <motion.div
                key={category.titleKey}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-center"
              >
                <h4 className="font-bold text-white mb-4">{t('ecosystem', category.titleKey)}</h4>
                <ul className="space-y-2">
                  {category.itemKeys.map((itemKey) => (
                    <li key={itemKey} className="flex items-center justify-center gap-2 text-sm text-white/50">
                      <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                      {t('ecosystem', itemKey)}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 数据主权 Bento Grid ==========
function DataSovereigntySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

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
            <Shield className="w-4 h-4 text-[#06B6D4]" />
            {t('ecosystem', 'sovereigntyTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('ecosystem', 'sovereigntyTitle')}
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('ecosystem', 'sovereigntyDesc')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {dataRightsConfig.map((right, index) => (
            <motion.div
              key={right.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#06B6D4]/30 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <right.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">{t('ecosystem', right.titleKey)}</h3>
              <p className="text-sm text-white/40">{t('ecosystem', right.descKey)}</p>
            </motion.div>
          ))}
        </div>
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
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#EC4899]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <RefreshCw className="w-4 h-4 text-[#EC4899]" />
            {t('ecosystem', 'flowTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('ecosystem', 'flowTitle')}
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('ecosystem', 'flowSubtitle')}
          </p>
        </motion.div>

        {/* 流程步骤 */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {ecosystemFlowConfig.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {index < ecosystemFlowConfig.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#EC4899] to-transparent" />
              )}

              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#EC4899] text-white text-sm font-bold flex items-center justify-center">
                  {item.step}
                </div>

                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#EC4899] to-[#a78bfa] flex items-center justify-center mt-4 mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">{t('ecosystem', item.titleKey)}</h3>
                <p className="text-sm text-white/40">{t('ecosystem', item.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 循环提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/[0.02] border border-white/[0.05]">
            <RefreshCw className="w-5 h-5 text-[#EC4899] animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-white/50">{t('ecosystem', 'continuousCycle')}</span>
          </div>
        </motion.div>

        {/* 数据统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { valueKey: 'statsUserRewards', labelKey: 'statsUserRewardsLabel' },
              { valueKey: 'statsResearchOrgs', labelKey: 'statsResearchOrgsLabel' },
              { valueKey: 'statsProjects', labelKey: 'statsProjectsLabel' },
              { valueKey: 'statsSatisfaction', labelKey: 'statsSatisfactionLabel' },
            ].map((stat) => (
              <div key={stat.valueKey}>
                <div className="text-3xl font-bold text-[#7C3AED]">{t('ecosystem', stat.valueKey)}</div>
                <div className="text-sm text-white/40 mt-1">{t('ecosystem', stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 积分系统 ==========
function PointsSystemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-[#7C3AED]/[0.02] rounded-full blur-[150px]" />
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
              <Coins className="w-4 h-4 text-[#7C3AED]" />
              {t('ecosystem', 'pointsTag')}
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('ecosystem', 'pointsTitle')}
            </h2>
            
            <p className="text-white/40 mb-8 text-lg">
              {t('ecosystem', 'pointsDesc')}
            </p>

            <div className="space-y-6">
              {[
                { step: 1, titleKey: 'pointsStep1Title', descKey: 'pointsStep1Desc' },
                { step: 2, titleKey: 'pointsStep2Title', descKey: 'pointsStep2Desc' },
                { step: 3, titleKey: 'pointsStep3Title', descKey: 'pointsStep3Desc' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-[#7C3AED]">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{t('ecosystem', item.titleKey)}</h4>
                    <p className="text-sm text-white/40">{t('ecosystem', item.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 右侧卡片 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center mb-4">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{t('ecosystem', 'currentLevel')}</h3>
                <p className="text-[#7C3AED] font-medium">{t('ecosystem', 'levelName')}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-white/40">{t('ecosystem', 'availablePoints')}</span>
                  <span className="text-2xl font-bold text-[#7C3AED]">12,580</span>
                </div>
                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">{t('ecosystem', 'toNextLevel')}</span>
                  <span className="text-white">{t('ecosystem', 'pointsNeeded')}</span>
                </div>
              </div>

              <Button variant="primary" className="w-full">
                {t('ecosystem', 'enterPointsMall')}
              </Button>
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
            {t('ecosystem', 'ctaTitle1')}
            <span className="block bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
              {t('ecosystem', 'ctaTitle2')}
            </span>
          </h2>

          <p className="text-white/40 text-lg mb-10 max-w-2xl mx-auto">
            {t('ecosystem', 'ctaDesc')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              {t('ecosystem', 'joinNow')}
            </Button>
            <Button variant="secondary" size="lg">
              {t('ecosystem', 'learnMoreBenefits')}
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
      
      {/* Health Incentive */}
      <ScrollSectionWrapper>
        <HealthIncentiveSection />
      </ScrollSectionWrapper>
      
      {/* Data Sovereignty */}
      <ScrollSectionWrapper>
        <DataSovereigntySection />
      </ScrollSectionWrapper>
      
      {/* Ecosystem Flow */}
      <ScrollSectionWrapper>
        <EcosystemFlowSection />
      </ScrollSectionWrapper>
      
      {/* Points System */}
      <ScrollSectionWrapper>
        <PointsSystemSection />
      </ScrollSectionWrapper>
      
      {/* CTA */}
      <ScrollSectionWrapper isLast>
        <CTASection />
      </ScrollSectionWrapper>
    </main>
  );
}
