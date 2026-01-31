'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
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

// ========== 数据 ==========
const companyHighlights = [
  { icon: Building2, title: '香港主板上市', description: '母公司为香港主板上市公司' },
  { icon: Globe, title: '全球化布局', description: '总部新加坡，研发中心遍布亚洲' },
  { icon: Users, title: '专业团队', description: '核心团队来自顶级科技公司' },
  { icon: Award, title: '权威认证', description: 'ISO 27001、GDPR 合规' },
];

const timeline = [
  { year: '2021', event: '公司成立，完成天使轮融资' },
  { year: '2022', event: '与新加坡南洋理工大学建立战略合作' },
  { year: '2023', event: 'VivaBox 1.0 发布，完成 A 轮融资' },
  { year: '2024', event: '用户突破 10 万，开启生态权益计划' },
  { year: '2025', event: 'VivaBox 2.0 发布，全球化扩张启动' },
];

const news = [
  { date: '2025-01-15', category: '融资动态', title: 'Orbiva 完成 B 轮融资，估值突破 5 亿美元' },
  { date: '2025-01-08', category: '产品发布', title: 'VivaBox 2.0 正式发布，AI 健康预测准确率提升至 89%' },
  { date: '2024-12-20', category: '战略合作', title: 'Orbiva 与新加坡国立医院达成战略合作' },
  { date: '2024-12-05', category: '行业荣誉', title: 'Orbiva 荣获 2024 年度最具创新力健康科技企业' },
];

const offices = [
  { city: '新加坡（总部）', address: '1 Raffles Place, Tower 2', phone: '+65 6123 4567' },
  { city: '香港', address: '中环德辅道中 88 号', phone: '+852 1234 5678' },
  { city: '深圳', address: '南山区科技园南区', phone: '+86 755 1234 5678' },
];

// ========== Hero 区块 ==========
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
            关于 Orbiva
          </span>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.2}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            我们是谁，
            <br />
            <span className="bg-gradient-to-r from-[#EC4899] to-[#a78bfa] bg-clip-text text-transparent">
              怎么找我们
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0.35}
            className="text-lg sm:text-xl text-white/40 max-w-2xl"
          >
            Orbiva 是香港主板上市集团旗下的数字健康科技品牌，
            致力于通过 AI 和数字孪生技术，让每个人都能享受专业级健康管理服务。
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

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#EC4899]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {companyHighlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#EC4899]/30 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#EC4899] to-[#a78bfa] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-white/40">{item.description}</p>
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
            发展历程
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            我们的
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
              成长之路
            </span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/[0.1] md:-translate-x-1/2" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
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
                  <p className="text-white/50 mt-2">{item.event}</p>
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
              官方白皮书
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              深入了解
              <span className="bg-gradient-to-r from-[#06B6D4] to-[#7C3AED] bg-clip-text text-transparent">
                Orbiva 生态
              </span>
            </h2>
            
            <p className="text-white/40 mb-8 text-lg">
              下载我们的白皮书，深入了解 Orbiva 的技术架构、商业模式、
              生态价值逻辑以及未来发展规划。
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary" icon={<Download className="w-4 h-4" />}>
                下载白皮书 (PDF)
              </Button>
              <Button variant="secondary">在线阅读</Button>
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
                  <h3 className="font-bold text-white">Orbiva 生态白皮书 2025</h3>
                  <p className="text-sm text-white/40">v2.0 | 68 页 | 15.2 MB</p>
                </div>
              </div>
              
              <div className="space-y-3 text-sm text-white/50">
                {['技术架构与核心算法详解', '数字孪生健康模型原理', '生态激励机制设计', '商业化路径与发展规划'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                    <span>{item}</span>
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
            新闻动态
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            最新
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              公司资讯
            </span>
          </h2>
        </motion.div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {news.map((item, index) => (
            <motion.div
              key={item.title}
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
                  {item.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#3b82f6] transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center text-[#3b82f6] text-sm font-medium mt-4">
                <span>阅读全文</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="secondary" icon={<Newspaper className="w-4 h-4" />}>
            查看更多新闻
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
            联系我们
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            全球
            <span className="bg-gradient-to-r from-[#EC4899] to-[#a78bfa] bg-clip-text text-transparent">
              办公网络
            </span>
          </h2>
        </motion.div>

        {/* Offices Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {offices.map((office, index) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05]"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#EC4899]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#EC4899]" />
                </div>
                <h3 className="font-bold text-white">{office.city}</h3>
              </div>
              <p className="text-sm text-white/40 mb-4">{office.address}</p>
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
          <h3 className="text-xl font-bold text-white mb-2">商务合作咨询</h3>
          <p className="text-white/40 mb-6">
            如果您对我们的产品或合作机会感兴趣，欢迎联系我们的商务团队
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" icon={<Mail className="w-4 h-4" />} iconPosition="left">
              发送邮件
            </Button>
            <Button variant="secondary">预约会议</Button>
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
