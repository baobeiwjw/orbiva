'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import HandDrawnIcon from '@/components/ui/HandDrawnIcon';
import {
  Box,
  Cpu,
  Coins,
  ArrowRight,
  Users,
  Heart,
  Sparkles,
} from 'lucide-react';

const features = [
  {
    id: 'hardware',
    title: '智能小方块',
    subtitle: 'VivaBox',
    description:
      '比银行卡还小的健康伴侣，揣兜里就能用。它会默默记录你的身体数据，一周充一次电就够了。',
    icon: Box,
    href: '/products',
    color: 'from-[#4ADE80] to-[#86EFAC]',
    stats: [
      { label: '传感器', value: '8+' },
      { label: '续航', value: '7天' },
      { label: '重量', value: '28g' },
    ],
    features: ['语音聊天', '多种传感', '超便携'],
  },
  {
    id: 'digital-twin',
    title: '数字分身',
    subtitle: '了解自己',
    description:
      '你的健康数据会形成一个"数字版的你"，帮你看清身体变化，提前发现问题。',
    icon: Cpu,
    href: '/products#digital-twin',
    color: 'from-[#86EFAC] to-[#4ADE80]',
    stats: [
      { label: '预测', value: '30天' },
      { label: '准确率', value: '89%' },
      { label: '维度', value: '50+' },
    ],
    features: ['萌宠模式', '数据看板', '趋势预测'],
  },
  {
    id: 'rewards',
    title: '健康激励',
    subtitle: '越健康越值钱',
    description:
      '完成健康小目标就能获得奖励，你的数据你做主，分享脱敏数据还能帮助医学研究。',
    icon: Coins,
    href: '/ecosystem',
    color: 'from-[#4ADE80] to-[#86EFAC]',
    stats: [
      { label: '日奖励', value: '100+' },
      { label: '合作方', value: '50+' },
      { label: '已发放', value: '2.8亿' },
    ],
    features: ['任务奖励', '数据收益', '权益商城'],
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative py-24 lg:py-32">
      {/* Background - 不规则纹理 */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(74, 222, 128, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(134, 239, 172, 0.02) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ transform: 'rotate(-0.15deg)' }}>
          <SectionTitle
            label="主要功能"
            title="三个核心板块，"
            highlightedText="一站式搞定"
            description="从硬件到软件，从监测到激励，我们想得比你还周全"
          />
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const rotations = [-0.6, 0.4, -0.5];
            const rotation = rotations[index];
            const borderRadii = [
              'rounded-[24px_28px_26px_22px]',
              'rounded-[26px_22px_28px_24px]',
              'rounded-[22px_26px_24px_28px]',
            ];
            
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 28, rotate: rotation - 1 }}
                whileInView={{ opacity: 1, y: 0, rotate: rotation }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number] }}
              >
                <Link href={feature.href} className="block h-full">
                  <Card
                    variant="default"
                    className={`h-full group relative overflow-hidden hover:border-[#4ADE80]/30 ${borderRadii[index]}`}
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    {/* Gradient Glow - 不规则形状 */}
                    <div
                      className={`absolute -top-20 -right-20 w-44 h-44 bg-gradient-to-br ${feature.color} rounded-[45%_55%_50%_50%] blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
                      style={{ transform: 'rotate(-8deg)' }}
                    />

                    {/* Logo 图标 */}
                    <div 
                      className="relative w-28 h-10 mb-6 group-hover:scale-105 transition-transform duration-300"
                    >
                      <Image
                        src="/logo.png"
                        alt="Orbiva"
                        fill
                        sizes="112px"
                        className="object-contain"
                      />
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <span 
                        className="text-sm text-[#4ADE80] font-medium"
                        style={{ transform: 'rotate(-0.5deg)', display: 'inline-block' }}
                      >
                        {feature.subtitle}
                      </span>
                      <h3 
                        className="text-2xl font-bold text-foreground mt-1 mb-3 group-hover:text-[#86EFAC] transition-colors duration-300"
                        style={{ transform: 'rotate(0.2deg)' }}
                      >
                        {feature.title}
                      </h3>
                      <p 
                        className="text-foreground-muted mb-6"
                        style={{ transform: 'rotate(-0.1deg)' }}
                      >
                        {feature.description}
                      </p>

                      {/* Stats - 不规则布局 */}
                      <div className="grid grid-cols-3 gap-2 mb-6">
                        {feature.stats.map((stat, i) => (
                          <div
                            key={stat.label}
                            className="text-center p-2 rounded-[12px_14px_13px_11px] bg-background-tertiary"
                            style={{ transform: `rotate(${(i - 1) * 0.8}deg)` }}
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
                        {feature.features.map((tag, i) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs rounded-full bg-background-tertiary text-foreground-muted"
                            style={{ transform: `rotate(${(i - 1) * 1.5}deg)` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div 
                        className="flex items-center text-[#4ADE80] font-medium group-hover:gap-3 transition-all"
                        style={{ transform: 'rotate(-0.3deg)' }}
                      >
                        <span>了解更多</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" style={{ transform: 'rotate(-2deg)' }} />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA - 手绘风格 */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
          style={{ transform: 'rotate(-0.2deg)' }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 p-6 rounded-[22px_26px_24px_20px] bg-background-secondary border border-border">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-1">
                {[Users, Heart, Sparkles].map((Icon, i) => (
                  <div
                    key={i}
                    style={{ transform: `rotate(${(i - 1) * 6}deg)` }}
                  >
                    <HandDrawnIcon icon={Icon} size="md" variant="filled" animate={false} />
                  </div>
                ))}
              </div>
              <div className="text-left">
                <div className="text-foreground font-medium" style={{ transform: 'rotate(0.2deg)' }}>
                  10万+ 人正在使用
                </div>
                <div className="text-sm text-foreground-muted" style={{ transform: 'rotate(-0.1deg)' }}>
                  数据安全，值得信赖
                </div>
              </div>
            </div>
            <Button
              variant="primary"
              icon={<ArrowRight className="w-4 h-4" style={{ transform: 'rotate(-3deg)' }} />}
            >
              立即购买
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
