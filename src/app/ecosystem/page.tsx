'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  Leaf,
  Gift,
  Shield,
  Heart,
  Activity,
  Moon,
  Pill,
  TrendingUp,
  Users,
  Database,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Coins,
  RefreshCw,
  Lock,
  Share2,
  Award,
} from 'lucide-react';

const healthTasks = [
  {
    icon: Activity,
    title: '运动打卡',
    description: '完成每日运动目标',
    points: '50-200',
    frequency: '每日',
  },
  {
    icon: Moon,
    title: '睡眠达标',
    description: '保持规律作息，睡眠质量达标',
    points: '30-100',
    frequency: '每日',
  },
  {
    icon: Pill,
    title: '按时服药',
    description: '按照医嘱按时服药提醒',
    points: '20-50',
    frequency: '每次',
  },
  {
    icon: Heart,
    title: '健康检测',
    description: '定期完成健康数据采集',
    points: '10-30',
    frequency: '每日',
  },
  {
    icon: Database,
    title: '数据贡献',
    description: '授权脱敏数据用于科研',
    points: '100-500',
    frequency: '每月',
  },
  {
    icon: Users,
    title: '社区互动',
    description: '参与健康社区讨论分享',
    points: '10-50',
    frequency: '每次',
  },
];

const rewardCategories = [
  {
    title: '健康服务升级',
    items: ['AI 健康报告解读', '专家远程问诊', 'VIP 健康顾问', '体检套餐优惠'],
  },
  {
    title: '实物奖励',
    items: ['HomeCare 智能设备', '健康食品礼包', '运动装备', '品牌周边'],
  },
  {
    title: '权益兑换',
    items: ['合作商家优惠券', '保险折扣', '健身房会员', '生态伙伴福利'],
  },
];

const dataRights = [
  {
    icon: Lock,
    title: '数据所有权',
    description: '您的健康数据完全属于您自己，我们只是安全的保管者',
  },
  {
    icon: Shield,
    title: '授权控制',
    description: '您决定数据的使用范围，可随时查看、修改或撤销授权',
  },
  {
    icon: Share2,
    title: '脱敏保护',
    description: '分享的科研数据经过严格脱敏处理，无法关联个人身份',
  },
  {
    icon: Gift,
    title: '贡献回报',
    description: '因贡献数据获得的收益 100% 归您所有',
  },
];

const ecosystemFlow = [
  {
    step: 1,
    title: '用户授权',
    description: '自愿选择授权脱敏健康数据',
    icon: Shield,
  },
  {
    step: 2,
    title: '数据脱敏',
    description: '严格脱敏处理，保护隐私',
    icon: Lock,
  },
  {
    step: 3,
    title: '科研贡献',
    description: '辅助医疗机构进行健康研究',
    icon: Database,
  },
  {
    step: 4,
    title: '价值回馈',
    description: '研究成果和收益反哺用户',
    icon: Gift,
  },
];

export default function EcosystemPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent-secondary/20 rounded-full blur-3xl"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="success" icon={<Leaf className="w-4 h-4" />}>
              价值生态
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-6 mb-6">
              共享
              <span className="bg-gradient-to-r from-accent-secondary to-emerald-400 bg-clip-text text-transparent">
                健康价值
              </span>
            </h1>
            <p className="text-xl text-foreground-muted">
              在 Orbiva 生态中，健康不仅是一种状态，更是一种可以积累和兑换的价值。
              您的每一个健康行为都值得被奖励。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Health Incentive Plan */}
      <section className="py-24 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="健康激励计划"
            title="完成健康任务"
            highlightedText="获得积分奖励"
            description="坚持健康习惯，获得生态权益奖励，让健康管理充满乐趣"
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthTasks.map((task, index) => (
              <motion.div
                key={task.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full group hover:border-accent-secondary/50">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-accent-secondary/10 flex items-center justify-center">
                      <task.icon className="w-6 h-6 text-accent-secondary" />
                    </div>
                    <Badge variant="success">{task.frequency}</Badge>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent-secondary transition-colors">
                    {task.title}
                  </h3>
                  <p className="text-sm text-foreground-muted mb-4">
                    {task.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-foreground-muted text-sm">积分奖励</span>
                    <span className="text-accent-secondary font-bold">
                      +{task.points} 分
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Reward Categories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">
              积分可兑换
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {rewardCategories.map((category, index) => (
                <Card key={category.title} className="text-center">
                  <h4 className="font-bold text-foreground mb-4">{category.title}</h4>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center justify-center gap-2 text-sm text-foreground-muted"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent-secondary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Data Sovereignty */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="数据主权"
            title="您的数据"
            highlightedText="您做主"
            description="在 Orbiva，数据主权归您所有，您完全掌控数据的使用方式"
          />

          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataRights.map((right, index) => (
              <motion.div
                key={right.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mb-4">
                    <right.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{right.title}</h3>
                  <p className="text-sm text-foreground-muted">{right.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Value Cycle */}
      <section className="py-24 bg-background-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            label="生态价值循环"
            title="健康数据的"
            highlightedText="良性闭环"
            description="用户授权脱敏数据 → 辅助医疗科研 → 生态系统反哺用户健康"
          />

          <div className="mt-16 relative">
            {/* Flow Diagram */}
            <div className="grid md:grid-cols-4 gap-8">
              {ecosystemFlow.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {/* Connector Arrow */}
                  {index < ecosystemFlow.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-accent to-accent-secondary" />
                  )}

                  <Card className="text-center relative">
                    {/* Step Number */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                      {item.step}
                    </div>

                    <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center mt-4 mb-4">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-foreground-muted">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Cycle Arrow */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 flex justify-center"
            >
              <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-background border border-border">
                <RefreshCw className="w-5 h-5 text-accent-secondary animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-foreground-muted">
                  持续循环，共同成长
                </span>
              </div>
            </motion.div>
          </div>

          {/* Benefit Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card variant="gradient-border" className="p-8">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-accent-secondary">¥2.8亿</div>
                  <div className="text-sm text-foreground-muted mt-1">用户累计收益</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-secondary">50+</div>
                  <div className="text-sm text-foreground-muted mt-1">合作科研机构</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-secondary">100+</div>
                  <div className="text-sm text-foreground-muted mt-1">辅助研究项目</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-secondary">89%</div>
                  <div className="text-sm text-foreground-muted mt-1">用户满意度</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="accent" icon={<Coins className="w-4 h-4" />}>
                积分系统
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
                如何获得和使用
                <span className="block bg-gradient-to-r from-accent-secondary to-emerald-400 bg-clip-text text-transparent">
                  健康积分
                </span>
              </h2>
              <p className="text-foreground-muted mb-8">
                健康积分是 Orbiva 生态的核心价值单位，通过完成健康任务获得，
                可用于兑换各类健康服务和实物奖励。
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-secondary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-accent-secondary">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">完成健康任务</h4>
                    <p className="text-sm text-foreground-muted">
                      坚持运动、规律作息、按时服药等健康行为
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-secondary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-accent-secondary">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">积累健康积分</h4>
                    <p className="text-sm text-foreground-muted">
                      每完成一个任务获得相应积分，积分可累积
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-secondary/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-bold text-accent-secondary">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">兑换健康权益</h4>
                    <p className="text-sm text-foreground-muted">
                      在积分商城兑换健康服务、实物奖励或合作伙伴权益
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="gradient-border" className="p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-accent-secondary to-emerald-400 flex items-center justify-center mb-4">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">当前等级</h3>
                  <p className="text-accent-secondary font-medium">健康达人 Lv.5</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground-muted">可用积分</span>
                    <span className="text-2xl font-bold text-accent-secondary">12,580</span>
                  </div>
                  <div className="h-2 bg-background-tertiary rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-accent-secondary to-emerald-400 rounded-full" />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground-muted">距下一等级</span>
                    <span className="text-foreground">2,420 分</span>
                  </div>
                </div>

                <Button variant="primary" className="w-full mt-6">
                  进入积分商城
                </Button>
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
            <Sparkles className="w-12 h-12 text-accent-secondary mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              让健康更有价值
            </h2>
            <p className="text-foreground-muted mb-8 max-w-2xl mx-auto">
              加入 Orbiva 生态，您的每一个健康行为都将获得回报。
              开始您的健康价值之旅吧！
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
              >
                立即加入
              </Button>
              <Button variant="outline" size="lg">
                了解更多权益
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
