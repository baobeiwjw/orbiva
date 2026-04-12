'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { newHomeTranslations, type NewHomeLocale } from '@/lib/i18n/newHomeTranslations';
import Orb from '@/components/backgrounds/Orb';

// ============================================================
// Hook: 获取新首页翻译
// ============================================================
function useNewHomeT() {
  const { locale } = useI18n();
  const loc = (locale as NewHomeLocale) || 'en';
  const dict = newHomeTranslations[loc] || newHomeTranslations.en;
  return (key: string) => (dict as Record<string, string>)[key] ?? key;
}

// ============================================================
// Animation Variants
// ============================================================
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ============================================================
// Section Wrapper with InView animation
// ============================================================
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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
function HeroSection() {
  const t = useNewHomeT();

  return (
    <section className="relative w-full min-h-[900px] overflow-hidden flex items-center justify-center bg-[#060010]" style={{ height: '110vh' }}>
      {/* Orb animated background — constrained square, centered below navbar */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[37%] aspect-square pointer-events-none"
        style={{ width: 'min(105vh, 960px)' }}
      >
        <Orb
          hue={64}
          hoverIntensity={0.3}
          rotateOnHover={false}
          backgroundColor="#060010"
        />
      </div>

      {/* Content — vertically centered with slight downward offset to sit inside the orb */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-[1024px] mx-auto pt-44">
        {/* NTU Badge — hidden */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 hidden"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/10 backdrop-blur-sm">
            <Image src="/images/home/10.svg" alt="" width={20} height={20} />
            <span className="text-white/90 text-sm font-normal font-['Urbanist']">
              {t('heroTag')}
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[clamp(32px,4.8vw,58px)] font-extrabold text-white font-['Urbanist'] mb-10 max-w-[720px] text-center"
          style={{ lineHeight: 1.5 }}
        >
          {t('heroTitle').split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-[clamp(15px,2vw,24px)] font-light text-white/80 font-['Urbanist'] mb-16"
        >
          {t('heroSubtitle')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex items-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,246,134,0.4)' }}
            whileTap={{ scale: 0.97 }}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-br from-[#00C7CC] via-[#00F686] to-[#00C7CC] overflow-hidden cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Image src="/images/home/9.svg" alt="" width={24} height={24} />
              <span className="text-[#060010] text-xl font-extrabold font-['Urbanist']">
                {t('heroCTA')}
              </span>
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.5)' }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full border border-white/25 bg-white/5 backdrop-blur-sm cursor-pointer"
          >
            <span className="text-white text-xl font-semibold font-['Urbanist']">
              {t('heroSecondaryCTA')}
            </span>
          </motion.button>
        </motion.div>

      </div>

      {/* Scroll Indicator — at the bottom of hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute left-1/2 -translate-x-1/2 bottom-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Image src="/images/home/8.svg" alt="scroll" width={56} height={74} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================================
// 2. A/B DUALITY SECTION
// ============================================================
function DualitySection() {
  const t = useNewHomeT();
  const [activeStatus, setActiveStatus] = useState(0);

  const statuses = [
    { label: t('sideAStatus1Label'), desc: t('sideAStatus1Desc'), icon: '/images/home/11.svg', avatar: '/images/home/a.svg' },
    { label: t('sideAStatus2Label'), desc: t('sideAStatus2Desc'), icon: '/images/home/12.svg', avatar: '/images/home/c.svg' },
    { label: t('sideAStatus3Label'), desc: t('sideAStatus3Desc'), icon: '/images/home/13.svg', avatar: '/images/home/b.svg' },
  ];

  return (
    <AnimatedSection className="relative w-full py-20 lg:py-28 bg-[#060010]">
      <div className="max-w-[1220px] mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-[clamp(32px,4.2vw,60px)] font-bold font-['Urbanist'] leading-tight opacity-[0.97]">
            <span className="text-white">{t('dualityTitle')}</span>
            <span className="text-[#00EF82]">{t('dualityTitleHighlight')}</span>
          </h2>
          <p className="mt-3 text-[clamp(16px,1.7vw,24px)] font-light text-white opacity-80 font-['Urbanist']">
            {t('dualitySubtitle')}
          </p>
        </div>

        {/* Two Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Side A Card */}
          <motion.div
            whileHover={{ y: -6, borderColor: 'rgba(75,249,170,0.4)' }}
            transition={{ duration: 0.3 }}
            className="relative bg-[rgba(15,23,42,0.50)] rounded-3xl border border-[#1E293B] overflow-hidden"
          >
            {/* Top gradient bar */}
            <div className="h-1 bg-gradient-to-r from-[#00C7CC] via-[#00F686] to-[#00C7CC] rounded-full mx-[1px] mt-[1px]" />
            <div className="p-8">
              <h3 className="text-[24px] font-bold font-['Urbanist'] leading-[32px]" style={{ color: '#00F686' }}>{t('sideATitle')}</h3>
              <p className="text-[16px] font-normal font-['Urbanist'] leading-[24px] mt-[8px]" style={{ color: '#ffffff' }}>{t('sideASubtitle')}</p>

              {/* Avatar — switches based on active tab */}
              <div className="flex justify-center my-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStatus}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className="w-[256px] h-[256px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.25)] flex items-center justify-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={statuses[activeStatus].avatar}
                      alt="Q-version Spirit"
                      width={256}
                      height={256}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Status Cards */}
              <div className="grid grid-cols-3 gap-4">
                {statuses.map((status, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.04, borderColor: '#4BF9AA' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveStatus(i)}
                    className={`relative bg-[#1E293B] rounded-xl p-3 text-center transition-all duration-300 cursor-pointer ${
                      activeStatus === i
                        ? 'border border-[#4BF9AA] shadow-[0_0_12px_rgba(75,249,170,0.2)]'
                        : 'border border-white/20 hover:border-white/40'
                    }`}
                  >
                    <Image src={status.icon} alt="" width={28} height={28} className="mx-auto mb-2" />
                    <p className="text-xs font-bold text-[#F1F5F9] font-['Urbanist']">{status.label}</p>
                    <p className="text-[10px] text-[#64748B] font-['Urbanist']">{status.desc}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Side B Card */}
          <motion.div
            whileHover={{ y: -6, borderColor: 'rgba(0,199,204,0.4)' }}
            transition={{ duration: 0.3 }}
            className="relative bg-[rgba(15,23,42,0.50)] rounded-3xl border border-[#1E293B] overflow-hidden"
          >
            {/* Top gradient bar */}
            <div className="h-1 bg-gradient-to-r from-[#00F686] via-[#00C7CC] to-[#002DE1] rounded-full mx-[1px] mt-[1px]" />
            <div className="p-8">
              <h3 className="text-[24px] font-bold font-['Urbanist']" style={{ height: '26px', fontSize: '24px', lineHeight: '26px', color: '#00E87F' }}>{t('sideBTitle')}</h3>
              <p className="text-[16px] font-normal font-['Urbanist'] leading-[24px] mt-[8px]" style={{ color: '#ffffff' }}>{t('sideBSubtitle')}</p>

              {/* Metrics Cards */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {/* Metabolic Rate */}
                <motion.div
                  whileHover={{ borderColor: 'rgba(0,246,134,0.3)', y: -2 }}
                  className="bg-[#1E293B] rounded-2xl border border-[#334155] p-4 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-[#94A3B8] font-['Urbanist'] uppercase">{t('metabolicRate')}</span>
                    <Image src="/images/home/14.svg" alt="" width={30} height={30} />
                  </div>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-2xl font-bold text-[#F1F5F9] font-['Urbanist']">{t('metabolicValue')}</span>
                    <span className="text-sm text-[#64748B] font-['Urbanist']">{t('metabolicUnit')}</span>
                  </div>
                  {/* eslint-disable @next/next/no-img-element */}
                  <div className="flex items-end gap-[4px] h-[57px] w-full">
                    <img src="/images/home/15.svg" alt="" style={{ flex: '1 1 0', minWidth: 0, height: '32px' }} />
                    <img src="/images/home/16.svg" alt="" style={{ flex: '1 1 0', minWidth: 0, height: '40px' }} />
                    <img src="/images/home/17.svg" alt="" style={{ flex: '1 1 0', minWidth: 0, height: '56px' }} />
                    <img src="/images/home/18.svg" alt="" style={{ flex: '1 1 0', minWidth: 0, height: '48px' }} />
                  </div>
                  {/* eslint-enable @next/next/no-img-element */}
                </motion.div>

                {/* Fat % */}
                <motion.div
                  whileHover={{ borderColor: 'rgba(0,246,134,0.3)', y: -2 }}
                  className="bg-[#1E293B] rounded-2xl border border-[#334155] p-4 transition-all"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-[#94A3B8] font-['Urbanist'] uppercase whitespace-pre-line">{t('fatPercent')}</span>
                    <Image src="/images/home/19.svg" alt="" width={30} height={30} />
                  </div>
                  <p className="text-2xl font-bold text-[#F1F5F9] font-['Urbanist'] mb-4">{t('fatValue')}</p>
                  {/* eslint-disable @next/next/no-img-element */}
                  <div className="relative w-full overflow-hidden rounded-[4px]" style={{ height: '57px' }}>
                    <div className="absolute inset-0">
                      <img src="/images/home/20.svg" alt="" style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: 'auto' }} />
                    </div>
                  </div>
                  {/* eslint-enable @next/next/no-img-element */}
                </motion.div>
              </div>

              {/* Future Projection */}
              <motion.div
                whileHover={{ borderColor: 'rgba(17,82,212,0.5)', y: -2 }}
                className="mt-4 bg-[rgba(17,82,212,0.05)] rounded-2xl border border-[rgba(17,82,212,0.20)] p-5 transition-all"
              >
                <div className="flex items-start gap-3 mb-4">
                  <Image src="/images/home/23.svg" alt="" width={30} height={30} className="mt-1" />
                  <div>
                    <p className="text-sm font-bold text-[#F1F5F9] font-['Urbanist']">{t('futureProjection')}</p>
                    <p className="text-xs text-[#64748B] font-['Urbanist']">{t('futureProjectionDesc')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 text-center">
                    <div className="relative h-28 rounded-lg overflow-hidden mb-2">
                      <Image src="/images/home/87.png" alt="Baseline" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/30" />
                    </div>
                    <span className="text-[10px] font-bold text-white font-['Urbanist']">{t('baseline')}</span>
                  </div>
                  <Image src="/images/home/24.svg" alt="→" width={16} height={16} />
                  <div className="flex-1 text-center">
                    <div className="relative h-28 rounded-lg overflow-hidden mb-2">
                      <Image src="/images/home/85.png" alt="Projected" fill className="object-cover" />
                    </div>
                    <span className="text-[10px] font-bold text-white font-['Urbanist']">{t('projected')}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// ============================================================
// 3. SENSING NETWORK SECTION
// ============================================================
function SensingNetworkSection() {
  const t = useNewHomeT();

  // Orbit icon bubbles data
  const orbitIcons = [
    { icon: '/images/home/25.svg', size: 174, top: '32%', left: '1.5%' },
    { icon: '/images/home/26.svg', size: 198, top: '64%', left: '13%' },
    { icon: '/images/home/33.svg', size: 98, top: '32%', left: '18.7%' },
    { icon: '/images/home/34.svg', size: 98, top: '48%', left: '17.8%' },
    { icon: '/images/home/35.svg', size: 78, top: '76%', left: '3.3%' },
    { icon: '/images/home/36.svg', size: 143, top: '55%', left: '0%' },
    { icon: '/images/home/32.svg', size: 91, top: '31%', left: '71.8%' },
    { icon: '/images/home/30.svg', size: 126, top: '45%', left: '72.7%' },
    { icon: '/images/home/31.svg', size: 98, top: '64%', left: '72.4%' },
    { icon: '/images/home/29.svg', size: 145, top: '33%', left: '83.4%' },
    { icon: '/images/home/28.svg', size: 168, top: '53%', left: '84.5%' },
    { icon: '/images/home/27.svg', size: 117, top: '74%', left: '78.6%' },
  ];

  const labels = [
    { text: t('sensingBiological'), top: '70%' },
    { text: t('sensingBehavioral'), top: '80%' },
    { text: t('sensingEnvironmental'), top: '91%' },
  ];

  return (
    <AnimatedSection className="relative w-full py-20 lg:py-28 bg-[#060010] overflow-hidden">
      <div className="max-w-[1260px] mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-[clamp(32px,4.2vw,60px)] font-bold text-white font-['Urbanist'] leading-tight max-w-[766px] mx-auto opacity-[0.97]">
            {t('sensingTitle')}
          </h2>
          <p className="mt-4 text-[clamp(16px,1.7vw,24px)] font-light text-white/80 opacity-80 font-['Urbanist']">
            {t('sensingSubtitle')}
          </p>
        </div>

        {/* Central visual: phone + orbit rings + icons */}
        <div className="relative w-full aspect-[1078/800] max-w-[1078px] mx-auto">
          {/* Background image */}
          <Image src="/images/home/86.png" alt="" fill className="object-contain" />

          {/* Orbit rings */}
          <div className="absolute rounded-full border border-white/40" style={{ width: '56%', height: '76%', top: '16.4%', left: '22.3%' }} />
          <div className="absolute rounded-full border border-white/60" style={{ width: '40%', height: '54%', top: '27.5%', left: '30.3%' }} />
          <div className="absolute rounded-full border border-white/80" style={{ width: '24%', height: '32%', top: '38.7%', left: '38.5%' }} />

          {/* Phone in center */}
          <div className="absolute" style={{ width: '13.7%', height: '37%', top: '34.5%', left: '44.2%' }}>
            <Image src="/images/home/79.png" alt="VivaBox Phone" fill className="object-contain" />
          </div>

          {/* Orbit icon bubbles */}
          {orbitIcons.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.15, boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
              className="absolute rounded-full bg-gradient-to-b from-white/16 to-white/4 border border-white/10 flex items-center justify-center cursor-pointer transition-all"
              style={{
                width: `${(item.size / 1078) * 100}%`,
                height: `${(item.size / 800) * 100}%`,
                top: item.top,
                left: item.left,
              }}
            >
              <Image src={item.icon} alt="" width={item.size * 0.26} height={item.size * 0.26} />
            </motion.div>
          ))}

          {/* Green gradient circle icons around the phone */}
          {[
            { icon: '/images/home/37.svg', left: '57.78%', top: '60.72%', rotate: false },
            { icon: '/images/home/38.svg', left: '35.78%', top: '60.74%', rotate: true },
            { icon: '/images/home/39.svg', left: '60.19%', top: '47.39%', rotate: false },
            { icon: '/images/home/40.svg', left: '33.36%', top: '47.41%', rotate: true },
            { icon: '/images/home/41.svg', left: '55.29%', top: '36.50%', rotate: false },
            { icon: '/images/home/42.svg', left: '38.27%', top: '36.52%', rotate: true },
          ].map((item, i) => (
            <motion.div
              key={`green-${i}`}
              whileHover={{ scale: 1.15 }}
              className="absolute rounded-full flex items-center justify-center cursor-pointer"
              style={{
                width: '6.88%',
                aspectRatio: '1',
                left: item.left,
                top: item.top,
                background: item.rotate
                  ? 'linear-gradient(0deg, #00F686 0%, #F8FFFF 100%)'
                  : 'linear-gradient(180deg, #00F686 0%, #F8FFFF 100%)',
                borderRadius: '400px',
              }}
            >
              <Image src={item.icon} alt="" width={34} height={34} />
            </motion.div>
          ))}

          {/* Layer labels */}
          {labels.map((label, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 flex justify-center"
              style={{ top: label.top }}
            >
              <motion.div
                whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.7)' }}
                className="h-[18px] px-2 py-0 rounded-[100px] bg-white/50 border border-white/60 backdrop-blur-[2px] cursor-pointer flex items-center"
              >
                <span className="text-[10px] font-semibold text-[#0044F2] font-['Urbanist'] leading-none">{label.text}</span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ============================================================
// 4. HEALTH TO EARN SECTION
// ============================================================

// Reusable layer item card
function LayerItemCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <motion.div
      whileHover={{ borderColor: 'rgba(255,255,255,0.35)', y: -3, boxShadow: '0 4px 20px rgba(0,246,134,0.08)' }}
      className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(51,65,85,0.30)] border border-[rgba(255,255,255,0.15)] backdrop-blur-md transition-all cursor-pointer"
    >
      <div className="w-12 h-12 rounded-lg bg-[#1E293B] flex items-center justify-center flex-shrink-0">
        <Image src={icon} alt="" width={20} height={20} />
      </div>
      <div>
        <p className="text-base font-bold text-[#F1F5F9] font-['Urbanist']">{title}</p>
        <p className="text-xs text-[#94A3B8] font-['Urbanist']">{desc}</p>
      </div>
    </motion.div>
  );
}

function HealthToEarnSection() {
  const t = useNewHomeT();

  const inputItems = [
    { icon: '/images/home/43.svg', title: t('inputVivaBox'), desc: t('inputVivaBoxDesc') },
    { icon: '/images/home/44.svg', title: t('inputSleep'), desc: t('inputSleepDesc') },
    { icon: '/images/home/45.svg', title: t('inputMedication'), desc: t('inputMedicationDesc') },
    { icon: '/images/home/46.svg', title: t('inputHydration'), desc: t('inputHydrationDesc') },
    { icon: '/images/home/47.svg', title: t('inputExercise'), desc: t('inputExerciseDesc') },
  ];

  const outputItems = [
    { icon: '/images/home/64.svg', title: t('outputVita'), desc: t('outputVitaDesc') },
    { icon: '/images/home/65.svg', title: t('outputHealth'), desc: t('outputHealthDesc') },
    { icon: '/images/home/66.svg', title: t('outputPharma'), desc: t('outputPharmaDesc') },
    { icon: '/images/home/67.svg', title: t('outputInsurance'), desc: t('outputInsuranceDesc') },
    { icon: '/images/home/68.svg', title: t('outputPredictions'), desc: t('outputPredictionsDesc') },
  ];

  return (
    <AnimatedSection className="relative w-full py-20 lg:py-28 bg-[#060010]">
      <div className="max-w-[1220px] mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-[clamp(32px,4.2vw,60px)] font-bold text-white font-['Urbanist'] leading-tight opacity-[0.97]">
            {t('h2eTitle')}
          </h2>
          <p className="mt-3 text-[clamp(16px,1.7vw,24px)] font-light text-white opacity-80 font-['Urbanist'] max-w-[900px] mx-auto">
            {t('h2eSubtitle')}
          </p>
        </div>

        {/* Architecture Layout */}
        <div className="relative">
          {/* Background glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[794px] h-[795px] pointer-events-none hidden lg:block">
            <Image src="/images/home/h2e-bg.png" alt="" fill className="object-cover opacity-60" />
          </div>

          {/* Header row: Input Layer title | spacer | Output Layer title */}
          <div className="hidden lg:flex items-start justify-between relative">
            <div className="w-[280px] flex-shrink-0 mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-bold text-[#00F686] font-['Urbanist'] tracking-wider uppercase">
                {t('inputLayerTag')}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-[#F1F5F9] font-['Urbanist']">{t('inputLayerTitle')}</h3>
            </div>
            <div className="w-[280px] flex-shrink-0 mb-4 text-right">
              <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-bold text-[#00F686] font-['Urbanist'] tracking-wider uppercase">
                {t('outputLayerTag')}
              </span>
              <h3 className="mt-2 text-2xl font-bold text-[#F1F5F9] font-['Urbanist']">{t('outputLayerTitle')}</h3>
            </div>
          </div>

          {/* Main content row: Cards | Branch lines + Center | Cards */}
          <div className="flex flex-col lg:flex-row items-stretch justify-center relative gap-0">
            {/* Input Layer cards */}
            <div className="w-full lg:w-[280px] lg:flex-shrink-0 px-4 lg:px-0 relative z-[1]">
              <div className="mb-4 lg:hidden">
                <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-bold text-[#00F686] font-['Urbanist'] tracking-wider uppercase">
                  {t('inputLayerTag')}
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[#F1F5F9] font-['Urbanist']">{t('inputLayerTitle')}</h3>
              </div>
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4 flex flex-col justify-between h-full">
                {inputItems.map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex-1">
                    <LayerItemCard {...item} />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Center: Branch lines + VivaCore AI + Wallets */}
            <div className="relative flex items-center justify-center py-8 lg:py-0 lg:flex-1">
              {/* Left branch lines — small-radius right-angle turns */}
              <div className="absolute top-0 bottom-0 hidden lg:block pointer-events-none" style={{ right: 'calc(50% + 128px)', left: '-10px' }}>
                <svg preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 200 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="branchGradL" x1="200" y1="250" x2="0" y2="250" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00F686" />
                      <stop offset="1" stopColor="#B0FDFF" />
                    </linearGradient>
                  </defs>
                  {/* Center line (card 3 at 50%) */}
                  <line x1="0" y1="250" x2="200" y2="250" stroke="url(#branchGradL)" strokeOpacity="0.5" strokeWidth="10" />
                  {/* Card 1 at 10% — r=40 rounded corners */}
                  <path d="M200 250 L150 250 Q110 250 110 210 L110 90 Q110 50 70 50 L0 50" stroke="url(#branchGradL)" strokeOpacity="0.5" strokeWidth="10" fill="none" />
                  {/* Card 2 at 30% */}
                  <path d="M200 250 L150 250 Q110 250 110 210 L110 190 Q110 150 70 150 L0 150" stroke="url(#branchGradL)" strokeOpacity="0.5" strokeWidth="10" fill="none" />
                  {/* Card 4 at 70% */}
                  <path d="M200 250 L150 250 Q110 250 110 290 L110 310 Q110 350 70 350 L0 350" stroke="url(#branchGradL)" strokeOpacity="0.5" strokeWidth="10" fill="none" />
                  {/* Card 5 at 90% */}
                  <path d="M200 250 L150 250 Q110 250 110 290 L110 410 Q110 450 70 450 L0 450" stroke="url(#branchGradL)" strokeOpacity="0.5" strokeWidth="10" fill="none" />
                  {/* Dashed overlay */}
                  <line x1="0" y1="250" x2="200" y2="250" stroke="url(#branchGradL)" strokeWidth="1" strokeDasharray="2 4" />
                  <path d="M200 250 L150 250 Q110 250 110 210 L110 90 Q110 50 70 50 L0 50" stroke="url(#branchGradL)" strokeWidth="1" strokeDasharray="2 4" fill="none" />
                  <path d="M200 250 L150 250 Q110 250 110 210 L110 190 Q110 150 70 150 L0 150" stroke="url(#branchGradL)" strokeWidth="1" strokeDasharray="2 4" fill="none" />
                  <path d="M200 250 L150 250 Q110 250 110 290 L110 310 Q110 350 70 350 L0 350" stroke="url(#branchGradL)" strokeWidth="1" strokeDasharray="2 4" fill="none" />
                  <path d="M200 250 L150 250 Q110 250 110 290 L110 410 Q110 450 70 450 L0 450" stroke="url(#branchGradL)" strokeWidth="1" strokeDasharray="2 4" fill="none" />
                </svg>
              </div>

              {/* Right branch lines (mirrored) */}
              <div className="absolute top-0 bottom-0 hidden lg:block pointer-events-none" style={{ left: 'calc(50% + 128px)', right: '-10px', transform: 'scaleX(-1)' }}>
                <svg preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 200 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
                  <defs>
                    <linearGradient id="branchGradR" x1="200" y1="250" x2="0" y2="250" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#00F686" />
                      <stop offset="1" stopColor="#B0FDFF" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="250" x2="200" y2="250" stroke="url(#branchGradR)" strokeOpacity="0.5" strokeWidth="10" />
                  <path d="M200 250 L150 250 Q110 250 110 210 L110 90 Q110 50 70 50 L0 50" stroke="url(#branchGradR)" strokeOpacity="0.5" strokeWidth="10" fill="none" />
                  <path d="M200 250 L150 250 Q110 250 110 210 L110 190 Q110 150 70 150 L0 150" stroke="url(#branchGradR)" strokeOpacity="0.5" strokeWidth="10" fill="none" />
                  <path d="M200 250 L150 250 Q110 250 110 290 L110 310 Q110 350 70 350 L0 350" stroke="url(#branchGradR)" strokeOpacity="0.5" strokeWidth="10" fill="none" />
                  <path d="M200 250 L150 250 Q110 250 110 290 L110 410 Q110 450 70 450 L0 450" stroke="url(#branchGradR)" strokeOpacity="0.5" strokeWidth="10" fill="none" />
                  <line x1="0" y1="250" x2="200" y2="250" stroke="url(#branchGradR)" strokeWidth="1" strokeDasharray="2 4" />
                  <path d="M200 250 L150 250 Q110 250 110 210 L110 90 Q110 50 70 50 L0 50" stroke="url(#branchGradR)" strokeWidth="1" strokeDasharray="2 4" fill="none" />
                  <path d="M200 250 L150 250 Q110 250 110 210 L110 190 Q110 150 70 150 L0 150" stroke="url(#branchGradR)" strokeWidth="1" strokeDasharray="2 4" fill="none" />
                  <path d="M200 250 L150 250 Q110 250 110 290 L110 310 Q110 350 70 350 L0 350" stroke="url(#branchGradR)" strokeWidth="1" strokeDasharray="2 4" fill="none" />
                  <path d="M200 250 L150 250 Q110 250 110 290 L110 410 Q110 450 70 450 L0 450" stroke="url(#branchGradR)" strokeWidth="1" strokeDasharray="2 4" fill="none" />
                </svg>
              </div>

              {/* Vertical stack: Wallet → VivaCore → Wallet */}
              <div className="relative z-10 flex flex-col items-center justify-between h-full py-0">
                {/* Digital Asset Wallet */}
                <motion.div
                  whileHover={{ borderColor: 'rgba(17,82,212,0.6)', y: -3 }}
                  className="w-[256px] rounded-2xl bg-[rgba(17,82,212,0.05)] border border-[rgba(17,82,212,0.40)] backdrop-blur-md text-center transition-all relative"
                >
                  <div className="absolute inset-[-1px] rounded-xl bg-[rgba(51,65,85,0.3)] border border-[rgba(255,255,255,0.15)] backdrop-blur-md" />
                  <div className="relative p-5">
                    <Image src="/images/home/69.svg" alt="" width={24} height={24} className="mx-auto mb-3" />
                    <p className="text-lg font-bold text-[#F1F5F9] font-['Urbanist']">{t('digitalWallet')}</p>
                    <p className="text-xs text-[#94A3B8] font-['Urbanist']">{t('digitalWalletDesc')}</p>
                  </div>
                </motion.div>

                {/* VivaCore AI Circle */}
                <motion.div
                  whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(0,246,134,0.3)' }}
                  className="relative w-[256px] h-[256px] rounded-full flex flex-col items-center justify-center cursor-pointer transition-all my-6"
                  style={{ background: 'linear-gradient(209deg, #00F686 19%, #F8FFFF 92%)' }}
                >
                  <Image src="/images/home/84.png" alt="VivaCore AI" width={112} height={131} className="absolute top-[13px] left-[72px]" />
                  <div className="flex flex-col items-center pt-[117px]">
                    <p className="text-[28px] font-bold text-black font-['Urbanist'] leading-none">{t('vivaCoreTitle')}</p>
                    <p className="text-sm font-semibold text-black/80 font-['Urbanist'] mt-2">{t('vivaCoreSubtitle')}</p>
                  </div>
                </motion.div>

                {/* Health Data Wallet */}
                <motion.div
                  whileHover={{ borderColor: 'rgba(17,82,212,0.6)', y: -3 }}
                  className="w-[256px] rounded-2xl bg-[rgba(17,82,212,0.05)] border border-[rgba(17,82,212,0.40)] backdrop-blur-md text-center transition-all relative"
                >
                  <div className="absolute inset-[-1px] rounded-xl bg-[rgba(51,65,85,0.3)] border border-[rgba(255,255,255,0.15)] backdrop-blur-md" />
                  <div className="relative p-5">
                    <Image src="/images/home/70.svg" alt="" width={24} height={24} className="mx-auto mb-3" />
                    <p className="text-lg font-bold text-[#F1F5F9] font-['Urbanist']">{t('healthWallet')}</p>
                    <p className="text-xs text-[#94A3B8] font-['Urbanist']">{t('healthWalletDesc')}</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Output Layer cards */}
            <div className="w-full lg:w-[280px] lg:flex-shrink-0 px-4 lg:px-0 relative z-[1]">
              <div className="mb-4 lg:hidden text-right">
                <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/10 text-xs font-bold text-[#00F686] font-['Urbanist'] tracking-wider uppercase">
                  {t('outputLayerTag')}
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[#F1F5F9] font-['Urbanist']">{t('outputLayerTitle')}</h3>
              </div>
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4 flex flex-col justify-between h-full">
                {outputItems.map((item, i) => (
                  <motion.div key={i} variants={fadeInUp} className="flex-1">
                    <LayerItemCard {...item} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// ============================================================
// 5. THREE PILLARS SECTION
// ============================================================
function ThreePillarsSection() {
  const t = useNewHomeT();

  const pillars = [
    { img: '/images/home/80.png', title: t('pillar1Title'), desc: t('pillar1Desc'), bgImg: '/images/home/91.png' },
    { img: '/images/home/81.png', title: t('pillar2Title'), desc: t('pillar2Desc') },
    { img: '/images/home/82.png', title: t('pillar3Title'), desc: t('pillar3Desc') },
  ];

  return (
    <AnimatedSection className="relative w-full py-20 lg:py-28 bg-[#060010] overflow-hidden">
      <div className="max-w-[1220px] mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-[clamp(32px,4.2vw,60px)] font-bold text-white font-['Urbanist'] leading-tight opacity-[0.97]">
            {t('pillarsTitle')}
          </h2>
          <p className="mt-3 text-[clamp(16px,1.7vw,24px)] font-light text-white/80 opacity-80 font-['Urbanist']">
            {t('pillarsSubtitle')}
          </p>
        </div>

        {/* Three Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, borderColor: 'rgba(255,255,255,0.5)' }}
              transition={{ duration: 0.3 }}
              className="relative rounded-[40px] border border-white/30 overflow-hidden group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={pillar.img}
                  alt={pillar.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Content */}
              <div className="relative px-6 py-8 text-center">
                {/* Background decoration for first card */}
                {pillar.bgImg && (
                  <div className="absolute inset-0 overflow-hidden">
                    <Image src={pillar.bgImg} alt="" fill className="object-cover opacity-20 blur-sm" />
                  </div>
                )}
                <div className="relative z-10">
                  <h3 className="text-[clamp(22px,2.1vw,30px)] font-semibold text-white opacity-80 font-['Urbanist'] mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-[clamp(14px,1.4vw,20px)] font-light text-white opacity-80 font-['Urbanist'] max-w-[333px] mx-auto">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
export default function Home() {
  return (
    <main className="relative bg-[#060010] -mt-20">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. A/B Duality */}
      <DualitySection />

      {/* 3. Sensing Network */}
      <SensingNetworkSection />

      {/* 4. Health to Earn */}
      <HealthToEarnSection />

      {/* 5. Three Pillars */}
      <ThreePillarsSection />
    </main>
  );
}
