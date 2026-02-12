'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import HandDrawnIcon from '@/components/ui/HandDrawnIcon';
import {
  Twitter,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
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

  // 更自然口语化的文案
  const newsletterText = {
    'zh-CN': {
      title: '保持联系',
      subtitle: '订阅后，你会收到产品更新和健康小贴士',
      placeholder: '你的邮箱',
      subscribe: '订阅',
    },
    'zh-TW': {
      title: '保持聯繫',
      subtitle: '訂閱後，你會收到產品更新和健康小貼士',
      placeholder: '你的郵箱',
      subscribe: '訂閱',
    },
    'en': {
      title: 'Stay in Touch',
      subtitle: 'Get product updates and health tips',
      placeholder: 'Your email',
      subscribe: 'Subscribe',
    },
  };

  const bottomText = {
    'zh-CN': '港股上市公司旗下品牌 · NTU新加坡技术合作',
    'zh-TW': '港股上市公司旗下品牌 · NTU新加坡技術合作',
    'en': 'HKEX listed · NTU Singapore tech partner',
  };

  return (
    <footer className="relative bg-background-secondary border-t border-border">
      {/* Newsletter Section - 手绘风格 */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div 
            className="flex flex-col lg:flex-row items-center justify-between gap-8"
            style={{ transform: 'rotate(-0.1deg)' }}
          >
            <div className="text-center lg:text-left">
              <h3 
                className="text-2xl font-bold text-foreground mb-2"
                style={{ transform: 'rotate(0.2deg)' }}
              >
                {newsletterText[locale].title}
              </h3>
              <p 
                className="text-foreground-muted"
                style={{ transform: 'rotate(-0.1deg)' }}
              >
                {newsletterText[locale].subtitle}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder={newsletterText[locale].placeholder}
                className="px-4 py-3 bg-background border border-border rounded-[20px_24px_22px_18px] text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-[#4ADE80] transition-colors w-full sm:w-80"
                style={{ transform: 'rotate(0.3deg)' }}
              />
              <Button
                variant="primary"
                icon={<ArrowRight className="w-4 h-4" style={{ transform: 'rotate(-2deg)' }} />}
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
          {/* Brand Column - Logo */}
          <div className="col-span-2">
            <Link 
              href="/" 
              className="flex items-center gap-3 mb-6"
              style={{ transform: 'rotate(-0.5deg)' }}
            >
              <motion.div 
                className="relative w-28 h-10"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/logo.png"
                  alt="Orbiva"
                  fill
                  sizes="112px"
                  className="object-contain"
                />
              </motion.div>
            </Link>
            <p 
              className="text-foreground-muted mb-6 max-w-sm"
              style={{ transform: 'rotate(0.1deg)' }}
            >
              {t('footer', 'companyDesc')}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08, y: -2, rotate: 3 }}
                  className="w-10 h-10 rounded-[40%_60%_55%_45%] bg-background-tertiary border border-dashed border-[#4ADE80]/30 flex items-center justify-center text-foreground-muted hover:text-[#4ADE80] hover:border-[#4ADE80]/60 transition-colors"
                  style={{ transform: `rotate(${(i - 1) * 3}deg)` }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, section], sectionIndex) => (
            <div key={key} style={{ transform: `rotate(${(sectionIndex - 2) * 0.3}deg)` }}>
              <h4 className="font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={link.href} style={{ transform: `rotate(${(linkIndex - 1) * 0.5}deg)` }}>
                    <Link
                      href={link.href}
                      className="text-foreground-muted hover:text-[#4ADE80] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info - 手绘风格图标 */}
        <div className="mt-12 pt-8 border-t border-border">
          <div 
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            style={{ transform: 'rotate(-0.15deg)' }}
          >
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-foreground-muted">
              <div className="flex items-center gap-2" style={{ transform: 'rotate(0.5deg)' }}>
                <HandDrawnIcon icon={MapPin} size="sm" variant="outline" animate={false} />
                <span>香港 · 新加坡 · 深圳</span>
              </div>
              <div className="flex items-center gap-2" style={{ transform: 'rotate(-0.3deg)' }}>
                <HandDrawnIcon icon={Mail} size="sm" variant="outline" animate={false} />
                <a href="mailto:contact@orbiva.io" className="hover:text-[#4ADE80] transition-colors">
                  contact@orbiva.io
                </a>
              </div>
              <div className="flex items-center gap-2" style={{ transform: 'rotate(0.4deg)' }}>
                <HandDrawnIcon icon={Phone} size="sm" variant="outline" animate={false} />
                <span>+852 1234 5678</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div 
            className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-foreground-subtle"
            style={{ transform: 'rotate(-0.1deg)' }}
          >
            <p>{t('footer', 'copyright')}</p>
            <p style={{ transform: 'rotate(0.2deg)' }}>{bottomText[locale]}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
