'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Box,
  Cpu,
  Coins,
  Heart,
  Activity,
  Moon,
  Brain,
  Shield,
  Zap,
  Sparkles,
} from 'lucide-react';

// Bento 卡片数据
const bentoItems = [
  {
    id: 'hardware',
    title: 'VivaBox',
    subtitle: '智能硬件',
    description: '比银行卡还小的 AI 健康伴侣，24/7 守护您的健康',
    icon: Box,
    stats: '8+ 传感器',
    color: 'from-[#06B6D4] to-[#06B6D4]/50',
    size: 'large',
    features: ['AI 语音交互', '便携设计', '7天续航'],
  },
  {
    id: 'digital-twin',
    title: '数字孪生',
    subtitle: '您的云端分身',
    description: 'AI 实时模拟预测未来身体状态',
    icon: Cpu,
    stats: '89% 准确率',
    color: 'from-[#7C3AED] to-[#7C3AED]/50',
    size: 'medium',
    features: ['30天预测', '健康趋势'],
  },
  {
    id: 'rewards',
    title: '健康激励',
    subtitle: '数据即价值',
    description: '完成健康目标获得生态权益奖励',
    icon: Coins,
    stats: '¥2.8亿+',
    color: 'from-[#EC4899] to-[#EC4899]/50',
    size: 'medium',
    features: ['任务奖励', '权益商城'],
  },
  {
    id: 'heart',
    title: '心率监测',
    subtitle: '实时追踪',
    description: '精准监测心率变异性',
    icon: Heart,
    stats: '±2bpm',
    color: 'from-[#ef4444] to-[#ef4444]/50',
    size: 'small',
  },
  {
    id: 'sleep',
    title: '睡眠分析',
    subtitle: '深度洞察',
    description: '追踪睡眠周期与质量',
    icon: Moon,
    stats: '全周期',
    color: 'from-[#3b82f6] to-[#3b82f6]/50',
    size: 'small',
  },
  {
    id: 'ai',
    title: 'AI 洞察',
    subtitle: '智能建议',
    description: '个性化健康建议',
    icon: Brain,
    stats: '每日更新',
    color: 'from-[#06b6d4] to-[#06b6d4]/50',
    size: 'small',
  },
  {
    id: 'security',
    title: '隐私安全',
    subtitle: '边缘计算',
    description: '数据主权归您所有',
    icon: Shield,
    stats: 'GDPR',
    color: 'from-[#22c55e] to-[#22c55e]/50',
    size: 'small',
  },
];

// 动画变体
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// Bento 卡片组件
function BentoCard({ item }: { item: typeof bentoItems[0] }) {
  const Icon = item.icon;
  
  const sizeClasses = {
    large: 'md:col-span-2 md:row-span-2',
    medium: 'md:col-span-1 md:row-span-2',
    small: 'md:col-span-1 md:row-span-1',
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      className={`
        group relative overflow-hidden rounded-3xl
        bg-white/[0.02] backdrop-blur-sm
        border border-white/[0.05]
        hover:border-white/[0.1]
        transition-all duration-500
        ${sizeClasses[item.size as keyof typeof sizeClasses]}
        ${item.size === 'large' ? 'p-8' : item.size === 'medium' ? 'p-6' : 'p-5'}
      `}
    >
      {/* 背景光效 */}
      <div 
        className={`
          absolute -top-24 -right-24 w-48 h-48 
          bg-gradient-to-br ${item.color}
          rounded-full blur-3xl opacity-0 
          group-hover:opacity-20 
          transition-opacity duration-700
        `}
      />
      
      {/* 网格纹理 */}
      <div 
        className="absolute inset-0 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* 内容 */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className={`
            w-12 h-12 rounded-2xl 
            bg-gradient-to-br ${item.color}
            flex items-center justify-center
            group-hover:scale-110 transition-transform duration-300
          `}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          <div className="text-right">
            <span className={`
              text-sm font-semibold
              bg-gradient-to-r ${item.color} bg-clip-text text-transparent
            `}>
              {item.stats}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <span className="text-xs text-white/40 uppercase tracking-wider">
            {item.subtitle}
          </span>
          <h3 className={`
            font-bold text-white mt-1 mb-2
            group-hover:text-white transition-colors
            ${item.size === 'large' ? 'text-2xl' : item.size === 'medium' ? 'text-xl' : 'text-lg'}
          `}>
            {item.title}
          </h3>
          <p className={`
            text-white/50 leading-relaxed
            ${item.size === 'small' ? 'text-sm line-clamp-2' : 'text-sm'}
          `}>
            {item.description}
          </p>
        </div>

        {item.features && item.size !== 'small' && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 text-xs rounded-full bg-white/[0.05] text-white/60 border border-white/[0.05]"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4 }}
          className={`
            absolute bottom-0 left-0 right-0 h-[2px]
            bg-gradient-to-r ${item.color}
            origin-left
          `}
        />
      </div>
    </motion.div>
  );
}

export default function BentoFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  // 滚动进度用于底部卡片的淡出效果
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  
  // 底部用户信赖卡片随滚动淡出
  const bottomCardOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 1, 0]);
  const bottomCardY = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0, -30]);

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex flex-col justify-center">
      {/* 背景装饰 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#06B6D4]/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#7C3AED]/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] mb-6"
          >
            <Zap className="w-4 h-4 text-[#06B6D4]" />
            <span className="text-sm text-white/60">核心功能</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            构建完整
            <span className="bg-gradient-to-r from-[#06B6D4] to-[#7C3AED] bg-clip-text text-transparent">
              健康生态
            </span>
          </h2>
          
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            从智能硬件到数字孪生，再到价值激励
            <br className="hidden sm:block" />
            Orbiva 打造全链路健康管理体验
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[minmax(180px,auto)]"
        >
          {bentoItems.map((item) => (
            <BentoCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* 底部 CTA - 添加滚动淡出效果 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          style={{ opacity: bottomCardOpacity, y: bottomCardY }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
            <div className="flex -space-x-2">
              {[Heart, Activity, Sparkles].map((Icon, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#06B6D4]/20 to-[#7C3AED]/20 flex items-center justify-center border-2 border-[#050505]"
                >
                  <Icon className="w-5 h-5 text-[#06B6D4]" />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-white font-medium">全球 100,000+ 用户信赖</div>
              <div className="text-sm text-white/40">企业级数据安全保障</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
