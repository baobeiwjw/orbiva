'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  Download,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { aboutPageTranslations, type AboutPageLocale } from '@/lib/i18n/aboutPageTranslations';

function useAboutT() {
  const { locale } = useI18n();
  const loc = (locale as AboutPageLocale) || 'en';
  const dict = aboutPageTranslations[loc] || aboutPageTranslations.en;
  return (key: string) => (dict as Record<string, string>)[key] ?? key;
}

const gradientText = {
  backgroundImage:
    'linear-gradient(-22deg, rgb(0, 246, 134) 3.25%, rgb(176, 253, 255) 110.3%)',
};

const btnGradient = {
  backgroundImage:
    'linear-gradient(245deg, rgb(0, 199, 204) 5.65%, rgb(0, 246, 134) 45.05%, rgb(0, 199, 204) 94.72%)',
};

/* ============================
   Section 1 – Hero
   ============================ */
function HeroSection({ zoom = 1 }: { zoom?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const t = useAboutT();

  const [visibleWidth, setVisibleWidth] = useState(1440);

  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      setVisibleWidth(vw <= 1440 ? 1440 : Math.min(vw, 1800));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  const metrics = [
    { value: t('metricFoundedValue'), label: t('metricFoundedLabel') },
    { value: t('metricTeamValue'), label: t('metricTeamLabel') },
    { value: t('metricListedValue'), label: t('metricListedLabel') },
    { value: t('metricHqValue'), label: t('metricHqLabel') },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#060010] flex items-center"
      style={{
        width: visibleWidth,
        height: 800,
        marginLeft: 0,
        marginRight: -(visibleWidth - 1440),
      }}
    >
      <div
        className="absolute top-[200px] pointer-events-none"
        style={{ right: 0, width: 1262 + (visibleWidth - 1440), height: 605 }}
      >
        <Image
          src="/images/about/hero-particles.png"
          alt=""
          fill
          className="object-cover object-left"
          priority
        />
      </div>

      <div className="relative z-10 w-[1440px] pl-[110px] pt-[140px]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-[654px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/10 border border-white/10 mb-5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/about/icon-health-ecosystem.svg" alt="" width={24} height={24} className="shrink-0" />
            <span className="font-['Urbanist'] text-lg text-white leading-[1.5]">
              {t('heroBadge')}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mb-[30px]"
          >
            <h1 className="font-['Urbanist'] font-extrabold text-[68px] leading-[80px] text-white">
              {t('heroTitle1')}
              <br />
              <span className="text-[#00ef82]">{t('heroTitle2')}</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-['Urbanist'] font-light text-2xl text-white leading-[30px] tracking-[-0.48px] max-w-[618px] mb-[30px]"
          >
            {t('heroSubtitle')}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex items-center gap-0 mt-4"
        >
          {metrics.map((m, i) => (
            <motion.div key={i} whileHover={{ y: -3, scale: 1.03 }} className="border-l border-white pl-[19px] w-[160px] h-[70px] cursor-default">
              <p
                className="font-['Urbanist'] font-semibold text-[36px] tracking-[-0.72px] bg-clip-text text-transparent"
                style={gradientText}
              >
                {m.value}
              </p>
              <p className="font-['Urbanist'] font-bold text-[16px] text-white">
                {m.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================
   Section 2 – Heritage & Innovation
   ============================ */

const timelineYears = ['1992', '2005', '2018', '2021', '2024', '2026'] as const;

function HeritageSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const t = useAboutT();

  return (
    <section
      ref={ref}
      className="relative bg-[#060010] overflow-hidden"
      style={{ minHeight: 800 }}
    >
      <div className="w-[1220px] mx-auto pt-[75px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-[20px]"
        >
          <h2 className="font-['Urbanist'] font-bold text-[60px] leading-[72px] text-white">
            {t('heritageTitle')}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-['Urbanist'] font-light text-2xl text-white/80 text-center max-w-[858px] mx-auto mb-[40px]"
        >
          {t('heritageSubtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative w-full h-[163px] mb-[30px]"
        >
          <Image
            src="/images/about/heritage-strip.png"
            alt="Heritage timeline"
            fill
            className="object-cover"
          />
        </motion.div>

        <div className="grid grid-cols-6 gap-0">
          {timelineYears.map((year, i) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
              className="flex flex-col items-start relative border-l border-white/30 pl-[10px] cursor-default transition-colors"
            >
              <p
                className="font-['Urbanist'] font-semibold text-[40px] tracking-[-0.8px] bg-clip-text text-transparent w-full mb-4"
                style={gradientText}
              >
                {year}
              </p>

              <div>
                <p className="font-['Urbanist'] font-bold text-[16px] text-white leading-normal mb-1">
                  {t(`timeline${year}Title`)}
                </p>
                <p className="font-['Urbanist'] font-normal text-[14px] text-white/70 leading-normal mb-4">
                  {t(`timeline${year}Subtitle`)}
                </p>

                <div className="flex flex-col gap-2.5">
                  {[1, 2, 3].map((bi) => (
                    <div key={bi} className="flex items-start gap-[11px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00f686] mt-[6px] shrink-0" />
                      <span className="font-['Urbanist'] text-[12px] text-white leading-normal">
                        {t(`timeline${year}Bullet${bi}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   Section 3 – Health Behavior Tokenization (Resources)
   ============================ */

const resourceCardKeys = [
  { id: 'card1', tagKeys: ['card1Tag1', 'card1Tag2'] },
  { id: 'card2', tagKeys: ['card2Tag1', 'card2Tag2'] },
  { id: 'card3', tagKeys: ['card3Tag1'] },
] as const;

function ResourcesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const t = useAboutT();

  return (
    <section
      ref={ref}
      className="relative bg-[#060010] overflow-hidden"
      style={{ minHeight: 800 }}
    >
      <div className="w-[1220px] mx-auto pt-[75px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h2 className="font-['Urbanist'] font-bold text-[60px] leading-[72px] text-white">
            {t('resourcesTitle')}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-['Urbanist'] font-light text-2xl text-white/80 text-center max-w-[858px] mx-auto mb-[60px]"
        >
          {t('resourcesSubtitle')}
        </motion.p>

        <div className="flex gap-[26px] justify-center">
          {resourceCardKeys.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6, borderColor: 'rgba(0,246,134,0.3)', boxShadow: '0 8px 30px rgba(0,246,134,0.08)' }}
              className="relative w-[390px] bg-slate-700/30 border border-slate-700 rounded-2xl px-[31px] py-[41px] flex flex-col gap-[30px] cursor-pointer transition-all"
            >
              <div className="absolute top-[-1px] left-[5px] w-[379px] h-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about/gradient-line.svg"
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-[247px]">
                    <p className="font-['Urbanist'] font-bold text-[20px] text-white leading-6">
                      {t(`${card.id}Title`)}
                    </p>
                    <p className="font-['Urbanist'] font-normal text-[14px] text-white/70 leading-5 h-5 mt-1.5">
                      {t(`${card.id}Subtitle`)}
                    </p>
                  </div>
                  <div className="relative w-[38px] h-[40px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/about/pdf-page.svg"
                      alt="PDF"
                      className="ml-[6px] w-[32px] h-[40px]"
                    />
                    <span className="absolute bottom-0 left-0 bg-[#d92d20] text-white text-[10px] font-bold px-[3px] py-[2px] rounded-[2px]">
                      PDF
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  {card.tagKeys.map((tagKey) => (
                    <span
                      key={tagKey}
                      className="inline-flex items-center justify-center px-2.5 py-[5px] rounded-full bg-slate-800 border border-slate-700 font-['Urbanist'] font-light text-[14px] text-[#00f686]"
                    >
                      {t(tagKey)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-[12px]">
                {[1, 2, 3, 4].map((bi) => (
                  <div key={bi} className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-[#00f686] shrink-0" />
                    <span className="font-['Urbanist'] font-bold text-[14px] text-white leading-6">
                      {t(`${card.id}Bullet${bi}`)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="w-full h-[50px]">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,246,134,0.3)' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-[300px] mx-auto h-[50px] rounded-[400px] flex items-center justify-center gap-1.5 cursor-pointer"
                  style={btnGradient}
                >
                  <Download className="w-5 h-5 text-[#060010]" />
                  <span className="font-['Urbanist'] font-extrabold text-[16px] text-[#060010]">
                    {t('downloadPdf')}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   Section 4 – Latest News
   ============================ */

const newsItems = [
  { id: 'news1', img: '/images/about/news-1.png', hasReadMore: true },
  { id: 'news2', img: '/images/about/news-2.png', hasReadMore: true },
  { id: 'news3', img: '/images/about/news-3.png', hasReadMore: false },
  { id: 'news4', img: '/images/about/news-4.png', hasReadMore: false },
] as const;

function NewsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const t = useAboutT();

  return (
    <section
      ref={ref}
      className="relative bg-[#060010] overflow-hidden pt-[60px] pb-[80px] px-[110px]"
      style={{ minHeight: 800 }}
    >
      <div className="w-[1220px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-[60px]"
        >
          <h2 className="font-['Urbanist'] font-bold text-[60px] leading-[72px] text-white">
            {t('newsTitle')}
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-5 justify-center mb-[60px]">
          {newsItems.map((news, i) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, borderColor: 'rgba(0,246,134,0.3)' }}
              className="w-[600px] bg-slate-800 border border-slate-700 rounded-2xl p-5 flex gap-5 cursor-pointer transition-all"
            >
              <div className="relative w-[150px] h-[150px] shrink-0 rounded-xl overflow-hidden bg-[#d9d9d9]">
                <Image
                  src={news.img}
                  alt={t(`${news.id}Title`)}
                  fill
                  className="object-contain object-center"
                />
              </div>

              <div className="flex flex-col gap-5 w-[390px]">
                <div className="relative">
                  <div className="flex items-center gap-0 h-12">
                    <p className="font-['Urbanist'] font-bold text-[16px] text-white leading-6 w-[336px] line-clamp-2">
                      {t(`${news.id}Title`)}
                    </p>
                  </div>
                  <p className="font-['Urbanist'] font-normal text-[16px] text-white/60 leading-6 mt-[5px]">
                    {t(`${news.id}Summary`)}
                  </p>
                </div>

                <div className="flex items-center justify-between w-[388px]">
                  <div className="flex items-center">
                    <span className="font-['Urbanist'] font-bold text-[14px] text-white leading-6">
                      {t(`${news.id}Date`)}
                    </span>
                  </div>
                  {news.hasReadMore && (
                    <span className="border border-[#00f686] rounded-[1000px] px-2.5 py-0.5 font-['Urbanist'] text-[16px] text-[#00f686] w-[110px] text-center">
                      {t('readMore')}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,246,134,0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="h-[40px] px-[125px] py-2 rounded-[400px] flex items-center justify-center gap-2.5 cursor-pointer"
            style={btnGradient}
          >
            <span className="font-['Urbanist'] font-extrabold text-[16px] text-[#060010]">
              {t('viewMoreNews')}
            </span>
            <ArrowRight className="w-5 h-5 text-[#060010]" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================
   Section 5 – Global Office Network
   ============================ */

const officeKeys = [
  { id: 'officeSg', flag: '/images/about/flag-sg.svg' },
  { id: 'officeHk', flag: '/images/about/flag-hk.svg' },
  { id: 'officeSz', flag: '/images/about/flag-cn.svg' },
] as const;

function OfficesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const t = useAboutT();

  return (
    <section
      ref={ref}
      className="relative bg-[#060010] overflow-hidden"
      style={{ minHeight: 800 }}
    >
      <div className="w-[1220px] mx-auto pt-[75px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-5"
        >
          <h2 className="font-['Urbanist'] font-bold text-[60px] leading-[72px] text-white">
            {t('officesTitle')}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-['Urbanist'] font-light text-2xl text-white/80 text-center max-w-[858px] mx-auto mb-[80px]"
        >
          {t('officesSubtitle')}
        </motion.p>

        <div className="flex gap-[26px] justify-center">
          {officeKeys.map((office, i) => (
            <motion.div
              key={office.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6, borderColor: 'rgba(0,246,134,0.3)', boxShadow: '0 8px 30px rgba(0,246,134,0.08)' }}
              className="w-[390px] bg-slate-700/30 border border-slate-700 rounded-2xl p-[31px] flex flex-col gap-[30px] cursor-pointer transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-[80px] h-[80px] shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={office.flag}
                    alt={t(`${office.id}City`)}
                    className="w-[80px] h-[80px] rounded-full"
                  />
                </div>
                <div className="flex flex-col justify-between h-[90px] py-[6px]">
                  <p className="font-['Urbanist'] font-bold text-[32px] text-white leading-[36px]">
                    {t(`${office.id}City`)}
                  </p>
                  <span className="inline-flex items-center justify-center px-2.5 py-[5px] rounded-full bg-slate-800 border border-slate-700 font-['Urbanist'] font-light text-[14px] text-[#00f686] w-fit">
                    {t(`${office.id}Role`)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-[#00f686] shrink-0" />
                  <span className="font-['Urbanist'] font-bold text-[14px] text-white leading-6">
                    {t(`${office.id}Phone`)}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-5 h-5 text-[#00f686] shrink-0" />
                  <span className="font-['Urbanist'] font-bold text-[14px] text-white leading-6">
                    {t(`${office.id}Email`)}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-[#00f686] shrink-0" />
                  <span className="font-['Urbanist'] font-bold text-[14px] text-white leading-6">
                    {t(`${office.id}Timezone`)}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-5 h-5 text-[#00f686] shrink-0 mt-0.5" />
                  <span className="font-['Urbanist'] font-bold text-[16px] text-white leading-5">
                    {t(`${office.id}Address`)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {['officeTag1', 'officeTag2', 'officeTag3'].map((tagKey) => (
                  <span
                    key={tagKey}
                    className="inline-flex items-center justify-center px-2.5 py-[5px] rounded-full bg-slate-800 border border-slate-700 font-['Urbanist'] font-light text-[14px] text-white/50"
                  >
                    {t(tagKey)}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================
   Section 6 – Business Partnership Inquiry
   ============================ */
function PartnershipSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const t = useAboutT();

  return (
    <section
      ref={ref}
      className="relative h-[284px] bg-[#060010] overflow-hidden flex flex-col items-center justify-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="font-['Urbanist'] font-bold text-[32px] text-white text-center mb-4"
      >
        {t('partnershipTitle')}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="font-['Urbanist'] font-light text-2xl text-white/80 text-center max-w-[875px] mb-10"
      >
        {t('partnershipSubtitle')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex gap-5"
      >
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,246,134,0.3)' }}
          whileTap={{ scale: 0.97 }}
          className="w-[180px] h-[50px] rounded-[400px] flex items-center justify-center gap-2.5 cursor-pointer"
          style={btnGradient}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/about/icon-email-push.svg" alt="" width={20} height={20} className="shrink-0" />
          <span className="font-['Urbanist'] font-extrabold text-[16px] text-[#060010]">
            {t('sendEmail')}
          </span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,246,134,0.3)' }}
          whileTap={{ scale: 0.97 }}
          className="w-[180px] h-[50px] rounded-[400px] flex items-center justify-center gap-2.5 cursor-pointer"
          style={btnGradient}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/about/icon-online-meeting.svg" alt="" width={20} height={20} className="shrink-0" />
          <span className="font-['Urbanist'] font-extrabold text-[16px] text-[#060010]">
            {t('bookMeeting')}
          </span>
        </motion.button>
      </motion.div>
    </section>
  );
}

/* ============================
   Main Page
   ============================ */
export default function AboutPage() {
  const [pageZoom, setPageZoom] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setPageZoom(width < 1440 ? width / 1440 : 1);
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
        <HeroSection zoom={pageZoom} />
        <HeritageSection />
        <ResourcesSection />
        <NewsSection />
        <OfficesSection />
        <PartnershipSection />
      </div>
    </main>
  );
}
