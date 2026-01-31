'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  Users,
  Building2,
  FlaskConical,
  Shield,
  Cpu,
  TrendingUp,
  FileCheck,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Globe,
  Handshake,
  Zap,
  BarChart3,
  Target,
  Lightbulb,
} from 'lucide-react';

const partnerTypes = [
  {
    id: 'pharma',
    name: '药企 / 科研',
    icon: FlaskConical,
    headline: '真实世界研究数据支持',
    description: '获取高质量的真实世界健康数据，加速新药研发和临床验证',
    benefits: [
      {
        title: 'RWE 数据服务',
        description: '提供脱敏的真实世界证据数据，支持药物研发和上市后研究',
      },
      {
        title: '患者招募',
        description: '精准定位目标患者群体，加速临床试验招募效率',
      },
      {
        title: '用药依从性研究',
        description: '追踪用药行为数据，评估药物真实使用场景下的效果',
      },
      {
        title: '不良反应监测',
        description: '实时监测用药后的健康指标变化，及时发现潜在风险',
      },
    ],
    stats: [
      { value: '50+', label: '合作药企' },
      { value: '100万+', label: '用户数据样本' },
      { value: '30%', label: '研发周期缩短' },
    ],
    cta: '申请数据合作',
  },
  {
    id: 'insurance',
    name: '保险公司',
    icon: Shield,
    headline: '精准风险分层解决方案',
    description: '基于实时健康数据的风险评估，支持结果导向的健康管理保险产品',
    benefits: [
      {
        title: '动态风险评估',
        description: '基于实时健康数据，实现精准的投保风险定价',
      },
      {
        title: '健康管理服务',
        description: '为保户提供持续的健康监测和干预服务，降低理赔风险',
      },
      {
        title: '理赔数据支持',
        description: '提供客观的健康数据记录，简化理赔流程',
      },
      {
        title: '产品创新',
        description: '支持开发按健康表现定价的创新保险产品',
      },
    ],
    stats: [
      { value: '15%', label: '理赔率降低' },
      { value: '25%', label: '客户留存提升' },
      { value: '40%', label: '核保效率提升' },
    ],
    cta: '探索保险合作',
  },
  {
    id: 'hardware',
    name: '硬件厂商',
    icon: Cpu,
    headline: 'AIOT 生态接入与出海服务',
    description: '提供 AIOT 协议接入和新加坡品牌背书，助力硬件产品国际化',
    benefits: [
      {
        title: 'AIOT 协议接入',
        description: '标准化的设备接入协议，快速融入 Orbiva 健康生态',
      },
      {
        title: '数据赋能',
        description: 'AI 健康分析能力开放，提升硬件产品智能化水平',
      },
      {
        title: '新加坡品牌出海',
        description: '借助新加坡品牌优势，进入东南亚及全球市场',
      },
      {
        title: '销售渠道',
        description: '共享 Orbiva 全球销售网络和用户资源',
      },
    ],
    stats: [
      { value: '20+', label: '接入设备类型' },
      { value: '10+', label: '出海市场' },
      { value: '3x', label: '销量增长' },
    ],
    cta: '申请生态接入',
  },
];

const successCases = [
  {
    logo: '🏥',
    name: '某头部药企',
    type: '药企合作',
    result: '临床试验招募效率提升 40%',
    quote: 'Orbiva 的真实世界数据帮助我们大幅缩短了临床试验周期',
  },
  {
    logo: '🛡️',
    name: '某大型保险集团',
    type: '保险合作',
    result: '健康险产品理赔率下降 18%',
    quote: '基于实时健康数据的风险管理，让我们的产品更具竞争力',
  },
  {
    logo: '⌚',
    name: '某知名穿戴设备品牌',
    type: '硬件合作',
    result: '产品销量增长 200%',
    quote: '接入 Orbiva 生态后，我们的产品在东南亚市场取得了突破性增长',
  },
];

const cooperationProcess = [
  {
    step: 1,
    title: '需求沟通',
    description: '了解您的业务需求和合作目标',
  },
  {
    step: 2,
    title: '方案设计',
    description: '定制化合作方案和技术对接计划',
  },
  {
    step: 3,
    title: '技术对接',
    description: 'API 接入、数据流程配置',
  },
  {
    step: 4,
    title: '正式合作',
    description: '启动合作，持续优化服务',
  },
];

export default function PartnersPage() {
  const [activePartner, setActivePartner] = useState('pharma');

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent-tertiary/20 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="accent" icon={<Handshake className="w-4 h-4" />}>
              合作伙伴
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-6 mb-6">
              一站式
              <span className="block mt-2 bg-gradient-to-r from-accent-tertiary to-accent bg-clip-text text-transparent">
                B/G 端解决方案
              </span>
            </h1>
            <p className="text-xl text-foreground-muted">
              无论您是药企、保险公司还是硬件厂商，Orbiva 都能为您提供
              专业的健康数据服务和商业变现方案
            </p>
          </motion.div>
        </div>
      </section>

      {/* Partner Type Tabs */}
      <section className="py-24 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {partnerTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActivePartner(type.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all ${
                  activePartner === type.id
                    ? 'bg-accent text-white shadow-lg shadow-accent/25'
                    : 'bg-background border border-border text-foreground-muted hover:bg-background-tertiary'
                }`}
              >
                <type.icon className="w-5 h-5" />
                {type.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {partnerTypes
              .filter((type) => type.id === activePartner)
              .map((type) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Info */}
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-tertiary to-accent flex items-center justify-center mb-6">
                        <type.icon className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-foreground mb-4">
                        {type.headline}
                      </h2>
                      <p className="text-foreground-muted mb-8">{type.description}</p>

                      {/* Benefits */}
                      <div className="space-y-4">
                        {type.benefits.map((benefit, index) => (
                          <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4"
                          >
                            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                              <CheckCircle2 className="w-5 h-5 text-accent" />
                            </div>
                            <div>
                              <h4 className="font-medium text-foreground">
                                {benefit.title}
                              </h4>
                              <p className="text-sm text-foreground-muted">
                                {benefit.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <Button
                        variant="primary"
                        className="mt-8"
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        {type.cta}
                      </Button>
                    </div>

                    {/* Right: Stats & Card */}
                    <div>
                      <Card variant="gradient-border" className="p-8">
                        <h3 className="text-lg font-bold text-foreground mb-6">
                          合作成效
                        </h3>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          {type.stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                              <div className="text-3xl font-bold text-accent">
                                {stat.value}
                              </div>
                              <div className="text-xs text-foreground-muted mt-1">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-6 border-t border-border">
                          <div className="flex items-center gap-3 mb-4">
                            <Lightbulb className="w-5 h-5 text-accent" />
                            <span className="font-medium text-foreground">
                              为什么选择 Orbiva
                            </span>
                          </div>
                          <ul className="space-y-2 text-sm text-foreground-muted">
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                              上市集团背书，合规可信赖
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                              NTU 技术合作，学术级算法
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                              全球化布局，本地化服务
                            </li>
                          </ul>
                        </div>
                      </Card>
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Success Cases */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="成功案例"
            title="他们都选择了"
            highlightedText="Orbiva"
          />

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {successCases.map((caseItem, index) => (
              <motion.div
                key={caseItem.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-background-tertiary flex items-center justify-center text-2xl">
                      {caseItem.logo}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{caseItem.name}</h3>
                      <Badge variant="outline" className="mt-1">
                        {caseItem.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="mb-4 p-4 rounded-xl bg-accent/5 border border-accent/20">
                    <div className="flex items-center gap-2 text-accent">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-medium">{caseItem.result}</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground-muted italic">
                    "{caseItem.quote}"
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cooperation Process */}
      <section className="py-24 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="合作流程"
            title="简单四步"
            highlightedText="开启合作"
          />

          <div className="mt-16 grid md:grid-cols-4 gap-6">
            {cooperationProcess.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connector */}
                {index < cooperationProcess.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-accent to-transparent -translate-x-1/2" />
                )}

                <Card className="text-center relative z-10">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center text-white font-bold text-lg mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground-muted">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card variant="gradient-border" className="p-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Briefcase className="w-16 h-16 text-accent mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                开启商业合作
              </h2>
              <p className="text-foreground-muted mb-8 max-w-xl mx-auto">
                无论您的业务规模大小，我们都有适合您的合作方案。
                立即联系我们的商务团队，开启健康数据价值变现之旅。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  联系商务团队
                </Button>
                <Button variant="outline" size="lg">
                  下载合作手册
                </Button>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <div className="flex flex-wrap justify-center gap-8 text-sm text-foreground-muted">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-accent" />
                    <span>全球 10+ 国家/地区</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-accent" />
                    <span>100+ 合作伙伴</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-accent" />
                    <span>¥10亿+ 商业价值</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Card>
        </div>
      </section>
    </div>
  );
}
