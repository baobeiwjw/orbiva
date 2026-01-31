'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
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
const techPillars = [
  {
    icon: Brain,
    title: '数字寿命镜像',
    description: '通过持续采集多维度健康数据，在云端构建您的"数字分身"',
    details: ['多模态传感器数据融合', '深度学习健康预测模型', '个性化健康画像构建', '14-30天健康趋势预测'],
    color: 'from-[#EC4899] to-[#a78bfa]',
  },
  {
    icon: Shield,
    title: '边缘计算隐私保护',
    description: '核心敏感数据在本地设备处理，原始数据不出家门',
    details: ['端侧 AI 推理引擎', '数据本地加密存储', '差分隐私技术应用', '零知识证明验证'],
    color: 'from-[#06B6D4] to-[#7C3AED]',
  },
  {
    icon: GraduationCap,
    title: '学术合作背书',
    description: '与新加坡南洋理工大学深度合作，AI 算法经过权威学术验证',
    details: ['NTU AI 算法联合研发', '医学院临床验证支持', '安全实验室审计认证', '学术论文联合发表'],
    color: 'from-[#3b82f6] to-[#06b6d4]',
  },
];

const privacyFeatures = [
  { icon: Laptop, title: '边缘计算', description: '敏感数据在本地设备处理，AI 推理不依赖云端' },
  { icon: Lock, title: '端到端加密', description: 'AES-256 加密传输，传输过程中无法被窃取' },
  { icon: Database, title: '数据脱敏', description: '上传云端的数据经过脱敏处理，无法关联个人' },
  { icon: Eye, title: '透明可控', description: '用户完全掌控数据权限，随时可查看或删除' },
];

const certifications = [
  { name: 'ISO 27001', description: '信息安全管理体系' },
  { name: 'GDPR', description: '欧盟数据保护合规' },
  { name: 'SOC 2', description: '服务组织控制报告' },
  { name: 'HIPAA', description: '健康信息保护合规' },
];

const architectureLayers = [
  { layer: '感知层', icon: Wifi, description: 'VivaBox 及 HomeCare 设备采集多维度健康数据', color: 'from-[#7C3AED] to-[#06B6D4]' },
  { layer: '边缘计算层', icon: Cpu, description: '本地设备完成敏感数据处理和 AI 推理', color: 'from-[#06B6D4] to-[#06b6d4]' },
  { layer: '传输层', icon: Lock, description: '脱敏数据通过端到端加密通道传输', color: 'from-[#06b6d4] to-[#EC4899]' },
  { layer: '云端服务层', icon: Cloud, description: '聚合分析、模型训练、生态服务', color: 'from-[#EC4899] to-[#a78bfa]' },
];

const ntuHighlights = [
  { icon: Brain, title: 'AI 算法研发', description: '联合开发健康预测深度学习模型，准确率达到 89%' },
  { icon: Shield, title: '安全架构审计', description: 'NTU 网络安全实验室对系统架构进行全面安全评估' },
  { icon: FileCheck, title: '临床验证', description: '与 NTU 医学院合作进行产品临床验证研究' },
  { icon: Award, title: '学术成果', description: '联合发表多篇高质量学术论文，技术获得业界认可' },
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
            技术核心
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          我们为什么
          <span className="block bg-gradient-to-r from-[#EC4899] to-[#a78bfa] bg-clip-text text-transparent">
            更安全、更准
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.35}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto"
        >
          基于边缘计算的隐私保护架构，结合学术级 AI 算法，
          让您安心享受精准的健康预测服务
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
            核心技术
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            三大技术支柱
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {techPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <pillar.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{pillar.title}</h3>
              <p className="text-white/40 mb-6">{pillar.description}</p>
              
              <ul className="space-y-3">
                {pillar.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />
                    <span className="text-white/60">{detail}</span>
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
            系统架构
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            分层
            <span className="bg-gradient-to-r from-[#06B6D4] to-[#7C3AED] bg-clip-text text-transparent">
              技术架构
            </span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            从数据采集到云端服务，每一层都经过精心设计，确保安全与性能的完美平衡
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {architectureLayers.map((layer, index) => (
            <motion.div
              key={layer.layer}
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
                  <h3 className="font-bold text-white text-lg mb-2">{layer.layer}</h3>
                  <p className="text-white/50">{layer.description}</p>
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
            隐私保护
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            绝对的
            <span className="bg-gradient-to-r from-[#3b82f6] to-[#06b6d4] bg-clip-text text-transparent">
              数据安全
            </span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            您的健康数据是您的私人财产，我们采用多重技术手段确保数据安全
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#3b82f6]/30 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#3b82f6]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-[#3b82f6]" />
              </div>
              <h3 className="font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/40">{feature.description}</p>
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
          <h3 className="text-xl font-bold text-white mb-6 text-center">安全认证</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div key={cert.name} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-3">
                  <span className="text-[#7C3AED] font-bold text-sm">{cert.name}</span>
                </div>
                <p className="text-xs text-white/40">{cert.description}</p>
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
              学术合作
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              新加坡南洋理工大学
              <span className="block text-xl font-normal text-white/40 mt-2">
                NTU 官方技术合作伙伴
              </span>
            </h2>
            
            <p className="text-white/40 mb-8 text-lg">
              Orbiva 与新加坡南洋理工大学建立了深度战略合作关系，
              在 AI 算法研发、安全架构审计、临床验证等多个领域展开紧密合作。
            </p>

            <div className="space-y-4">
              {ntuHighlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#EC4899]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#EC4899]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{item.title}</h4>
                    <p className="text-sm text-white/40">{item.description}</p>
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
              <h3 className="text-lg font-bold text-white mb-6">联合学术成果</h3>
              
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
                  <span className="text-white/40 text-sm">合作起始</span>
                  <span className="text-white font-medium">2022年</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-sm">联合发表论文</span>
                  <span className="text-white font-medium">12+ 篇</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 text-sm">合作项目</span>
                  <span className="text-white font-medium">5+ 个</span>
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
            技术实力，
            <span className="block bg-gradient-to-r from-[#EC4899] to-[#a78bfa] bg-clip-text text-transparent">
              值得信赖
            </span>
          </h2>

          <p className="text-white/40 text-lg mb-10 max-w-2xl mx-auto">
            我们相信技术是服务于人的，先进的算法和严格的隐私保护，
            只为让您更安心地享受数字健康带来的便利。
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              下载技术白皮书
            </Button>
            <Button variant="secondary" size="lg">
              预约技术咨询
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
