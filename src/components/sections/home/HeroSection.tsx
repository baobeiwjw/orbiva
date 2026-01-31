'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import GradientText from '@/components/ui/GradientText';
import { ArrowRight, Play, Sparkles, Zap } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      
      {/* Animated Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/20 rounded-full blur-3xl"
      />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Badge variant="accent" icon={<Sparkles className="w-4 h-4" />}>
            AI 驱动 · 数字孪生 · 健康革命
          </Badge>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          <GradientText className="block mt-2">数字孪生健康生态</GradientText>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-foreground-muted max-w-3xl mx-auto mb-10"
        >
          Orbiva 通过 AI 驱动的 VivaBox 智能小方块，构建您的数字健康分身，
          <br className="hidden sm:block" />
          预见未来 14-30 天的身体状态，让健康管理从被动变主动。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            立即体验
          </Button>
          <Button
            variant="secondary"
            size="lg"
            icon={<Play className="w-5 h-5" />}
            iconPosition="left"
          >
            观看演示
          </Button>
        </motion.div>

        {/* VivaBox 3D Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative"
        >
          {/* Floating VivaBox Mockup */}
          <div className="relative mx-auto w-72 h-72 sm:w-96 sm:h-96">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-secondary rounded-3xl blur-2xl opacity-30 animate-pulse-glow" />
            
            {/* Main Device */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full h-full rounded-3xl bg-gradient-to-br from-background-secondary to-background-tertiary border border-border overflow-hidden"
            >
              {/* Device Screen Content */}
              <div className="absolute inset-4 rounded-2xl bg-background flex flex-col items-center justify-center">
                {/* Orbiva Logo */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <span className="text-foreground font-bold text-lg">VivaBox</span>
                <span className="text-foreground-muted text-sm mt-1">智能健康小方块</span>
                
                {/* Health Indicator */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent-secondary/10 border border-accent-secondary/20">
                    <div className="w-2 h-2 rounded-full bg-accent-secondary animate-pulse" />
                    <span className="text-accent-secondary text-xs font-medium">健康状态良好</span>
                  </div>
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-accent animate-pulse" />
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-8 -right-8 px-4 py-2 rounded-xl glass text-sm"
            >
              <span className="text-accent-secondary font-medium">+89%</span>
              <span className="text-foreground-muted ml-2">健康预测准确率</span>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -bottom-8 -left-8 px-4 py-2 rounded-xl glass text-sm"
            >
              <Zap className="w-4 h-4 text-accent inline mr-2" />
              <span className="text-foreground-muted">14天健康预测</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-foreground-subtle flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 rounded-full bg-accent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
