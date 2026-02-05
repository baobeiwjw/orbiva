'use client';

import { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Button from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n';
import {
  Building2,
  Globe,
  Users,
  Award,
  FileText,
  Download,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Newspaper,
  Sparkles,
  History,
  Briefcase,
  Target,
  TrendingUp,
  ExternalLink,
  Clock,
  BookOpen,
  FileCheck,
  ChevronRight,
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
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
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
const companyHighlightsConfig = [
  { icon: Building2, titleKey: 'highlight1Title', descKey: 'highlight1Desc', value: '1992', labelKey: 'foundedYear' },
  { icon: Globe, titleKey: 'highlight2Title', descKey: 'highlight2Desc', valueKey: 'singapore', labelKey: 'globalHQ' },
  { icon: Users, titleKey: 'highlight3Title', descKey: 'highlight3Desc', value: '500+', labelKey: 'teamSize' },
  { icon: Award, titleKey: 'highlight4Title', descKey: 'highlight4Desc', value: 'HKEX', labelKey: 'listedCompany' },
] as const;

const heritageTimeline = [
  { year: '1992', eventKey: 'timeline1992Event', milestoneKey: 'timeline1992Milestone', icon: Building2 },
  { year: '2005', eventKey: 'timeline2005Event', milestoneKey: 'timeline2005Milestone', icon: Target },
  { year: '2018', eventKey: 'timeline2018Event', milestoneKey: 'timeline2018Milestone', icon: TrendingUp },
  { year: '2021', eventKey: 'timeline2021Event', milestoneKey: 'timeline2021Milestone', icon: Sparkles },
  { year: '2024', eventKey: 'timeline2024Event', milestoneKey: 'timeline2024Milestone', icon: Award },
  { year: '2026', eventKey: 'timeline2026Event', milestoneKey: 'timeline2026Milestone', icon: Globe },
] as const;

const resourcesConfig = [
  { 
    type: 'whitepaper',
    titleKey: 'whitepaperV4Title',
    descKey: 'whitepaperV4Desc',
    version: 'V4.0',
    pages: 68,
    updated: '2025.12',
    icon: FileText,
    highlightKeys: ['resourceHighlight1', 'resourceHighlight2', 'resourceHighlight3', 'resourceHighlight4'],
  },
  {
    type: 'technical',
    titleKey: 'technicalReportTitle',
    descKey: 'technicalReportDesc',
    version: '2025',
    institution: 'NTU',
    icon: BookOpen,
    highlightKeys: ['resourceHighlight5', 'resourceHighlight6', 'resourceHighlight7', 'resourceHighlight8'],
  },
  {
    type: 'datasheet',
    titleKey: 'datasheetTitle',
    descKey: 'datasheetDesc',
    version: 'Rev.3',
    icon: FileCheck,
    highlightKeys: ['resourceHighlight9', 'resourceHighlight10', 'resourceHighlight11', 'resourceHighlight12'],
  },
] as const;

const newsConfig = [
  { 
    date: '2025-12-15', 
    categoryKey: 'newsCatFunding', 
    titleKey: 'news1Title',
    summaryKey: 'news1Summary',
    isHighlight: true,
  },
  { 
    date: '2026-03-20', 
    categoryKey: 'newsCatProduct', 
    titleKey: 'news2Title',
    summaryKey: 'news2Summary',
    isHighlight: true,
  },
  { 
    date: '2025-09-10', 
    categoryKey: 'newsCatPartnership', 
    titleKey: 'news3Title',
    summaryKey: 'news3Summary',
    isHighlight: false,
  },
  { 
    date: '2025-06-28', 
    categoryKey: 'newsCatAward', 
    titleKey: 'news4Title',
    summaryKey: 'news4Summary',
    isHighlight: false,
  },
] as const;

const officesConfig = [
  { 
    cityKey: 'singaporeCity', 
    cityEn: 'Singapore',
    roleKey: 'globalHQRole',
    address: 'One North, Fusionopolis Way, #15-01 Connexis',
    phone: '+65 6123 4567',
    email: 'hq@orbiva.io',
    timezone: 'GMT+8',
    featureKeys: ['officeFeature1', 'officeFeature2', 'officeFeature3'],
  },
  { 
    cityKey: 'hongKongCity', 
    cityEn: 'Hong Kong',
    roleKey: 'greaterChinaHQRole',
    address: '中环IFC二期, 88楼',
    phone: '+852 1234 5678',
    email: 'hk@orbiva.io',
    timezone: 'GMT+8',
    featureKeys: ['officeFeature4', 'officeFeature5', 'officeFeature6'],
  },
  { 
    cityKey: 'shenzhenCity', 
    cityEn: 'Shenzhen',
    roleKey: 'rdCenterRole',
    address: '南山区科技园软件产业基地',
    phone: '+86 755 1234 5678',
    email: 'sz@orbiva.io',
    timezone: 'GMT+8',
    featureKeys: ['officeFeature7', 'officeFeature8', 'officeFeature9'],
  },
] as const;

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

      <div className="absolute top-1/4 right-1/4 w-[500px] h-[400px] bg-[#4ADE80]/[0.02] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm mb-6">
            <HandDrawnIcon icon={Building2} size="sm" variant="outline" />
            {t('about', 'heroTag')}
          </span>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.2}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {t('about.heroTitle1')}
            <br />
            <span className="bg-gradient-to-r from-[#4ADE80] to-[#67E8F9] bg-clip-text text-transparent">
              {t('about.heroTitle2')}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.35}
            className="text-lg sm:text-xl text-white/40 max-w-2xl mb-8"
          >
            {t('about.heroSubtitle')}
          </motion.p>

          {/* 核心数据展示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {companyHighlightsConfig.map((item, index) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-center"
              >
                <div className="text-2xl font-bold text-[#4ADE80]">{'valueKey' in item ? t(`about.${item.valueKey}`) : item.value}</div>
                <div className="text-xs text-white/40">{t(`about.${item.labelKey}`)}</div>
              </motion.div>
            ))}
          </motion.div>
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
          <span className="text-white/20 text-xs tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ========== 集团背景与传承 ==========
function HeritageSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();
  const [activeYear, setActiveYear] = useState('2024');

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
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <HandDrawnIcon icon={History} size="sm" variant="outline" />
            {t('about.heritageTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('about.heritageTitle1')}<span className="bg-gradient-to-r from-[#4ADE80] to-[#67E8F9] bg-clip-text text-transparent">{t('about.heritageTitle2')}</span>
          </h2>
          
          <p className="text-white/40 max-w-2xl text-lg">
            {t('about.heritageSubtitle')}
          </p>
        </motion.div>

        {/* 交互式时间轴 */}
        <div className="relative">
          {/* 时间轴线 */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#4ADE80] to-[#22D3EE]"
              initial={{ width: '0%' }}
              animate={{ width: isInView ? '100%' : '0%' }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>

          {/* 年份节点 */}
          <div className="flex justify-between mt-8 mb-12">
            {heritageTimeline.map((item, index) => (
              <motion.button
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => setActiveYear(item.year)}
                className={`flex flex-col items-center group ${
                  activeYear === item.year ? 'scale-110' : ''
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  activeYear === item.year
                    ? 'bg-[#4ADE80] border-[#4ADE80] scale-125'
                    : 'bg-transparent border-white/30 group-hover:border-[#4ADE80]'
                }`} />
                <span className={`mt-2 text-sm font-medium transition-colors ${
                  activeYear === item.year ? 'text-[#4ADE80]' : 'text-white/40 group-hover:text-white/60'
                }`}>
                  {item.year}
                </span>
              </motion.button>
            ))}
          </div>

          {/* 详情卡片 */}
          <AnimatePresence mode="wait">
            {heritageTimeline
              .filter((item) => item.year === activeYear)
              .map((item) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="flex items-center gap-4 mb-6">
                      <HandDrawnIcon icon={item.icon} size="xl" variant="filled" />
                      <div>
                        <span className="text-3xl font-bold text-[#4ADE80]">{item.year}</span>
                        <div className="text-white/40 text-sm">{t('about.timelineTag')}</div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{t(`about.${item.eventKey}`)}</h3>
                    <p className="text-white/50">{t(`about.${item.milestoneKey}`)}</p>
                  </div>
                  
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-[#4ADE80]/5 to-[#22D3EE]/5 border border-white/[0.05]">
                    <h4 className="text-lg font-bold text-white mb-4">{t('about.coreAchievements')}</h4>
                    <div className="space-y-4">
                      {item.year === '1992' && (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                            <span className="text-white/60">{t('about.achievement1992_1')}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                            <span className="text-white/60">{t('about.achievement1992_2')}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                            <span className="text-white/60">{t('about.achievement1992_3')}</span>
                          </div>
                        </>
                      )}
                      {item.year === '2024' && (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                            <span className="text-white/60">{t('about.achievement2024_1')}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                            <span className="text-white/60">{t('about.achievement2024_2')}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                            <span className="text-white/60">{t('about.achievement2024_3')}</span>
                          </div>
                        </>
                      )}
                      {item.year !== '1992' && item.year !== '2024' && (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                            <span className="text-white/60">{t('about.achievementDefault1')}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                            <span className="text-white/60">{t('about.achievementDefault2')}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-[#4ADE80]" />
                            <span className="text-white/60">{t('about.achievementDefault3')}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ========== 资源中心 ==========
function ResourcesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <HandDrawnIcon icon={FileText} size="sm" variant="outline" />
            {t('about.resourcesTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('about.resourcesTitle1')}<span className="bg-gradient-to-r from-[#06B6D4] to-[#22D3EE] bg-clip-text text-transparent">Orbiva</span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            {t('about.resourcesSubtitle')}
          </p>
        </motion.div>

        {/* 资源卡片 */}
        <div className="grid lg:grid-cols-3 gap-6">
          {resourcesConfig.map((resource, index) => (
            <motion.div
              key={resource.type}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#06B6D4]/30 transition-all duration-300"
            >
              {/* 头部 */}
              <div className="flex items-start justify-between mb-6">
                <HandDrawnIcon icon={resource.icon} size="lg" variant="filled" />
                <span className="px-3 py-1 rounded-full bg-[#06B6D4]/10 text-[#06B6D4] text-xs font-medium">
                  {resource.version}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#06B6D4] transition-colors">
                {t(`about.${resource.titleKey}`)}
              </h3>
              
              <p className="text-white/40 text-sm mb-6">
                {t(`about.${resource.descKey}`)}
              </p>

              {/* 亮点列表 */}
              <div className="space-y-2 mb-6">
                {resource.highlightKeys.map((highlightKey) => (
                  <div key={highlightKey} className="flex items-center gap-2 text-sm text-white/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                    <span>{t(`about.${highlightKey}`)}</span>
                  </div>
                ))}
              </div>

              {/* 元信息 */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] mb-6">
                {'pages' in resource && (
                  <span className="text-xs text-white/40">{resource.pages} {t('about.pages')}</span>
                )}
                {'institution' in resource && (
                  <span className="text-xs text-white/40">{resource.institution}</span>
                )}
                {'updated' in resource && (
                  <span className="text-xs text-white/40">{t('about.updated')}: {resource.updated}</span>
                )}
              </div>

              {/* 下载按钮 */}
              <Button variant="secondary" className="w-full" icon={<Download className="w-4 h-4" />}>
                {t('about.downloadPdf')}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* 在线阅读提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <ExternalLink className="w-5 h-5 text-[#06B6D4]" />
            <span className="text-white/60">{t('about.onlineReadingNote')}</span>
            <Button variant="ghost" size="sm">
              {t('about.onlineDocCenter')}
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 新闻动态 ==========
function NewsSection() {
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
            <HandDrawnIcon icon={Newspaper} size="sm" variant="outline" />
            {t('about.newsTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('about.newsTitle1')}<span className="bg-gradient-to-r from-[#22D3EE] to-[#06B6D4] bg-clip-text text-transparent">{t('about.newsTitle2')}</span>
          </h2>
        </motion.div>

        {/* 高亮新闻 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {newsConfig.filter(n => n.isHighlight).map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-8 rounded-3xl bg-gradient-to-br from-[#22D3EE]/5 to-[#06B6D4]/5 border border-[#22D3EE]/20 hover:border-[#22D3EE]/40 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#22D3EE]/20 text-[#22D3EE] text-xs font-medium flex items-center gap-1">
                  <HandDrawnIcon icon={Sparkles} size="sm" variant="outline" />
                  {t('about.highlight')}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/[0.03] text-white/50 text-xs">
                  {item.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-[#22D3EE] transition-colors mb-3">
                {t(`about.${item.titleKey}`)}
              </h3>
              <p className="text-white/50 text-sm mb-4">{t(`about.${item.summaryKey}`)}</p>
              <div className="flex items-center text-[#22D3EE] text-sm font-medium">
                <span>{t('about.readMore')}</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* 普通新闻 */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {newsConfig.filter(n => !n.isHighlight).map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#22D3EE]/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/[0.03] text-white/50 text-xs">
                  {item.date}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#22D3EE] transition-colors">
                {t(`about.${item.titleKey}`)}
              </h3>
              <p className="text-white/40 text-sm mt-2">{t(`about.${item.summaryKey}`)}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="secondary" icon={<Newspaper className="w-4 h-4" />}>
            {t('about.viewMoreNews')}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ========== 全球办公室 ==========
function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();
  const [activeOffice, setActiveOffice] = useState(0);

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-[#4ADE80]/[0.03] to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <HandDrawnIcon icon={Globe} size="sm" variant="outline" />
            {t('about.contactTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('about.contactTitle1')}
            <span className="bg-gradient-to-r from-[#4ADE80] to-[#67E8F9] bg-clip-text text-transparent">
              {t('about.contactTitle2')}
            </span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto">
            {t('about.contactSubtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {officesConfig.map((office, index) => (
            <motion.div
              key={office.cityKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setActiveOffice(index)}
              className={`p-6 rounded-3xl cursor-pointer transition-all duration-300 ${
                activeOffice === index
                  ? 'bg-gradient-to-br from-[#4ADE80]/10 to-[#22D3EE]/10 border border-[#4ADE80]/30'
                  : 'bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <HandDrawnIcon icon={MapPin} size="lg" variant={activeOffice === index ? "filled" : "outline"} />
                  <div>
                    <h3 className="font-bold text-white">{t(`about.${office.cityKey}`)}</h3>
                    <span className="text-xs text-white/40">{office.cityEn}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  activeOffice === index
                    ? 'bg-[#4ADE80]/20 text-[#4ADE80]'
                    : 'bg-white/[0.05] text-white/40'
                }`}>
                  {t(`about.${office.roleKey}`)}
                </span>
              </div>
              
              <p className="text-sm text-white/40 mb-4">{office.address}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <HandDrawnIcon icon={Phone} size="sm" variant="outline" />
                  <span>{office.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <HandDrawnIcon icon={Mail} size="sm" variant="outline" />
                  <span>{office.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <HandDrawnIcon icon={Clock} size="sm" variant="outline" />
                  <span>{office.timezone}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.05]">
                {office.featureKeys.map((featureKey) => (
                  <span key={featureKey} className="px-2 py-1 text-xs rounded-full bg-white/[0.03] text-white/50">
                    {t(`about.${featureKey}`)}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-center max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-bold text-white mb-2">{t('about.businessInquiry')}</h3>
          <p className="text-white/40 mb-6">
            {t('about.businessInquiryDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" icon={<Mail className="w-4 h-4" />} iconPosition="left">
              {t('about.sendEmail')}
            </Button>
            <Button variant="secondary">{t('about.bookMeeting')}</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 主页面 ==========
export default function AboutPage() {
  return (
    <main className="relative bg-[#050505]">
      <div className="fixed inset-0 bg-[#050505] -z-10" />
      
      {/* Hero */}
      <HeroSection />
      
      {/* Heritage */}
      <ScrollSectionWrapper>
        <HeritageSection />
      </ScrollSectionWrapper>
      
      {/* Resources */}
      <ScrollSectionWrapper>
        <ResourcesSection />
      </ScrollSectionWrapper>
      
      {/* News */}
      <ScrollSectionWrapper>
        <NewsSection />
      </ScrollSectionWrapper>
      
      {/* Contact */}
      <ScrollSectionWrapper isLast>
        <ContactSection />
      </ScrollSectionWrapper>
    </main>
  );
}
