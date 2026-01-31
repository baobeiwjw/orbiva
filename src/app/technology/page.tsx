'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
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
const certifications = [
  { name: 'ISO 27001', descKey: 'cert1' },
  { name: 'GDPR', descKey: 'cert2' },
  { name: 'SOC 2', descKey: 'cert3' },
  { name: 'HIPAA', descKey: 'cert4' },
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
          className="absolute w-[130vw] h-[60vh] border border-[#EC4899]/[0.06] rounded-[50%]"
        />
      </div>

      <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-[#EC4899]/[0.02] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm">
            <Cpu className="w-4 h-4 text-[#EC4899]" />
            {t('technology', 'heroTag')}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {t('technology', 'heroTitle1')}
          <span className="block bg-gradient-to-r from-[#EC4899] to-[#a78bfa] bg-clip-text text-transparent">
            {t('technology', 'heroTitle2')}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.35}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto"
        >
          {t('technology', 'heroSubtitle')}
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

// ========== 三大技术支柱 Bento Grid ==========
function TechPillarsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  const techPillars = [
    {
      icon: Brain,
      titleKey: 'pillar1Title',
      descKey: 'pillar1Desc',
      details: ['pillar1Detail1', 'pillar1Detail2', 'pillar1Detail3', 'pillar1Detail4'],
      color: 'from-[#EC4899] to-[#a78bfa]',
    },
    {
      icon: Shield,
      titleKey: 'pillar2Title',
      descKey: 'pillar2Desc',
      details: ['pillar2Detail1', 'pillar2Detail2', 'pillar2Detail3', 'pillar2Detail4'],
      color: 'from-[#06B6D4] to-[#7C3AED]',
    },
    {
      icon: GraduationCap,
      titleKey: 'pillar3Title',
      descKey: 'pillar3Desc',
      details: ['pillar3Detail1', 'pillar3Detail2', 'pillar3Detail3', 'pillar3Detail4'],
      color: 'from-[#3b82f6] to-[#06b6d4]',
    },
  ];

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#EC4899]/[0.02] rounded-full blur-[150px]" />
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
            {t('technology', 'heroTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('technology', 'archTitle')}
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {techPillars.map((pillar, index) => (
            <motion.div
              key={pillar.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <pillar.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{t('technology', pillar.titleKey)}</h3>
              <p className="text-white/40 mb-6">{t('technology', pillar.descKey)}</p>
              
              <ul className="space-y-3">
                {pillar.details.map((detailKey) => (
                  <li key={detailKey} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />
                    <span className="text-white/60">{t('technology', detailKey)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== 系统架构 ==========
function ArchitectureSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  const architectureLayers = [
    { layerKey: 'arch1Title', icon: Wifi, descKey: 'arch1Desc', color: 'from-[#7C3AED] to-[#06B6D4]' },
    { layerKey: 'arch2Title', icon: Cpu, descKey: 'arch2Desc', color: 'from-[#06B6D4] to-[#06b6d4]' },
    { layerKey: 'arch3Title', icon: Lock, descKey: 'arch3Desc', color: 'from-[#06b6d4] to-[#EC4899]' },
    { layerKey: 'arch4Title', icon: Cloud, descKey: 'arch4Desc', color: 'from-[#EC4899] to-[#a78bfa]' },
  ];

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
            <Cpu className="w-4 h-4 text-[#06B6D4]" />
            {t('technology', 'archTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('technology', 'archTitle')}
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('technology', 'archDesc')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {architectureLayers.map((layer, index) => (
            <motion.div
              key={layer.layerKey}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative mb-8 last:mb-0"
            >
              {index < architectureLayers.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-8 bg-gradient-to-b from-white/20 to-transparent" />
              )}

              <div className="flex items-start gap-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${layer.color} flex items-center justify-center flex-shrink-0`}>
                  <layer.icon className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                  <h3 className="font-bold text-white text-lg mb-2">{t('technology', layer.layerKey)}</h3>
                  <p className="text-white/50">{t('technology', layer.descKey)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== 隐私保护 Bento Grid ==========
function PrivacySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  const privacyFeatures = [
    { icon: Laptop, titleKey: 'privacy1Title', descKey: 'privacy1Desc' },
    { icon: Lock, titleKey: 'privacy2Title', descKey: 'privacy2Desc' },
    { icon: Database, titleKey: 'privacy3Title', descKey: 'privacy3Desc' },
    { icon: Eye, titleKey: 'privacy4Title', descKey: 'privacy4Desc' },
  ];

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#3b82f6]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <Shield className="w-4 h-4 text-[#3b82f6]" />
            {t('technology', 'privacyTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('technology', 'privacyTitle')}
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('technology', 'privacyDesc')}
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
              className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#3b82f6]/30 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#3b82f6]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-[#3b82f6]" />
              </div>
              <h3 className="font-bold text-white mb-2">{t('technology', feature.titleKey)}</h3>
              <p className="text-sm text-white/40">{t('technology', feature.descKey)}</p>
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
          <h3 className="text-xl font-bold text-white mb-6 text-center">{t('technology', 'certTitle')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div key={cert.name} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-3">
                  <span className="text-[#7C3AED] font-bold text-sm">{cert.name}</span>
                </div>
                <p className="text-xs text-white/40">{t('technology', cert.descKey)}</p>
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

  const ntuHighlights = [
    { icon: Brain, titleKey: 'ntuFeature1', descKey: 'ntuFeature1Desc' },
    { icon: Shield, titleKey: 'ntuFeature2', descKey: 'ntuFeature2Desc' },
    { icon: FileCheck, titleKey: 'ntuFeature3', descKey: 'ntuFeature3Desc' },
    { icon: Award, titleKey: 'ntuFeature4', descKey: 'ntuFeature4Desc' },
  ];

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-[#EC4899]/[0.02] rounded-full blur-[150px]" />
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
              <GraduationCap className="w-4 h-4 text-[#EC4899]" />
              {t('technology', 'ntuTag')}
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('technology', 'ntuTitle')}
            </h2>
            
            <p className="text-white/40 mb-8 text-lg">
              {t('technology', 'ntuDesc')}
            </p>

            <div className="space-y-4">
              {ntuHighlights.map((item, index) => (
                <motion.div
                  key={item.titleKey}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#EC4899]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#EC4899]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{t('technology', item.titleKey)}</h4>
                    <p className="text-sm text-white/40">{t('technology', item.descKey)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 右侧 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
              <h3 className="text-lg font-bold text-white mb-6">{t('technology', 'ntuPapersTitle')}</h3>
              
              <div className="space-y-4 mb-8">
                {[
                  { title: 'Deep Learning for Multi-modal Health Prediction', venue: 'Nature Digital Medicine, 2024' },
                  { title: 'Privacy-Preserving Edge Computing for Wearable Health Devices', venue: 'IEEE IoT Journal, 2024' },
                  { title: 'Digital Twin Technology for Personalized Health Management', venue: 'JMIR, 2023' },
                ].map((paper) => (
                  <div key={paper.title} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <h4 className="font-medium text-white text-sm mb-1">{paper.title}</h4>
                    <p className="text-xs text-[#EC4899]">{paper.venue}</p>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/[0.05] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-sm">{t('technology', 'ntuStartYear')}</span>
                  <span className="text-white font-medium">2022</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-sm">{t('technology', 'ntuPapers')}</span>
                  <span className="text-white font-medium">12+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-sm">{t('technology', 'ntuProjects')}</span>
                  <span className="text-white font-medium">5+</span>
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
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-[#EC4899]/[0.03] to-transparent rounded-full blur-[150px]" />
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
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#EC4899] to-[#a78bfa] flex items-center justify-center"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('technology', 'ctaTitle1')}
            <span className="block bg-gradient-to-r from-[#EC4899] to-[#a78bfa] bg-clip-text text-transparent">
              {t('technology', 'ctaTitle2')}
            </span>
          </h2>

          <p className="text-white/40 text-lg mb-10 max-w-2xl mx-auto">
            {t('technology', 'ctaDesc')}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              {t('technology', 'downloadWhitepaper')}
            </Button>
            <Button variant="secondary" size="lg">
              {t('common', 'contactUs')}
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
      
      {/* Architecture */}
      <ScrollSectionWrapper>
        <ArchitectureSection />
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
