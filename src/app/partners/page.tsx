'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';
import {
  Users,
  Building2,
  FlaskConical,
  Shield,
  Cpu,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Globe,
  Handshake,
  BarChart3,
  Lightbulb,
  Sparkles,
  Landmark,
  Heart,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Clock,
  Target,
  Award,
  Zap,
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

// ========== 数据 (使用翻译键) ==========
const partnerTypesConfig = [
  {
    id: 'pharma',
    nameKey: 'typePharmaName',
    icon: FlaskConical,
    headlineKey: 'typePharmaHeadline',
    descriptionKey: 'typePharmaDesc',
    benefitKeys: ['pharmaBenefit1', 'pharmaBenefit2', 'pharmaBenefit3', 'pharmaBenefit4'],
    stats: [
      { value: '50+', labelKey: 'pharmaStats1' },
      { value: '200+', labelKey: 'pharmaStats2' },
      { value: '3x', labelKey: 'pharmaStats3' },
    ],
    cases: [
      { nameKey: 'pharmaCase1Name', resultKey: 'pharmaCase1Result' },
      { nameKey: 'pharmaCase2Name', resultKey: 'pharmaCase2Result' },
    ],
    color: 'from-[#4ADE80] to-[#67E8F9]',
  },
  {
    id: 'insurance',
    nameKey: 'typeInsuranceName',
    icon: Shield,
    headlineKey: 'typeInsuranceHeadline',
    descriptionKey: 'typeInsuranceDesc',
    benefitKeys: ['insuranceBenefit1', 'insuranceBenefit2', 'insuranceBenefit3', 'insuranceBenefit4'],
    stats: [
      { value: '30%', labelKey: 'insuranceStats1' },
      { value: '2x', labelKey: 'insuranceStats2' },
      { value: '15+', labelKey: 'insuranceStats3' },
    ],
    cases: [
      { nameKey: 'insuranceCase1Name', resultKey: 'insuranceCase1Result' },
      { nameKey: 'insuranceCase2Name', resultKey: 'insuranceCase2Result' },
    ],
    color: 'from-[#06B6D4] to-[#22D3EE]',
  },
  {
    id: 'hardware',
    nameKey: 'typeHardwareName',
    icon: Cpu,
    headlineKey: 'typeHardwareHeadline',
    descriptionKey: 'typeHardwareDesc',
    benefitKeys: ['hardwareBenefit1', 'hardwareBenefit2', 'hardwareBenefit3', 'hardwareBenefit4'],
    stats: [
      { value: '20+', labelKey: 'hardwareStats1' },
      { value: '100万+', labelKey: 'hardwareStats2' },
      { value: '7天', labelKey: 'hardwareStats3' },
    ],
    cases: [
      { nameKey: 'hardwareCase1Name', resultKey: 'hardwareCase1Result' },
      { nameKey: 'hardwareCase2Name', resultKey: 'hardwareCase2Result' },
    ],
    color: 'from-[#22D3EE] to-[#06b6d4]',
  },
  {
    id: 'government',
    nameKey: 'typeGovernmentName',
    icon: Landmark,
    headlineKey: 'typeGovernmentHeadline',
    descriptionKey: 'typeGovernmentDesc',
    benefitKeys: ['governmentBenefit1', 'governmentBenefit2', 'governmentBenefit3', 'governmentBenefit4'],
    stats: [
      { value: '3个', labelKey: 'governmentStats1' },
      { value: '50万+', labelKey: 'governmentStats2' },
      { value: '2周', labelKey: 'governmentStats3' },
    ],
    cases: [
      { nameKey: 'governmentCase1Name', resultKey: 'governmentCase1Result' },
      { nameKey: 'governmentCase2Name', resultKey: 'governmentCase2Result' },
    ],
    color: 'from-[#f59e0b] to-[#ef4444]',
  },
];

const cooperationProcessConfig = [
  { 
    step: 1, 
    titleKey: 'process1Title', 
    descKey: 'process1Desc',
    icon: Phone,
    durationKey: 'process1Duration',
  },
  { 
    step: 2, 
    titleKey: 'process2Title', 
    descKey: 'process2Desc',
    icon: FileText,
    durationKey: 'process2Duration',
  },
  { 
    step: 3, 
    titleKey: 'process3Title', 
    descKey: 'process3Desc',
    icon: Cpu,
    durationKey: 'process3Duration',
  },
  { 
    step: 4, 
    titleKey: 'process4Title', 
    descKey: 'process4Desc',
    icon: Zap,
    durationKey: 'process4Duration',
  },
];

const partnerLogos = [
  { name: 'Novartis', category: 'pharma' },
  { name: 'AIA', category: 'insurance' },
  { name: 'Xiaomi', category: 'hardware' },
  { name: 'Ping An', category: 'insurance' },
  { name: 'Roche', category: 'pharma' },
  { name: 'Omron', category: 'hardware' },
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

      <div className="absolute top-1/4 left-1/3 w-[500px] h-[400px] bg-[#22D3EE]/[0.02] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm">
            <HandDrawnIcon icon={Handshake} size="sm" variant="outline" />
            {t('partners.heroTag')}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {t('partners.heroTitle1')}
          <span className="block bg-gradient-to-r from-[#22D3EE] to-[#06b6d4] bg-clip-text text-transparent">
            {t('partners.heroTitle2')}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.35}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto mb-8"
        >
          {t('partners.heroSubtitle')}
        </motion.p>

        {/* 合作伙伴类型快捷入口 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {partnerTypesConfig.map((type, index) => (
            <motion.a
              key={type.id}
              href={`#${type.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm hover:border-white/[0.1] transition-colors"
            >
              <HandDrawnIcon icon={type.icon} size="sm" variant="outline" />
              {t(`partners.${type.nameKey}`)}
            </motion.a>
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

// ========== 合作伙伴类型详情 ==========
function PartnerTypesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activePartner, setActivePartner] = useState('pharma');
  const { t } = useI18n();

  const currentPartner = partnerTypesConfig.find(p => p.id === activePartner)!;

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#4ADE80]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {partnerTypesConfig.map((type) => (
            <button
              key={type.id}
              id={type.id}
              onClick={() => setActivePartner(type.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all ${
                activePartner === type.id
                  ? 'bg-white/[0.1] text-white border border-white/[0.1]'
                  : 'bg-white/[0.02] text-white/60 border border-white/[0.05] hover:bg-white/[0.05]'
              }`}
            >
              <HandDrawnIcon icon={type.icon} size="md" variant="filled" className="mr-2" />
              {t(`partners.${type.nameKey}`)}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePartner}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left */}
              <div>
                <HandDrawnIcon icon={currentPartner.icon} size="xl" variant="filled" className="mb-6" />
                <h2 className="text-3xl font-bold text-white mb-4">{t(`partners.${currentPartner.headlineKey}`)}</h2>
                <p className="text-white/40 mb-8">{t(`partners.${currentPartner.descriptionKey}`)}</p>

                <div className="space-y-4 mb-8">
                  {currentPartner.benefitKeys.map((benefitKey, index) => (
                    <motion.div
                      key={benefitKey}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <HandDrawnIcon icon={CheckCircle2} size="sm" variant="filled" />
                      <span className="text-white">{t(`partners.${benefitKey}`)}</span>
                    </motion.div>
                  ))}
                </div>

                <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  {t('partners.applyCooperation')}
                </Button>
              </div>

              {/* Right */}
              <div className="space-y-6">
                {/* 统计数据 */}
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                  <h3 className="text-lg font-bold text-white mb-6">{t('partners.cooperationResults')}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {currentPartner.stats.map((stat) => (
                      <div key={stat.labelKey} className="text-center">
                        <div className="text-3xl font-bold text-[#22D3EE]">{stat.value}</div>
                        <div className="text-xs text-white/40 mt-1">{t(`partners.${stat.labelKey}`)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 成功案例 */}
                <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <HandDrawnIcon icon={Award} size="sm" variant="filled" />
                    {t('partners.casesTag')}
                  </h3>
                  <div className="space-y-4">
                    {currentPartner.cases.map((caseItem) => (
                      <div key={caseItem.nameKey} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <div className="font-medium text-white mb-1">{t(`partners.${caseItem.nameKey}`)}</div>
                        <div className="text-sm text-[#22D3EE]">{t(`partners.${caseItem.resultKey}`)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 为什么选择Orbiva */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.02] to-transparent border border-white/[0.05]">
                  <div className="flex items-center gap-3 mb-4">
                    <HandDrawnIcon icon={Lightbulb} size="sm" variant="outline" />
                    <span className="font-medium text-white">{t('partners.whyChooseOrbiva')}</span>
                  </div>
                  <ul className="space-y-2 text-sm text-white/50">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                      {t('partners.reason1')}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                      {t('partners.reason2')}
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#22D3EE]" />
                      {t('partners.reason3')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ========== 政府G2B专区 ==========
function GovernmentSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  const g2bSolutionsConfig = [
    {
      titleKey: 'g2bSolution1Title',
      descKey: 'g2bSolution1Desc',
      featureKeys: ['g2bSolution1F1', 'g2bSolution1F2', 'g2bSolution1F3', 'g2bSolution1F4'],
      icon: BarChart3,
    },
    {
      titleKey: 'g2bSolution2Title',
      descKey: 'g2bSolution2Desc',
      featureKeys: ['g2bSolution2F1', 'g2bSolution2F2', 'g2bSolution2F3', 'g2bSolution2F4'],
      icon: Shield,
    },
    {
      titleKey: 'g2bSolution3Title',
      descKey: 'g2bSolution3Desc',
      featureKeys: ['g2bSolution3F1', 'g2bSolution3F2', 'g2bSolution3F3', 'g2bSolution3F4'],
      icon: Heart,
    },
    {
      titleKey: 'g2bSolution4Title',
      descKey: 'g2bSolution4Desc',
      featureKeys: ['g2bSolution4F1', 'g2bSolution4F2', 'g2bSolution4F3', 'g2bSolution4F4'],
      icon: Users,
    },
  ];

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#f59e0b]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <HandDrawnIcon icon={Landmark} size="sm" variant="outline" />
            {t('partners.g2bTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('partners.g2bTitle1')}
            <span className="bg-gradient-to-r from-[#f59e0b] to-[#ef4444] bg-clip-text text-transparent"> {t('partners.g2bTitle2')}</span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('partners.g2bSubtitle')}
          </p>
        </motion.div>

        {/* 解决方案网格 */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {g2bSolutionsConfig.map((solution, index) => (
            <motion.div
              key={solution.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#f59e0b]/30 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <HandDrawnIcon icon={solution.icon} size="lg" variant="filled" className="flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-white mb-1">{t(`partners.${solution.titleKey}`)}</h3>
                  <p className="text-sm text-white/40">{t(`partners.${solution.descKey}`)}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {solution.featureKeys.map((featureKey) => (
                  <span
                    key={featureKey}
                    className="px-3 py-1 text-xs rounded-full bg-white/[0.03] text-white/60 border border-white/[0.05]"
                  >
                    {t(`partners.${featureKey}`)}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 政府项目成果 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-[#f59e0b]/5 to-transparent border border-[#f59e0b]/20"
        >
          <h3 className="text-xl font-bold text-white text-center mb-8">{t('partners.g2bResultsTitle')}</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#f59e0b]">3</div>
              <div className="text-white/60 mt-1">{t('partners.g2bResults1Label')}</div>
              <div className="text-xs text-white/40 mt-2">{t('partners.g2bResults1Sub')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#f59e0b]">50万+</div>
              <div className="text-white/60 mt-1">{t('partners.g2bResults2Label')}</div>
              <div className="text-xs text-white/40 mt-2">{t('partners.g2bResults2Sub')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#f59e0b]">2周</div>
              <div className="text-white/60 mt-1">{t('partners.g2bResults3Label')}</div>
              <div className="text-xs text-white/40 mt-2">{t('partners.g2bResults3Sub')}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 合作流程 ==========
function ProcessSection() {
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
            <HandDrawnIcon icon={Target} size="sm" variant="outline" />
            {t('partners.processTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('partners.processTitle1')}
            <span className="bg-gradient-to-r from-[#4ADE80] to-[#67E8F9] bg-clip-text text-transparent">{t('partners.processTitle2')}</span>
            {t('partners.processTitle3')}
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-4 gap-6">
          {cooperationProcessConfig.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {index < cooperationProcessConfig.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#4ADE80] to-transparent -translate-x-1/2 z-0" />
              )}

              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-center relative z-10">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-[#4ADE80] to-[#67E8F9] flex items-center justify-center text-white font-bold text-lg mb-4">
                  {item.step}
                </div>
                <HandDrawnIcon icon={item.icon} size="lg" variant="filled" className="mb-4 mx-auto" />
                <h3 className="font-bold text-white mb-2">{t(`partners.${item.titleKey}`)}</h3>
                <p className="text-sm text-white/40 mb-3">{t(`partners.${item.descKey}`)}</p>
                <span className="inline-flex items-center gap-1 text-xs text-[#4ADE80]">
                  <HandDrawnIcon icon={Clock} size="sm" variant="outline" />
                  {t(`partners.${item.durationKey}`)}
                </span>
              </div>
            </motion.div>
          ))}
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="p-12 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-center"
        >
            <HandDrawnIcon icon={Briefcase} size="xl" variant="filled" className="mx-auto mb-8" />

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('partners.ctaTitle')}
          </h2>

          <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
            {t('partners.ctaDesc')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Button variant="primary" size="lg" icon={<Mail className="w-5 h-5" />}>
              {t('partners.contactBusiness')}
            </Button>
            <Button variant="secondary" size="lg" icon={<Calendar className="w-5 h-5" />}>
              {t('partners.bookMeeting')}
            </Button>
          </div>

          <div className="pt-8 border-t border-white/[0.05]">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <HandDrawnIcon icon={Globe} size="sm" variant="outline" />
                <span>{t('partners.globalRegions')}</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon icon={Building2} size="sm" variant="outline" />
                <span>{t('partners.partnerCount')}</span>
              </div>
              <div className="flex items-center gap-2">
                <HandDrawnIcon icon={BarChart3} size="sm" variant="outline" />
                <span>{t('partners.businessValue')}</span>
              </div>
            </div>
          </div>

          {/* 联系方式 */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <HandDrawnIcon icon={Mail} size="sm" variant="outline" className="mx-auto mb-2" />
              <div className="text-sm text-white">bd@orbiva.io</div>
              <div className="text-xs text-white/40">{t('partners.contactEmail')}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <HandDrawnIcon icon={Phone} size="sm" variant="outline" className="mx-auto mb-2" />
              <div className="text-sm text-white">+65 6123 4567</div>
              <div className="text-xs text-white/40">{t('partners.contactPhone')}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <HandDrawnIcon icon={MapPin} size="sm" variant="outline" className="mx-auto mb-2" />
              <div className="text-sm text-white">{t('partners.officeLocations')}</div>
              <div className="text-xs text-white/40">{t('partners.officeCount')}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 主页面 ==========
export default function PartnersPage() {
  return (
    <main className="relative bg-[#050505]">
      <div className="fixed inset-0 bg-[#050505] -z-10" />
      
      {/* Hero */}
      <HeroSection />
      
      {/* Partner Types */}
      <ScrollSectionWrapper>
        <PartnerTypesSection />
      </ScrollSectionWrapper>
      
      {/* Government G2B */}
      <ScrollSectionWrapper>
        <GovernmentSection />
      </ScrollSectionWrapper>
      
      {/* Process */}
      <ScrollSectionWrapper>
        <ProcessSection />
      </ScrollSectionWrapper>
      
      {/* CTA */}
      <ScrollSectionWrapper isLast>
        <CTASection />
      </ScrollSectionWrapper>
    </main>
  );
}
