'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
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
const companyHighlightsConfig = [
  { icon: Building2, titleKey: 'highlight1Title', descKey: 'highlight1Desc' },
  { icon: Globe, titleKey: 'highlight2Title', descKey: 'highlight2Desc' },
  { icon: Users, titleKey: 'highlight3Title', descKey: 'highlight3Desc' },
  { icon: Award, titleKey: 'highlight4Title', descKey: 'highlight4Desc' },
] as const;

const timelineConfig = [
  { year: '2021', eventKey: 'timeline2021' },
  { year: '2022', eventKey: 'timeline2022' },
  { year: '2023', eventKey: 'timeline2023' },
  { year: '2024', eventKey: 'timeline2024' },
  { year: '2025', eventKey: 'timeline2025' },
] as const;

const newsConfig = [
  { date: '2025-01-15', categoryKey: 'newsCat1', titleKey: 'news1Title' },
  { date: '2025-01-08', categoryKey: 'newsCat2', titleKey: 'news2Title' },
  { date: '2024-12-20', categoryKey: 'newsCat3', titleKey: 'news3Title' },
  { date: '2024-12-05', categoryKey: 'newsCat4', titleKey: 'news4Title' },
] as const;

const officesConfig = [
  { cityKey: 'office1City', addressKey: 'office1Address', phone: '+65 6123 4567' },
  { cityKey: 'office2City', addressKey: 'office2Address', phone: '+852 1234 5678' },
  { cityKey: 'office3City', addressKey: 'office3Address', phone: '+86 755 1234 5678' },
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
          className="absolute w-[130vw] h-[60vh] border border-[#EC4899]/[0.06] rounded-[50%]"
        />
      </div>

      <div className="absolute top-1/4 right-1/4 w-[500px] h-[400px] bg-[#EC4899]/[0.02] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm mb-6">
            <Building2 className="w-4 h-4 text-[#EC4899]" />
            {t('about', 'heroTag')}
          </span>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.2}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {t('about', 'heroTitle1')}
            <br />
            <span className="bg-gradient-to-r from-[#EC4899] to-[#a78bfa] bg-clip-text text-transparent">
              {t('about', 'heroTitle2')}
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.35}
            className="text-lg sm:text-xl text-white/40 max-w-2xl"
          >
            {t('about', 'heroSubtitle')}
          </motion.p>
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

// ========== 公司亮点 Bento Grid ==========
function HighlightsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#EC4899]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {companyHighlightsConfig.map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#EC4899]/30 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#EC4899] to-[#a78bfa] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{t('about', item.titleKey)}</h3>
              <p className="text-sm text-white/40">{t('about', item.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== 发展历程 ==========
function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#7C3AED]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <Calendar className="w-4 h-4 text-[#7C3AED]" />
            {t('about', 'timelineTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('about', 'timelineTitle')}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.1] md:-translate-x-1/2" />

          <div className="space-y-12">
            {timelineConfig.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#7C3AED] border-4 border-[#050505] md:-translate-x-1/2 z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'
                }`}>
                  <span className="text-[#7C3AED] font-bold text-3xl">{item.year}</span>
                  <p className="text-white/50 mt-2">{t('about', item.eventKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ========== 白皮书 ==========
function WhitepaperSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 左侧 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
              <FileText className="w-4 h-4 text-[#06B6D4]" />
              {t('about', 'whitepaperTag')}
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t('about', 'whitepaperTitle')}
            </h2>
            
            <p className="text-white/40 mb-8 text-lg">
              {t('about', 'whitepaperDesc')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary" icon={<Download className="w-4 h-4" />}>
                {t('about', 'downloadPdf')}
              </Button>
              <Button variant="secondary">{t('about', 'readOnline')}</Button>
            </div>
          </motion.div>

          {/* 右侧 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{t('about', 'whitepaperName')}</h3>
                  <p className="text-sm text-white/40">{t('about', 'whitepaperInfo')}</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm text-white/50">
                {['whitepaperContent1', 'whitepaperContent2', 'whitepaperContent3', 'whitepaperContent4'].map((key) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                    <span>{t('about', key)}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
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
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-[#3b82f6]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <Newspaper className="w-4 h-4 text-[#3b82f6]" />
            {t('about', 'newsTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('about', 'newsTitle')}
          </h2>
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {newsConfig.map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#3b82f6]/30 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/[0.03] text-white/50 text-xs">
                  {item.date}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] text-xs">
                  {t('about', item.categoryKey)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#3b82f6] transition-colors">
                {t('about', item.titleKey)}
              </h3>
              <div className="flex items-center text-[#3b82f6] text-sm font-medium mt-4">
                <span>{t('about', 'readMore')}</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="secondary" icon={<Newspaper className="w-4 h-4" />}>
            {t('about', 'viewMoreNews')}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ========== 联系我们 ==========
function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useI18n();

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-[#EC4899]/[0.03] to-transparent rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <MapPin className="w-4 h-4 text-[#EC4899]" />
            {t('about', 'contactTag')}
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('about', 'contactTitle1')}
            <span className="bg-gradient-to-r from-[#EC4899] to-[#a78bfa] bg-clip-text text-transparent">
              {t('about', 'contactTitle2')}
            </span>
          </h2>
        </motion.div>

        {/* Offices Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {officesConfig.map((office, index) => (
            <motion.div
              key={office.cityKey}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#EC4899]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#EC4899]" />
                </div>
                <h3 className="font-bold text-white">{t('about', office.cityKey)}</h3>
              </div>
              <p className="text-sm text-white/40 mb-4">{t('about', office.addressKey)}</p>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <Phone className="w-4 h-4 text-[#EC4899]" />
                <span>{office.phone}</span>
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
          <h3 className="text-xl font-bold text-white mb-2">{t('about', 'businessInquiry')}</h3>
          <p className="text-white/40 mb-6">
            {t('about', 'businessInquiryDesc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" icon={<Mail className="w-4 h-4" />} iconPosition="left">
              {t('about', 'sendEmail')}
            </Button>
            <Button variant="secondary">{t('about', 'bookMeeting')}</Button>
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
      
      {/* Highlights */}
      <ScrollSectionWrapper>
        <HighlightsSection />
      </ScrollSectionWrapper>
      
      {/* Timeline */}
      <ScrollSectionWrapper>
        <TimelineSection />
      </ScrollSectionWrapper>
      
      {/* Whitepaper */}
      <ScrollSectionWrapper>
        <WhitepaperSection />
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
