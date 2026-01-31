'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
import {
  Leaf,
  Gift,
  Shield,
  Heart,
  Activity,
  Moon,
  Pill,
  Users,
  Database,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Coins,
  RefreshCw,
  Lock,
  Share2,
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
const healthTasks = [
  { icon: Activity, title: '运动打卡', description: '完成每日运动目标', points: '50-200', frequency: '每日' },
  { icon: Moon, title: '睡眠达标', description: '保持规律作息，睡眠质量达标', points: '30-100', frequency: '每日' },
  { icon: Pill, title: '按时服药', description: '按照医嘱按时服药提醒', points: '20-50', frequency: '每次' },
  { icon: Heart, title: '健康检测', description: '定期完成健康数据采集', points: '10-30', frequency: '每日' },
  { icon: Database, title: '数据贡献', description: '授权脱敏数据用于科研', points: '100-500', frequency: '每月' },
  { icon: Users, title: '社区互动', description: '参与健康社区讨论分享', points: '10-50', frequency: '每次' },
];

const rewardCategories = [
  { title: '健康服务升级', items: ['AI 健康报告解读', '专家远程问诊', 'VIP 健康顾问', '体检套餐优惠'] },
  { title: '实物奖励', items: ['HomeCare 智能设备', '健康食品礼包', '运动装备', '品牌周边'] },
  { title: '权益兑换', items: ['合作商家优惠券', '保险折扣', '健身房会员', '生态伙伴福利'] },
];

const dataRights = [
  { icon: Lock, title: '数据所有权', description: '您的健康数据完全属于您自己' },
  { icon: Shield, title: '授权控制', description: '您决定数据的使用范围' },
  { icon: Share2, title: '脱敏保护', description: '分享数据经过严格脱敏处理' },
  { icon: Gift, title: '贡献回报', description: '数据贡献收益 100% 归您所有' },
];

const ecosystemFlow = [
  { step: 1, title: '用户授权', description: '自愿选择授权脱敏健康数据', icon: Shield },
  { step: 2, title: '数据脱敏', description: '严格脱敏处理，保护隐私', icon: Lock },
  { step: 3, title: '科研贡献', description: '辅助医疗机构进行健康研究', icon: Database },
  { step: 4, title: '价值回馈', description: '研究成果和收益反哺用户', icon: Gift },
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
          className="absolute w-[130vw] h-[60vh] border border-[#7C3AED]/[0.06] rounded-[50%]"
        />
      </div>

      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[400px] bg-[#7C3AED]/[0.02] rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.1}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] text-white/60 text-sm">
            <Leaf className="w-4 h-4 text-[#7C3AED]" />
            价值生态
          </span>
        </motion.div>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.2}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          共享
          <span className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
            健康价值
          </span>
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={0.35}
          className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto"
        >
          在 Orbiva 生态中，健康不仅是一种状态，更是一种可以积累和兑换的价值。
          您的每一个健康行为都值得被奖励。
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

// ========== 健康激励计划 Bento Grid ==========
function HealthIncentiveSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7C3AED]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
            <Coins className="w-4 h-4 text-[#7C3AED]" />
            健康激励计划
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            完成健康任务
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
              获得积分奖励
            </span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            坚持健康习惯，获得生态权益奖励，让健康管理充满乐趣
          </p>
        </motion.div>

        {/* 任务 Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {healthTasks.map((task, index) => (
            <motion.div
              key={task.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#7C3AED]/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
                  <task.icon className="w-6 h-6 text-[#7C3AED]" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] text-xs font-medium">
                  {task.frequency}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#7C3AED] transition-colors">
                {task.title}
              </h3>
              <p className="text-sm text-white/40 mb-4">{task.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.05]">
                <span className="text-white/40 text-sm">积分奖励</span>
                <span className="text-[#7C3AED] font-bold">+{task.points} 分</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 奖励类目 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">积分可兑换</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {rewardCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-center"
              >
                <h4 className="font-bold text-white mb-4">{category.title}</h4>
                <ul className="space-y-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center justify-center gap-2 text-sm text-white/50">
                      <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 数据主权 Bento Grid ==========
function DataSovereigntySection() {
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
            <Shield className="w-4 h-4 text-[#06B6D4]" />
            数据主权
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            您的数据
            <span className="bg-gradient-to-r from-[#06B6D4] to-[#7C3AED] bg-clip-text text-transparent">
              您做主
            </span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            在 Orbiva，数据主权归您所有，您完全掌控数据的使用方式
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {dataRights.map((right, index) => (
            <motion.div
              key={right.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-[#06B6D4]/30 transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <right.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-white mb-2">{right.title}</h3>
              <p className="text-sm text-white/40">{right.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== 生态价值循环 ==========
function EcosystemFlowSection() {
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
            <RefreshCw className="w-4 h-4 text-[#EC4899]" />
            生态价值循环
          </span>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            健康数据的
            <span className="bg-gradient-to-r from-[#EC4899] to-[#a78bfa] bg-clip-text text-transparent">
              良性闭环
            </span>
          </h2>
          
          <p className="text-white/40 max-w-2xl mx-auto text-lg">
            用户授权脱敏数据 → 辅助医疗科研 → 生态系统反哺用户健康
          </p>
        </motion.div>

        {/* 流程步骤 */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {ecosystemFlow.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {index < ecosystemFlow.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-[#EC4899] to-transparent" />
              )}

              <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#EC4899] text-white text-sm font-bold flex items-center justify-center">
                  {item.step}
                </div>

                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#EC4899] to-[#a78bfa] flex items-center justify-center mt-4 mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/40">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 循环提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/[0.02] border border-white/[0.05]">
            <RefreshCw className="w-5 h-5 text-[#EC4899] animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-white/50">持续循环，共同成长</span>
          </div>
        </motion.div>

        {/* 数据统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '¥2.8亿', label: '用户累计收益' },
              { value: '50+', label: '合作科研机构' },
              { value: '100+', label: '辅助研究项目' },
              { value: '89%', label: '用户满意度' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-[#7C3AED]">{stat.value}</div>
                <div className="text-sm text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 积分系统 ==========
function PointsSystemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-[#7C3AED]/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 左侧内容 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 text-sm mb-6">
              <Coins className="w-4 h-4 text-[#7C3AED]" />
              积分系统
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              如何获得和使用
              <span className="block bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
                健康积分
              </span>
            </h2>
            
            <p className="text-white/40 mb-8 text-lg">
              健康积分是 Orbiva 生态的核心价值单位，通过完成健康任务获得，
              可用于兑换各类健康服务和实物奖励。
            </p>

            <div className="space-y-6">
              {[
                { step: 1, title: '完成健康任务', description: '坚持运动、规律作息、按时服药等健康行为' },
                { step: 2, title: '积累健康积分', description: '每完成一个任务获得相应积分，积分可累积' },
                { step: 3, title: '兑换健康权益', description: '在积分商城兑换健康服务、实物奖励或合作伙伴权益' },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-[#7C3AED]">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{item.title}</h4>
                    <p className="text-sm text-white/40">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 右侧卡片 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05]">
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center mb-4">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">当前等级</h3>
                <p className="text-[#7C3AED] font-medium">健康达人 Lv.5</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between">
                  <span className="text-white/40">可用积分</span>
                  <span className="text-2xl font-bold text-[#7C3AED]">12,580</span>
                </div>
                <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full" />
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/40">距下一等级</span>
                  <span className="text-white">2,420 分</span>
                </div>
              </div>

              <Button variant="primary" className="w-full">
                进入积分商城
              </Button>
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
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-[#7C3AED]/[0.03] to-transparent rounded-full blur-[150px]" />
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
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] flex items-center justify-center"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            让健康
            <span className="block bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
              更有价值
            </span>
          </h2>

          <p className="text-white/40 text-lg mb-10 max-w-2xl mx-auto">
            加入 Orbiva 生态，您的每一个健康行为都将获得回报。
            开始您的健康价值之旅吧！
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              立即加入
            </Button>
            <Button variant="secondary" size="lg">
              了解更多权益
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// ========== 主页面 ==========
export default function EcosystemPage() {
  return (
    <main className="relative bg-[#050505]">
      <div className="fixed inset-0 bg-[#050505] -z-10" />
      
      {/* Hero */}
      <HeroSection />
      
      {/* Health Incentive */}
      <ScrollSectionWrapper>
        <HealthIncentiveSection />
      </ScrollSectionWrapper>
      
      {/* Data Sovereignty */}
      <ScrollSectionWrapper>
        <DataSovereigntySection />
      </ScrollSectionWrapper>
      
      {/* Ecosystem Flow */}
      <ScrollSectionWrapper>
        <EcosystemFlowSection />
      </ScrollSectionWrapper>
      
      {/* Points System */}
      <ScrollSectionWrapper>
        <PointsSystemSection />
      </ScrollSectionWrapper>
      
      {/* CTA */}
      <ScrollSectionWrapper isLast>
        <CTASection />
      </ScrollSectionWrapper>
    </main>
  );
}
