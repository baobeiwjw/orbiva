'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import HandDrawnIcon from '@/components/ui/HandDrawnIcon';
import { ArrowRight, Shield, Zap, Award } from 'lucide-react';

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="relative py-24 lg:py-32 min-h-screen flex flex-col justify-center">
      {/* Background - 不规则形状 */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[520px] bg-[#4ADE80]/[0.04] rounded-[45%_55%_50%_50%] blur-[140px]" 
          style={{ transform: 'translate(-50%, -50%) rotate(-5deg)' }}
        />
      </div>
      
      {/* Animated orb - 更自然的动画 */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.08, 0.15, 0.08],
          rotate: [0, 5, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[340px] bg-[#86EFAC]/8 rounded-[52%_48%_55%_45%] blur-[100px]"
      />

      <div 
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ transform: 'rotate(-0.2deg)' }}
      >
        {/* Logo Icon - 带动画 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 2 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number] }}
          className="relative w-48 h-16 mx-auto mb-8"
        >
          <motion.div
            animate={{ rotate: [2, -2, 2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <Image
              src="/logo.png"
              alt="Orbiva"
              fill
              sizes="192px"
              className="object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Headline - 更自然的文案 */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          style={{ transform: 'rotate(0.15deg)' }}
        >
          准备好了吗？
          <span 
            className="block mt-3 bg-gradient-to-r from-[#4ADE80] via-[#86EFAC] to-[#4ADE80] bg-clip-text text-transparent"
            style={{ transform: 'rotate(-0.2deg)' }}
          >
            开始关注你的健康
          </span>
        </motion.h2>

        {/* Description - 更口语化 */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg text-white/50 max-w-2xl mx-auto mb-10"
          style={{ transform: 'rotate(-0.1deg)' }}
        >
          已经有 10 万多人在用 Orbiva 管理健康了。
          <br />
          先试 30 天，不收费，也不用绑卡。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <Button
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" style={{ transform: 'rotate(-2deg)' }} />}
          >
            立即购买
          </Button>
          <Button variant="outline" size="lg">
            预约看演示
          </Button>
        </motion.div>

        {/* Trust Badges - 手绘风格图标 */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/50"
        >
          <div 
            className="flex items-center gap-2.5"
            style={{ transform: 'rotate(-1deg)' }}
          >
            <HandDrawnIcon icon={Shield} size="sm" variant="outline" animate={false} />
            <span>GDPR 合规</span>
          </div>
          <div 
            className="flex items-center gap-2.5"
            style={{ transform: 'rotate(0.5deg)' }}
          >
            <HandDrawnIcon icon={Zap} size="sm" variant="outline" animate={false} />
            <span>本地计算保护隐私</span>
          </div>
          <div 
            className="flex items-center gap-2.5"
            style={{ transform: 'rotate(-0.8deg)' }}
          >
            <HandDrawnIcon icon={Award} size="sm" variant="outline" animate={false} />
            <span>NTU 技术支持</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
