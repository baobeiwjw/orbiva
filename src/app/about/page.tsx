'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  Building2,
  TrendingUp,
  Globe,
  Users,
  Award,
  FileText,
  Download,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Calendar,
  ExternalLink,
  Newspaper,
} from 'lucide-react';

const companyHighlights = [
  {
    icon: Building2,
    title: '香港主板上市',
    description: '母公司为香港主板上市公司，拥有雄厚的资本实力与医疗健康产业布局',
  },
  {
    icon: Globe,
    title: '全球化布局',
    description: '总部位于新加坡，在香港、深圳、上海设有研发中心和运营团队',
  },
  {
    icon: Users,
    title: '专业团队',
    description: '核心团队来自华为、阿里、腾讯等科技巨头，拥有丰富的 AI 和医疗健康经验',
  },
  {
    icon: Award,
    title: '权威认证',
    description: 'ISO 27001 信息安全认证，GDPR 合规，多项医疗器械资质认证',
  },
];

const timeline = [
  { year: '2021', event: '公司成立，完成天使轮融资' },
  { year: '2022', event: '与新加坡南洋理工大学建立战略合作' },
  { year: '2023', event: 'VivaBox 1.0 发布，完成 A 轮融资' },
  { year: '2024', event: '用户突破 10 万，开启生态权益计划' },
  { year: '2025', event: 'VivaBox 2.0 发布，全球化扩张启动' },
];

const news = [
  {
    date: '2025-01-15',
    category: '融资动态',
    title: 'Orbiva 完成 B 轮融资，估值突破 5 亿美元',
    excerpt: '本轮融资由红杉资本领投，将用于全球化市场扩展和 AI 算法研发...',
  },
  {
    date: '2025-01-08',
    category: '产品发布',
    title: 'VivaBox 2.0 正式发布，AI 健康预测准确率提升至 89%',
    excerpt: '新一代 VivaBox 搭载自研 AI 芯片，支持更精准的健康预测和更丰富的交互体验...',
  },
  {
    date: '2024-12-20',
    category: '战略合作',
    title: 'Orbiva 与新加坡国立医院达成战略合作',
    excerpt: '双方将在慢病管理、健康数据研究等领域展开深度合作...',
  },
  {
    date: '2024-12-05',
    category: '行业荣誉',
    title: 'Orbiva 荣获 2024 年度最具创新力健康科技企业',
    excerpt: '在第十届全球健康科技峰会上，Orbiva 凭借创新的数字孪生技术获此殊荣...',
  },
];

const offices = [
  {
    city: '新加坡（总部）',
    address: '1 Raffles Place, Tower 2, #20-01, Singapore 048616',
    phone: '+65 6123 4567',
  },
  {
    city: '香港',
    address: '中环德辅道中 88 号 20 楼',
    phone: '+852 1234 5678',
  },
  {
    city: '深圳',
    address: '南山区科技园南区高新南一道 9 号',
    phone: '+86 755 1234 5678',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Badge variant="accent" icon={<Building2 className="w-4 h-4" />}>
              关于 Orbiva
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-6 mb-6">
              我们是谁，
              <br />
              <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                怎么找我们
              </span>
            </h1>
            <p className="text-xl text-foreground-muted">
              Orbiva 是香港主板上市集团旗下的数字健康科技品牌，
              致力于通过 AI 和数字孪生技术，让每个人都能享受到专业级的健康管理服务。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Highlights */}
      <section className="py-20 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyHighlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground-muted">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="发展历程"
            title="我们的"
            highlightedText="成长之路"
            align="left"
          />

          <div className="mt-12 relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background md:-translate-x-1/2 z-10" />

                  {/* Content */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                    }`}
                  >
                    <span className="text-accent font-bold text-2xl">
                      {item.year}
                    </span>
                    <p className="text-foreground-muted mt-2">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Whitepaper Download */}
      <section className="py-20 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="accent" icon={<FileText className="w-4 h-4" />}>
                官方白皮书
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
                深入了解
                <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
                  Orbiva 生态
                </span>
              </h2>
              <p className="text-foreground-muted mb-8">
                下载我们的白皮书，深入了解 Orbiva 的技术架构、商业模式、
                生态价值逻辑以及未来发展规划。
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  icon={<Download className="w-4 h-4" />}
                >
                  下载白皮书 (PDF)
                </Button>
                <Button variant="outline">
                  在线阅读
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="gradient-border" className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">
                      Orbiva 生态白皮书 2025
                    </h3>
                    <p className="text-sm text-foreground-muted">
                      v2.0 | 68 页 | 15.2 MB
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-foreground-muted">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>技术架构与核心算法详解</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>数字孪生健康模型原理</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>生态激励机制设计</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>商业化路径与发展规划</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="新闻动态"
            title="最新"
            highlightedText="公司资讯"
            description="了解 Orbiva 的最新业务进展、产品发布和行业动态"
          />

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {news.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full group cursor-pointer hover:border-accent/50">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.date}
                    </Badge>
                    <Badge variant="accent">{item.category}</Badge>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-foreground-muted text-sm mb-4">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center text-accent text-sm font-medium">
                    <span>阅读全文</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" icon={<Newspaper className="w-4 h-4" />}>
              查看更多新闻
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="联系我们"
            title="全球"
            highlightedText="办公网络"
            description="我们在全球多个城市设有办公室，欢迎与我们取得联系"
          />

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-bold text-foreground">{office.city}</h3>
                  </div>
                  <p className="text-sm text-foreground-muted mb-4">
                    {office.address}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <Phone className="w-4 h-4 text-accent" />
                    <span>{office.phone}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card
              variant="gradient-border"
              className="p-8 text-center max-w-2xl mx-auto"
            >
              <h3 className="text-xl font-bold text-foreground mb-2">
                商务合作咨询
              </h3>
              <p className="text-foreground-muted mb-6">
                如果您对我们的产品或合作机会感兴趣，欢迎联系我们的商务团队
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="primary"
                  icon={<Mail className="w-4 h-4" />}
                  iconPosition="left"
                >
                  发送邮件
                </Button>
                <Button variant="outline">
                  预约会议
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
