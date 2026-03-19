'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { productsPageTranslations, type ProductsPageLocale } from '@/lib/i18n/productsPageTranslations';

function useProductsT() {
  const { locale } = useI18n();
  const loc = (locale as ProductsPageLocale) || 'en';
  const dict = productsPageTranslations[loc] || productsPageTranslations.en;
  return (key: string) => (dict as Record<string, string>)[key] ?? key;
}

function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: 'easeOut' } },
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ============================================================
// 1. HERO SECTION
// ============================================================
function HeroSection({ zoom = 1 }: { zoom?: number }) {
  const t = useProductsT();
  return (
    <section className="relative w-full min-h-[900px] overflow-hidden bg-[#060010]" style={{ height: `calc(100vh / ${zoom})` }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#060010]" />
        <Image
          src="/images/products/hero-bg.png"
          alt=""
          fill
          className="object-cover rotate-180"
          priority
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-[110px] h-full flex items-center">
        <div className="relative flex items-center w-full">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            {/* Title — each line is a block, nowrap prevents any unexpected breaking */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[68px] font-extrabold leading-[80px] font-['Urbanist'] mb-5"
            >
              <div className="text-white whitespace-nowrap">{t('heroTitle1')}</div>
              <div className="bg-gradient-to-r from-[#00F686] to-[#B0FDFF] bg-clip-text text-transparent whitespace-nowrap">
                {t('heroTitle2')}
              </div>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-[24px] font-light text-white/80 font-['Urbanist'] leading-[30px] mb-8 max-w-[618px]"
            >
              {t('heroSubtitle')}
            </motion.p>

            {/* Icon row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center gap-5"
            >
              {[
                { src: '/images/products/icon-heart.svg', alt: 'Heart' },
                { src: '/images/products/icon-clock.svg', alt: 'Clock' },
                { src: '/images/products/icon-foot.svg', alt: 'Foot' },
              ].map((icon) => (
                <motion.div
                  key={icon.alt}
                  whileHover={{ scale: 1.1, y: -3 }}
                  className="w-[60px] h-[60px] rounded-full bg-white/8 border border-white/10 flex items-center justify-center cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={icon.src} alt={icon.alt} width={32} height={32} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right side — Product showcase, overlaps and fills remaining space */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute right-[-110px] top-1/2 -translate-y-[36%] hidden lg:block"
            style={{ width: 920 }}
          >
            <div className="relative w-full aspect-square">
              <Image
                src="/images/products/hero-right.png"
                alt="Product Showcase"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-8"
      >
      </motion.div>
    </section>
  );
}

// ============================================================
// 2. VIVABOX SECTION
// ============================================================
function VivaBoxSection() {
  const t = useProductsT();
  const sideAFeatures = [
    { icon: '/images/products/icon-temp.svg', title: t('vivaboxTempTitle'), desc: t('vivaboxTempDesc'), tall: true },
    { icon: '/images/products/icon-biometric.svg', title: t('vivaboxBioTitle'), desc: t('vivaboxBioDesc'), tall: false },
    { icon: '/images/products/icon-quickcheck.svg', title: t('vivaboxQuickTitle'), desc: t('vivaboxQuickDesc'), tall: false },
    { icon: '/images/products/icon-skin.svg', title: t('vivaboxSkinTitle'), desc: t('vivaboxSkinDesc'), tall: true },
  ];

  const sideBFeatures = [
    { icon: '/images/products/icon-screen.svg', title: t('vivaboxScreenTitle'), desc: t('vivaboxScreenDesc'), tall: true },
    { icon: '/images/products/icon-camera.svg', title: t('vivaboxCameraTitle'), desc: t('vivaboxCameraDesc'), tall: false },
    { icon: '/images/products/icon-voice.svg', title: t('vivaboxVoiceTitle'), desc: t('vivaboxVoiceDesc'), tall: false },
    { icon: '/images/products/icon-health.svg', title: t('vivaboxHealthTitle'), desc: t('vivaboxHealthDesc'), tall: true },
  ];

  const specs = [
    { icon: '/images/products/icon-wifi.svg', text: t('vivaboxSpec1') },
    { icon: '/images/products/icon-npu.svg', text: t('vivaboxSpec2') },
    { icon: '/images/products/icon-battery.svg', text: t('vivaboxSpec3') },
    { icon: '/images/products/icon-charge.svg', text: t('vivaboxSpec4') },
  ];

  return (
    <AnimatedSection className="relative w-full py-20 lg:py-[75px] bg-[#060010]">
      <div className="max-w-[1220px] mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-6">
          <h2 className="text-[60px] font-bold text-white font-['Urbanist'] leading-[72px]">
            {t('vivaboxTitle')}
          </h2>
        </div>
        <div className="text-center mb-2">
          <p className="text-[24px] font-light text-white/80 font-['Urbanist'] leading-[29px]">
            {t('vivaboxSubtitle1')}
          </p>
        </div>
        <div className="text-center mb-12">
          <p className="text-[24px] font-light text-white/80 font-['Urbanist'] leading-[29px] max-w-[858px] mx-auto">
            {t('vivaboxSubtitle2')}
          </p>
        </div>

        {/* Feature grid: 3 columns, items-end ensures all bottoms align */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_436px_380px] gap-[12px] items-end justify-center">
          {/* Left column - Side A */}
          <div className="flex gap-[12px]" style={{ height: 450 }}>
            {/* Left sub-column */}
            <div className="flex flex-col gap-[12px] w-[184px]">
              <FeatureCard feature={sideAFeatures[0]} height={258} />
              <FeatureCard feature={sideAFeatures[1]} height={180} />
            </div>
            {/* Right sub-column */}
            <div className="flex flex-col gap-[12px] w-[184px]">
              <FeatureCard feature={sideAFeatures[2]} height={180} />
              <FeatureCard feature={sideAFeatures[3]} height={258} />
            </div>
          </div>

          {/* Center - Device image + specs, total height = 340 + 12 + 98 = 450 to match sides */}
          <div className="flex flex-col gap-[12px]" style={{ height: 450 }}>
            <div className="relative bg-[#1E293B] rounded-[12px] border border-[#334155] overflow-hidden flex-1">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src="/images/products/vivabox-device.png"
                  alt="VivaBox Device"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
            <div className="bg-[#1E293B] rounded-[12px] border border-[#334155] flex items-center" style={{ height: 98 }}>
              <div className="grid grid-cols-2 gap-x-12 gap-y-1.5 px-5 w-full">
                {specs.map((spec) => (
                  <div key={spec.text} className="flex items-center gap-2 whitespace-nowrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={spec.icon} alt="" width={20} height={20} />
                    <span className="text-[#00F686] text-[16px] font-bold font-['Urbanist'] leading-[24px]">
                      {spec.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Side B */}
          <div className="flex gap-[12px]" style={{ height: 450 }}>
            {/* Left sub-column */}
            <div className="flex flex-col gap-[12px] w-[184px]">
              <FeatureCard feature={sideBFeatures[0]} height={258} />
              <FeatureCard feature={sideBFeatures[1]} height={180} />
            </div>
            {/* Right sub-column */}
            <div className="flex flex-col gap-[12px] w-[184px]">
              <FeatureCard feature={sideBFeatures[2]} height={180} />
              <FeatureCard feature={sideBFeatures[3]} height={258} />
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function FeatureCard({
  feature,
  height,
}: {
  feature: { icon: string; title: string; desc: string };
  height: number;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: 'rgba(0,246,134,0.3)' }}
      className="bg-[#1E293B] rounded-[12px] border border-[#334155] px-5 flex flex-col items-start justify-center transition-all"
      style={{ height }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={feature.icon} alt="" className="h-10 w-auto mb-2.5" />
      <h4 className="text-[20px] font-bold text-white font-['Urbanist'] leading-[24px] mb-1">
        {feature.title}
      </h4>
      <p className="text-[14px] font-normal text-white/70 font-['Urbanist'] leading-[24px]">
        {feature.desc}
      </p>
    </motion.div>
  );
}

// ============================================================
// 3. DIGITAL TWIN SECTION
// ============================================================
function DigitalTwinSection() {
  const t = useProductsT();
  const features = [
    { text: t('twinFeature1'), avatar: '/images/products/avatar-pet1.png', position: 'left-top' },
    { text: t('twinFeature2'), avatar: '/images/products/avatar-pet2.png', position: 'right-top' },
    { text: t('twinFeature3'), icon: '/images/products/icon-vital.svg', position: 'left-mid' },
    { text: t('twinFeature4'), icon: '/images/products/icon-trend.svg', position: 'right-mid' },
    { text: t('twinFeature5'), icon: '/images/products/icon-alert.svg', position: 'left-bottom' },
    { text: t('twinFeature6'), icon: '/images/products/icon-report.svg', position: 'right-bottom' },
  ];

  return (
    <AnimatedSection className="relative w-full py-20 lg:py-[75px] bg-[#060010] overflow-hidden">
      <div className="max-w-[1220px] mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-4">
          <h2 className="text-[60px] font-bold text-white font-['Urbanist'] leading-[72px]">
            {t('twinTitle')}
          </h2>
        </div>
        <div className="text-center mb-16">
          <p className="text-[24px] font-light text-white/80 font-['Urbanist'] leading-[29px] max-w-[858px] mx-auto">
            {t('twinSubtitle')}
          </p>
        </div>

        {/* Central visual with floating cards */}
        <div className="relative w-full max-w-[1100px] mx-auto" style={{ height: 580 }}>
          {/* Background glow ellipse */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[679px] h-[400px] pointer-events-none">
            <Image src="/images/products/ellipse-twin.png" alt="" fill className="object-contain opacity-80" />
          </div>

          {/* Decorative rings background (COLOR_DODGE effect from Figma) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[682px] h-[560px] pointer-events-none">
            <Image src="/images/products/twin-bg.png" alt="" fill className="object-contain opacity-20 mix-blend-color-dodge" />
          </div>

          {/* 3D avatar figure */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[20px] w-[400px] h-[540px] pointer-events-none">
            <Image src="/images/products/twin-avatar.png" alt="Digital Health Avatar" fill className="object-contain" />
          </div>
          
          {/* Floating feature cards — positioned closer to center character */}
          {/* Row 1: Top pair */}
          <TwinFeatureCard
            text={features[0].text}
            avatar={features[0].avatar}
            className="absolute top-[56px] left-[110px]"
          />
          <TwinFeatureCard
            text={features[1].text}
            avatar={features[1].avatar}
            className="absolute top-[58px] right-[100px]"
          />
          {/* Row 2: Middle pair */}
          <TwinFeatureCard
            text={features[2].text}
            icon={features[2].icon}
            className="absolute top-[229px] left-[60px]"
          />
          <TwinFeatureCard
            text={features[3].text}
            icon={features[3].icon}
            className="absolute top-[229px] right-[55px]"
          />
          {/* Row 3: Bottom pair */}
          <TwinFeatureCard
            text={features[4].text}
            icon={features[4].icon}
            className="absolute top-[400px] left-[110px]"
          />
          <TwinFeatureCard
            text={features[5].text}
            icon={features[5].icon}
            className="absolute top-[400px] right-[100px]"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}

function TwinFeatureCard({
  text,
  avatar,
  icon,
  className = '',
}: {
  text: string;
  avatar?: string;
  icon?: string;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3, borderColor: 'rgba(51,65,85,1)' }}
      className={`bg-[#1E293B] rounded-[16px] border border-[#334155] p-4 flex items-center gap-3 w-[287px] h-[93px] transition-all ${className}`}
    >
      <div className="flex-1">
        <p className="text-[20px] font-bold text-[#F1F5F9] font-['Urbanist'] leading-[32px]">
          {text}
        </p>
      </div>
      {avatar && (
        <div className="w-[48px] h-[48px] rounded-full overflow-hidden flex-shrink-0">
          <Image src={avatar} alt="" width={48} height={48} className="object-cover" />
        </div>
      )}
      {icon && !avatar && (
        <div className="w-[48px] h-[48px] flex items-center justify-center flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={icon} alt="" width={40} height={40} />
        </div>
      )}
    </motion.div>
  );
}

// ============================================================
// 4. SENSING NETWORK SECTION
// ============================================================
function SensingNetworkSection() {
  const t = useProductsT();
  const devices = [
    { src: '/images/products/device-3.png', alt: 'Device 3' },
    { src: '/images/products/device-4.png', alt: 'Device 4' },
    { src: '/images/products/device-1.png', alt: 'Device 1' },
    { src: '/images/products/device-6.png', alt: 'Device 6' },
    { src: '/images/products/device-2.png', alt: 'Device 2' },
    { src: '/images/products/device-5.png', alt: 'Device 5' },
  ];

  const featureTags = [
    { icon: '/images/products/icon-posture.svg', text: t('sensingTag1') },
    { icon: '/images/products/icon-sedentary.svg', text: t('sensingTag2') },
    { icon: '/images/products/icon-pressure.svg', text: t('sensingTag3') },
  ];

  const specTags = [
    { icon: '/images/products/icon-sensor.svg', text: t('sensingSpec1') },
    { icon: '/images/products/icon-battery6m.svg', text: t('sensingSpec2') },
    { icon: '/images/products/icon-sync.svg', text: t('sensingSpec3') },
  ];

  return (
    <AnimatedSection className="relative w-full py-20 lg:py-[75px] bg-[#060010] overflow-hidden">
      <div className="max-w-[1220px] mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-4">
          <h2 className="text-[60px] font-bold text-white font-['Urbanist'] leading-[72px]">
            {t('sensingTitle')}
          </h2>
        </div>
        <div className="text-center mb-16">
          <p className="text-[24px] font-light text-white/80 font-['Urbanist'] leading-[29px] max-w-[858px] mx-auto">
            {t('sensingSubtitle')}
          </p>
        </div>

        {/* Device grid — expanding concentric layout matching design */}
        <div className="relative max-w-[1132px] mx-auto">
          {/* Row 1: 2 devices, tightest center */}
          <div className="flex justify-center gap-[40px] mb-[12px]">
            <DeviceIcon src={devices[0].src} alt={devices[0].alt} />
            <DeviceIcon src={devices[1].src} alt={devices[1].alt} />
          </div>

          {/* Row 2: 2 devices, wider spread */}
          <div className="flex justify-center gap-[480px] mb-[12px]">
            <DeviceIcon src={devices[2].src} alt={devices[2].alt} />
            <DeviceIcon src={devices[3].src} alt={devices[3].alt} />
          </div>

          {/* Row 3: 2 devices, widest spread + center info */}
          <div className="relative flex justify-between items-start">
            <DeviceIcon src={devices[4].src} alt={devices[4].alt} />
            <DeviceIcon src={devices[5].src} alt={devices[5].alt} />
          </div>

          {/* Overlaid center info card */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[100px] text-center w-[563px] z-10">
            <h3 className="text-[30px] font-semibold text-white font-['Urbanist'] leading-[36px] mb-2">
              {t('sensingCushionTitle')}
            </h3>
            <p className="text-[20px] font-light text-white/80 font-['Urbanist'] leading-[24px] mb-4">
              {t('sensingCushionSubtitle')}
            </p>

            {/* Feature tags */}
            <div className="flex justify-center gap-3">
              {featureTags.map((tag) => (
                <div
                  key={tag.text}
                  className="flex items-center h-[36px] rounded-[12px] bg-[#334155]/30 border border-white/10 overflow-hidden"
                >
                  <div className="w-[36px] h-[36px] rounded-[8px] bg-[#1E293B] flex items-center justify-center flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tag.icon} alt="" width={24} height={24} />
                  </div>
                  <span className="text-[14px] font-bold text-[#F1F5F9] font-['Urbanist'] leading-[24px] px-3 whitespace-nowrap">
                    {tag.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-[667px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mt-12 mb-8" />

          {/* Spec tags */}
          <div className="flex justify-center gap-16">
            {specTags.map((spec) => (
              <div key={spec.text} className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={spec.icon} alt="" width={20} height={20} />
                <span className="text-[16px] font-bold text-[#00F686] font-['Urbanist'] leading-[24px]">
                  {spec.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function DeviceIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -4 }}
      className="w-[188px] h-[188px] rounded-[40px] bg-white/8 border border-white/10 overflow-hidden cursor-pointer transition-all"
    >
      <Image src={src} alt={alt} width={188} height={188} className="object-cover w-full h-full" />
    </motion.div>
  );
}

// ============================================================
// 5. HEALTH HUB SECTION
// ============================================================
function HealthHubSection() {
  const t = useProductsT();
  const leftFeatures = [
    { icon: '/images/products/icon-dashboard.svg', text: t('hubFeature1') },
    { icon: '/images/products/icon-ai-qa.svg', text: t('hubFeature2') },
    { icon: '/images/products/icon-twin-interact.svg', text: t('hubFeature3') },
  ];

  const rightFeatures = [
    { icon: '/images/products/icon-privacy.svg', text: t('hubFeature4') },
    { icon: '/images/products/icon-points.svg', text: t('hubFeature5') },
  ];

  return (
    <AnimatedSection className="relative w-full pt-20 lg:pt-[75px] pb-0 bg-[#060010] overflow-hidden">
      <div className="max-w-[1220px] mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-4">
          <h2 className="text-[60px] font-bold text-white font-['Urbanist'] leading-[72px]">
            {t('hubTitle')}
          </h2>
        </div>
        <div className="text-center mb-12">
          <p className="text-[24px] font-light text-white/80 font-['Urbanist'] leading-[29px] max-w-[858px] mx-auto">
            {t('hubSubtitle')}
          </p>
        </div>

        {/* App Store buttons */}
        <div className="flex justify-center gap-5 mb-12">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,246,134,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-br from-[#00C7CC] via-[#00F686] to-[#00C7CC] cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/products/icon-apple.svg" alt="" width={20} height={20} />
            <span className="text-[#060010] text-[18px] font-extrabold font-['Urbanist'] leading-[24px]">
              {t('hubAppStore')}
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,246,134,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-br from-[#00C7CC] via-[#00F686] to-[#00C7CC] cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/products/icon-google.svg" alt="" width={24} height={24} />
            <span className="text-[#060010] text-[18px] font-extrabold font-['Urbanist'] leading-[24px]">
              {t('hubGooglePlay')}
            </span>
          </motion.button>
        </div>

        {/* Main visual area — overflow-hidden clips the phone at the bottom */}
        <div className="relative max-w-[1220px] mx-auto overflow-hidden" style={{ height: 470 }}>
          {/* Background ellipse glow — positioned to show at the bottom behind the phone */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-120px] w-[571px] h-[481px] pointer-events-none">
            <Image src="/images/products/ellipse-app.png" alt="" fill className="object-contain" />
          </div>

          {/* Background decoration rings */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[-86px] w-[682px] h-[682px] pointer-events-none">
            <Image src="/images/products/twin-bg.png" alt="" fill className="object-contain mix-blend-screen" />
          </div>

          {/* Phone mockup — extends below container, bottom portion clipped */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[16px] w-[385px] h-[783px]">
            <Image src="/images/products/app-phone.png" alt="Health Hub App" fill className="object-contain" />
          </div>

          {/* Left feature cards */}
          <AppFeatureCard
            icon={leftFeatures[0].icon}
            text={leftFeatures[0].text}
            wide
            className="absolute left-0 top-[64px]"
          />
          <AppFeatureCard
            icon={leftFeatures[1].icon}
            text={leftFeatures[1].text}
            className="absolute left-[80px] top-[211px]"
          />
          <AppFeatureCard
            icon={leftFeatures[2].icon}
            text={leftFeatures[2].text}
            className="absolute left-[40px] top-[356px]"
          />

          {/* Right feature cards */}
          <AppFeatureCard
            icon={rightFeatures[0].icon}
            text={rightFeatures[0].text}
            wide
            className="absolute right-0 top-[129px]"
          />
          <AppFeatureCard
            icon={rightFeatures[1].icon}
            text={rightFeatures[1].text}
            className="absolute right-[80px] top-[310px]"
          />
        </div>
      </div>
    </AnimatedSection>
  );
}

function AppFeatureCard({
  icon,
  text,
  wide = false,
  className = '',
}: {
  icon: string;
  text: string;
  wide?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3, borderColor: 'rgba(255,255,255,0.3)' }}
      className={`flex items-center gap-4 ${wide ? 'w-[358px]' : 'w-[300px]'} h-[82px] rounded-[12px] bg-[#334155]/30 border border-white/10 px-4 transition-all backdrop-blur-sm ${className}`}
    >
      <div className="w-[48px] h-[48px] rounded-[8px] bg-[#1E293B] flex items-center justify-center flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" width={24} height={24} />
      </div>
      <p className="text-[16px] font-bold text-[#F1F5F9] font-['Urbanist'] leading-[24px]">
        {text}
      </p>
    </motion.div>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function ProductsPage() {
  const [pageZoom, setPageZoom] = useState(1);

  useEffect(() => {
    const body = document.body;

    body.style.overflowX = 'hidden';

    const handleResize = () => {
      const z = window.innerWidth / 1440;
      setPageZoom(z);
      body.style.zoom = String(z);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      body.style.overflowX = '';
      body.style.zoom = '';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="relative bg-[#060010] -mt-20">
      <HeroSection zoom={pageZoom} />
      <VivaBoxSection />
      <DigitalTwinSection />
      <SensingNetworkSection />
      <HealthHubSection />
    </main>
  );
}
