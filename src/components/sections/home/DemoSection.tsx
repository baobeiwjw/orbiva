'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Card from '@/components/ui/Card';
import {
  Brain,
  Activity,
  Moon,
  Heart,
  Thermometer,
  AlertTriangle,
  TrendingUp,
  Zap,
} from 'lucide-react';

const healthPredictions = [
  {
    day: 3,
    type: '疲劳预警',
    icon: AlertTriangle,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    message: '预测工作压力可能导致疲劳，建议提前调整作息',
    score: 72,
  },
  {
    day: 7,
    type: '感冒风险',
    icon: Thermometer,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    message: '免疫力指标下降，建议补充维生素C',
    score: 65,
  },
  {
    day: 14,
    type: '睡眠优化',
    icon: Moon,
    color: 'text-[#06B6D4]',
    bgColor: 'bg-[#06B6D4]/10',
    borderColor: 'border-[#06B6D4]/20',
    message: '深度睡眠比例提升空间，建议晚间减少蓝光暴露',
    score: 78,
  },
  {
    day: 21,
    type: '心率健康',
    icon: Heart,
    color: 'text-[#22D3EE]',
    bgColor: 'bg-[#22D3EE]/10',
    borderColor: 'border-[#22D3EE]/20',
    message: '心率变异性良好，继续保持当前运动习惯',
    score: 92,
  },
];

const metrics = [
  { label: '心率', value: 72, unit: 'bpm', icon: Heart, trend: 'stable' },
  { label: '血氧', value: 98, unit: '%', icon: Activity, trend: 'up' },
  { label: '睡眠质量', value: 85, unit: '分', icon: Moon, trend: 'up' },
  { label: '压力指数', value: 35, unit: '', icon: Brain, trend: 'down' },
];

export default function DemoSection() {
  const [activeDay, setActiveDay] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  // 滚动进度用于淡入效果
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start center'],
  });
  
  // 从下往上淡入的效果
  const fadeInOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const fadeInY = useTransform(scrollYProgress, [0, 0.5, 1], [80, 30, 0]);

  useEffect(() => {
    if (!isAnimating || !isInView) return;
    const interval = setInterval(() => {
      setActiveDay((prev) => (prev + 1) % healthPredictions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAnimating, isInView]);

  return (
    <motion.div 
      ref={ref} 
      className="relative py-24 lg:py-32 min-h-screen flex flex-col justify-center"
      style={{ opacity: fadeInOpacity, y: fadeInY }}
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-[#06B6D4]/[0.02] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#22D3EE]/[0.02] rounded-full blur-[120px]" />
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
            <Brain className="w-4 h-4 text-[#06B6D4]" />
            <span className="text-sm text-white/60">生命预览</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            AI 预测您的
            <span className="bg-gradient-to-r from-[#06B6D4] to-[#22D3EE] bg-clip-text text-transparent">
              未来健康
            </span>
          </h2>
          
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            通过持续监测和深度学习，Orbiva 可以预测未来 14-30 天的身体状态变化
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Health Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card variant="glass" className="p-8 bg-white/[0.02] border-white/[0.05]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white">健康仪表盘</h3>
                  <p className="text-white/50 text-sm">实时生命体征监测</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D3EE]/10 border border-[#22D3EE]/20">
                  <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
                  <span className="text-[#22D3EE] text-xs font-medium">实时同步</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.05]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <metric.icon className="w-5 h-5 text-[#06B6D4]" />
                      {metric.trend === 'up' && (
                        <TrendingUp className="w-4 h-4 text-[#22D3EE]" />
                      )}
                      {metric.trend === 'down' && (
                        <TrendingUp className="w-4 h-4 text-[#22D3EE] rotate-180" />
                      )}
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {metric.value}
                      <span className="text-sm text-white/50 ml-1">{metric.unit}</span>
                    </div>
                    <div className="text-xs text-white/50 mt-1">{metric.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#06B6D4]/5 border border-[#06B6D4]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-[#06B6D4]" />
                  <span className="font-medium text-white">AI 健康洞察</span>
                </div>
                <p className="text-sm text-white/50">
                  根据近 7 天数据分析，您的整体健康状态良好。建议增加有氧运动频率，有助于提升心肺功能。
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Right: Predictions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">
              未来 30 天健康预测
            </h3>

            <div className="space-y-4">
              {healthPredictions.map((prediction, index) => (
                <motion.div
                  key={prediction.day}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  onClick={() => {
                    setActiveDay(index);
                    setIsAnimating(false);
                  }}
                  className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeDay === index
                      ? `${prediction.bgColor} ${prediction.borderColor} border`
                      : 'bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${prediction.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-lg font-bold ${prediction.color}`}>
                        D{prediction.day}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <prediction.icon className={`w-4 h-4 ${prediction.color}`} />
                        <span className={`font-medium ${prediction.color}`}>
                          {prediction.type}
                        </span>
                      </div>
                      <p className="text-sm text-white/50">
                        {prediction.message}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold text-white">
                        {prediction.score}
                      </div>
                      <div className="text-xs text-white/50">健康分</div>
                    </div>
                  </div>

                  {activeDay === index && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3 }}
                      className={`absolute bottom-0 left-0 h-0.5 ${prediction.color} bg-current opacity-50`}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-2 text-[#06B6D4]"
            >
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">
                基于 10,000+ 用户数据训练的 AI 预测模型
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
