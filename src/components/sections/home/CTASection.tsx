'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from '@/components/ui/Button';
import { ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex flex-col justify-center">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#06B6D4]/[0.05] rounded-full blur-[150px]" />
      </div>
      
      {/* Animated orb */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#7C3AED]/10 rounded-full blur-[100px]"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#06B6D4] to-[#7C3AED] mb-8"
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          开启您的
          <span className="block mt-2 bg-gradient-to-r from-[#06B6D4] via-[#7C3AED] to-[#06B6D4] bg-clip-text text-transparent">
            数字健康新时代
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg text-white/50 max-w-2xl mx-auto mb-10"
        >
          加入全球 100,000+ 用户，体验 AI 驱动的健康管理革命。
          30 天免费试用，无需信用卡。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            立即开始免费试用
          </Button>
          <Button variant="outline" size="lg">
            预约产品演示
          </Button>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#06B6D4]" />
            <span>GDPR 合规</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#7C3AED]" />
            <span>边缘计算保护隐私</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#06B6D4]" />
            <span>NTU 技术背书</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
