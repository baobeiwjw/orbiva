'use client';

import { useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const stats = [
  { value: 100000, suffix: '+', label: '活跃用户', description: '全球用户信赖' },
  { value: 89, suffix: '%', label: '预测准确率', description: 'AI 健康预测' },
  { value: 50, suffix: '+', label: '合作伙伴', description: '医疗机构&企业' },
  { value: 2.8, suffix: '亿', label: '数据价值', description: '用户累计收益' },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const spring = useSpring(0, { duration: 2000 });
  const display = useTransform(spring, (current) =>
    value < 100 ? current.toFixed(1) : Math.floor(current).toLocaleString()
  );

  if (isInView) {
    spring.set(value);
  }

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent-secondary/5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-lg font-medium text-foreground mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-foreground-muted">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
