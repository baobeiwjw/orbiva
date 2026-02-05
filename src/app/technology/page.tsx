'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';
import {
  Cpu,
  Shield,
  Brain,
  Lock,
  Wifi,
  Eye,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Database,
  Cloud,
  Laptop,
  FileCheck,
  Award,
  Lightbulb,
  Layers,
  Zap,
  Server,
  GitBranch,
  FileText,
  ExternalLink,
  Users,
  BarChart3,
  Activity,
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

// ========== 数据 ==========
const certifications = [
  { nameKey: 'cert1Name', descKey: 'cert1Desc', icon: Shield },
  { nameKey: 'cert2Name', descKey: 'cert2Desc', icon: Lock },
  { nameKey: 'cert3Name', descKey: 'cert3Desc', icon: FileCheck },
  { nameKey: 'cert4Name', descKey: 'cert4Desc', icon: Activity },
] as const;

const techPillarsData = [
  {
    id: 'edge-ai',
    icon: Cpu,
    titleKey: 'edgeAITitle',
    subtitleKey: 'edgeAISubtitle',
    descKey: 'edgeAIDesc',
    detailKeys: ['edgeAIDetail1', 'edgeAIDetail2', 'edgeAIDetail3', 'edgeAIDetail4'],
    detailIcons: [Zap, Server, Wifi, Layers],
    color: 'from-[#4ADE80] to-[#67E8F9]',
    stats: [
      { value: '<50ms', labelKey: 'statLatency' },
      { value: '95%+', labelKey: 'statAccuracy' },
      { value: '<2W', labelKey: 'statPower' },
    ],
  },
  {
    id: 'explainable-ai',
    icon: Lightbulb,
    titleKey: 'explainableAITitle',
    subtitleKey: 'explainableAISubtitle',
    descKey: 'explainableAIDesc',
    detailKeys: ['explainableAIDetail1', 'explainableAIDetail2', 'explainableAIDetail3', 'explainableAIDetail4'],
    detailIcons: [Eye, GitBranch, BarChart3, FileText],
    color: 'from-[#06B6D4] to-[#22D3EE]',
    stats: [
      { value: '100%', labelKey: 'statTransparency' },
      { value: '+40%', labelKey: 'statTrust' },
      { value: '+65%', labelKey: 'statAdoption' },
    ],
  },
  {
    id: 'privacy',
    icon: Shield,
    titleKey: 'privacyArchTitle',
    subtitleKey: 'privacyArchSubtitle',
    descKey: 'privacyArchDesc',
    detailKeys: ['privacyArchDetail1', 'privacyArchDetail2', 'privacyArchDetail3', 'privacyArchDetail4'],
    detailIcons: [Lock, Database, Users, Shield],
    color: 'from-[#22D3EE] to-[#06b6d4]',
    stats: [
      { value: 'AES-256', labelKey: 'statEncryption' },
      { value: '4', labelKey: 'statCertCount' },
      { value: '1/yr', labelKey: 'statAudit' },
    ],
  },
];

const explainableAIFeatures = [
  {
    titleKey: 'inferencePathTitle',
    descKey: 'inferencePathDesc',
    icon: GitBranch,
    exampleKey: 'inferencePathExample',
  },
  {
    titleKey: 'featureContribTitle',
    descKey: 'featureContribDesc',
    icon: BarChart3,
    exampleKey: 'featureContribExample',
  },
  {
    titleKey: 'naturalLangTitle',
    descKey: 'naturalLangDesc',
    icon: FileText,
    exampleKey: 'naturalLangExample',
  },
  {
    titleKey: 'confidenceTitle',
    descKey: 'confidenceDesc',
    icon: Activity,
    exampleKey: 'confidenceExample',
  },
];

const ntuCollaboration = {
  institutionKey: 'ntuInstitution',
  departmentKey: 'ntuDepartment',
  labKey: 'ntuLab',
  startYear: 2022,
  papers: 12,
  patents: 5,
  publications: [
    { title: 'Deep Learning for Multi-modal Health Prediction', venue: 'Nature Digital Medicine', year: 2024, impact: 'IF: 15.3' },
    { title: 'Privacy-Preserving Edge Computing for Wearable Devices', venue: 'IEEE IoT Journal', year: 2024, impact: 'IF: 10.6' },
    { title: 'Explainable AI for Personal Health Management', venue: 'ACM CHI', year: 2024, impactKey: 'ntuBestPaperCandidate' },
    { title: 'Digital Twin Technology for Personalized Health', venue: 'JMIR', year: 2023, impact: 'IF: 7.4' },
  ],
  researchers: [
    { name: 'Prof. Lim Joo Hwee', roleKey: 'chiefResearcher', focusKey: 'multimodalLearning' },
    { name: 'Dr. Chen Wei', roleKey: 'jointResearcher', focusKey: 'edgeComputing' },
    { name: 'Prof. Ong Yew Soon', roleKey: 'advisor', focusKey: 'evolutionaryComputing' },
  ],
};

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
          className="absolute w-[130vw] h-[60vh] border border-[#4ADE80]/[0.06] rounded-[50%]"
        />
      </div>

      <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-[#4ADE80]/[0.02] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm">
            <HandDrawnIcon icon={Cpu} size="sm" variant="outline" />
            {t('technology.heroTag')}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {t('technology.heroTitle1New')}
          <span className="block bg-gradient-to-r from-[#4ADE80] to-[#67E8F9] bg-clip-text text-transparent">
            {t('technology.heroTitle2New')}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.35}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto mb-8"
        >
          {t('technology.heroSubtitleNew')}
        </motion.p>

        {/* 技术标签 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {[t('technology.techTag1'), t('technology.techTag2'), t('technology.techTag3'), t('technology.techTag4')].map((tag, index) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm"
            >
              {tag}
            </motion.span>
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

// ========== 三大技术支柱 ==========
function TechPillarsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activePillar, setActivePillar] = useState('edge-ai');
  const { t } = useI18n();

  const currentPillar = techPillarsData.find(p => p.id === activePillar)!;

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4ADE80]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <HandDrawnIcon icon={Sparkles} size="sm" variant="outline" />
            {t('technology.techPillarsTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('technology.techPillarsTitle1')}<span className="bg-gradient-to-r from-[#4ADE80] to-[#67E8F9] bg-clip-text text-transparent">{t('technology.techPillarsTitle2')}</span>
          </h2>
        </motion.div>

        {/* 切换标签 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {techPillarsData.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setActivePillar(pillar.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all ${
                activePillar === pillar.id
                  ? 'bg-white/[0.1] text-white border border-white/[0.1]'
                  : 'bg-white/[0.02] text-white/60 border border-white/[0.05] hover:bg-white/[0.05]'
              }`}
            >
              <HandDrawnIcon icon={pillar.icon} size="md" variant="filled" className="mr-2" />
              {t(`technology.${pillar.titleKey}`)}
            </button>
          ))}
        </div>

        {/* 内容区域 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            {/* 左侧描述 */}
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
              <HandDrawnIcon icon={currentPillar.icon} size="xl" variant="filled" className="mb-6" />
              
              <h3 className="text-2xl font-bold text-white mb-2">{t(`technology.${currentPillar.titleKey}`)}</h3>
              <p className="text-white/40 text-sm mb-4">{t(`technology.${currentPillar.subtitleKey}`)}</p>
              <p className="text-white/60 mb-8">{t(`technology.${currentPillar.descKey}`)}</p>
              
              <div className="space-y-4">
                {currentPillar.detailKeys.map((detailKey, index) => (
                  <motion.div
                    key={detailKey}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <HandDrawnIcon icon={currentPillar.detailIcons[index]} size="md" variant="filled" />
                    <span className="text-white">{t(`technology.${detailKey}`)}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 右侧统计 */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                <h4 className="text-lg font-bold text-white mb-6">{t('technology.keyMetrics')}</h4>
                <div className="grid grid-cols-3 gap-4">
                  {currentPillar.stats.map((stat) => (
                    <div key={stat.labelKey} className="text-center">
                      <div className="text-2xl font-bold text-[#22D3EE]">{stat.value}</div>
                      <div className="text-xs text-white/40 mt-1">{t(`technology.${stat.labelKey}`)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 可视化示意 */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05]">
                <h4 className="text-sm font-medium text-white/60 mb-4">{t('technology.techArchDiagram')}</h4>
                <div className="space-y-3">
                  {activePillar === 'edge-ai' && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#4ADE80]" />
                        <span className="text-sm text-white/60">{t('technology.edgeFlow1')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#22D3EE]" />
                        <span className="text-sm text-white/60">{t('technology.edgeFlow2')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#06B6D4]" />
                        <span className="text-sm text-white/60">{t('technology.edgeFlow3')}</span>
                      </div>
                    </>
                  )}
                  {activePillar === 'explainable-ai' && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#06B6D4]" />
                        <span className="text-sm text-white/60">{t('technology.explainableFlow1')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#22D3EE]" />
                        <span className="text-sm text-white/60">{t('technology.explainableFlow2')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#4ADE80]" />
                        <span className="text-sm text-white/60">{t('technology.explainableFlow3')}</span>
                      </div>
                    </>
                  )}
                  {activePillar === 'privacy' && (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#22D3EE]" />
                        <span className="text-sm text-white/60">{t('technology.privacyFlow1')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#06B6D4]" />
                        <span className="text-sm text-white/60">{t('technology.privacyFlow2')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#22D3EE]" />
                        <span className="text-sm text-white/60">{t('technology.privacyFlow3')}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ========== 可解释性AI深度解读 ==========
function ExplainableAISection() {
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
            <HandDrawnIcon icon={Lightbulb} size="sm" variant="outline" />
            {t('technology.explainableTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('technology.explainableTitle1')}
            <span className="bg-gradient-to-r from-[#06B6D4] to-[#22D3EE] bg-clip-text text-transparent">{t('technology.explainableTitle2')}</span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('technology.explainableSubtitle')}
          </p>
        </motion.div>

        {/* 特性卡片 */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {explainableAIFeatures.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#06B6D4]/30 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <HandDrawnIcon icon={feature.icon} size="lg" variant="filled" className="flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">{t(`technology.${feature.titleKey}`)}</h3>
                  <p className="text-sm text-white/40">{t(`technology.${feature.descKey}`)}</p>
                </div>
              </div>
              
              {/* 示例 */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div className="text-xs text-white/30 mb-2">{t('technology.exampleOutput')}</div>
                <p className="text-sm text-white/60 font-mono">{t(`technology.${feature.exampleKey}`)}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 对比图 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]"
        >
          <h3 className="text-xl font-bold text-white text-center mb-8">{t('technology.aiComparisonTitle')}</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
              <div className="text-red-400 font-medium mb-4">❌ {t('technology.traditionalBlackboxAI')}</div>
              <div className="space-y-3 text-sm text-white/50">
                <p>{t('technology.compInput')}</p>
                <p>{t('technology.compOutput')}</p>
                <p className="text-red-400/60">{t('technology.compQuestion')}</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20">
              <div className="text-green-400 font-medium mb-4">✓ {t('technology.orbivaExplainableAI')}</div>
              <div className="space-y-3 text-sm text-white/50">
                <p>{t('technology.compInput')}</p>
                <p>{t('technology.compOutput')}</p>
                <p className="text-green-400/60">{t('technology.compExplain1')}</p>
                <p className="text-green-400/60">{t('technology.compExplain2')}</p>
                <p className="text-green-400/60">{t('technology.compSuggestion')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 隐私保护 ==========
function PrivacySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  const privacyFeatures = [
    { icon: Laptop, titleKey: 'localFirstTitle', descKey: 'localFirstDesc' },
    { icon: Lock, titleKey: 'e2eEncryptTitle', descKey: 'e2eEncryptDesc' },
    { icon: Database, titleKey: 'diffPrivacyTitle', descKey: 'diffPrivacyDesc' },
    { icon: Eye, titleKey: 'userControlTitle', descKey: 'userControlDesc' },
  ];

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#22D3EE]/[0.02] rounded-full blur-[150px]" />
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
            {t('technology.privacyTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('technology.privacyTitle1')}
            <span className="bg-gradient-to-r from-[#22D3EE] to-[#06B6D4] bg-clip-text text-transparent">{t('technology.privacyTitle2')}</span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('technology.privacySubtitle')}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#22D3EE]/30 transition-all duration-300 text-center"
            >
              <HandDrawnIcon icon={feature.icon} size="lg" variant="filled" className="mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-bold text-white mb-2">{t(`technology.${feature.titleKey}`)}</h3>
              <p className="text-sm text-white/40">{t(`technology.${feature.descKey}`)}</p>
            </motion.div>
          ))}
        </div>

        {/* 认证 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">{t('technology.complianceCert')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div key={cert.nameKey} className="text-center group">
                <div className="w-16 h-16 mx-auto rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-3 group-hover:border-[#22D3EE]/30 transition-colors">
                  <HandDrawnIcon icon={cert.icon} size="md" variant="filled" />
                </div>
                <div className="text-sm font-medium text-white">{t(`technology.${cert.nameKey}`)}</div>
                <p className="text-xs text-white/40">{t(`technology.${cert.descKey}`)}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== NTU 学术合作 ==========
function NTUSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-[#4ADE80]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* 左侧 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
              <HandDrawnIcon icon={GraduationCap} size="sm" variant="outline" />
              {t('technology.ntuTag')}
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t(`technology.${ntuCollaboration.institutionKey}`)}
              <span className="block text-xl font-normal text-white/40 mt-2">
                {t('technology.ntuEnglishName')}
              </span>
            </h2>
            
            <p className="text-white/40 mb-8 text-lg">
              {t('technology.ntuCollabDesc')}
            </p>

            {/* 合作数据 */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
                <div className="text-2xl font-bold text-[#4ADE80]">{ntuCollaboration.startYear}</div>
                <div className="text-xs text-white/40">{t('technology.collabSince')}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
                <div className="text-2xl font-bold text-[#22D3EE]">{ntuCollaboration.papers}+</div>
                <div className="text-xs text-white/40">{t('technology.ntuPapersCount')}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center">
                <div className="text-2xl font-bold text-[#06B6D4]">{ntuCollaboration.patents}+</div>
                <div className="text-xs text-white/40">{t('technology.ntuPatentsCount')}</div>
              </div>
            </div>

            {/* 研究团队 */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              <h4 className="font-medium text-white mb-4">{t('technology.coreResearchTeam')}</h4>
              <div className="space-y-3">
                {ntuCollaboration.researchers.map((researcher) => (
                  <div key={researcher.name} className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-white">{researcher.name}</div>
                      <div className="text-xs text-white/40">{t(`technology.${researcher.roleKey}`)}</div>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-[#4ADE80]/10 text-[#4ADE80]">
                      {t(`technology.${researcher.focusKey}`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 右侧 - 论文列表 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <HandDrawnIcon icon={FileText} size="sm" variant="outline" />
                {t('technology.representativePapers')}
              </h3>
              
              <div className="space-y-4 mb-8">
                {ntuCollaboration.publications.map((paper, index) => (
                  <motion.div
                    key={paper.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#4ADE80]/30 transition-colors cursor-pointer group"
                  >
                    <h4 className="font-medium text-white text-sm mb-2 group-hover:text-[#4ADE80] transition-colors">
                      {paper.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#4ADE80]">{paper.venue}, {paper.year}</span>
                      <span className="text-white/40">{'impactKey' in paper ? t(`technology.${paper.impactKey}`) : paper.impact}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button variant="secondary" className="w-full" icon={<ExternalLink className="w-4 h-4" />}>
                {t('technology.viewAllPapers')}
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
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-[#4ADE80]/[0.03] to-transparent rounded-full blur-[150px]" />
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
            {t('technology.ctaTitle1')}
            <span className="block bg-gradient-to-r from-[#4ADE80] to-[#67E8F9] bg-clip-text text-transparent">
              {t('technology.ctaTitle2')}
            </span>
          </h2>

          <p className="text-white/40 text-lg mb-10 max-w-2xl mx-auto">
            {t('technology.ctaDesc')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              {t('technology.downloadWhitepaper')}
            </Button>
            <Button variant="secondary" size="lg">
              {t('technology.contactTechTeam')}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 主页面 ==========
export default function TechnologyPage() {
  return (
    <main className="relative bg-[#050505]">
      <div className="fixed inset-0 bg-[#050505] -z-10" />
      
      {/* Hero */}
      <HeroSection />
      
      {/* Tech Pillars */}
      <ScrollSectionWrapper>
        <TechPillarsSection />
      </ScrollSectionWrapper>
      
      {/* Explainable AI */}
      <ScrollSectionWrapper>
        <ExplainableAISection />
      </ScrollSectionWrapper>
      
      {/* Privacy */}
      <ScrollSectionWrapper>
        <PrivacySection />
      </ScrollSectionWrapper>
      
      {/* NTU */}
      <ScrollSectionWrapper>
        <NTUSection />
      </ScrollSectionWrapper>
      
      {/* CTA */}
      <ScrollSectionWrapper isLast>
        <CTASection />
      </ScrollSectionWrapper>
    </main>
  );
}
