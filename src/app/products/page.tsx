'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  Box,
  Cpu,
  Sparkles,
  Heart,
  Brain,
  Moon,
  Activity,
  Bluetooth,
  Battery,
  Shield,
  Mic,
  Smartphone,
  Wifi,
  ArrowRight,
  Check,
  Monitor,
  Sofa,
  Bed,
  Dumbbell,
  Droplet,
} from 'lucide-react';

const vivaboxFeatures = [
  {
    icon: Mic,
    title: 'AI 语音陪伴',
    description: '自然语言交互，随时询问健康建议和日常陪伴',
  },
  {
    icon: Heart,
    title: '多模态传感',
    description: '心率、血氧、体温、压力等 8+ 生命体征实时监测',
  },
  {
    icon: Brain,
    title: '智能预测',
    description: 'AI 算法预测 14-30 天健康趋势，提前预警风险',
  },
  {
    icon: Battery,
    title: '超长续航',
    description: '单次充电使用 7 天，Type-C 快充 30 分钟满电',
  },
  {
    icon: Shield,
    title: '隐私保护',
    description: '边缘计算，数据本地处理，符合 GDPR 标准',
  },
  {
    icon: Bluetooth,
    title: '无缝连接',
    description: '蓝牙 5.0，与 HomeCare 生态设备无缝互联',
  },
];

const vivaboxSpecs = [
  { label: '尺寸', value: '45 x 45 x 12 mm' },
  { label: '重量', value: '28g' },
  { label: '电池', value: '300mAh / 7天续航' },
  { label: '充电', value: 'Type-C / 无线充电' },
  { label: '连接', value: 'Bluetooth 5.0 / WiFi' },
  { label: '传感器', value: 'PPG / 加速度 / 陀螺仪 / 温度' },
];

const digitalTwinModes = [
  {
    id: 'pet',
    name: '萌宠形象',
    description: '3D 电子宠物反映您的情绪与健康状态，趣味性与实用性兼具',
    features: [
      '宠物状态反映真实健康',
      '互动养成激励健康行为',
      '个性化宠物形象定制',
      '社交分享与排行榜',
    ],
    preview: '🐱', // Placeholder for actual 3D preview
  },
  {
    id: 'medical',
    name: '医学仪表盘',
    description: '专业级生命体征数据可视化，供深度健康分析使用',
    features: [
      '实时生命体征曲线',
      '历史数据趋势分析',
      '异常指标智能预警',
      '可导出医疗报告',
    ],
    preview: '📊', // Placeholder for actual dashboard preview
  },
];

const homecareProducts = [
  {
    id: 'cushion',
    name: '智能坐垫',
    icon: Sofa,
    description: '监测坐姿、久坐提醒、脊椎健康分析',
    features: ['坐姿矫正', '久坐提醒', '压力分布'],
  },
  {
    id: 'mirror',
    name: '智能镜',
    icon: Monitor,
    description: '面部肤质分析、体态检测、AR 健身指导',
    features: ['肤质分析', '体态评估', 'AR 健身'],
  },
  {
    id: 'sleep',
    name: '睡眠监测仪',
    icon: Bed,
    description: '非接触式睡眠监测，呼吸、心率、睡眠分期',
    features: ['睡眠分期', '鼾症监测', '环境分析'],
  },
  {
    id: 'lactate',
    name: '动态乳酸仪',
    icon: Dumbbell,
    description: '运动表现监测，乳酸阈值、疲劳度分析',
    features: ['乳酸监测', '疲劳分析', '训练建议'],
  },
  {
    id: 'hydration',
    name: '智能水杯',
    icon: Droplet,
    description: '饮水量追踪、水温提醒、水质检测',
    features: ['饮水提醒', '水温监测', '健康报告'],
  },
  {
    id: 'scale',
    name: '体脂秤',
    icon: Activity,
    description: '体重、体脂、肌肉量等多维身体成分分析',
    features: ['体脂分析', '肌肉量', '基础代谢'],
  },
];

export default function ProductsPage() {
  const [activeTwinMode, setActiveTwinMode] = useState('pet');

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent-secondary/20 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="accent" icon={<Box className="w-4 h-4" />}>
              产品中心
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-6 mb-6">
              智慧健康生活
              <span className="block mt-2 bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                全家桶
              </span>
            </h1>
            <p className="text-xl text-foreground-muted">
              从核心设备到生态配件，构建完整的家庭健康管理中心
            </p>
          </motion.div>
        </div>
      </section>

      {/* VivaBox Section */}
      <section id="vivabox" className="py-24 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Product Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-secondary rounded-3xl blur-3xl opacity-20" />

                {/* Device Mockup */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative w-full h-full rounded-3xl bg-gradient-to-br from-background-tertiary to-background border border-border flex items-center justify-center"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mb-4"
                    >
                      <Sparkles className="w-12 h-12 text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground">VivaBox</h3>
                    <p className="text-foreground-muted">AI 智能健康小方块</p>
                  </div>
                </motion.div>

                {/* Floating Tags */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 px-4 py-2 rounded-xl glass text-sm"
                >
                  <span className="text-accent-secondary font-medium">比银行卡还小</span>
                </motion.div>
                <motion.div
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl glass text-sm"
                >
                  <span className="text-accent font-medium">仅重 28g</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="success">核心设备</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
                VivaBox
                <span className="block text-xl font-normal text-foreground-muted mt-2">
                  AI 智能健康小方块
                </span>
              </h2>
              <p className="text-foreground-muted mb-8">
                比银行卡还小的 AI 健康伴侣，集成多种传感器，实现 24/7 健康监测与情感交互。
                是您口袋里的私人健康顾问。
              </p>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {vivaboxFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{feature.title}</h4>
                      <p className="text-sm text-foreground-muted">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  立即购买 ¥1,299
                </Button>
                <Button variant="outline">了解详细规格</Button>
              </div>
            </motion.div>
          </div>

          {/* Specs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">技术规格</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {vivaboxSpecs.map((spec) => (
                  <div key={spec.label} className="text-center">
                    <div className="text-sm text-foreground-muted mb-1">{spec.label}</div>
                    <div className="font-medium text-foreground">{spec.value}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Digital Twin Section */}
      <section id="digital-twin" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="数字孪生"
            title="您的"
            highlightedText="数字健康分身"
            description="通过持续数据采集，在云端构建您的健康镜像，AI 实时模拟和预测未来身体状态"
          />

          <div className="mt-16">
            {/* Mode Tabs */}
            <div className="flex justify-center gap-4 mb-12">
              {digitalTwinModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveTwinMode(mode.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activeTwinMode === mode.id
                      ? 'bg-accent text-white'
                      : 'bg-background-secondary text-foreground-muted hover:bg-background-tertiary'
                  }`}
                >
                  {mode.name}
                </button>
              ))}
            </div>

            {/* Mode Content */}
            <AnimatePresence mode="wait">
              {digitalTwinModes
                .filter((mode) => mode.id === activeTwinMode)
                .map((mode) => (
                  <motion.div
                    key={mode.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid lg:grid-cols-2 gap-12 items-center"
                  >
                    {/* Preview */}
                    <div className="order-2 lg:order-1">
                      <Card variant="gradient-border" className="p-12 text-center">
                        <div className="text-8xl mb-6">{mode.preview}</div>
                        <p className="text-foreground-muted">{mode.name}预览</p>
                      </Card>
                    </div>

                    {/* Info */}
                    <div className="order-1 lg:order-2">
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {mode.name}
                      </h3>
                      <p className="text-foreground-muted mb-8">{mode.description}</p>
                      <ul className="space-y-3">
                        {mode.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center">
                              <Check className="w-4 h-4 text-accent" />
                            </div>
                            <span className="text-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* HomeCare Ecosystem */}
      <section id="homecare" className="py-24 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="HomeCare 生态"
            title="智能设备"
            highlightedText="生态阵列"
            description="与 VivaBox 无缝互联的智能家居设备，构建完整的家庭健康管理中心"
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homecareProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full group hover:border-accent/50">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
                      <product.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-foreground-muted mb-4">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 text-xs rounded-full bg-background-tertiary text-foreground-muted"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-background border border-border">
              <Wifi className="w-6 h-6 text-accent" />
              <span className="text-foreground-muted">
                所有设备支持 WiFi / 蓝牙连接，与 VivaBox 自动同步数据
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* App Section */}
      <section id="app" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="accent" icon={<Smartphone className="w-4 h-4" />}>
                移动端应用
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
                Orbiva App
                <span className="block text-xl font-normal text-foreground-muted mt-2">
                  健康管理尽在掌握
                </span>
              </h2>
              <p className="text-foreground-muted mb-8">
                iOS & Android 双平台支持，实时同步所有设备数据，
                AI 健康助手 24 小时在线为您提供个性化建议。
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  '实时健康数据仪表盘',
                  'AI 健康助手智能问答',
                  '健康任务与奖励系统',
                  '家庭成员健康共享',
                  '医疗报告一键导出',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent-secondary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-accent-secondary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <Button variant="primary">
                  App Store 下载
                </Button>
                <Button variant="outline">
                  Google Play 下载
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative max-w-xs mx-auto">
                {/* Phone Mockup */}
                <div className="relative rounded-[3rem] bg-gradient-to-br from-background-tertiary to-background border-4 border-border p-4 aspect-[9/19]">
                  <div className="w-full h-full rounded-[2.5rem] bg-background flex items-center justify-center">
                    <div className="text-center">
                      <Smartphone className="w-16 h-16 text-accent mx-auto mb-4" />
                      <p className="text-foreground-muted">App 界面预览</p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 px-4 py-2 rounded-xl glass text-sm"
                >
                  <Heart className="w-4 h-4 text-red-500 inline mr-2" />
                  <span className="text-foreground">72 bpm</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background-secondary/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              开启您的智慧健康之旅
            </h2>
            <p className="text-foreground-muted mb-8">
              VivaBox 套装限时优惠，现在购买享 30 天无忧退换
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                立即购买
              </Button>
              <Button variant="outline" size="lg">
                预约产品演示
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
