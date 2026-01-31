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
const partnerTypesConfig = [
  {
    id: 'pharma',
    nameKey: 'typePharmaName',
    icon: FlaskConical,
    headlineKey: 'typePharmaHeadline',
    descKey: 'typePharmaDesc',
    benefitKeys: ['typePharmaB1', 'typePharmaB2', 'typePharmaB3', 'typePharmaB4'],
    stats: [{ valueKey: 'typePharmaS1V', labelKey: 'typePharmaS1L' }, { valueKey: 'typePharmaS2V', labelKey: 'typePharmaS2L' }, { valueKey: 'typePharmaS3V', labelKey: 'typePharmaS3L' }],
    color: 'from-[#EC4899] to-[#a78bfa]',
  },
  {
    id: 'insurance',
    nameKey: 'typeInsuranceName',
    icon: Shield,
    headlineKey: 'typeInsuranceHeadline',
    descKey: 'typeInsuranceDesc',
    benefitKeys: ['typeInsuranceB1', 'typeInsuranceB2', 'typeInsuranceB3', 'typeInsuranceB4'],
    stats: [{ valueKey: 'typeInsuranceS1V', labelKey: 'typeInsuranceS1L' }, { valueKey: 'typeInsuranceS2V', labelKey: 'typeInsuranceS2L' }, { valueKey: 'typeInsuranceS3V', labelKey: 'typeInsuranceS3L' }],
    color: 'from-[#06B6D4] to-[#7C3AED]',
  },
  {
    id: 'hardware',
    nameKey: 'typeHardwareName',
    icon: Cpu,
    headlineKey: 'typeHardwareHeadline',
    descKey: 'typeHardwareDesc',
    benefitKeys: ['typeHardwareB1', 'typeHardwareB2', 'typeHardwareB3', 'typeHardwareB4'],
    stats: [{ valueKey: 'typeHardwareS1V', labelKey: 'typeHardwareS1L' }, { valueKey: 'typeHardwareS2V', labelKey: 'typeHardwareS2L' }, { valueKey: 'typeHardwareS3V', labelKey: 'typeHardwareS3L' }],
    color: 'from-[#3b82f6] to-[#06b6d4]',
  },
];

const successCasesConfig = [
  { logo: '🏥', nameKey: 'case1Name', typeKey: 'case1Type', resultKey: 'case1Result' },
  { logo: '🛡️', nameKey: 'case2Name', typeKey: 'case2Type', resultKey: 'case2Result' },
  { logo: '⌚', nameKey: 'case3Name', typeKey: 'case3Type', resultKey: 'case3Result' },
];

const cooperationProcessConfig = [
  { step: 1, titleKey: 'process1Title', descKey: 'process1Desc' },
  { step: 2, titleKey: 'process2Title', descKey: 'process2Desc' },
  { step: 3, titleKey: 'process3Title', descKey: 'process3Desc' },
  { step: 4, titleKey: 'process4Title', descKey: 'process4Desc' },
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
          className="absolute w-[130vw] h-[60vh] border border-[#3b82f6]/[0.06] rounded-[50%]"
        />
      </div>

      <div className="absolute top-1/4 left-1/3 w-[500px] h-[400px] bg-[#3b82f6]/[0.02] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm">
            <Handshake className="w-4 h-4 text-[#3b82f6]" />
            {t('partners', 'heroTag')}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {t('partners', 'heroTitle1')}
          <span className="block bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
            {t('partners', 'heroTitle2')}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.35}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto"
        >
          {t('partners', 'heroSubtitle')}
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

// ========== 合作伙伴类型 ==========
function PartnerTypesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [activePartner, setActivePartner] = useState('pharma');
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#EC4899]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {partnerTypesConfig.map((type) => (
            <button
              key={type.id}
              onClick={() => setActivePartner(type.id)}
              className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all ${
                activePartner === type.id
                  ? 'bg-white/[0.1] text-white border border-white/[0.1]'
                  : 'bg-white/[0.02] text-white/60 border border-white/[0.05] hover:bg-white/[0.05]'
              }`}
            >
              <type.icon className="w-5 h-5" />
              {t('partners', type.nameKey)}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {partnerTypesConfig
            .filter((type) => type.id === activePartner)
            .map((type) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Left */}
                  <div>
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-6`}>
                      <type.icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">{t('partners', type.headlineKey)}</h2>
                    <p className="text-white/40 mb-8">{t('partners', type.descKey)}</p>

                    <div className="space-y-4 mb-8">
                      {type.benefitKeys.map((benefitKey, index) => (
                        <motion.div
                          key={benefitKey}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-[#7C3AED]" />
                          </div>
                          <span className="text-white">{t('partners', benefitKey)}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                      {t('partners', 'applyCooperation')}
                    </Button>
                  </div>

                  {/* Right */}
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                    <h3 className="text-lg font-bold text-white mb-6">{t('partners', 'cooperationResults')}</h3>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {type.stats.map((stat) => (
                        <div key={stat.labelKey} className="text-center">
                          <div className="text-3xl font-bold text-[#7C3AED]">{t('partners', stat.valueKey)}</div>
                          <div className="text-xs text-white/40 mt-1">{t('partners', stat.labelKey)}</div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-white/[0.05]">
                      <div className="flex items-center gap-3 mb-4">
                        <Lightbulb className="w-5 h-5 text-[#7C3AED]" />
                        <span className="font-medium text-white">{t('partners', 'whyChooseOrbiva')}</span>
                      </div>
                      <ul className="space-y-2 text-sm text-white/50">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                          {t('partners', 'reason1')}
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                          {t('partners', 'reason2')}
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                          {t('partners', 'reason3')}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ========== 成功案例 ==========
function SuccessCasesSection() {
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
            <TrendingUp className="w-4 h-4 text-[#06B6D4]" />
            {t('partners', 'casesTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('partners', 'casesTitle')}
          </h2>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {successCasesConfig.map((caseItem, index) => (
            <motion.div
              key={caseItem.nameKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#06B6D4]/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-white/[0.03] flex items-center justify-center text-3xl">
                  {caseItem.logo}
                </div>
                <div>
                  <h3 className="font-bold text-white">{t('partners', caseItem.nameKey)}</h3>
                  <span className="text-xs text-white/40">{t('partners', caseItem.typeKey)}</span>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-[#06B6D4]/5 border border-[#06B6D4]/20">
                <div className="flex items-center gap-2 text-[#06B6D4]">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">{t('partners', caseItem.resultKey)}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
            <Sparkles className="w-4 h-4 text-[#EC4899]" />
            {t('partners', 'processTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('partners', 'processTitle')}
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
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#EC4899] to-transparent -translate-x-1/2" />
              )}

              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-center relative z-10">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-[#EC4899] to-[#a78bfa] flex items-center justify-center text-white font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-white mb-2">{t('partners', item.titleKey)}</h3>
                <p className="text-sm text-white/40">{t('partners', item.descKey)}</p>
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
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-[#3b82f6]/[0.03] to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="p-12 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#06b6d4] flex items-center justify-center"
          >
            <Briefcase className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('partners', 'ctaTitle')}
          </h2>

          <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
            {t('partners', 'ctaDesc')}
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              {t('partners', 'contactBusiness')}
            </Button>
            <Button variant="secondary" size="lg">
              {t('partners', 'downloadBrochure')}
            </Button>
          </div>

          <div className="pt-8 border-t border-white/[0.05]">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#3b82f6]" />
                <span>{t('partners', 'globalRegions')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#3b82f6]" />
                <span>{t('partners', 'partnerCount')}</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#3b82f6]" />
                <span>{t('partners', 'businessValue')}</span>
              </div>
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
      
      {/* Success Cases */}
      <ScrollSectionWrapper>
        <SuccessCasesSection />
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
