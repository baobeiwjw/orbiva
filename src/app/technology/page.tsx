'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  Cpu,
  Shield,
  Brain,
  Lock,
  Server,
  Wifi,
  Eye,
  FileCheck,
  Building2,
  GraduationCap,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Database,
  Cloud,
  Laptop,
} from 'lucide-react';

const techPillars = [
  {
    icon: Brain,
    title: '数字寿命镜像',
    description:
      '通过持续采集多维度健康数据，在云端构建您的"数字分身"，实时模拟身体状态变化',
    details: [
      '多模态传感器数据融合',
      '深度学习健康预测模型',
      '个性化健康画像构建',
      '14-30天健康趋势预测',
    ],
  },
  {
    icon: Shield,
    title: '边缘计算隐私保护',
    description:
      '核心敏感数据在本地设备处理，原始数据不出家门，确保您的隐私绝对安全',
    details: [
      '端侧 AI 推理引擎',
      '数据本地加密存储',
      '差分隐私技术应用',
      '零知识证明验证',
    ],
  },
  {
    icon: GraduationCap,
    title: '学术合作背书',
    description:
      '与新加坡南洋理工大学深度合作，AI 算法和安全架构经过权威学术验证',
    details: [
      'NTU AI 算法联合研发',
      '医学院临床验证支持',
      '安全实验室审计认证',
      '学术论文联合发表',
    ],
  },
];

const privacyFeatures = [
  {
    icon: Laptop,
    title: '边缘计算',
    description: '敏感数据在本地设备处理，AI 推理不依赖云端',
  },
  {
    icon: Lock,
    title: '端到端加密',
    description: 'AES-256 加密传输，即使在传输过程中也无法被窃取',
  },
  {
    icon: Database,
    title: '数据脱敏',
    description: '上传云端的数据经过脱敏处理，无法关联到个人身份',
  },
  {
    icon: Eye,
    title: '透明可控',
    description: '用户完全掌控数据权限，随时可查看、导出或删除',
  },
];

const certifications = [
  { name: 'ISO 27001', description: '信息安全管理体系认证' },
  { name: 'GDPR', description: '欧盟通用数据保护条例合规' },
  { name: 'SOC 2', description: '服务组织控制报告认证' },
  { name: 'HIPAA', description: '健康保险流通与责任法案合规' },
];

const ntuCollaboration = {
  highlights: [
    {
      icon: Brain,
      title: 'AI 算法研发',
      description: '联合开发健康预测深度学习模型，准确率达到 89%',
    },
    {
      icon: Shield,
      title: '安全架构审计',
      description: 'NTU 网络安全实验室对系统架构进行全面安全评估',
    },
    {
      icon: FileCheck,
      title: '临床验证',
      description: '与 NTU 医学院合作进行产品临床验证研究',
    },
    {
      icon: Award,
      title: '学术成果',
      description: '联合发表多篇高质量学术论文，技术获得业界认可',
    },
  ],
  papers: [
    {
      title: 'Deep Learning for Multi-modal Health Prediction',
      venue: 'Nature Digital Medicine, 2024',
    },
    {
      title: 'Privacy-Preserving Edge Computing for Wearable Health Devices',
      venue: 'IEEE IoT Journal, 2024',
    },
    {
      title: 'Digital Twin Technology for Personalized Health Management',
      venue: 'JMIR, 2023',
    },
  ],
};

const architectureLayers = [
  {
    layer: '感知层',
    icon: Wifi,
    description: 'VivaBox 及 HomeCare 设备采集多维度健康数据',
    color: 'from-accent-secondary to-emerald-400',
  },
  {
    layer: '边缘计算层',
    icon: Cpu,
    description: '本地设备完成敏感数据处理和 AI 推理',
    color: 'from-accent to-accent-light',
  },
  {
    layer: '传输层',
    icon: Lock,
    description: '脱敏数据通过端到端加密通道传输',
    color: 'from-accent-tertiary to-accent',
  },
  {
    layer: '云端服务层',
    icon: Cloud,
    description: '聚合分析、模型训练、生态服务',
    color: 'from-purple-500 to-accent',
  },
];

export default function TechnologyPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="accent" icon={<Cpu className="w-4 h-4" />}>
              技术核心
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-6 mb-6">
              我们为什么
              <span className="block mt-2 bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                更安全、更准
              </span>
            </h1>
            <p className="text-xl text-foreground-muted">
              基于边缘计算的隐私保护架构，结合学术级 AI 算法，
              让您安心享受精准的健康预测服务
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tech Pillars */}
      <section className="py-24 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="核心技术"
            title="三大技术支柱"
            highlightedText=""
          />

          <div className="mt-16 grid lg:grid-cols-3 gap-8">
            {techPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mb-6">
                    <pillar.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-foreground-muted mb-6">{pillar.description}</p>
                  <ul className="space-y-2">
                    {pillar.details.map((detail) => (
                      <li key={detail} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent-secondary flex-shrink-0" />
                        <span className="text-foreground-muted">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="系统架构"
            title="分层"
            highlightedText="技术架构"
            description="从数据采集到云端服务，每一层都经过精心设计，确保安全与性能的完美平衡"
          />

          <div className="mt-16 max-w-4xl mx-auto">
            {architectureLayers.map((layer, index) => (
              <motion.div
                key={layer.layer}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < architectureLayers.length - 1 && (
                  <div className="absolute left-7 top-16 w-0.5 h-8 bg-gradient-to-b from-border to-transparent" />
                )}

                <div className="flex items-start gap-6 mb-8">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${layer.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <layer.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{layer.layer}</h3>
                    <p className="text-foreground-muted">{layer.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Protection */}
      <section id="privacy" className="py-24 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="隐私保护"
            title="绝对的"
            highlightedText="数据安全"
            description="您的健康数据是您的私人财产，我们采用多重技术手段确保数据安全"
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {privacyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-foreground-muted">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card variant="gradient-border" className="p-8">
              <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                安全认证
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {certifications.map((cert) => (
                  <div key={cert.name} className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-xl bg-background-tertiary border border-border flex items-center justify-center mb-3">
                      <span className="text-accent font-bold text-sm">{cert.name}</span>
                    </div>
                    <p className="text-xs text-foreground-muted">{cert.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* NTU Collaboration */}
      <section id="academic" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="accent" icon={<GraduationCap className="w-4 h-4" />}>
                学术合作
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
                新加坡南洋理工大学
                <span className="block text-xl font-normal text-foreground-muted mt-2">
                  NTU 官方技术合作伙伴
                </span>
              </h2>
              <p className="text-foreground-muted mb-8">
                Orbiva 与新加坡南洋理工大学（NTU）建立了深度战略合作关系，
                在 AI 算法研发、安全架构审计、临床验证等多个领域展开紧密合作。
              </p>

              <div className="space-y-4">
                {ntuCollaboration.highlights.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{item.title}</h4>
                      <p className="text-sm text-foreground-muted">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <h3 className="text-lg font-bold text-foreground mb-6">
                  联合学术成果
                </h3>
                <div className="space-y-4">
                  {ntuCollaboration.papers.map((paper, index) => (
                    <div
                      key={paper.title}
                      className="p-4 rounded-xl bg-background-tertiary border border-border"
                    >
                      <h4 className="font-medium text-foreground text-sm mb-1">
                        {paper.title}
                      </h4>
                      <p className="text-xs text-accent">{paper.venue}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-foreground-muted text-sm">合作起始</span>
                    <span className="text-foreground font-medium">2022年</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-foreground-muted text-sm">联合发表论文</span>
                    <span className="text-foreground font-medium">12+ 篇</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground-muted text-sm">合作项目</span>
                    <span className="text-foreground font-medium">5+ 个</span>
                  </div>
                </div>
              </Card>
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
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              技术实力，值得信赖
            </h2>
            <p className="text-foreground-muted mb-8 max-w-2xl mx-auto">
              我们相信技术是服务于人的，先进的算法和严格的隐私保护，
              只为让您更安心地享受数字健康带来的便利。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                下载技术白皮书
              </Button>
              <Button variant="outline">
                预约技术咨询
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
