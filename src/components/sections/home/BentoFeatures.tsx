'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import HandDrawnIcon from '@/components/ui/HandDrawnIcon';
import {
  Box,
  Cpu,
  Coins,
  Heart,
  Moon,
  Brain,
  Shield,
  Zap,
  Users,
} from 'lucide-react';

// Bento 卡片数据 - 更自然的文案
const bentoItems = [
  {
    id: 'hardware',
    title: 'VivaBox 小方块',
    subtitle: '随身携带',
    description: '比银行卡还小，揣兜里就走。它会默默记录你的身体状态，不打扰你的生活。',
    icon: Box,
    stats: '8种传感器',
    color: 'from-[#4ADE80] to-[#4ADE80]/50',
    size: 'large',
    features: ['语音聊天', '超轻便', '一周一充'],
  },
  {
    id: 'digital-twin',
    title: '数字分身',
    subtitle: '了解自己',
    description: '你的健康数据会形成一个"数字版的你"，帮你看清身体的变化趋势。',
    icon: Cpu,
    stats: '89% 准确',
    color: 'from-[#86EFAC] to-[#86EFAC]/50',
    size: 'medium',
    features: ['30天预测', '趋势分析'],
  },
  {
    id: 'rewards',
    title: '健康有奖励',
    subtitle: '越健康越值钱',
    description: '完成健康小目标就能获得奖励，你的数据你做主。',
    icon: Coins,
    stats: '2.8亿+',
    color: 'from-[#4ADE80] to-[#86EFAC]/50',
    size: 'medium',
    features: ['任务奖励', '权益商城'],
  },
  {
    id: 'heart',
    title: '心率监测',
    subtitle: '实时关注',
    description: '随时了解心跳情况',
    icon: Heart,
    stats: '±2bpm',
    color: 'from-[#4ADE80] to-[#4ADE80]/50',
    size: 'small',
  },
  {
    id: 'sleep',
    title: '睡眠分析',
    subtitle: '睡得怎么样',
    description: '追踪你的睡眠质量',
    icon: Moon,
    stats: '全周期',
    color: 'from-[#86EFAC] to-[#86EFAC]/50',
    size: 'small',
  },
  {
    id: 'ai',
    title: '智能建议',
    subtitle: '懂你的助手',
    description: '给你靠谱的健康建议',
    icon: Brain,
    stats: '每天更新',
    color: 'from-[#4ADE80] to-[#4ADE80]/50',
    size: 'small',
  },
  {
    id: 'security',
    title: '隐私保护',
    subtitle: '数据归你',
    description: '你的数据，你说了算',
    icon: Shield,
    stats: 'GDPR',
    color: 'from-[#86EFAC] to-[#86EFAC]/50',
    size: 'small',
  },
];

// 动画变体 - 更自然的效果
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, rotate: -0.5 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number] as [number, number, number, number],
    },
  },
};

// Bento 卡片组件 - 手绘风格
function BentoCard({ item, index }: { item: typeof bentoItems[0]; index: number }) {
  const sizeClasses = {
    large: 'md:col-span-2 md:row-span-2',
    medium: 'md:col-span-1 md:row-span-2',
    small: 'md:col-span-1 md:row-span-1',
  };

  // 不同卡片有微妙的不同旋转
  const rotations = [-0.8, 0.5, -0.3, 0.7, -0.5, 0.4, -0.6];
  const rotation = rotations[index % rotations.length];

  // 不规则圆角
  const borderRadii = [
    'rounded-[24px_28px_26px_22px]',
    'rounded-[26px_22px_28px_24px]',
    'rounded-[22px_26px_24px_28px]',
    'rounded-[28px_24px_22px_26px]',
  ];
  const borderRadius = borderRadii[index % borderRadii.length];

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.015, y: -4, rotate: rotation + 0.5 }}
      transition={{ duration: 0.25 }}
      className={`
        group relative overflow-hidden ${borderRadius}
        bg-white/[0.02] backdrop-blur-sm
        border border-white/[0.05]
        hover:border-[#4ADE80]/20
        transition-all duration-400
        ${sizeClasses[item.size as keyof typeof sizeClasses]}
        ${item.size === 'large' ? 'p-8' : item.size === 'medium' ? 'p-6' : 'p-5'}
      `}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* 背景光效 - 不规则形状 */}
      <div 
        className={`
          absolute -top-20 -right-20 w-44 h-44 
          bg-gradient-to-br ${item.color}
          rounded-[45%_55%_50%_50%] blur-3xl opacity-0 
          group-hover:opacity-15 
          transition-opacity duration-600
        `}
        style={{ transform: 'rotate(-10deg)' }}
      />
      
      {/* 网格纹理 - 不规则 */}
      <div 
        className="absolute inset-0 opacity-[0.015] group-hover:opacity-[0.03] transition-opacity"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '18px 22px',
          transform: 'rotate(-1deg)',
        }}
      />

      {/* 内容 */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          {/* 手绘风格图标 */}
          <HandDrawnIcon 
            icon={item.icon} 
            size={item.size === 'large' ? 'lg' : 'md'}
            variant="default"
          />
          
          <div className="text-right" style={{ transform: 'rotate(1deg)' }}>
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
          <h3 
            className={`
              font-bold text-white mt-1 mb-2
              group-hover:text-[#86EFAC] transition-colors duration-300
              ${item.size === 'large' ? 'text-2xl' : item.size === 'medium' ? 'text-xl' : 'text-lg'}
            `}
            style={{ transform: 'rotate(-0.2deg)' }}
          >
            {item.title}
          </h3>
          <p 
            className={`
              text-white/50 leading-relaxed
              ${item.size === 'small' ? 'text-sm line-clamp-2' : 'text-sm'}
            `}
            style={{ transform: 'rotate(0.1deg)' }}
          >
            {item.description}
          </p>
        </div>

        {item.features && item.size !== 'small' && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.features.map((feature, i) => (
              <span
                key={feature}
                className="px-3 py-1 text-xs rounded-full bg-white/[0.04] text-white/55 border border-white/[0.04]"
                style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* 底部装饰线 - 手绘感 */}
        <motion.div
          initial={{ scaleX: 0, rotate: -1 }}
          whileHover={{ scaleX: 1, rotate: 0 }}
          transition={{ duration: 0.35 }}
          className={`
            absolute bottom-0 left-2 right-2 h-[2px]
            bg-gradient-to-r ${item.color}
            origin-left rounded-full
          `}
        />
      </div>
    </motion.div>
  );
}

export default function BentoFeatures() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: mounted ? ref : undefined,
    offset: ['start start', 'end start'],
  });
  
  const bottomCardOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 1, 0]);
  const bottomCardY = useTransform(scrollYProgress, [0, 0.3, 0.6], [0, 0, -30]);

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex flex-col justify-center">
      {/* 背景装饰 - 不规则形状 */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-[5%] left-[20%] w-[480px] h-[440px] bg-[#4ADE80]/[0.018] rounded-[45%_55%_50%_50%] blur-[140px]" 
          style={{ transform: 'rotate(-8deg)' }}
        />
        <div 
          className="absolute bottom-[10%] right-[22%] w-[380px] h-[350px] bg-[#86EFAC]/[0.015] rounded-[55%_45%_52%_48%] blur-[120px]"
          style={{ transform: 'rotate(6deg)' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - 更自然的文案 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
          style={{ transform: 'rotate(-0.2deg)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.025] border border-white/[0.04] mb-6"
            style={{ transform: 'rotate(1deg)' }}
          >
            <HandDrawnIcon icon={Zap} size="sm" variant="outline" animate={false} />
            <span className="text-sm text-white/55">这些功能，都给你准备好了</span>
          </motion.div>
          
          <h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5"
            style={{ transform: 'rotate(0.15deg)' }}
          >
            一站式
            <span className="bg-gradient-to-r from-[#4ADE80] to-[#86EFAC] bg-clip-text text-transparent">
              健康管理
            </span>
          </h2>
          
          <p 
            className="text-white/50 max-w-2xl mx-auto text-lg"
            style={{ transform: 'rotate(-0.1deg)' }}
          >
            从硬件到软件，从监测到建议，
            <br className="hidden sm:block" />
            我们把复杂的事情变简单了
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5 auto-rows-[minmax(180px,auto)]"
        >
          {bentoItems.map((item, index) => (
            <BentoCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>

        {/* 底部 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55 }}
          style={{ opacity: bottomCardOpacity, y: bottomCardY, transform: 'rotate(-0.3deg)' }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-4 rounded-[20px_24px_22px_18px] bg-white/[0.02] border border-white/[0.04]">
            <div className="flex -space-x-2">
              {[Users, Heart, Zap].map((Icon, i) => (
                <div
                  key={i}
                  className="relative"
                  style={{ transform: `rotate(${(i - 1) * 5}deg)` }}
                >
                  <HandDrawnIcon icon={Icon} size="md" variant="filled" animate={false} />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="text-white font-medium">10万+ 人在用</div>
              <div className="text-sm text-white/40">数据安全有保障</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
