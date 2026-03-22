'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { partnersPageTranslations, type PartnersPageLocale } from '@/lib/i18n/partnersPageTranslations';

function usePartnersT() {
  const { locale } = useI18n();
  const loc = (locale as PartnersPageLocale) || 'en';
  const dict = partnersPageTranslations[loc] || partnersPageTranslations.en;
  return (key: string) => (dict as Record<string, string>)[key] ?? key;
}

// ============================================================
// ANIMATED SECTION WRAPPER
// ============================================================
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
// 1. HERO SECTION — Health is Mining, Data has Value
// ============================================================
function HeroSection() {
  const t = usePartnersT();
  return (
    <section className="relative w-[1440px] h-[800px] bg-[#060010] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/partners/41.png"
        alt=""
        width={663}
        height={674}
        className="absolute left-[688px] top-[218px] w-[663px] h-[674px] object-cover"
        priority
      />

      {/* Left gradient overlay */}
      <div
        className="absolute left-0 top-0 w-[1440px] h-[800px]"
        style={{
          background: 'linear-gradient(270deg, rgba(6, 0, 16, 0) 0%, rgba(6, 0, 16, 0.57) 50%, #060010 100%)',
        }}
      />

      {/* Content */}
      <div className="absolute left-[105px] top-[266px] w-[693px] h-[410px]">
        {/* Tag pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute left-0 top-0 w-[206px] h-[47px] rounded-full bg-white/10 border border-white/10 flex items-center"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/partners/1.svg" alt="" className="absolute left-[16px] top-[11.5px]" />
          <span className="absolute left-[50px] top-[10px] text-[18px] font-normal text-white font-['Urbanist']">
            {t('heroTag')}
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute left-0 top-[67px] w-[654px]"
        >
          <div className="text-[68px] font-extrabold text-white font-['Urbanist'] leading-[1.15]">
            {t('heroTitle1')}
          </div>
          <div
            className="text-[68px] font-extrabold font-['Urbanist'] leading-[1.15]"
            style={{ background: '#00EF82', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            {t('heroTitle2')}
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="absolute left-0 top-[268px] w-[618px]"
        >
          <span className="text-[24px] font-light text-white font-['Urbanist'] leading-[1.5]">
            {t('heroSubtitle1')}<br />
            {t('heroSubtitle2')}
          </span>
        </motion.div>

        {/* Four category pills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute left-0 top-[358px] w-[693px] h-[52px] flex"
        >
          {/* Pharma / Research */}
          <motion.div whileHover={{ scale: 1.05, borderColor: 'rgba(0,246,134,0.4)' }} className="absolute left-0 top-0 w-[194px] h-[52px] bg-[#1E293B] rounded-[12px] border border-[#334155] flex items-center cursor-pointer transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/partners/2.svg" alt="" className="absolute left-[10px] top-[10px]" />
            <span className="absolute left-[52px] top-[11px] text-[16px] font-light text-white font-['Urbanist']">
              {t('heroPill1')}
            </span>
          </motion.div>
          {/* Insurance */}
          <motion.div whileHover={{ scale: 1.05, borderColor: 'rgba(0,246,134,0.4)' }} className="absolute left-[209px] top-0 w-[129px] h-[52px] bg-[#1E293B] rounded-[12px] border border-[#334155] flex items-center cursor-pointer transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/partners/3.svg" alt="" className="absolute left-[10px] top-[10px]" />
            <span className="absolute left-[52px] top-[11px] text-[16px] font-light text-white font-['Urbanist']">
              {t('heroPill2')}
            </span>
          </motion.div>
          {/* Hardware */}
          <motion.div whileHover={{ scale: 1.05, borderColor: 'rgba(0,246,134,0.4)' }} className="absolute left-[353px] top-0 w-[132px] h-[52px] bg-[#1E293B] rounded-[12px] border border-[#334155] flex items-center cursor-pointer transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/partners/4.svg" alt="" className="absolute left-[10px] top-[10px]" />
            <span className="absolute left-[52px] top-[11px] text-[16px] font-light text-white font-['Urbanist']">
              {t('heroPill3')}
            </span>
          </motion.div>
          {/* Government / G2B */}
          <motion.div whileHover={{ scale: 1.05, borderColor: 'rgba(0,246,134,0.4)' }} className="absolute left-[500px] top-0 w-[193px] h-[52px] bg-[#1E293B] rounded-[12px] border border-[#334155] flex items-center cursor-pointer transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/partners/5.svg" alt="" className="absolute left-[10px] top-[10px]" />
            <span className="absolute left-[52px] top-[11px] text-[16px] font-light text-white font-['Urbanist']">
              {t('heroPill4')}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// 2. PARTNERSHIP DETAILS — Left (dynamic panel) + Right (Tab list)
// ============================================================

// Gradient stat number helper
function GradientStat({ value, label, valueLeft, labelLeft }: { value: string; label: string; valueLeft: number; labelLeft: number }) {
  return (
    <div className="absolute w-[212px] h-[90px]">
      <div className="absolute top-0" style={{ left: valueLeft }}>
        <span
          className="text-[48px] font-bold font-['Urbanist']"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 246, 134, 1) 0%, rgba(248, 255, 255, 1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {value}
        </span>
      </div>
      <div className="absolute top-[64px] opacity-80 text-center" style={{ left: labelLeft }}>
        <span className="text-[16px] font-light text-white font-['Urbanist']">{label}</span>
      </div>
    </div>
  );
}

// Left panel data for each tab — now a function that takes t()
function getPanelData(t: (key: string) => string) {
  return [
    {
      // Tab 0: Real World Evidence Data Support (Pharma / Research)
      badge: { icon: '6.svg', label: t('tab0Badge'), width: 90 },
      stats: [
        { value: t('tab0Stat1Value'), label: t('tab0Stat1Label'), valueLeft: 64, labelLeft: 48 },
        { value: t('tab0Stat2Value'), label: t('tab0Stat2Label'), valueLeft: 50, labelLeft: 46 },
        { value: t('tab0Stat3Value'), label: t('tab0Stat3Label'), valueLeft: 80, labelLeft: 46 },
      ],
      features: [
        { svg: 's2-icon-1.svg', label: t('tab0Feat1') },
        { svg: 's2-icon-2.svg', label: t('tab0Feat2') },
        { svg: 's2-icon-3.svg', label: t('tab0Feat3') },
        { svg: 's2-icon-4.svg', label: t('tab0Feat4') },
      ],
      stories: [
        { title: t('tab0Story1Title'), result: t('tab0Story1Result') },
        { title: t('tab0Story2Title'), result: t('tab0Story2Result') },
      ],
    },
    {
      // Tab 1: Precision Risk Stratification Solutions (Insurance)
      badge: { icon: '6.svg', label: t('tab1Badge'), width: 90 },
      stats: [
        { value: t('tab1Stat1Value'), label: t('tab1Stat1Label'), valueLeft: 61, labelLeft: 46 },
        { value: t('tab1Stat2Value'), label: t('tab1Stat2Label'), valueLeft: 77.5, labelLeft: 46.5 },
        { value: t('tab1Stat3Value'), label: t('tab1Stat3Label'), valueLeft: 70, labelLeft: 52 },
      ],
      features: [
        { svg: '7.svg', label: t('tab1Feat1') },
        { svg: '8.svg', label: t('tab1Feat2') },
        { svg: '9.svg', label: t('tab1Feat3') },
        { svg: '10.svg', label: t('tab1Feat4') },
      ],
      stories: [
        { title: t('tab1Story1Title'), result: t('tab1Story1Result') },
        { title: t('tab1Story2Title'), result: t('tab1Story2Result') },
      ],
    },
    {
      // Tab 2: AIoT Ecosystem Integration & Global Expansion (Hardware)
      badge: { icon: '4.svg', label: t('tab2Badge'), width: 90 },
      stats: [
        { value: t('tab2Stat1Value'), label: t('tab2Stat1Label'), valueLeft: 64, labelLeft: 55 },
        { value: t('tab2Stat2Value'), label: t('tab2Stat2Label'), valueLeft: 50, labelLeft: 32 },
        { value: t('tab2Stat3Value'), label: t('tab2Stat3Label'), valueLeft: 90, labelLeft: 52 },
      ],
      features: [
        { svg: '3-1.png', label: t('tab2Feat1') },
        { svg: '3-2.png', label: t('tab2Feat2') },
        { svg: '3-3.png', label: t('tab2Feat3') },
        { svg: '3-4.png', label: t('tab2Feat4') },
      ],
      stories: [
        { title: t('tab2Story1Title'), result: t('tab2Story1Result') },
        { title: t('tab2Story2Title'), result: t('tab2Story2Result') },
      ],
    },
    {
      // Tab 3: City Health Management Solutions (Government / G2B)
      badge: { icon: '5.svg', label: t('tab3Badge'), width: 150 },
      stats: [
        { value: t('tab3Stat1Value'), label: t('tab3Stat1Label'), valueLeft: 85, labelLeft: 56 },
        { value: t('tab3Stat2Value'), label: t('tab3Stat2Label'), valueLeft: 52, labelLeft: 28 },
        { value: t('tab3Stat3Value'), label: t('tab3Stat3Label'), valueLeft: 85, labelLeft: 38 },
      ],
      features: [
        { svg: '4-1.png', label: t('tab3Feat1') },
        { svg: '4-2.png', label: t('tab3Feat2') },
        { svg: '4-3.png', label: t('tab3Feat3') },
        { svg: '4-4.png', label: t('tab3Feat4') },
      ],
      stories: [
        { title: t('tab3Story1Title'), result: t('tab3Story1Result') },
        { title: t('tab3Story2Title'), result: t('tab3Story2Result') },
      ],
    },
  ];
}

function PartnershipDetailsSection() {
  const t = usePartnersT();
  const [activeIndex, setActiveIndex] = useState(1); // Default to "Precision Risk Stratification Solutions"

  const accordionItems = [
    {
      title: t('tabTitle1'),
      desc: t('tabDesc1'),
    },
    {
      title: t('tabTitle2'),
      desc: t('tabDesc2'),
    },
    {
      title: t('tabTitle3'),
      desc: t('tabDesc3'),
    },
    {
      title: t('tabTitle4'),
      desc: t('tabDesc4'),
    },
  ];

  const panels = getPanelData(t);
  const panel = panels[activeIndex];
  const featurePositions = [
    { left: 0, top: 0 },
    { left: 320, top: 0 },
    { left: 0, top: 92 },
    { left: 320, top: 92 },
  ];

  return (
    <AnimatedSection className="relative w-[1440px] h-[800px] overflow-hidden">
      {/* LEFT PANEL — Dynamic content based on active tab */}
      <div className="absolute left-0 top-0 w-[720px] h-[800px] bg-[#1E293B] overflow-hidden" style={{ backdropFilter: 'blur(30px)' }}>
        {/* Decorative orb */}
        <Image
          src="/images/partners/42.png"
          alt=""
          width={513}
          height={513}
          className="absolute left-[295px] top-[265px] w-[513px] h-[513px] rotate-180 pointer-events-none"
          style={{ transformOrigin: 'top left' }}
        />

        {/* Animated content wrapper */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="absolute left-0 top-0 w-[720px] h-[800px]"
        >
          {/* Top: Partnership Results */}
          <div className="absolute left-0 top-0 w-[720px] h-[254px]">
            <div className="absolute left-[32px] top-[32px] w-[656px] h-[72px]">
              <div className="absolute left-0 top-0">
                <span className="text-[24px] font-bold text-white font-['Urbanist']">{t('partnershipResults')}</span>
              </div>
              {/* Badge */}
              <div
                className="absolute top-[24px] h-[24px] bg-white rounded-[6px] border border-[#D5D7DA] flex items-center shadow-sm"
                style={{ left: 656 - panel.badge.width, width: panel.badge.width }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/partners/${panel.badge.icon}`} alt="" className="absolute left-[8px] top-[4px] w-[14px] h-[14px]" />
                <span className="absolute left-[26px] top-[2px] text-center text-[14px] font-medium text-[#414651] font-['Urbanist'] whitespace-nowrap">
                  {panel.badge.label}
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div className="absolute left-[32px] top-[136px] w-[656px] h-[90px]">
              {panel.stats.map((stat, i) => (
                <div key={stat.label} className="absolute top-[9.5px]" style={{ left: i === 0 ? 10 : i === 1 ? 222 : 434 }}>
                  <GradientStat value={stat.value} label={stat.label} valueLeft={stat.valueLeft} labelLeft={stat.labelLeft} />
                </div>
              ))}
            </div>
          </div>

          {/* Middle: 4 feature icons in 2x2 grid */}
          <div className="absolute left-0 top-[254px] w-[720px] h-[228px]">
            <div className="absolute left-[32px] top-[30px] w-[656px] h-[168px]">
              {panel.features.map((item, i) => (
                <div key={item.label} className="absolute w-[304px] h-[76px]" style={{ left: featurePositions[i].left, top: featurePositions[i].top }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/partners/${item.svg}`} alt="" className="absolute left-[132px] top-0" />
                  <div className="absolute left-0 top-[52px] w-[304px] h-[24px]">
                    <div className="w-[310px] text-center">
                      <span className="text-[16px] font-normal text-white font-['Urbanist']">{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom: Success Stories */}
          <div className="absolute left-0 top-[482px] w-[720px] h-[306px]">
            <div className="absolute left-[32px] top-[30px]">
              <span className="text-[24px] font-bold text-white font-['Urbanist']">{t('successStories')}</span>
            </div>

            {panel.stories.map((story, i) => (
              <motion.div key={story.title} whileHover={{ y: -3, borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute left-[32px] w-[656px] h-[88px] bg-[#1E293B] rounded-[16px] border border-[#334155] cursor-pointer transition-all" style={{ top: i === 0 ? 80 : 188 }}>
                <div className="absolute left-[24px] top-[16px] w-[608px] h-[56px]">
                  <div className="absolute left-0 top-0">
                    <span className="text-[16px] font-bold text-white font-['Urbanist']">{story.title}</span>
                  </div>
                  <div className="absolute left-0 top-[32px]">
                    <span
                      className="text-[16px] font-normal font-['Urbanist']"
                      style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                      {story.result}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* RIGHT PANEL — Tab list */}
      <div className="absolute left-[720px] top-0 w-[720px] h-[800px] bg-[#060010]">
        <div className="absolute left-[80px] top-[99.5px] w-[530px] h-[601px]">
          {accordionItems.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                whileHover={{ x: 8 }}
                className="w-[530px] border-b border-[#CCCCCC] cursor-pointer transition-all duration-300"
                onClick={() => setActiveIndex(index)}
              >
                <div className="py-[16px]">
                  <div className="w-[530px]">
                    <span
                      className={`text-[32px] font-['Urbanist'] leading-[1.25] transition-colors duration-300 ${
                        isActive ? 'font-bold' : 'font-normal'
                      }`}
                      style={{
                        color: isActive ? '#00F686' : '#FFFFFF',
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <div className="w-[530px] mt-[0px]">
                    <span
                      className="text-[16px] font-normal font-['Urbanist']"
                      style={{
                        color: 'rgba(255, 255, 255, 0.80)',
                      }}
                    >
                      {item.desc}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ============================================================
// 3. GOVERNMENT & INSTITUTIONAL SOLUTIONS
// ============================================================
function GovernmentSection() {
  const t = usePartnersT();
  return (
    <AnimatedSection className="relative w-[1440px] h-[800px] bg-[#060010] overflow-hidden">
      {/* Decorative SVG bg */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/partners/11.svg" alt="" className="absolute left-[411px] top-[-315px]" />

      {/* Section header */}
      <div className="absolute left-[110px] top-[75px] w-[1220px] h-[464px]">
        <div className="absolute left-[271px] top-0 w-[678px] h-[150px] opacity-[0.97]">
          <div className="absolute left-[-271px] top-0 w-[1220px] text-center">
            <span className="text-[60px] font-bold text-white font-['Urbanist']">
              {t('govTitle')}
            </span>
          </div>
          <div className="absolute left-[-90px] top-[92px] w-[858px] text-center opacity-80">
            <span className="text-[24px] font-light text-white/80 font-['Urbanist']">
              {t('govSubtitle')}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Solution cards (2x2 grid) */}
      <div className="absolute left-[110px] top-[265px] w-[1220px] h-[340.89px]">
        {/* Card 1: City Health Big Data Platform */}
        <motion.div whileHover={{ y: -4, borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute left-0 top-0 w-[600px] h-[160px] bg-[#1E293B] rounded-[16px] border border-[#334155] cursor-pointer transition-all">
          <div className="absolute left-[21px] top-[21px] w-[558px] h-[118px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/partners/12.svg" alt="" className="absolute left-0 top-[0.32px]" />
            <div className="absolute left-[60px] top-0 w-[490px] h-[118px]">
              <div className="absolute left-0 top-0">
                <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('govCard1Title')}</span>
              </div>
              <div className="absolute left-0 top-[24px] w-[490px]">
                <span className="text-[14px] font-normal text-white/70 font-['Urbanist']">
                  {t('govCard1Desc')}
                </span>
              </div>
              {/* Tags */}
              <div className="absolute left-0 top-[66px] w-[390px] h-[52px]">
                <div className="absolute left-0 top-0 h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard1Tag1')}</span>
                </div>
                <div className="absolute left-[128px] top-0 h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard1Tag2')}</span>
                </div>
                <div className="absolute left-0 top-[31px] h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard1Tag2')}</span>
                </div>
                <div className="absolute left-[143px] top-[31px] h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard1Tag2')}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Public Health Alert System */}
        <motion.div whileHover={{ y: -4, borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute left-[620px] top-0 w-[600px] h-[160px] bg-[#1E293B] rounded-[16px] border border-[#334155] cursor-pointer transition-all">
          <div className="absolute left-[21px] top-[21px] w-[558px] h-[118px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/partners/13.svg" alt="" className="absolute left-0 top-[0.26px]" />
            <div className="absolute left-[68px] top-0 w-[490px] h-[118px]">
              <div className="absolute left-0 top-0">
                <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('govCard2Title')}</span>
              </div>
              <div className="absolute left-0 top-[24px] w-[490px]">
                <span className="text-[14px] font-normal text-white/70 font-['Urbanist']">
                  {t('govCard2Desc')}
                </span>
              </div>
              <div className="absolute left-0 top-[66px] w-[390px] h-[52px]">
                <div className="absolute left-0 top-0 h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard2Tag1')}</span>
                </div>
                <div className="absolute left-[143px] top-0 h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard2Tag2')}</span>
                </div>
                <div className="absolute left-0 top-[31px] h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard2Tag3')}</span>
                </div>
                <div className="absolute left-[159px] top-[31px] h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard2Tag4')}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Chronic Disease Management Network */}
        <motion.div whileHover={{ y: -4, borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute left-0 top-[180px] w-[600px] h-[160px] bg-[#1E293B] rounded-[16px] border border-[#334155] cursor-pointer transition-all">
          <div className="absolute left-[21px] top-[21px] w-[558px] h-[118px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/partners/14.svg" alt="" className="absolute left-0 top-[0.26px]" />
            <div className="absolute left-[68px] top-0 w-[490px] h-[118px]">
              <div className="absolute left-0 top-0">
                <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('govCard3Title')}</span>
              </div>
              <div className="absolute left-0 top-[24px] w-[490px]">
                <span className="text-[14px] font-normal text-white/70 font-['Urbanist']">
                  {t('govCard3Desc')}
                </span>
              </div>
              <div className="absolute left-0 top-[66px] w-[390px] h-[52px]">
                <div className="absolute left-0 top-0 h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard3Tag1')}</span>
                </div>
                <div className="absolute left-[130px] top-0 h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard3Tag2')}</span>
                </div>
                <div className="absolute left-0 top-[31px] h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard3Tag3')}</span>
                </div>
                <div className="absolute left-[162px] top-[31px] h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard3Tag4')}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 4: Healthy City Development */}
        <motion.div whileHover={{ y: -4, borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute left-[620px] top-[180px] w-[600px] h-[160px] bg-[#1E293B] rounded-[16px] border border-[#334155] cursor-pointer transition-all">
          <div className="absolute left-[21px] top-[21px] w-[558px] h-[118px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/partners/15.svg" alt="" className="absolute left-0 top-[0.26px]" />
            <div className="absolute left-[68px] top-0 w-[490px] h-[118px]">
              <div className="absolute left-0 top-0">
                <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('govCard4Title')}</span>
              </div>
              <div className="absolute left-0 top-[24px] w-[490px]">
                <span className="text-[14px] font-normal text-white/70 font-['Urbanist']">
                  {t('govCard4Desc')}
                </span>
              </div>
              <div className="absolute left-0 top-[66px] w-[390px] h-[52px]">
                <div className="absolute left-0 top-0 h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard4Tag1')}</span>
                </div>
                <div className="absolute left-[102px] top-0 h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard4Tag2')}</span>
                </div>
                <div className="absolute left-[238px] top-0 h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard4Tag3')}</span>
                </div>
                <div className="absolute left-0 top-[31px] h-[21px] bg-white/[0.02] rounded-[12px] border border-white/30 px-[8px] flex items-center">
                  <span className="text-[14px] font-light text-white font-['Urbanist'] leading-none">{t('govCard4Tag4')}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Stats: Data Sovereignty Loop */}
      <div className="absolute left-[110px] top-[645.86px] w-[1220px] h-[130px]">
        {/* Left label */}
        <div className="absolute left-0 top-[11px] w-[380px]">
          <span className="text-[36px] font-semibold text-white font-['Urbanist'] whitespace-nowrap">{t('govLoopTitle')}</span>
        </div>

        {/* Stats */}
        <div className="absolute left-[371px] top-0 w-[849px] h-[130px] flex">
          {/* Stat 1 */}
          <div className="absolute left-0 top-0 w-[243px] h-[130px]">
            <div className="absolute left-0 top-0 w-[2px] h-[130px] opacity-50 bg-[#D9D9D9]" />
            <div className="absolute left-[27px] top-0 w-[206px]">
              <span
                className="text-[48px] font-bold font-['Urbanist']"
                style={{
                  background: 'linear-gradient(180deg, rgba(0, 246, 134, 1) 0%, rgba(248, 255, 255, 1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('govStat1Value')}
              </span>
            </div>
            <div className="absolute left-[27px] top-[64px] w-[206px]">
              <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('govStat1Title')}</span>
            </div>
            <div className="absolute left-[27px] top-[96px] w-[206px]">
              <span className="text-[14px] font-normal text-white/70 font-['Urbanist']">{t('govStat1Sub')}</span>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="absolute left-[303px] top-0 w-[243px] h-[130px]">
            <div className="absolute left-0 top-0 w-[2px] h-[130px] opacity-50 bg-[#D9D9D9]" />
            <div className="absolute left-[27px] top-0 w-[206px]">
              <span
                className="text-[48px] font-bold font-['Urbanist']"
                style={{
                  background: 'linear-gradient(180deg, rgba(0, 246, 134, 1) 0%, rgba(248, 255, 255, 1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('govStat2Value')}
              </span>
            </div>
            <div className="absolute left-[27px] top-[64px] w-[206px]">
              <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('govStat2Title')}</span>
            </div>
            <div className="absolute left-[27px] top-[96px] w-[206px]">
              <span className="text-[14px] font-normal text-white/70 font-['Urbanist']">{t('govStat2Sub')}</span>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="absolute left-[606px] top-0 w-[243px] h-[130px]">
            <div className="absolute left-0 top-0 w-[2px] h-[130px] opacity-50 bg-[#D9D9D9]" />
            <div className="absolute left-[27px] top-0 w-[206px]">
              <span
                className="text-[48px] font-bold font-['Urbanist']"
                style={{
                  background: 'linear-gradient(180deg, rgba(0, 246, 134, 1) 0%, rgba(248, 255, 255, 1) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('govStat3Value')}
              </span>
            </div>
            <div className="absolute left-[27px] top-[64px] w-[206px]">
              <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('govStat3Title')}</span>
            </div>
            <div className="absolute left-[27px] top-[96px] w-[206px]">
              <span className="text-[14px] font-normal text-white/70 font-['Urbanist']">{t('govStat3Sub')}</span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// ============================================================
// 4. SIMPLE FOUR STEPS TO PARTNERSHIP
// ============================================================
function FourStepsSection() {
  const t = usePartnersT();
  const steps = [
    { num: '01', img: '47.png', title: t('step1Title'), desc: t('step1Desc'), duration: t('step1Duration'), durationSvg: '16.svg' },
    { num: '02', img: '43.png', title: t('step2Title'), desc: t('step2Desc'), duration: t('step2Duration'), durationSvg: '17.svg' },
    { num: '03', img: '44.png', title: t('step3Title'), desc: t('step3Desc'), duration: t('step3Duration'), durationSvg: '18.svg' },
    { num: '04', img: '45.png', title: t('step4Title'), desc: t('step4Desc'), duration: t('step4Duration'), durationSvg: '19.svg' },
  ];

  return (
    <AnimatedSection className="relative w-[1440px] h-[650px] bg-[#060010] overflow-hidden">
      {/* Section header */}
      <div className="absolute left-[110px] top-[75px] w-[1220px] h-[72px]">
        <div className="absolute left-[271px] top-0 w-[678px] h-[72px] opacity-[0.97]">
          <div className="absolute left-[-271px] top-0 w-[1220px] text-center">
            <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('stepsTitle1')}</span>
            <span
              className="text-[60px] font-bold font-['Urbanist']"
              style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              {t('stepsTitle2')}
            </span>
            <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('stepsTitle3')}</span>
          </div>
        </div>
      </div>

      {/* 4 Step Cards */}
      <div className="absolute left-[110px] top-[237px] w-[1220px] h-[331px] flex">
        {steps.map((step, index) => (
          <motion.div key={step.num} whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="absolute w-[290px] h-[331px] cursor-pointer group" style={{ left: index * 310 }}>
            {/* Top image */}
            <Image
              src={`/images/partners/${step.img}`}
              alt=""
              width={290}
              height={173}
              className="absolute left-0 top-0 w-[290px] h-[173px] rounded-tl-[16px] rounded-tr-[16px] border border-[#334155] object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Bottom card */}
            <div className="absolute left-0 top-[151px] w-[290px] h-[180px] bg-[#1E293B] rounded-[16px] border border-[#334155]">
              <div className="absolute left-[20px] top-[50px] w-[250px] h-[104px]">
                <div className="absolute left-0 top-[-7px] w-[286px] h-[64px]">
                  <div className="absolute left-0 top-0">
                    <span className="text-[20px] font-bold text-white font-['Urbanist']">{step.title}</span>
                  </div>
                  <div className="absolute left-0 top-[30px] w-[286px] opacity-50">
                    <span className="text-[14px] font-normal text-white font-['Urbanist']">{step.desc}</span>
                  </div>
                </div>
                <div className="absolute left-0 top-[87px] flex items-center whitespace-nowrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/images/partners/${step.durationSvg}`} alt="" className="w-[24px] h-[24px]" />
                  <span
                    className="ml-[10px] text-[16px] font-normal font-['Urbanist'] whitespace-nowrap"
                    style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {step.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Step number circle */}
            <div
              className="absolute left-[20px] top-[129px] w-[44px] h-[44px] rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(222deg, #0EFF85 0%, #B0FDFF 100%)' }}
            >
              <span className="text-[24px] font-bold text-black font-['Urbanist'] text-center">{step.num}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedSection>
  );
}

// ============================================================
// 5. START PARTNERSHIP DIALOGUE (CTA)
// ============================================================
function CTASection() {
  const t = usePartnersT();
  return (
    <AnimatedSection className="relative w-[1440px] h-[800px] bg-[#060010] overflow-hidden">
      {/* Section header */}
      <div className="absolute left-[110px] top-[75px] w-[1220px] h-[271px]">
        <div className="absolute left-[271px] top-0 w-[678px] h-[179px] opacity-[0.97]">
          <div className="absolute left-[-271px] top-0 w-[1220px] text-center">
            <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('ctaTitle')}</span>
          </div>
          <div className="absolute left-[-271px] top-[92px] w-[1220px] text-center opacity-80">
            <span className="text-[24px] font-light text-white/80 font-['Urbanist'] leading-[1.6]">
              {t('ctaSubtitle1')}<br />
              {t('ctaSubtitle2')}<br />
              {t('ctaSubtitle3')}
            </span>
          </div>
        </div>

        {/* Three info pills */}
        <div className="absolute left-[295px] top-[219px] w-[630px] h-[52px] flex">
          {/* Covering Asia-Pacific */}
          <motion.div whileHover={{ scale: 1.05, borderColor: 'rgba(0,246,134,0.4)' }} className="absolute left-0 top-0 w-[207px] h-[52px] bg-[#1E293B] rounded-[12px] border border-[#334155] flex items-center cursor-pointer transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/partners/24.svg" alt="" className="absolute left-[10px] top-[10px]" />
            <span className="absolute left-[52px] top-[11px] text-[16px] font-light text-white font-['Urbanist']">
              {t('ctaPill1')}
            </span>
          </motion.div>
          {/* 100+ Partners */}
          <motion.div whileHover={{ scale: 1.05, borderColor: 'rgba(0,246,134,0.4)' }} className="absolute left-[222px] top-0 w-[156px] h-[52px] bg-[#1E293B] rounded-[12px] border border-[#334155] flex items-center cursor-pointer transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/partners/25.svg" alt="" className="absolute left-[10px] top-[10px]" />
            <span className="absolute left-[52px] top-[11px] text-[16px] font-light text-white font-['Urbanist']">
              {t('ctaPill2')}
            </span>
          </motion.div>
          {/* $50M+ Partnership Value */}
          <motion.div whileHover={{ scale: 1.05, borderColor: 'rgba(0,246,134,0.4)' }} className="absolute left-[393px] top-0 w-[237px] h-[52px] bg-[#1E293B] rounded-[12px] border border-[#334155] flex items-center cursor-pointer transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/partners/26.svg" alt="" className="absolute left-[10px] top-[10px]" />
            <span className="absolute left-[52px] top-[11px] text-[16px] font-light text-white font-['Urbanist']">
              {t('ctaPill3')}
            </span>
          </motion.div>
        </div>
      </div>

      {/* Contact card */}
      <motion.div whileHover={{ borderColor: 'rgba(0,246,134,0.2)' }} transition={{ duration: 0.3 }} className="absolute left-[110px] top-[426px] w-[1220px] h-[264px] rounded-[16px] border border-[#334155] transition-all">
        <div className="absolute left-[32px] top-[40px] w-[1156px] h-[184px] flex">
          {/* Email */}
          <div className="absolute left-0 top-0 w-[364px] h-[184px]">
            <motion.div whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,246,134,0.2)' }} className="absolute left-[150px] top-0 w-[64px] h-[64px] bg-[#1E293B] rounded-full overflow-hidden flex items-center justify-center cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/partners/20.svg" alt="" className="absolute left-[16px] top-[16px]" />
            </motion.div>
            <div className="absolute left-0 top-[84px] w-[364px]">
              <div className="w-[364px] text-center">
                <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('ctaEmailTitle')}</span>
              </div>
              <div className="w-[364px] text-center mt-[12px]">
                <span className="text-[16px] font-normal text-white/70 font-['Urbanist']">{t('ctaEmailSub')}</span>
              </div>
            </div>
            <div className="absolute left-[133.5px] top-[160px] w-[97px] h-[24px] overflow-hidden text-center">
              <span
                className="text-[16px] font-bold font-['Urbanist']"
                style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {t('ctaEmailValue')}
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="absolute left-[396px] top-0 w-[364px] h-[184px]">
            <motion.div whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,246,134,0.2)' }} className="absolute left-[150px] top-0 w-[64px] h-[64px] bg-[#1E293B] rounded-full overflow-hidden flex items-center justify-center cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/partners/21.svg" alt="" className="absolute left-[16px] top-[16px]" />
            </motion.div>
            <div className="absolute left-0 top-[84px] w-[364px]">
              <div className="w-[364px] text-center">
                <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('ctaContactTitle')}</span>
              </div>
              <div className="w-[364px] text-center mt-[12px]">
                <span className="text-[16px] font-normal text-white/70 font-['Urbanist']">{t('ctaContactSub')}</span>
              </div>
            </div>
            <div className="absolute left-[130.5px] top-[160px] w-[103px] h-[24px] overflow-hidden text-center">
              <span
                className="text-[16px] font-bold font-['Urbanist']"
                style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {t('ctaContactValue')}
              </span>
            </div>
          </div>

          {/* Address */}
          <div className="absolute left-[792px] top-0 w-[364px] h-[184px]">
            <motion.div whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,246,134,0.2)' }} className="absolute left-[150px] top-0 w-[64px] h-[64px] bg-[#1E293B] rounded-full overflow-hidden flex items-center justify-center cursor-pointer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/partners/23.svg" alt="" className="absolute left-[16px] top-[16px]" />
            </motion.div>
            <div className="absolute left-0 top-[84px] w-[364px]">
              <div className="w-[364px] text-center">
                <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('ctaAddressTitle')}</span>
              </div>
              <div className="w-[364px] text-center mt-[12px]">
                <span className="text-[16px] font-normal text-white/70 font-['Urbanist']">{t('ctaAddressSub')}</span>
              </div>
            </div>
            <div className="absolute left-[56px] top-[160px] w-[252px] h-[24px] overflow-hidden text-center">
              <span
                className="text-[16px] font-bold font-['Urbanist']"
                style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {t('ctaAddressValue')}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

// ============================================================
// 6. FOOTER CTA — Background image section
// ============================================================
function FooterCTASection() {
  return (
    <section className="relative w-[1440px] h-[474px] overflow-hidden">
      <Image
        src="/images/partners/46.png"
        alt="Footer background"
        width={1513}
        height={651}
        className="absolute left-[-33px] top-[-169px] w-[1505px] h-[643px] object-cover"
      />
      {/* Logo overlay */}
      <div className="absolute left-[142px] top-[210px] w-[148px] h-[66px] bg-[#111111] flex items-center justify-center">
        <Image
          src="/blace-logo.png"
          alt="Orbiva"
          width={122}
          height={40}
          className="object-contain"
        />
      </div>
    </section>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function PartnersPage() {
  const [pageZoom, setPageZoom] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1440) {
        setPageZoom(width / 1440);
      } else {
        setPageZoom(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Total content height
  const totalContentHeight = 800 + 800 + 800 + 650 + 800 + 474;

  return (
    <main
      className="relative bg-black min-h-screen -mt-20 overflow-hidden"
      style={pageZoom < 1 ? { height: totalContentHeight * pageZoom } : undefined}
    >
      <div
        className="mx-auto bg-[#060010]"
        style={{
          width: 1440,
          transform: pageZoom < 1 ? `scale(${pageZoom})` : 'none',
          transformOrigin: 'top center',
        }}
      >
        <HeroSection />
        <PartnershipDetailsSection />
        <GovernmentSection />
        <FourStepsSection />
        <CTASection />
      </div>
    </main>
  );
}
