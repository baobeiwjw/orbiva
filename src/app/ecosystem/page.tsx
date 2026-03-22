'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { ecosystemPageTranslations, type EcosystemPageLocale } from '@/lib/i18n/ecosystemPageTranslations';

function useEcoT() {
  const { locale } = useI18n();
  const loc = (locale as EcosystemPageLocale) || 'en';
  const dict = ecosystemPageTranslations[loc] || ecosystemPageTranslations.en;
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
function HeroSection({ visibleWidth = 1440 }: { visibleWidth?: number }) {
  const t = useEcoT();
  // 背景图原始 1920px，左偏移 -40px，所以图片右边缘在 1880px 处
  // 当屏幕 > 1440 时，向右扩展显示更多 3D 硬币内容
  const extraRight = visibleWidth - 1440;
  return (
    <section
      className="relative bg-[#060010] overflow-hidden"
      style={{
        width: visibleWidth,
        height: 808,
        marginRight: -extraRight,
      }}
    >
      {/* Background image */}
      <Image
        src="/images/ecosystem/81.png"
        alt=""
        width={1920}
        height={800}
        className="absolute left-[-40px] top-0 w-[1920px] h-[800px] object-cover"
        priority
      />

      {/* Right edge black gradient mask — smooth transition to black background */}
      {extraRight > 0 && (
        <div
          className="absolute top-0 right-0 h-full pointer-events-none z-[5]"
          style={{
            width: Math.max(120, extraRight),
            background: 'linear-gradient(to right, transparent 0%, #060010 85%)',
          }}
        />
      )}

      {/* Center content */}
      <div className="absolute left-[200px] top-[200px] w-[540px] h-[460px]">
        {/* Title area */}
        <div className="absolute left-0 top-0 w-[540px] h-[260px]">
          {/* Tag pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute left-0 top-0 w-[206px] h-[47px] rounded-full bg-white/10 border border-white/10 flex items-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ecosystem/1.svg" alt="" className="absolute left-[16px] top-[11.5px]" />
            <span className="absolute left-[50px] top-[10px] text-[18px] font-normal text-white font-['Urbanist']">
              {t('heroTag')}
            </span>
          </motion.div>

          {/* Main title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute left-0 top-[67px] w-[540px]"
          >
            <div className="text-[68px] font-extrabold text-white font-['Urbanist'] leading-[1.15]">{t('heroTitle1')}</div>
            <div className="text-[68px] font-extrabold font-['Urbanist'] leading-[1.15]" style={{ background: '#00EF82', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('heroTitle2')}</div>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="absolute left-0 top-[290px] w-[500px]"
        >
          <span className="text-[24px] font-light text-white font-['Urbanist']">
            {t('heroSubtitle')}
          </span>
        </motion.div>

        {/* Three pills: Health Token, Data NFT, Health DAO */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute left-0 top-[430px] w-[540px] h-[52px] flex gap-[20px]"
        >
          {/* Health Token */}
          <motion.div whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.18)' }} className="w-[165px] h-[52px] bg-white/[0.12] rounded-full relative cursor-pointer transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ecosystem/88.svg" alt="" className="absolute left-[14px] top-[10px]" />
            <span className="absolute left-[56px] top-[11px] w-[94px] text-[16px] font-light text-white font-['Urbanist']">{t('heroPill1')}</span>
          </motion.div>
          {/* Data NFT */}
          <motion.div whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.18)' }} className="w-[161px] h-[52px] bg-white/[0.12] rounded-full relative cursor-pointer transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ecosystem/100.svg" alt="" className="absolute left-[14px] top-[10px]" />
            <span className="absolute left-[56px] top-[11px] w-[69px] text-center text-[16px] font-light text-white font-['Urbanist']">{t('heroPill2')}</span>
          </motion.div>
          {/* Health DAO */}
          <motion.div whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.18)' }} className="w-[160px] h-[52px] bg-white/[0.12] rounded-full relative cursor-pointer transition-all">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ecosystem/86.svg" alt="" className="absolute left-[14px] top-[10px]" />
            <span className="absolute left-[56px] top-[11px] w-[84px] text-[16px] font-light text-white font-['Urbanist']">{t('heroPill3')}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================
// 2. HEALTH BEHAVIOR TOKENIZATION — Three cards
// ============================================================

function TokenizationSection() {
  const t = useEcoT();

  const tokenCards = [
    {
      id: 'hlt',
      title: t('tokenCard1Title'),
      subtitle: t('tokenCard1Subtitle'),
      statValue: t('tokenCard1StatValue'),
      statLabel: t('tokenCard1StatLabel'),
      coinImg: '95.png',
      tagSvg: '6.svg',
      features: [
        { icon: 'check-circle.svg', text: t('tokenCard1Feat1') },
        { icon: 'check-circle.svg', text: t('tokenCard1Feat2') },
        { icon: 'check-circle.svg', text: t('tokenCard1Feat3') },
        { icon: 'check-circle.svg', text: t('tokenCard1Feat4') },
      ],
    },
    {
      id: 'nft',
      title: t('tokenCard2Title'),
      subtitle: t('tokenCard2Subtitle'),
      statValue: t('tokenCard2StatValue'),
      statLabel: t('tokenCard2StatLabel'),
      coinImg: '101.png',
      tagSvg: '11.svg',
      features: [
        { icon: 'check-circle.svg', text: t('tokenCard2Feat1') },
        { icon: 'check-circle.svg', text: t('tokenCard2Feat2') },
        { icon: 'check-circle.svg', text: t('tokenCard2Feat3') },
        { icon: 'check-circle.svg', text: t('tokenCard2Feat4') },
      ],
    },
    {
      id: 'dao',
      title: t('tokenCard3Title'),
      subtitle: t('tokenCard3Subtitle'),
      statValue: t('tokenCard3StatValue'),
      statLabel: t('tokenCard3StatLabel'),
      coinImg: '87.png',
      tagSvg: '16.svg',
      features: [
        { icon: 'check-circle.svg', text: t('tokenCard3Feat1') },
        { icon: 'check-circle.svg', text: t('tokenCard3Feat2') },
        { icon: 'check-circle.svg', text: t('tokenCard3Feat3') },
        { icon: 'check-circle.svg', text: t('tokenCard3Feat4') },
      ],
    },
  ];

  return (
    <AnimatedSection className="relative w-[1440px] h-[780px] bg-[#060010]">
      <div className="absolute left-[110px] top-0 w-[1220px] h-[780px]">
        {/* Section header */}
        <div className="absolute left-[271px] top-[75px] w-[678px] h-[150px] opacity-[0.97]">
          <div className="absolute left-[-271px] top-0 w-[1220px] text-center">
            <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('tokenTitle1')}</span>
            <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('tokenTitle2')}</span>
          </div>
          <div className="absolute left-[-90px] top-[92px] w-[858px] text-center opacity-80">
            <span className="text-[24px] font-light text-white/80 font-['Urbanist']">
              {t('tokenSubtitle')}
            </span>
          </div>
        </div>

        {/* Three cards */}
        <div className="absolute left-0 top-[285px] w-[1220px] h-[435px]">
          {tokenCards.map((card, index) => (
            <div
              key={card.id}
              className="absolute top-[7.01px] w-[390px] h-[420.98px]"
              style={{ left: index * 416 - 1 + (index === 0 ? 0 : index === 1 ? 1 : 1) }}
            >
              {/* Tag SVG at top */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/ecosystem/${card.tagSvg}`} alt="" className="absolute left-[7px] top-0 z-10" />

              {/* Card background */}
              <motion.div whileHover={{ y: -6, borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute left-0 top-[0.98px] w-[390px] h-[420px] bg-[rgba(51,65,85,0.30)] rounded-[16px] border border-[#334155] cursor-pointer transition-all">
                {/* Title block */}
                <div className="absolute left-[25.7px] top-[49.65px] w-[339px] h-[142px]">
                  {/* Title + subtitle */}
                  <div className="absolute left-0 top-0 w-[203px] h-[54px]">
                    <div className="absolute left-0 top-0">
                      <span className="text-[20px] font-bold text-white font-['Urbanist']">{card.title}</span>
                    </div>
                    <div className="absolute left-0 top-[34px]">
                      <span className="text-[14px] font-normal text-white/70 font-['Urbanist']">{card.subtitle}</span>
                    </div>
                  </div>

                  {/* Stat value */}
                  <div className="absolute left-0 top-[84px] w-[107px] h-[58px]">
                    <div className="absolute left-[0.28px] top-0">
                      <span className="text-[36px] font-bold font-['Urbanist']" style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{card.statValue}</span>
                    </div>
                    <div className="absolute left-0 top-[37.48px]">
                      <span className="text-[14px] font-normal text-white/70 font-['Urbanist']">{card.statLabel}</span>
                    </div>
                  </div>

                  {/* Coin image with glow */}
                  <div className="absolute right-0 top-[51px] w-[77px] h-[91px]">
                    <div className="absolute left-0 top-[56px] w-[77px] h-[34px] opacity-50 mix-blend-color-dodge rounded-full" style={{ background: 'conic-gradient(from 76deg at 50% 50%, #00F686 28deg, #0044F2 224deg, #B0FDFF 321deg)', filter: 'blur(15.35px)' }} />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/images/ecosystem/${card.coinImg}`} alt="" className="absolute left-[2.45px] top-0 w-[75.05px] h-[85.94px]" />
                  </div>
                </div>

                {/* Features list */}
                <div className="absolute left-[20px] top-[221.38px] w-[350px] h-[177.62px]">
                  {/* Divider */}
                  <div className="absolute left-0 top-0 w-[350px] h-0 border-t border-white/20" />
                  <div className="absolute left-0 top-[20px] w-[350px] h-[157.62px]">
                    {card.features.map((feat, i) => (
                      <div key={i} className="absolute left-0 w-[347px] h-[24px] flex items-center" style={{ top: i * 44.31 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={`/images/ecosystem/${feat.icon}`} alt="" className="absolute left-0 top-[2px]" />
                        <span className="absolute left-[30px] text-[14px] font-bold text-white font-['Urbanist']">{feat.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ============================================================
// 3. HLT TOKENOMICS
// ============================================================
function TokenomicsSection() {
  const t = useEcoT();
  return (
    <AnimatedSection className="relative w-[1440px] h-[509px] bg-[#060010]">
      <div className="absolute left-[110px] top-0 w-[1220px] h-[509px]">
        {/* Title */}
        <div className="absolute left-[493.5px] top-0 text-center">
          <span className="text-[32px] font-bold text-white font-['Urbanist']">{t('tokenomicsTitle')}</span>
        </div>

        {/* Content area */}
        <div className="absolute left-0 top-[97px] w-[1220px] h-[382px]">
          {/* Left: Distribution labels */}
          <div className="absolute left-0 top-0 w-[220px] h-[382px] flex flex-col justify-between">
            {[
              { label: t('tokenomicsPool1'), value: t('tokenomicsPool1Value'), icon: '17.svg' },
              { label: t('tokenomicsPool2'), value: t('tokenomicsPool2Value'), icon: '18.svg' },
              { label: t('tokenomicsPool3'), value: t('tokenomicsPool3Value'), icon: '19.svg' },
              { label: t('tokenomicsPool4'), value: t('tokenomicsPool4Value'), icon: '20.svg' },
              { label: t('tokenomicsPool5'), value: t('tokenomicsPool5Value'), icon: '21.svg' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-[6px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/ecosystem/${item.icon}`} alt="" className="mt-[3px] flex-shrink-0" />
                <div>
                  <div className="text-[14px] font-bold text-white/50 font-['Urbanist'] leading-[1.3]">{item.label}</div>
                  <div className="text-[24px] font-bold text-white font-['Urbanist'] leading-[1.2] mt-[2px]">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Chart + stat cards */}
          <div className="absolute left-[235px] top-0 w-[985px] h-[380px]">
            {/* Donut chart */}
            <Image
              src="/images/ecosystem/82.png"
              alt="Tokenomics chart"
              width={372}
              height={372}
              className="absolute left-0 top-0 w-[372px] h-[372px]"
            />

            {/* 4 stat cards */}
            <div className="absolute left-[385px] top-0 w-[600px] h-[380px]">
              {[
                { title: t('tokenomicsStat1Title'), value: t('tokenomicsStat1Value'), sub: t('tokenomicsStat1Sub'), top: 0, left: 0 },
                { title: t('tokenomicsStat2Title'), value: t('tokenomicsStat2Value'), sub: t('tokenomicsStat2Sub'), top: 0, left: 310 },
                { title: t('tokenomicsStat3Title'), value: t('tokenomicsStat3Value'), sub: t('tokenomicsStat3Sub'), top: 200, left: 0 },
                { title: t('tokenomicsStat4Title'), value: t('tokenomicsStat4Value'), sub: t('tokenomicsStat4Sub'), top: 200, left: 310 },
              ].map((card) => (
                <motion.div key={card.title} whileHover={{ y: -4, borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute w-[290px] h-[180px] bg-[#1E293B] rounded-[16px] border border-[#334155] cursor-pointer transition-all" style={{ top: card.top, left: card.left }}>
                  <div className="absolute left-[21px] top-[28px]">
                    <span className="text-[20px] font-bold text-white font-['Urbanist']">{card.title}</span>
                  </div>
                  <div className="absolute left-[21px] top-[82px] w-[170px] h-[70px]">
                    <div className="absolute left-0 top-0">
                      <span className="text-[36px] font-bold font-['Urbanist']" style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{card.value}</span>
                    </div>
                    <div className="absolute left-0 top-[50px]">
                      <span className="text-[14px] font-normal text-white/50 font-['Urbanist']">{card.sub}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// ============================================================
// 4. DAILY HEALTH MINING TASKS
// ============================================================
const taskImages = ['96.png', '102.png', '85.png', '97.png', '99.png', '98.png'];
const taskIcons = ['92.svg', '93.svg', '94.svg', '89.svg', '90.svg', '91.svg'];

function HealthMiningSection() {
  const t = useEcoT();
  return (
    <AnimatedSection className="relative w-[1440px] h-[500px] bg-[#060010] overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/ecosystem/103.png"
        alt=""
        width={1440}
        height={500}
        className="absolute left-0 top-0 w-[1440px] h-[500px] object-cover"
      />

      {/* Title removed — already baked into background image 103.png */}

      {/* Row 1: 3 cards */}
      <div className="absolute left-[110px] top-[125px] w-[1220px] h-[150px]">
        {[0, 1, 2].map((i) => (
          <TaskCard key={`row1-${i}`} left={i === 0 ? 4 : i === 1 ? 418 : 832} imgSrc={taskImages[i]} iconSrc={taskIcons[i]} taskTitle={t('miningTaskTitle')} taskDesc={t('miningTaskDesc')} taskProgress={t('miningTaskProgress')} />
        ))}
      </div>

      {/* Row 2: 3 cards */}
      <div className="absolute left-[110px] top-[295px] w-[1220px] h-[150px]">
        {[3, 4, 5].map((i) => (
          <TaskCard key={`row2-${i}`} left={i === 3 ? 4 : i === 4 ? 418 : 832} imgSrc={taskImages[i]} iconSrc={taskIcons[i]} taskTitle={t('miningTaskTitle')} taskDesc={t('miningTaskDesc')} taskProgress={t('miningTaskProgress')} />
        ))}
      </div>
    </AnimatedSection>
  );
}

function TaskCard({ left, imgSrc, iconSrc, taskTitle, taskDesc, taskProgress }: { left: number; imgSrc: string; iconSrc: string; taskTitle: string; taskDesc: string; taskProgress: string }) {
  return (
    <motion.div whileHover={{ y: -4, boxShadow: '0 4px 20px rgba(0,246,134,0.1)' }} transition={{ duration: 0.3 }} className="absolute w-[384px] h-[150px] bg-[#1E293B] rounded-[16px] cursor-pointer transition-all" style={{ left }}>
      {/* Avatar */}
      <div className="absolute left-[20px] top-[25px] w-[100px] h-[100px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/images/ecosystem/${imgSrc}`} alt="" className="w-[100px] h-[100px] rounded-full object-cover" />
      </div>

      {/* Content */}
      <div className="absolute left-[130px] top-[26.91px] w-[234px] h-[96.19px]">
        {/* Title + points */}
        <div className="absolute left-0 top-0 w-[234px] h-[53px]">
          <div className="absolute left-0 top-0 w-[219.42px] h-[24px]">
            <div className="absolute left-0 top-0">
              <span className="text-[20px] font-bold text-white font-['Urbanist']">{taskTitle}</span>
            </div>
            <div className="absolute left-[160px] top-[2px] w-[59.42px] h-[20px] flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/ecosystem/${iconSrc}`} alt="" className="absolute left-0 top-[1px]" />
              <span className="absolute left-[24.42px] text-[20px] font-bold font-['Urbanist']" style={{ background: 'linear-gradient(180deg, #00F686 0%, #F8FFFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>+50</span>
            </div>
          </div>
          <div className="absolute left-0 top-[29px] w-[234px]">
            <span className="text-[14px] font-normal text-white/70 font-['Urbanist']">{taskDesc}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="absolute left-0 top-[68px] w-[224px] h-[28.19px]">
          <div className="absolute left-0 top-0">
            <span className="text-[12px] font-normal font-['Urbanist']" style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{taskProgress}</span>
          </div>
          <div className="absolute left-0 top-[22.19px] w-[224px] h-[6px]">
            <div className="absolute left-0 top-0 w-[224px] h-[6px] bg-[rgba(51,65,85,0.50)] rounded-full" />
            <div className="absolute left-0 top-0 w-[130px] h-[6px] rounded-full" style={{ background: 'linear-gradient(236deg, #00C7CC 0%, #00F686 44%, #00C7CC 100%)' }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// 5. YOUR DATA, YOUR ASSET — Data Sovereignty
// ============================================================
function DataSovereigntySection() {
  const t = useEcoT();
  return (
    <AnimatedSection className="relative w-[1440px] h-[800px] bg-[#060010] overflow-hidden">
      {/* Decorative SVG bg */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/ecosystem/22.svg" alt="" className="absolute left-[411px] top-[-315px]" />

      {/* Section header */}
      <div className="absolute left-[110px] top-[75px] w-[1220px] h-[390px]">
        <div className="absolute left-[271px] top-0 w-[678px] h-[150px] opacity-[0.97]">
          <div className="absolute left-[-271px] top-0 w-[1220px] text-center">
            <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('dataTitle')}</span>
          </div>
          <div className="absolute left-[-90px] top-[92px] w-[858px] text-center opacity-80">
            <span className="text-[24px] font-light text-white/80 font-['Urbanist']">
              {t('dataSubtitle')}
            </span>
          </div>
        </div>

        {/* 4 Feature cards */}
        <div className="absolute left-0 top-[210px] w-[1220px] h-[180px] flex">
          {[
            { icon: '28.svg', title: t('dataCard1Title'), desc: t('dataCard1Desc'), left: 0 },
            { icon: '29.svg', title: t('dataCard2Title'), desc: t('dataCard2Desc'), left: 310 },
            { icon: '30.svg', title: t('dataCard3Title'), desc: t('dataCard3Desc'), left: 620 },
            { icon: '31.svg', title: t('dataCard4Title'), desc: t('dataCard4Desc'), left: 930 },
          ].map((card) => (
            <motion.div key={card.title} whileHover={{ y: -4, borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute w-[290px] h-[180px] bg-[#1E293B] rounded-[16px] border border-[#334155] cursor-pointer transition-all" style={{ left: card.left }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/images/ecosystem/${card.icon}`} alt="" className="absolute left-[17px] top-[20px]" />
              <div className="absolute left-[17px] top-[78px] w-[257px]">
                <span className="text-[20px] font-bold text-white font-['Urbanist']">{card.title}</span>
              </div>
              <div className="absolute left-[17px] top-[112px] w-[248px]">
                <span className="text-[14px] font-normal text-white/70 font-['Urbanist'] leading-[20px]">{card.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Data Sovereignty Loop */}
      <div className="absolute left-[110px] top-[520px] w-[1220px] h-[252px]">
        {/* Loop title */}
        <div className="absolute left-[329px] top-[7px] w-[563px] h-[36px] text-center">
          <span className="text-[30px] font-semibold text-white font-['Urbanist']">{t('dataLoopTitle')}</span>
        </div>

        {/* Circle nodes */}
        <div className="absolute left-0 top-0 w-[1220px] h-[198px]">
          {/* Node 01 */}
          <motion.div whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,246,134,0.2)' }} className="absolute left-0 top-0 w-[100px] h-[100px] bg-[#334155] rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-[40px] font-bold text-white font-['Urbanist'] leading-none">01</span>
          </motion.div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ecosystem/27.svg" alt="" className="absolute left-[104px] top-[58px]" />
          {/* Node 02 */}
          <motion.div whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,246,134,0.2)' }} className="absolute left-[200px] top-[65px] w-[100px] h-[100px] bg-[#334155] rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-[40px] font-bold text-white font-['Urbanist'] leading-none">02</span>
          </motion.div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ecosystem/23.svg" alt="" className="absolute left-[329.39px] top-[103.39px]" />
          {/* Node 03 */}
          <motion.div whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,246,134,0.2)' }} className="absolute left-[440px] top-[98px] w-[100px] h-[100px] bg-[#334155] rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-[40px] font-bold text-white font-['Urbanist'] leading-none">03</span>
          </motion.div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ecosystem/24.svg" alt="" className="absolute left-[577.05px] top-[124.05px]" />
          {/* Node 04 */}
          <motion.div whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,246,134,0.2)' }} className="absolute left-[690px] top-[98px] w-[100px] h-[100px] bg-[#334155] rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-[40px] font-bold text-white font-['Urbanist'] leading-none">04</span>
          </motion.div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ecosystem/25.svg" alt="" className="absolute left-[834.41px] top-[129.08px]" />
          {/* Node 05 (green gradient) */}
          <motion.div whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,246,134,0.2)' }} className="absolute left-[920px] top-[65px] w-[100px] h-[100px] rounded-full flex items-center justify-center cursor-pointer" style={{ background: 'linear-gradient(222deg, #0EFF85 0%, #B0FDFF 100%)' }}>
            <span className="text-[40px] font-bold text-black font-['Urbanist'] leading-none">05</span>
          </motion.div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ecosystem/26.svg" alt="" className="absolute left-[1046px] top-[65px]" />
          {/* Node 06 */}
          <motion.div whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0,246,134,0.2)' }} className="absolute left-[1120px] top-0 w-[100px] h-[100px] bg-[#334155] rounded-full flex items-center justify-center cursor-pointer">
            <span className="text-[40px] font-bold text-white font-['Urbanist'] leading-none">06</span>
          </motion.div>
        </div>

        {/* Labels */}
        <div className="absolute left-0 top-[135px] w-[112px] h-[39px]">
          <span className="text-[16px] font-bold text-white font-['Urbanist']">{t('dataNode1')}</span>
          <div className="mt-[6px] opacity-50"><span className="text-[12px] font-normal text-white font-['Urbanist']">{t('dataNode1Sub')}</span></div>
        </div>
        <div className="absolute left-[191px] top-[185px] w-[117px] h-[44px] text-center">
          <span className="text-[16px] font-bold text-white font-['Urbanist']">{t('dataNode2')}</span>
          <div className="mt-[10px] opacity-50 text-center"><span className="text-[12px] font-normal text-white font-['Urbanist']">{t('dataNode2Sub')}</span></div>
        </div>
        <div className="absolute left-[407px] top-[208px] w-[166px] h-[44px] text-center">
          <span className="text-[16px] font-bold text-white font-['Urbanist']">{t('dataNode3')}</span>
          <div className="mt-[10px] opacity-50 text-center"><span className="text-[12px] font-normal text-white font-['Urbanist']">{t('dataNode3Sub')}</span></div>
        </div>
        <div className="absolute left-[662px] top-[208px] w-[154px] h-[44px] text-center">
          <span className="text-[16px] font-bold text-white font-['Urbanist']">{t('dataNode4')}</span>
          <div className="mt-[10px] opacity-50 text-center"><span className="text-[12px] font-normal text-white font-['Urbanist']">{t('dataNode4Sub')}</span></div>
        </div>
        <div className="absolute left-[897px] top-[185px] w-[160px] h-[67px] text-center">
          <span className="text-[16px] font-bold text-white font-['Urbanist']">{t('dataNode5')}</span>
          <div className="mt-[10px] opacity-50 text-center"><span className="text-[12px] font-normal text-white font-['Urbanist']">{t('dataNode5Sub')}</span></div>
          <div className="mt-[3px] text-center"><span className="text-[12px] font-normal font-['Urbanist']" style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('dataNode5Note')}</span></div>
        </div>
        <div className="absolute left-[1072px] top-[135px] w-[148px] h-[44px] text-right">
          <span className="text-[16px] font-bold text-white font-['Urbanist']">{t('dataNode6')}</span>
          <div className="mt-[10px] opacity-50 text-right"><span className="text-[12px] font-normal text-white font-['Urbanist']">{t('dataNode6Sub')}</span></div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// ============================================================
// 6. COMPLETE ECOSYSTEM LOOP
// ============================================================
function EcosystemLoopSection() {
  const t = useEcoT();
  return (
    <AnimatedSection className="relative w-[1440px] h-[800px] bg-[#060010] overflow-hidden">
      {/* Decorative bg */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/ecosystem/32.svg" alt="" className="absolute left-[411px] top-[-315px]" />

      {/* Section header */}
      <div className="absolute left-[110px] top-[75px] w-[1220px] h-[150px]">
        <div className="absolute left-[271px] top-0 w-[678px] h-[150px] opacity-[0.97]">
          <div className="absolute left-[-271px] top-0 w-[1220px] text-center">
            <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('loopTitle1')}</span>
            <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('loopTitle2')}</span>
          </div>
          <div className="absolute left-[-90px] top-[92px] w-[858px] text-center opacity-80">
            <span className="text-[24px] font-light text-white/80 font-['Urbanist']">
              {t('loopSubtitle')}
            </span>
          </div>
        </div>
      </div>

      {/* 6 Step Icons Row */}
      <div className="absolute left-[110px] top-[292px] w-[1220px] h-[192px]">
        {/* Icons row */}
        <div className="absolute left-0 top-0 w-[1220px] h-[100px]">
          {[
            { icon: '33.svg', bg: '#0044F2', left: 0 },
            { icon: '35.svg', bg: '#00F686', left: 224 },
            { icon: '37.svg', bg: '#00C7CC', left: 448 },
            { icon: '39.svg', bg: '#B0FDFF', left: 672 },
            { icon: '41.svg', bg: '#64748B', left: 896 },
            { icon: '43.svg', bg: '#00F686', left: 1120 },
          ].map((step, index) => (
            <div key={index}>
              <motion.div whileHover={{ scale: 1.1, y: -4 }} className="absolute w-[100px] h-[100px] rounded-full flex items-center justify-center cursor-pointer" style={{ left: step.left, background: step.bg }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/ecosystem/${step.icon}`} alt="" className="w-[44px] h-[44px]" />
              </motion.div>
              {index < 5 && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/images/ecosystem/${['34', '36', '38', '40', '42'][index]}.svg`}
                  alt=""
                  className="absolute top-[28px]"
                  style={{ left: step.left + 135.5 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step labels */}
        {[
          { text: t('loopStep1'), sub: t('loopStep1Sub'), left: 0, w: 119, align: 'left' as const },
          { text: t('loopStep2'), sub: t('loopStep2Sub'), left: 196, w: 155, align: 'center' as const },
          { text: t('loopStep3'), sub: t('loopStep3Sub'), left: 416, w: 165, align: 'center' as const },
          { text: t('loopStep4'), sub: t('loopStep4Sub'), left: 640, w: 165, align: 'center' as const },
          { text: t('loopStep5'), sub: t('loopStep5Sub'), left: 873, w: 148, align: 'center' as const },
          { text: t('loopStep6'), sub: t('loopStep6Sub'), left: 1057, w: 163, align: 'right' as const },
        ].map((label) => (
          <div key={label.text} className="absolute top-[120px]" style={{ left: label.left, width: label.w, textAlign: label.align }}>
            <span className="text-[16px] font-bold text-white font-['Urbanist']">{label.text}</span>
            <div className="mt-[10px] opacity-50" style={{ textAlign: label.align }}>
              <span className="text-[12px] font-normal text-white font-['Urbanist']">{label.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Stats bar */}
      <motion.div whileHover={{ borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute left-[110px] top-[548px] w-[1220px] h-[152px] bg-[#1E293B] rounded-[16px] border border-[#334155] transition-all">
        <div className="absolute left-[51px] top-[31px] w-[1118px] h-[90px] flex">
          {[
            { value: t('loopStat1Value'), label: t('loopStat1Label'), left: 0 },
            { value: t('loopStat2Value'), label: t('loopStat2Label'), left: 341.33 },
            { value: t('loopStat3Value'), label: t('loopStat3Label'), left: 656.67 },
            { value: t('loopStat4Value'), label: t('loopStat4Label'), left: 1000 },
          ].map((stat) => (
            <div key={stat.label} className="absolute top-[9.5px]" style={{ left: stat.left }}>
              <div className="text-center">
                <span className="text-[48px] font-bold font-['Urbanist'] leading-[48px]" style={{ background: 'linear-gradient(180deg, #00F686 0%, #F8FFFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.value}</span>
              </div>
              <div className="mt-[4px] text-center opacity-80">
                <span className="text-[16px] font-light text-white font-['Urbanist']">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

// ============================================================
// 7. TOP-TIER PRIVACY TECHNOLOGY
// ============================================================
function PrivacyTechSection() {
  const t = useEcoT();
  return (
    <AnimatedSection className="relative w-[1440px] h-[800px] bg-[#060010] overflow-hidden">
      {/* Section header */}
      <div className="absolute left-[110px] top-[75px] w-[1220px] h-[150px]">
        <div className="absolute left-[271px] top-0 w-[678px] h-[150px] opacity-[0.97]">
          <div className="absolute left-[-271px] top-0 w-[1220px] text-center">
            <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('privacyTitle1')}</span>
            <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('privacyTitle2')}</span>
          </div>
          <div className="absolute left-[-90px] top-[92px] w-[858px] text-center opacity-80">
            <span className="text-[24px] font-light text-white/80 font-['Urbanist']">
              {t('privacySubtitle')}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Privacy cards (3 normal + 1 highlighted) */}
      {/* Card 1: Differential Privacy */}
      <motion.div whileHover={{ y: -6, borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute left-[110px] top-[284px] w-[290px] h-[240px] bg-[#1E293B] rounded-[16px] border border-[#334155] cursor-pointer transition-all">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/ecosystem/44.svg" alt="" className="absolute left-[21px] top-[21.5px]" />
        <div className="absolute left-[21px] top-[89.5px] w-[257px]">
          <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('privacyCard1Title')}</span>
          <div className="mt-[5px] w-[248px]">
            <span className="text-[14px] font-normal text-white/70 font-['Urbanist'] leading-[20px]">{t('privacyCard1Desc')}</span>
          </div>
        </div>
      </motion.div>

      {/* Card 2: Federated Learning (highlighted) */}
      <motion.div whileHover={{ y: -6, boxShadow: '0 8px 30px rgba(0,246,134,0.2)' }} transition={{ duration: 0.3 }} className="absolute left-[420px] top-[265px] w-[290px] h-[280px] rounded-[16px] cursor-pointer transition-all" style={{ background: 'linear-gradient(317deg, #00F686 0%, #B0FDFF 100%)' }}>
        <div className="absolute left-[20px] top-[20.5px] w-[48px] h-[48px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ecosystem/47.svg" alt="" className="absolute left-[-2px] top-[3.5px]" />
        </div>
        <div className="absolute left-[20px] top-[88.5px] w-[257px]">
          <span className="text-[20px] font-bold text-black font-['Urbanist']">{t('privacyCard2Title')}</span>
          <div className="mt-[5px] w-[248px]">
            <span className="text-[14px] font-normal text-black/70 font-['Urbanist']">{t('privacyCard2Desc')}</span>
          </div>
          <div className="mt-[22px] w-[248px]">
            <span className="text-[14px] font-normal text-black font-['Urbanist']">{t('privacyCard2Extra')}</span>
          </div>
        </div>
      </motion.div>

      {/* Card 3 */}
      <motion.div whileHover={{ y: -6, borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute left-[730px] top-[284px] w-[290px] h-[240px] bg-[#1E293B] rounded-[16px] border border-[#334155] cursor-pointer transition-all">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/ecosystem/45.svg" alt="" className="absolute left-[21px] top-[21.5px]" />
        <div className="absolute left-[21px] top-[89.5px] w-[257px]">
          <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('privacyCard3Title')}</span>
          <div className="mt-[5px] w-[248px]">
            <span className="text-[14px] font-normal text-white/70 font-['Urbanist'] leading-[20px]">{t('privacyCard3Desc')}</span>
          </div>
        </div>
      </motion.div>

      {/* Card 4 */}
      <motion.div whileHover={{ y: -6, borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute left-[1040px] top-[284px] w-[290px] h-[240px] bg-[#1E293B] rounded-[16px] border border-[#334155] cursor-pointer transition-all">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/ecosystem/46.svg" alt="" className="absolute left-[21px] top-[21.5px]" />
        <div className="absolute left-[21px] top-[89.5px] w-[257px]">
          <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('privacyCard4Title')}</span>
          <div className="mt-[5px] w-[248px]">
            <span className="text-[14px] font-normal text-white/70 font-['Urbanist'] leading-[20px]">{t('privacyCard4Desc')}</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom security bar */}
      <motion.div whileHover={{ borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute left-[100px] top-[585px] w-[1220px] h-[154px] bg-[#1E293B] rounded-[16px] border border-[#334155] transition-all">
        {/* Item 1 */}
        <div className="absolute left-[51.41px] top-[50px] w-[326px] h-[54px] flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ecosystem/48.svg" alt="" className="w-[48px] h-[48px]" />
          <div className="ml-[20px]">
            <span className="text-[14px] font-normal text-white/70 font-['Urbanist']">{t('privacyBar1Label')}</span>
            <div className="mt-[4px]">
              <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('privacyBar1Value')}</span>
            </div>
          </div>
        </div>
        {/* Item 2 */}
        <div className="absolute left-[447.41px] top-[50px] w-[326px] h-[54px] flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ecosystem/49.svg" alt="" className="w-[48px] h-[48px]" />
          <div className="ml-[20px]">
            <span className="text-[14px] font-normal text-white/70 font-['Urbanist']">{t('privacyBar2Label')}</span>
            <div className="mt-[4px]">
              <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('privacyBar2Value')}</span>
            </div>
          </div>
        </div>
        {/* Item 3 */}
        <div className="absolute left-[843.03px] top-[50px] w-[326px] h-[54px] flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ecosystem/50.svg" alt="" className="w-[48px] h-[48px]" />
          <div className="ml-[20px]">
            <span className="text-[14px] font-normal text-white/70 font-['Urbanist']">{t('privacyBar3Label')}</span>
            <div className="mt-[4px]">
              <span className="text-[20px] font-bold text-white font-['Urbanist']">{t('privacyBar3Value')}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

// ============================================================
// 8. WHAT CAN POINTS EXCHANGE FOR?
// ============================================================
function PointsExchangeSection() {
  const t = useEcoT();
  return (
    <AnimatedSection className="relative w-[1440px] h-[800px] bg-[#060010]">
      {/* Title */}
      <div className="absolute left-[110px] top-[75px] w-[1220px] text-center">
        <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('pointsTitle1')}</span>
        <span className="text-[60px] font-bold text-white font-['Urbanist']">{t('pointsTitle2')}</span>
      </div>

      <div className="absolute left-[110px] top-[171px] w-[1220px] h-[582px]">
        {/* Left: Points card preview */}
        <motion.div whileHover={{ borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute left-0 top-0 w-[467px] h-[582px] bg-[#1E293B] overflow-hidden rounded-[16px] border border-black backdrop-blur-[30px] transition-all">
          {/* Decorative orb */}
          <Image
            src="/images/ecosystem/83.png"
            alt=""
            width={513}
            height={513}
            className="absolute left-[-218px] bottom-[-196px] rotate-180 pointer-events-none"
          />

          <div className="absolute left-0 top-0 w-[467px] h-[582px] border-b border-[#060010]">
            {/* User avatar + title */}
            <div className="absolute left-[32px] top-[32px] w-[403px] h-[187px]">
              {/* Avatar */}
              <div className="absolute left-0 top-0 w-[403px] h-[100px] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/ecosystem/104.png" alt="" className="w-[100px] h-[100px] object-contain" />
              </div>
              {/* Title */}
              <div className="absolute left-0 top-[128px] w-[403px] h-[72px]">
                <div className="absolute left-0 top-0 w-[403px] text-center">
                  <span className="text-[36px] font-bold font-['Urbanist']" style={{ background: '#00F686', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{t('pointsUserTitle')}</span>
                </div>
              </div>
              <div className="absolute left-0 top-[200px] w-[403px] text-center">
                <span className="text-[20px] font-normal text-white font-['Urbanist']">{t('pointsUserLevel')}</span>
              </div>
            </div>

            {/* Ring chart area — thin gauge ring matching design */}
            <div className="absolute left-0 top-[260px] w-[467px] h-[320px] flex flex-col items-center">
              <div className="relative w-[280px] h-[280px]">
                <svg width="280" height="280" viewBox="0 0 280 280">
                  <defs>
                    <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                      <stop offset="100%" stopColor="#00F686" />
                    </linearGradient>
                  </defs>
                  {/* Gray background track: 270° arc, 90° gap at bottom */}
                  <circle
                    cx="140" cy="140" r="110"
                    fill="none" stroke="#334155" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray="518.36 172.79"
                    transform="rotate(135 140 140)"
                  />
                  {/* Progress arc: 195° from 10 o'clock clockwise to 4:30 */}
                  <circle
                    cx="140" cy="140" r="110"
                    fill="none" stroke="url(#progressGrad)" strokeWidth="8" strokeLinecap="round"
                    strokeDasharray="374.37 316.78"
                    transform="rotate(210 140 140)"
                  />
                  {/* Indicator dot at 10 o'clock (SVG 210°) */}
                  <circle cx="44.7" cy="85" r="6" fill="#00F686" opacity="0.5" />
                  <circle cx="44.7" cy="85" r="4" fill="white" />
                </svg>
                {/* Center stats + To Next Level inside the ring */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[34px] mt-[40px] font-bold font-['Urbanist'] leading-none" style={{ background: 'linear-gradient(180deg, #00F686 0%, #F8FFFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>12,580 HLT</span>
                  <span className="mt-[5px] text-[13px] font-light text-white/80 font-['Urbanist']">{t('pointsAvailable')}</span>
                  <div className="mt-[28px] flex flex-col items-center">
                    <span className="text-[13px] font-light text-white/80 font-['Urbanist']">{t('pointsNextLevel')}</span>
                    <span className="mt-[1px] text-[17px] font-bold font-['Urbanist']" style={{ background: 'linear-gradient(180deg, #00F686 0%, #F8FFFF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>2,420 HLT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: 3 reward category cards */}
        <div className="absolute left-[507px] top-[4.07px] w-[713px] h-[573.85px]">
          {/* Card 1: Health Services */}
          <RewardCard
            top={0}
            icon="52.svg"
            title={t('pointsReward1Title')}
            items={[
              { icon: 'check-circle.svg', text: t('pointsReward1Feat1') },
              { icon: 'check-circle.svg', text: t('pointsReward1Feat2') },
              { icon: 'check-circle.svg', text: t('pointsReward1Feat3') },
              { icon: 'check-circle.svg', text: t('pointsReward1Feat4') },
            ]}
          />
          {/* Card 2: Product Benefits */}
          <RewardCard
            top={200.62}
            icon="57.svg"
            title={t('pointsReward2Title')}
            items={[
              { icon: 'check-circle.svg', text: t('pointsReward2Feat1') },
              { icon: 'check-circle.svg', text: t('pointsReward2Feat2') },
              { icon: 'check-circle.svg', text: t('pointsReward2Feat3') },
              { icon: 'check-circle.svg', text: t('pointsReward2Feat4') },
            ]}
          />
          {/* Card 3: Ecosystem Privileges */}
          <RewardCard
            top={401.24}
            icon="62.svg"
            title={t('pointsReward3Title')}
            items={[
              { icon: 'check-circle.svg', text: t('pointsReward3Feat1') },
              { icon: 'check-circle.svg', text: t('pointsReward3Feat2') },
              { icon: 'check-circle.svg', text: t('pointsReward3Feat3') },
              { icon: 'check-circle.svg', text: t('pointsReward3Feat4') },
            ]}
          />
        </div>
      </div>
    </AnimatedSection>
  );
}

function RewardCard({ top, icon, title, items }: { top: number; icon: string; title: string; items: { icon: string; text: string }[] }) {
  return (
    <motion.div whileHover={{ y: -4, borderColor: 'rgba(0,246,134,0.3)' }} transition={{ duration: 0.3 }} className="absolute left-0 w-[713px] h-[172.62px] bg-[#1E293B] rounded-[16px] border border-[#334155] cursor-pointer transition-all" style={{ top }}>
      {/* Header */}
      <div className="absolute left-[41px] top-[31px] w-[631px] h-[26px] flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/images/ecosystem/${icon}`} alt="" />
        <span className="ml-[10px] text-[20px] font-bold text-white font-['Urbanist']">{title}</span>
      </div>
      {/* Items grid (2x2) */}
      <div className="absolute left-[41px] top-[77px] w-[631px] h-[64.62px]">
        {items.map((item, i) => (
          <div key={i} className="absolute w-[226px] h-[24px] flex items-center" style={{ left: i % 2 === 0 ? 0 : 306, top: i < 2 ? 0 : 40.31 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/images/ecosystem/${item.icon}`} alt="" className="absolute left-0 top-[2px]" />
            <span className="absolute left-[30px] text-[14px] font-bold text-white font-['Urbanist']">{item.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================================
// 9. FOOTER CTA SECTION
// ============================================================
function FooterCTASection() {
  return (
    <section className="relative w-[1440px] h-[474px] overflow-hidden">
      <Image
        src="/images/ecosystem/84.png"
        alt="Footer background"
        width={1513}
        height={651}
        className="absolute left-[-33px] top-[-169px] w-[1505px] h-[643px] object-cover"
      />
      {/* Logo overlay */}
      <div className="absolute left-[142px] top-[210px] w-[148px] h-[66px] bg-[#111111] flex items-center justify-center">
        <div className="w-[121.92px] h-[40px] relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/ecosystem/67.svg" alt="" className="absolute left-[65.32px] top-0" />
          <div className="absolute left-0 top-[8.35px] w-[121.92px] h-[31.65px]">
            {['71.svg', '70.svg', '69.svg', '73.svg', '72.svg', '68.svg'].map((svg) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={svg} src={`/images/ecosystem/${svg}`} alt="" className="absolute" style={{ left: svg === '71.svg' ? 0 : svg === '70.svg' ? '26.05px' : svg === '69.svg' ? '44.16px' : svg === '73.svg' ? '70.21px' : svg === '72.svg' ? '78.13px' : '99.98px', top: svg === '69.svg' ? 0 : '8.3px' }} />
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
export default function EcosystemPage() {
  const [pageZoom, setPageZoom] = useState(1);
  // 首屏背景图 1920px，左偏移 -240px → 右边缘 1680px
  // 屏幕 > 1440 时向右扩展显示更多 3D 硬币，最多到 1680px
  const [visibleWidth, setVisibleWidth] = useState(1440);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 1440) {
        setPageZoom(width / 1440);
      } else {
        setPageZoom(1);
      }
      // 首屏可见宽度：最小 1440，最大 1680（背景图右边缘）
      setVisibleWidth(width <= 1440 ? 1440 : Math.min(width, 1680));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 所有 section 高度之和（固定布局）
  const totalContentHeight = 808 + 780 + 509 + 500 + 800 + 800 + 800 + 800 + 474;

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
        <HeroSection visibleWidth={visibleWidth} />
        <TokenizationSection />
        <TokenomicsSection />
        <HealthMiningSection />
        <DataSovereigntySection />
        <EcosystemLoopSection />
        <PrivacyTechSection />
        <PointsExchangeSection />
      </div>
    </main>
  );
}
