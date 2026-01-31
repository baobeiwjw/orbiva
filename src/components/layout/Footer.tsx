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
import { useI18n } from '@/lib/i18n';

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/orbiva' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/orbiva' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/orbiva' },
];

export default function Footer() {
  const { t, locale } = useI18n();

  const footerLinks = {
    products: {
      title: t('footer', 'products'),
      links: [
        { name: t('footer', 'vivabox'), href: '/products#vivabox' },
        { name: t('footer', 'digitalTwin'), href: '/products#digital-twin' },
        { name: t('footer', 'mobileApp'), href: '/products#app' },
      ],
    },
    company: {
      title: t('footer', 'company'),
      links: [
        { name: t('footer', 'aboutUs'), href: '/about' },
        { name: t('footer', 'careers'), href: '/careers' },
        { name: t('footer', 'news'), href: '/about#news' },
        { name: t('footer', 'contact'), href: '/about#contact' },
      ],
    },
    support: {
      title: t('footer', 'support'),
      links: [
        { name: t('footer', 'helpCenter'), href: '/help' },
        { name: t('footer', 'documentation'), href: '/docs' },
        { name: t('footer', 'community'), href: '/community' },
      ],
    },
    legal: {
      title: t('footer', 'legal'),
      links: [
        { name: t('footer', 'privacy'), href: '/privacy' },
        { name: t('footer', 'terms'), href: '/terms' },
      ],
    },
  };

  const newsletterText = {
    'zh-CN': {
      title: '订阅我们的最新动态',
      subtitle: '获取产品更新、健康资讯和独家优惠',
      placeholder: '输入您的邮箱地址',
      subscribe: '订阅',
    },
    'zh-TW': {
      title: '訂閱我們的最新動態',
      subtitle: '獲取產品更新、健康資訊和獨家優惠',
      placeholder: '輸入您的郵箱地址',
      subscribe: '訂閱',
    },
    'en': {
      title: 'Subscribe to Our Newsletter',
      subtitle: 'Get product updates, health news and exclusive offers',
      placeholder: 'Enter your email address',
      subscribe: 'Subscribe',
    },
  };

  const bottomText = {
    'zh-CN': '香港主板上市公司旗下品牌 · 新加坡南洋理工大学技术合作伙伴',
    'zh-TW': '香港主板上市公司旗下品牌 · 新加坡南洋理工大學技術合作夥伴',
    'en': 'A brand under HKEX listed company · Technology partner of NTU Singapore',
  };

  return (
    <footer className="relative bg-background-secondary border-t border-border">
      {/* Newsletter Section */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {newsletterText[locale].title}
              </h3>
              <p className="text-foreground-muted">
                {newsletterText[locale].subtitle}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder={newsletterText[locale].placeholder}
                className="px-4 py-3 bg-background border border-border rounded-full text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-accent transition-colors w-full sm:w-80"
              />
              <Button
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                {newsletterText[locale].subscribe}
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
              {t('footer', 'companyDesc')}
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
                  <li key={link.href}>
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
                <span>Hong Kong · Singapore · Shenzhen</span>
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
            <p>{t('footer', 'copyright')}</p>
            <p>{bottomText[locale]}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
