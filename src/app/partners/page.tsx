'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
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
const partnerTypes = [
  {
    id: 'pharma',
    name: '药企 / 科研',
    icon: FlaskConical,
    headline: '真实世界研究数据支持',
    description: '获取高质量的真实世界健康数据，加速新药研发和临床验证',
    benefits: ['RWE 数据服务', '患者招募', '用药依从性研究', '不良反应监测'],
    stats: [{ value: '50+', label: '合作药企' }, { value: '100万+', label: '数据样本' }, { value: '30%', label: '周期缩短' }],
    color: 'from-[#EC4899] to-[#a78bfa]',
  },
  {
    id: 'insurance',
    name: '保险公司',
    icon: Shield,
    headline: '精准风险分层解决方案',
    description: '基于实时健康数据的风险评估，支持结果导向的健康管理保险产品',
    benefits: ['动态风险评估', '健康管理服务', '理赔数据支持', '产品创新'],
    stats: [{ value: '15%', label: '理赔率降低' }, { value: '25%', label: '留存提升' }, { value: '40%', label: '核保效率' }],
    color: 'from-[#06B6D4] to-[#7C3AED]',
  },
  {
    id: 'hardware',
    name: '硬件厂商',
    icon: Cpu,
    headline: 'AIOT 生态接入与出海服务',
    description: '提供 AIOT 协议接入和新加坡品牌背书，助力硬件产品国际化',
    benefits: ['AIOT 协议接入', '数据赋能', '新加坡品牌出海', '销售渠道'],
    stats: [{ value: '20+', label: '设备类型' }, { value: '10+', label: '出海市场' }, { value: '3x', label: '销量增长' }],
    color: 'from-[#3b82f6] to-[#06b6d4]',
  },
];

const successCases = [
  { logo: '🏥', name: '某头部药企', type: '药企合作', result: '临床试验招募效率提升 40%' },
  { logo: '🛡️', name: '某大型保险集团', type: '保险合作', result: '健康险产品理赔率下降 18%' },
  { logo: '⌚', name: '某知名穿戴设备', type: '硬件合作', result: '产品销量增长 200%' },
];

const cooperationProcess = [
  { step: 1, title: '需求沟通', description: '了解您的业务需求和合作目标' },
  { step: 2, title: '方案设计', description: '定制化合作方案和技术对接计划' },
  { step: 3, title: '技术对接', description: 'API 接入、数据流程配置' },
  { step: 4, title: '正式合作', description: '启动合作，持续优化服务' },
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
            合作伙伴
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          一站式
          <span className="block bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
            B/G 端解决方案
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.35}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto"
        >
          无论您是药企、保险公司还是硬件厂商，Orbiva 都能为您提供
          专业的健康数据服务和商业变现方案
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

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#EC4899]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {partnerTypes.map((type) => (
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
              {type.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {partnerTypes
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
                    <h2 className="text-3xl font-bold text-white mb-4">{type.headline}</h2>
                    <p className="text-white/40 mb-8">{type.description}</p>

                    <div className="space-y-4 mb-8">
                      {type.benefits.map((benefit, index) => (
                        <motion.div
                          key={benefit}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-[#7C3AED]" />
                          </div>
                          <span className="text-white">{benefit}</span>
                        </motion.div>
                      ))}
                    </div>

                    <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                      申请合作
                    </Button>
                  </div>

                  {/* Right */}
                  <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
                    <h3 className="text-lg font-bold text-white mb-6">合作成效</h3>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {type.stats.map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="text-3xl font-bold text-[#7C3AED]">{stat.value}</div>
                          <div className="text-xs text-white/40 mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-white/[0.05]">
                      <div className="flex items-center gap-3 mb-4">
                        <Lightbulb className="w-5 h-5 text-[#7C3AED]" />
                        <span className="font-medium text-white">为什么选择 Orbiva</span>
                      </div>
                      <ul className="space-y-2 text-sm text-white/50">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                          上市集团背书，合规可信赖
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                          NTU 技术合作，学术级算法
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                          全球化布局，本地化服务
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
            成功案例
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            他们都选择了
            <span className="bg-gradient-to-r from-[#06B6D4] to-[#7C3AED] bg-clip-text text-transparent">
              Orbiva
            </span>
          </h2>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {successCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.name}
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
                  <h3 className="font-bold text-white">{caseItem.name}</h3>
                  <span className="text-xs text-white/40">{caseItem.type}</span>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-[#06B6D4]/5 border border-[#06B6D4]/20">
                <div className="flex items-center gap-2 text-[#06B6D4]">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">{caseItem.result}</span>
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
            合作流程
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            简单四步
            <span className="bg-gradient-to-r from-[#EC4899] to-[#a78bfa] bg-clip-text text-transparent">
              开启合作
            </span>
          </h2>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-4 gap-6">
          {cooperationProcess.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {index < cooperationProcess.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-[#EC4899] to-transparent -translate-x-1/2" />
              )}

              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-center relative z-10">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-[#EC4899] to-[#a78bfa] flex items-center justify-center text-white font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/40">{item.description}</p>
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
            开启
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              商业合作
            </span>
          </h2>

          <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
            无论您的业务规模大小，我们都有适合您的合作方案。
            立即联系我们的商务团队，开启健康数据价值变现之旅。
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              联系商务团队
            </Button>
            <Button variant="secondary" size="lg">
              下载合作手册
            </Button>
          </div>

          <div className="pt-8 border-t border-white/[0.05]">
            <div className="flex flex-wrap justify-center gap-8 text-sm text-white/40">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#3b82f6]" />
                <span>全球 10+ 国家/地区</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#3b82f6]" />
                <span>100+ 合作伙伴</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#3b82f6]" />
                <span>¥10亿+ 商业价值</span>
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
