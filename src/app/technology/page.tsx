'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { technologyPageTranslations, type TechnologyPageLocale } from '@/lib/i18n/technologyPageTranslations';

function useTechT() {
  const { locale } = useI18n();
  const loc = (locale as TechnologyPageLocale) || 'en';
  const dict = technologyPageTranslations[loc] || technologyPageTranslations.en;
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
// 1. HERO SECTION — Edge Intelligence Privacy First
// ============================================================
function HeroSection() {
  const t = useTechT();
  return (
    <section className="relative w-[1440px] h-[950px] bg-[#060010] overflow-hidden">
      {/* Background decorative band image at top */}
      <Image
        src="/images/technology/44.png"
        alt=""
        width={1437}
        height={181}
        className="absolute left-0 top-[297px] w-[1437px] h-[181px] object-cover"
        priority
      />

      {/* Center content block */}
      <div className="absolute left-[393px] top-[210px] w-[654px] h-[328px]">
        {/* Tag pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute left-[227.5px] top-0 w-[199px] h-[47px] rounded-full bg-white/10 border border-white/10 flex items-center gap-2 px-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/technology/21.svg" alt="" width={18} height={24} className="mt-[0.5px]" />
          <span className="text-[18px] font-normal text-white font-['Urbanist']">
            {t('heroTag')}
          </span>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute left-0 top-[67px] w-[654px] text-center"
        >
          <span className="text-[68px] font-extrabold text-white font-['Urbanist'] leading-[1.15]">{t('heroTitle1')}</span>
          <span className="text-[68px] font-extrabold text-[#00EF82] font-['Urbanist'] leading-[1.15]">{t('heroTitle2')}</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="absolute left-[18px] top-[268px] w-[618px] text-center text-[24px] font-light text-white font-['Urbanist'] leading-[30px]"
        >
          {t('heroSubtitle')}
        </motion.p>

        {/* Scroll down arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute left-[320px] top-[374px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/technology/22.svg" alt="scroll" width={14} height={8} />
        </motion.div>

        {/* Decorative lines */}
        <div className="absolute left-[-121px] top-[392px] w-[896px] h-[143px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/technology/23.svg" alt="" className="absolute left-0 top-[-5.5px]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/technology/24.svg" alt="" className="absolute left-[448px] top-[-5.5px]" />
        </div>
      </div>

      {/* Bottom cube image */}
      <Image
        src="/images/technology/45.png"
        alt=""
        width={1018}
        height={841}
        className="absolute left-[211px] top-[460px] w-[1018.43px] h-[841px] pointer-events-none"
      />
    </section>
  );
}

// ============================================================
// 2. THREE PILLARS — Edge AI (large) + Explainable AI + Privacy
// ============================================================

function ThreePillarsSection() {
  const t = useTechT();
  const [activeIndex, setActiveIndex] = useState(0);

  const pillarCards = [
    {
      id: 'edge-ai',
      title: t('edgeAiTitle'),
      subtitle: t('edgeAiSubtitle'),
      icon: '32.svg',
      decorativeIcon: null,
      stats: [
        { value: t('edgeAiStat1Value'), label: t('edgeAiStat1Label') },
        { value: t('edgeAiStat2Value'), label: t('edgeAiStat2Label') },
        { value: t('edgeAiStat3Value'), label: t('edgeAiStat3Label') },
      ],
      flows: [
        { icon: '25.svg', text: t('edgeAiFlow1') },
        { icon: '26.svg', text: t('edgeAiFlow2') },
        { icon: '27.svg', text: t('edgeAiFlow3') },
      ],
      features: [
        { icon: '28.svg', text: t('edgeAiFeat1') },
        { icon: '29.svg', text: t('edgeAiFeat2') },
        { icon: '30.svg', text: t('edgeAiFeat3') },
        { icon: '31.svg', text: t('edgeAiFeat4') },
      ],
      collapsedIcon: 'edge-ai-deco.png',
      collapsedIconPos: 'left-[20px] top-[340px]',
    },
    {
      id: 'explainable-ai',
      title: t('explainableTitle'),
      subtitle: t('explainableSubtitle'),
      icon: '32.svg',
      decorativeIcon: '32.svg',
      stats: [
        { value: t('explainableStat1Value'), label: t('explainableStat1Label') },
        { value: t('explainableStat2Value'), label: t('explainableStat2Label') },
        { value: t('explainableStat3Value'), label: t('explainableStat3Label') },
      ],
      flows: [
        { icon: '25.svg', text: t('explainableFlow1') },
        { icon: '26.svg', text: t('explainableFlow2') },
        { icon: '27.svg', text: t('explainableFlow3') },
      ],
      features: [
        { icon: '28.svg', text: t('explainableFeat1') },
        { icon: '29.svg', text: t('explainableFeat2') },
        { icon: '30.svg', text: t('explainableFeat3') },
        { icon: '31.svg', text: t('explainableFeat4') },
      ],
      collapsedIcon: '32.svg',
      collapsedIconPos: 'left-[34px] top-[366px]',
    },
    {
      id: 'privacy',
      title: t('privacyPillarTitle'),
      subtitle: t('privacyPillarSubtitle'),
      icon: '33.svg',
      decorativeIcon: '33.svg',
      stats: [
        { value: t('privacyPillarStat1Value'), label: t('privacyPillarStat1Label') },
        { value: t('privacyPillarStat2Value'), label: t('privacyPillarStat2Label') },
        { value: t('privacyPillarStat3Value'), label: t('privacyPillarStat3Label') },
      ],
      flows: [
        { icon: '25.svg', text: t('privacyPillarFlow1') },
        { icon: '26.svg', text: t('privacyPillarFlow2') },
        { icon: '27.svg', text: t('privacyPillarFlow3') },
      ],
      features: [
        { icon: '28.svg', text: t('privacyPillarFeat1') },
        { icon: '29.svg', text: t('privacyPillarFeat2') },
        { icon: '30.svg', text: t('privacyPillarFeat3') },
        { icon: '31.svg', text: t('privacyPillarFeat4') },
      ],
      collapsedIcon: '33.svg',
      collapsedIconPos: 'left-[19px] top-[336px]',
    },
  ];

  return (
    <AnimatedSection className="relative w-[1440px] mt-[-400px] z-10">
      {/* Gradient overlay for smooth transition from hero bottom */}
      <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-transparent to-[#060010] pointer-events-none z-[1]" />
      <div className="relative z-[2] w-[1220px] mx-auto pt-[240px] pb-[80px]">
        <div className="flex gap-[20px] h-[582px]">
          {pillarCards.map((card, index) => {
            const isExpanded = activeIndex === index;
            return (
              <motion.div
                key={card.id}
                layout
                onClick={() => setActiveIndex(index)}
                className={`relative h-[582px] bg-[#1E293B] rounded-[16px] overflow-hidden backdrop-blur-[30px] cursor-pointer ${
                  isExpanded ? 'border border-black' : ''
                }`}
                style={{ width: isExpanded ? 712 : 234 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* ===== EXPANDED STATE ===== */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="absolute inset-0"
                  >
                    {/* Decorative orb */}
                    <Image
                      src="/images/technology/46.png"
                      alt=""
                      width={513}
                      height={513}
                      className="absolute left-[-218px] bottom-[-248px] rotate-180 pointer-events-none"
                    />

                    {/* Top half */}
                    <div className="absolute left-0 top-0 w-[712px] h-[337px] border-b border-[#060010]">
                      {/* Title + subtitle */}
                      <div className="absolute left-[32px] top-[32px] w-[648px]">
                        <h3 className="text-[36px] font-bold font-['Urbanist'] leading-[1.2]" style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                          {card.title}
                        </h3>
                        <p className="mt-[24px] text-[16px] font-normal text-white font-['Urbanist']">
                          {card.subtitle}
                        </p>
                      </div>

                      {/* Stats row */}
                      <div className="absolute left-[32px] top-[160px] w-[648px] h-[90px] flex">
                        {card.stats.map((stat) => (
                          <div key={stat.label} className="flex-1 flex flex-col items-center justify-center">
                            <span
                              className="text-[48px] font-bold font-['Urbanist'] leading-[48px]"
                              style={{ background: 'linear-gradient(180deg, #00F686 0%, #F8FFFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                            >
                              {stat.value}
                            </span>
                            <span className="mt-[4px] text-[16px] font-light text-white/80 font-['Urbanist'] text-center">{stat.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* Flow tags */}
                      <div className="absolute left-[32px] top-[282px] w-[648px] flex gap-[31px]">
                        {card.flows.map((flow) => (
                          <div key={flow.text} className="flex items-center gap-[6px] h-[22px] rounded-[6px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/images/technology/${flow.icon}`} alt="" width={6} height={6} className="mt-[1px]" />
                            <span className="text-[12px] font-medium text-white font-['Inter'] text-center">{flow.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom half — Feature grid */}
                    <div className="absolute left-[32px] top-[369px] w-[648px] h-[168px]">
                      <div className="grid grid-cols-2 gap-x-[16px] gap-y-[16px]">
                        {card.features.map((feat) => (
                          <div key={feat.text} className="flex flex-col items-center gap-[12px] h-[76px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={`/images/technology/${feat.icon}`} alt="" width={40} height={40} />
                            <span className="text-[16px] font-normal text-white font-['Urbanist'] text-center">{feat.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ===== COLLAPSED STATE ===== */}
                {!isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute left-[32px] top-[50px] w-[170px]">
                      <h3 className="text-[28px] font-bold font-['Urbanist'] leading-[34px]" style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {card.title}
                      </h3>
                      <p className="mt-[20px] text-[16px] font-normal text-white font-['Urbanist'] leading-[24px]">
                        {card.subtitle}
                      </p>
                    </div>
                    {/* Decorative icon */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/images/technology/${card.collapsedIcon}`} alt="" className={`absolute ${card.collapsedIconPos}`} />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ============================================================
// 3. AI TELLS YOU WHY — Explainable AI Deep Dive
// ============================================================
function ExplainableAISection() {
  const t = useTechT();
  return (
    <AnimatedSection className="relative w-[1440px] h-[800px] bg-[#060010] overflow-hidden">
      {/* Section header */}
      <div className="absolute left-[110px] top-[75px] w-[1220px]">
        <h2 className="text-center opacity-[0.97]">
          <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('aiWhyTitle1')}</span>
          <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('aiWhyTitle2')}</span>
        </h2>
        <p className="mt-[20px] text-center text-[24px] font-light text-white/80 font-['Urbanist'] opacity-80">
          {t('aiWhySubtitle')}
        </p>
      </div>

      {/* Content area: left 4-card grid + right comparison card */}
      <div className="absolute left-[110px] top-[273px] w-[1220px] h-[496px] flex gap-[20px]">
        {/* Left 4-card grid (2x2) */}
        <div className="relative w-[716px] h-[496px]">
          {/* Card 1: Inference Path Visualization */}
          <div className="absolute left-0 top-0 w-[348px] h-[238px]">
            <ExplainableCard
              icon="9.svg"
              title={t('aiWhyCard1Title')}
              desc={t('aiWhyCard1Desc')}
              example={t('aiWhyCard1Example')}
              exampleLabel={t('exampleOutput')}
            />
          </div>

          {/* Card 2: Feature Contribution Analysis */}
          <div className="absolute left-[368px] top-0 w-[348px] h-[238px]">
            <ExplainableCard
              icon="7.svg"
              title={t('aiWhyCard2Title')}
              desc={t('aiWhyCard2Desc')}
              example={t('aiWhyCard2Example')}
              exampleLabel={t('exampleOutput')}
            />
          </div>

          {/* Card 3: Natural Language Explanation */}
          <div className="absolute left-0 top-[258px] w-[348px] h-[238px]">
            <ExplainableCard
              icon="5.svg"
              title={t('aiWhyCard3Title')}
              desc={t('aiWhyCard3Desc')}
              example={t('aiWhyCard3Example')}
              exampleLabel={t('exampleOutput')}
            />
          </div>

          {/* Card 4: Confidence Transparency */}
          <div className="absolute left-[368px] top-[258px] w-[348px] h-[238px]">
            <ExplainableCard
              icon="3.svg"
              title={t('aiWhyCard4Title')}
              desc={t('aiWhyCard4Desc')}
              example={t('aiWhyCard4Example')}
              exampleLabel={t('exampleOutput')}
            />
          </div>
        </div>

        {/* Right: Traditional AI vs Orbiva comparison */}
        <div className="relative w-[484px] h-[496px]">
          {/* Card container with border */}
          <motion.div whileHover={{ borderColor: 'rgba(255,255,255,0.5)' }} transition={{ duration: 0.3 }} className="absolute left-0 top-0 w-[484px] h-[496px] rounded-[32px] border border-white/30 overflow-hidden transition-all">
            {/* Decorative orb top-right */}
            <Image
              src="/images/technology/41.png"
              alt=""
              width={513}
              height={513}
              className="absolute left-[184px] top-[-355px] pointer-events-none"
            />
          </motion.div>

          {/* Title */}
          <div className="absolute left-[74.75px] top-[33.68px] w-[321px]">
            <p className="text-center text-[30px] font-semibold text-white/80 font-['Urbanist'] leading-[36px]">
              {t('vsTitle')}
            </p>
          </div>

          {/* Input label */}
          <div className="absolute left-[129.11px] top-[135.74px] w-[223px] text-center">
            <span className="text-[20px] font-semibold font-['Urbanist']" style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('vsInput')}
            </span>
          </div>

          {/* VS divider - centered on the boundary between two panels */}
          <div className="absolute left-[197px] top-[189px] w-[49px] h-[49px] z-10 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/technology/1.svg" alt="" className="absolute inset-0 w-full h-full" />
            <span className="relative z-10 text-[20px] font-semibold font-['Urbanist']">
              <span className="text-white">V</span>
              <span style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>S</span>
            </span>
          </div>

          {/* Left panel: Traditional Black-box AI */}
          <div className="absolute left-[19.21px] top-[188.81px] w-[202.73px] h-[289.84px] bg-[#1E293B] rounded-tl-[20px] rounded-bl-[20px]">
            <div className="absolute left-0 top-0 w-[211.27px] h-[48.99px] bg-[#2F4261] rounded-tl-[20px]" />
            <p className="absolute left-[9.6px] top-[17.35px] w-[169.66px] text-[14px] font-semibold text-white font-['Urbanist']">
              {t('vsLeftTitle')}
            </p>
            <div className="absolute left-[17.28px] top-[67.35px] w-[174.78px]">
              <p className="text-[14px] font-normal text-white font-['Urbanist'] leading-[20px] whitespace-pre-line">
                {t('vsLeftContent')}
              </p>
            </div>
          </div>

          {/* Right panel: Orbiva Explainable AI */}
          <div className="absolute left-[221.83px] top-[188.81px] w-[242.96px] h-[289.84px] bg-[#162031] rounded-tr-[20px] rounded-br-[20px]">
            <div className="absolute left-0 top-0 w-[241.04px] h-[48.99px] bg-[#37FFA4] rounded-tr-[20px]" />
            <p className="absolute left-[36.49px] top-[15.31px] w-[196.72px] text-center text-[18px] font-semibold font-['Urbanist']" style={{ background: 'black', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {t('vsRightTitle')}
            </p>
            <div className="absolute left-[26.89px] top-[67.36px] w-[206.47px]">
              <p className="text-[14px] font-semibold font-['Urbanist'] leading-[20px] whitespace-pre-line" style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {t('vsRightContent')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ExplainableCard({ icon, title, desc, example, exampleLabel }: { icon: string; title: string; desc: string; example: string; exampleLabel?: string }) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.3 }} className="relative w-full h-full cursor-pointer">
      {/* Card background SVG */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/technology/8.svg" alt="" className="absolute left-0 top-0 w-full h-full" />

      {/* Header area */}
      <div className="absolute left-[16.47px] top-[10px] w-[312.99px]">
        <div className="flex items-start justify-between">
          <h4 className="text-[20px] font-bold text-white font-['Urbanist'] w-[233.72px] whitespace-pre-line">{title}</h4>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`/images/technology/${icon}`} alt="" width={40} height={40} className="flex-shrink-0 -mt-[6px]" />
        </div>
        <p className="mt-[14px] text-[14px] font-normal text-white/70 font-['Urbanist'] leading-[19.5px]">{desc}</p>
      </div>

      {/* Example output box */}
      <div className="absolute left-[16.47px] top-[117px] w-[315.05px] h-[105px] bg-white/10 rounded-[16px]">
        <div className="absolute left-[16px] top-[10px] w-[283px]">
          <p className="text-[14px] font-bold text-white font-['Urbanist']">{exampleLabel || 'Example Output'}</p>
          <p className="mt-[10px] text-[14px] font-normal text-white/70 font-['Urbanist'] leading-[18px]">{example}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// 4. YOUR DATA, YOUR CONTROL — Privacy Section
// ============================================================
function PrivacySection() {
  const t = useTechT();
  return (
    <AnimatedSection className="relative w-[1440px] h-[800px] bg-[#060010] overflow-hidden">
      {/* Section header */}
      <div className="absolute left-[110px] top-[75px] w-[1220px]">
        <h2 className="text-center opacity-[0.97]">
          <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('privacyTitle1')}</span>
          <span className="text-[60px] font-bold font-['Urbanist']" style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('privacyTitle2')}</span>
        </h2>
        <p className="mt-[20px] text-center text-[24px] font-light text-white/80 font-['Urbanist'] opacity-80">
          {t('privacySubtitle')}
        </p>
      </div>

      {/* 4 Feature cards row */}
      <div className="absolute left-[110px] top-[244px] w-[1220px] flex gap-[20px]">
        {[
          { icon: '10.svg', title: t('privacyCard1Title'), desc: t('privacyCard1Desc') },
          { icon: '11.svg', title: t('privacyCard2Title'), desc: t('privacyCard2Desc') },
          { icon: '12.svg', title: t('privacyCard3Title'), desc: t('privacyCard3Desc') },
          { icon: '13.svg', title: t('privacyCard4Title'), desc: t('privacyCard4Desc') },
        ].map((card) => (
          <motion.div key={card.title} whileHover={{ y: -4, borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="relative w-[290px] h-[180px] bg-[#1E293B] rounded-[16px] border border-[#334155] cursor-pointer transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/technology/${card.icon}`} alt="" className="absolute left-[17px] top-[20px]" />
            <p className="absolute left-[17px] top-[78px] w-[257px] text-[20px] font-bold text-white font-['Urbanist']">{card.title}</p>
            <p className="absolute left-[17px] top-[112px] w-[248px] text-[14px] font-normal text-white/70 font-['Urbanist'] leading-[20px]">{card.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Compliance Certifications card */}
      <motion.div whileHover={{ borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute left-[110px] top-[462px] w-[1220px] h-[300px] bg-[#1E293B] rounded-[16px] border border-[#334155] transition-all">
        <h3 className="absolute left-0 top-[34px] w-full text-center text-[30px] font-semibold text-white font-['Urbanist']">
          {t('complianceTitle')}
        </h3>

        <div className="absolute left-[24px] top-[90px] w-[1172px] flex">
          {[
            { img: '52.png', name: t('cert1Name'), desc: t('cert1Desc') },
            { img: '50.png', name: t('cert2Name'), desc: t('cert2Desc'), imgStyle: 'w-[200px] h-[100px] -ml-[46px]' },
            { img: '42.png', name: t('cert3Name'), desc: t('cert3Desc'), imgStyle: 'w-[202px] h-[102px] -ml-[47px] -mt-[2px]' },
            { img: '51.png', name: t('cert4Name'), desc: t('cert4Desc') },
          ].map((cert) => (
            <motion.div key={cert.name} whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="flex-1 flex flex-col items-center cursor-pointer">
              <div className="w-[100px] h-[100px] rounded-full overflow-hidden bg-[#1E69B3] flex items-center justify-center">
                {cert.imgStyle ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/images/technology/${cert.img}`} alt={cert.name} className={cert.imgStyle} />
                ) : (
                  <Image src={`/images/technology/${cert.img}`} alt={cert.name} width={100} height={100} className="w-[100px] h-[100px] object-cover" />
                )}
              </div>
              <p className="mt-[20px] text-center text-[20px] font-bold text-white font-['Urbanist']">{cert.name}</p>
              <p className="text-center text-[14px] font-medium text-white font-['Urbanist']">{cert.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

// ============================================================
// 5. CORE RESEARCH TEAM — NTU Collaboration
// ============================================================
function ResearchTeamSection() {
  const t = useTechT();
  return (
    <AnimatedSection className="relative w-[1440px] bg-[#060010] overflow-hidden">
      <div className="w-[1220px] mx-auto pt-[75px] pb-[75px]">
        {/* Section header */}
        <div className="w-[1220px]">
          <h2 className="text-center opacity-[0.97]">
            <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('researchTitle')}</span>
          </h2>
          <p className="mt-[20px] text-center text-[24px] font-light text-white/80 font-['Urbanist'] opacity-80 max-w-[858px] mx-auto">
            {t('researchSubtitle')}
          </p>
        </div>

        {/* Stats row */}
        <div className="flex justify-center gap-[20px] mt-[20px]">
          {[
            { value: t('researchStat1Value'), label: t('researchStat1Label') },
            { value: t('researchStat2Value'), label: t('researchStat2Label') },
            { value: t('researchStat3Value'), label: t('researchStat3Label') },
          ].map((stat) => (
            <motion.div key={stat.label} whileHover={{ scale: 1.05, borderColor: 'rgba(0,246,134,0.4)' }} className="h-[39px] bg-white/[0.02] rounded-[12px] border border-white/30 flex items-center px-[14px] gap-[8px] whitespace-nowrap cursor-pointer transition-all">
              <span
                className="text-[26px] font-extrabold font-['Urbanist'] leading-[26px]"
                style={{ background: 'linear-gradient(180deg, #00F686 0%, #F8FFFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
              >
                {stat.value}
              </span>
              <span className="text-[14px] font-light text-white font-['Urbanist']">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Researcher cards */}
        <div className="flex gap-[32px] mt-[55px]">
          {[
            { img: '47.png', name: t('researcher1Name'), role: t('researcher1Role'), tag: t('researcher1Tag') },
            { img: '48.png', name: t('researcher2Name'), role: t('researcher2Role'), tag: t('researcher2Tag') },
            { img: '49.png', name: t('researcher3Name'), role: t('researcher3Role'), tag: t('researcher3Tag') },
          ].map((person) => (
            <motion.div key={person.name} whileHover={{ y: -6 }} transition={{ duration: 0.3 }} className="relative w-[385px] h-[480px] rounded-[12px] overflow-hidden cursor-pointer group">
              <Image
                src={`/images/technology/${person.img}`}
                alt={person.name}
                width={385}
                height={480}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Bottom gradient */}
              <div className="absolute left-0 top-[232px] w-[385px] h-[248px]" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.40) 100%)' }}>
                {/* Info card */}
                <div className="absolute left-[16px] top-[96px] w-[353px] h-[136px] bg-white/30 rounded-[16px] border border-white/30 backdrop-blur-[12px]">
                  <p className="absolute left-[20px] top-[20px] text-[24px] font-bold text-white font-['Urbanist']">{person.name}</p>
                  <p className="absolute left-[20px] top-[60px] text-[16px] font-bold text-white font-['Urbanist']">{person.role}</p>
                  <div className="absolute left-[20px] top-[92px] h-[24px] bg-[#00F686] rounded-full px-[8px] flex items-center">
                    <span className="text-[12px] font-medium text-black font-['Urbanist'] text-center">{person.tag}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Representative Papers */}
        <div className="mt-[55px]">
          <h3 className="text-[20px] font-bold text-white font-['Urbanist'] mb-[20px]">{t('papersTitle')}</h3>

          <div className="grid grid-cols-2 gap-[20px]">
            {[
              { title: t('paper1Title'), venue: t('paper1Venue'), impact: 'IF: 10.6' },
              { title: t('paper2Title'), venue: t('paper2Venue'), impact: 'IF: 10.6' },
              { title: t('paper3Title'), venue: t('paper3Venue'), impact: 'IF: 10.6' },
              { title: t('paper4Title'), venue: t('paper4Venue'), impact: 'IF: 10.6' },
            ].map((paper, index) => (
              <motion.div key={index} whileHover={{ y: -4, borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="w-[600px] h-[104px] bg-[#1E293B] rounded-[16px] border border-[#334155] px-[24px] py-[24px] flex justify-between items-start cursor-pointer transition-all">
                <div>
                  <p className="text-[16px] font-bold text-white font-['Urbanist'] mb-[8px]">{paper.title}</p>
                  <p className="text-[16px] font-normal font-['Urbanist']" style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    {paper.venue}
                  </p>
                </div>
                <div className="flex-shrink-0 ml-[20px] mt-[32px] rounded-[6px] shadow-sm px-[8px] py-[2px]">
                  <span className="text-[12px] font-medium text-white/70 font-['Urbanist']">{paper.impact}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
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
        src="/images/technology/43.png"
        alt="Footer background"
        width={1513}
        height={651}
        className="absolute left-[-33px] top-[-169px] w-[1505px] h-[643px] object-cover"
      />
      {/* Logo overlay */}
      <div className="absolute left-[142px] top-[210px] w-[148px] h-[66px] bg-[#111111] flex items-center justify-center">
        <div className="w-[121.92px] h-[40px] relative">
          {/* Logo SVGs */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/technology/34.svg" alt="" className="absolute left-[65.32px] top-0" />
          <div className="absolute left-0 top-[8.35px] w-[121.92px] h-[31.65px]">
            {['38.svg', '37.svg', '36.svg', '40.svg', '39.svg', '35.svg'].map((svg) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={svg} src={`/images/technology/${svg}`} alt="" className="absolute" style={{ left: svg === '38.svg' ? 0 : svg === '37.svg' ? '26.05px' : svg === '36.svg' ? '44.16px' : svg === '40.svg' ? '70.21px' : svg === '39.svg' ? '78.13px' : '99.98px', top: svg === '36.svg' ? 0 : '8.3px' }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function TechnologyPage() {
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

  return (
    <main className="relative bg-black min-h-screen -mt-20">
      <div
        className="mx-auto bg-[#060010]"
        style={{
          width: 1440,
          transform: pageZoom < 1 ? `scale(${pageZoom})` : 'none',
          transformOrigin: 'top center',
        }}
      >
        <HeroSection />
        <ThreePillarsSection />
        <ExplainableAISection />
        <PrivacySection />
        <ResearchTeamSection />
      </div>
    </main>
  );
}
