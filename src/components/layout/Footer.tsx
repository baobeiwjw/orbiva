'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  Twitter,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from 'lucide-react';
import Button from '@/components/ui/Button';

const footerLinks = {
  products: {
    title: '产品服务',
    links: [
      { name: 'VivaBox 智能小方块', href: '/products#vivabox' },
      { name: '数字孪生系统', href: '/products#digital-twin' },
      { name: 'HomeCare 生态设备', href: '/products#homecare' },
      { name: '移动端应用', href: '/products#app' },
    ],
  },
  technology: {
    title: '技术支持',
    links: [
      { name: '技术架构', href: '/technology' },
      { name: '隐私保护', href: '/technology#privacy' },
      { name: '学术合作', href: '/technology#academic' },
      { name: 'API 文档', href: '/docs' },
    ],
  },
  company: {
    title: '关于我们',
    links: [
      { name: '公司介绍', href: '/about' },
      { name: '新闻动态', href: '/about#news' },
      { name: '加入我们', href: '/careers' },
      { name: '联系方式', href: '/about#contact' },
    ],
  },
  legal: {
    title: '法律条款',
    links: [
      { name: '服务条款', href: '/terms' },
      { name: '隐私政策', href: '/privacy' },
      { name: '数据合规', href: '/compliance' },
      { name: '白皮书', href: '/whitepaper' },
    ],
  },
};

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/orbiva' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/orbiva' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/orbiva' },
];

export default function Footer() {
  return (
    <footer className="relative bg-background-secondary border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                订阅我们的最新动态
              </h3>
              <p className="text-foreground-muted">
                获取产品更新、健康资讯和独家优惠
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="输入您的邮箱地址"
                className="px-4 py-3 bg-background border border-border rounded-full text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors w-full sm:w-80"
              />
              <Button
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                订阅
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Orbiva</span>
            </Link>
            <p className="text-foreground-muted mb-6 max-w-sm">
              AI 驱动的数字孪生健康生态，守护您和家人的每一天健康生活。
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-lg bg-background-tertiary border border-border flex items-center justify-center text-foreground-muted hover:text-accent hover:border-accent transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-foreground-muted hover:text-accent transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-foreground-muted">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                <span>香港中环 · 新加坡 · 深圳</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                <a href="mailto:contact@orbiva.io" className="hover:text-accent transition-colors">
                  contact@orbiva.io
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                <span>+852 1234 5678</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground-subtle">
            <p>© 2025 Orbiva. All Rights Reserved.</p>
            <p>
              香港主板上市公司旗下品牌 · 新加坡南洋理工大学技术合作伙伴
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
