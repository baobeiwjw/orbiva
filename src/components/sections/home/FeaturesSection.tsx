'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import {
  Box,
  Cpu,
  Coins,
  ArrowRight,
  Sparkles,
  Shield,
  Heart,
} from 'lucide-react';

const features = [
  {
    id: 'hardware',
    title: '智能硬件',
    subtitle: 'VivaBox 小方块',
    description:
      '比银行卡还小的 AI 健康伴侣，集成多种传感器，实现 24/7 健康监测与情感交互',
    icon: Box,
    href: '/products',
    color: 'from-accent to-accent-light',
    stats: [
      { label: '传感器', value: '8+' },
      { label: '续航', value: '7天' },
      { label: '重量', value: '28g' },
    ],
    features: ['AI 语音交互', '多模态传感', '便携设计'],
  },
  {
    id: 'digital-twin',
    title: '数字孪生',
    subtitle: '您的数字分身',
    description:
      '通过持续数据采集，构建您的云端健康镜像，AI 实时模拟和预测未来身体状态',
    icon: Cpu,
    href: '/products#digital-twin',
    color: 'from-accent-tertiary to-accent',
    stats: [
      { label: '预测周期', value: '30天' },
      { label: '准确率', value: '89%' },
      { label: '数据维度', value: '50+' },
    ],
    features: ['萌宠形象模式', '医学仪表盘', '健康趋势预测'],
  },
  {
    id: 'rewards',
    title: '健康激励',
    subtitle: '让健康更有价值',
    description:
      '完成健康目标获得生态权益奖励，数据主权归您所有，分享脱敏数据助力医学研究',
    icon: Coins,
    href: '/ecosystem',
    color: 'from-accent-secondary to-emerald-400',
    stats: [
      { label: '日活奖励', value: '100+' },
      { label: '合作机构', value: '50+' },
      { label: '用户收益', value: '¥2.8亿' },
    ],
    features: ['健康任务奖励', '数据贡献收益', '权益兑换商城'],
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          label="核心功能"
          title="三大核心板块，构建"
          highlightedText="完整健康生态"
          description="从智能硬件到数字孪生，再到价值激励，Orbiva 打造全链路健康管理体验"
        />

        {/* Features Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Link href={feature.href} className="block h-full">
                <Card
                  variant="default"
                  className="h-full group relative overflow-hidden hover:border-accent/50"
                >
                  {/* Gradient Glow */}
                  <div
                    className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${feature.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  />

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <span className="text-sm text-accent font-medium">
                      {feature.subtitle}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground mt-1 mb-3 group-hover:text-accent transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-foreground-muted mb-6">
                      {feature.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {feature.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="text-center p-2 rounded-lg bg-background-tertiary"
                        >
                          <div className="text-lg font-bold text-foreground">
                            {stat.value}
                          </div>
                          <div className="text-xs text-foreground-subtle">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Feature Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {feature.features.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs rounded-full bg-background-tertiary text-foreground-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-accent font-medium group-hover:gap-3 transition-all">
                      <span>了解更多</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-background-secondary border border-border">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[Shield, Heart, Sparkles].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center border-2 border-background-secondary"
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="text-foreground font-medium">
                  全球 100,000+ 用户信赖
                </div>
                <div className="text-sm text-foreground-muted">
                  企业级数据安全保障
                </div>
              </div>
            </div>
            <Button
              variant="primary"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              免费试用 30 天
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
