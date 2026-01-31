'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
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
    color: 'text-accent',
    bgColor: 'bg-accent/10',
    borderColor: 'border-accent/20',
    message: '深度睡眠比例提升空间，建议晚间减少蓝光暴露',
    score: 78,
  },
  {
    day: 21,
    type: '心率健康',
    icon: Heart,
    color: 'text-accent-secondary',
    bgColor: 'bg-accent-secondary/10',
    borderColor: 'border-accent-secondary/20',
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

  useEffect(() => {
    if (!isAnimating) return;
    const interval = setInterval(() => {
      setActiveDay((prev) => (prev + 1) % healthPredictions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary/50 to-background" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="生命预览"
          title="AI 预测您的"
          highlightedText="未来健康"
          description="通过持续监测和深度学习，Orbiva 可以预测未来 14-30 天的身体状态变化，帮助您提前做好健康规划"
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Health Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card variant="glass" className="p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-foreground">健康仪表盘</h3>
                  <p className="text-foreground-muted text-sm">实时生命体征监测</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-secondary/10 border border-accent-secondary/20">
                  <div className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
                  <span className="text-accent-secondary text-xs font-medium">实时同步</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {metrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-background-secondary/50 border border-border"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <metric.icon className="w-5 h-5 text-accent" />
                      {metric.trend === 'up' && (
                        <TrendingUp className="w-4 h-4 text-accent-secondary" />
                      )}
                      {metric.trend === 'down' && (
                        <TrendingUp className="w-4 h-4 text-accent-secondary rotate-180" />
                      )}
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {metric.value}
                      <span className="text-sm text-foreground-muted ml-1">{metric.unit}</span>
                    </div>
                    <div className="text-xs text-foreground-muted mt-1">{metric.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* AI Analysis */}
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-accent" />
                  <span className="font-medium text-foreground">AI 健康洞察</span>
                </div>
                <p className="text-sm text-foreground-muted">
                  根据近 7 天数据分析，您的整体健康状态良好。建议增加有氧运动频率，有助于提升心肺功能。
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Right: Prediction Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-foreground mb-6">
              未来 30 天健康预测
            </h3>

            {/* Timeline */}
            <div className="space-y-4">
              {healthPredictions.map((prediction, index) => (
                <motion.div
                  key={prediction.day}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setActiveDay(index);
                    setIsAnimating(false);
                  }}
                  className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeDay === index
                      ? `${prediction.bgColor} ${prediction.borderColor} border`
                      : 'bg-background-secondary border border-border hover:border-accent/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Day indicator */}
                    <div className={`w-12 h-12 rounded-xl ${prediction.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <span className={`text-lg font-bold ${prediction.color}`}>
                        D{prediction.day}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <prediction.icon className={`w-4 h-4 ${prediction.color}`} />
                        <span className={`font-medium ${prediction.color}`}>
                          {prediction.type}
                        </span>
                      </div>
                      <p className="text-sm text-foreground-muted">
                        {prediction.message}
                      </p>
                    </div>

                    {/* Score */}
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold text-foreground">
                        {prediction.score}
                      </div>
                      <div className="text-xs text-foreground-muted">健康分</div>
                    </div>
                  </div>

                  {/* Progress bar */}
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

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-8 flex items-center gap-2 text-accent"
            >
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">
                基于 10,000+ 用户数据训练的 AI 预测模型
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
