'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useI18n, Locale, localeNames } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export default function LanguageSwitcher({ className, variant = 'default' }: LanguageSwitcherProps) {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locales: Locale[] = ['zh-CN', 'zh-TW', 'en'];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  if (variant === 'compact') {
    return (
      <div ref={dropdownRef} className={cn('relative', className)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/[0.05] transition-all"
        >
          <Globe className="w-4 h-4" />
          <span className="text-xs font-medium uppercase">{locale.split('-')[0]}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 py-2 w-36 rounded-xl bg-[#0a0a0a] border border-white/[0.08] shadow-xl z-50"
            >
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleSelect(loc)}
                  className={cn(
                    'w-full flex items-center justify-between px-4 py-2 text-sm transition-colors',
                    locale === loc
                      ? 'text-[#7C3AED] bg-[#7C3AED]/[0.05]'
                      : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                  )}
                >
                  <span>{localeNames[loc]}</span>
                  {locale === loc && <Check className="w-4 h-4" />}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/70 hover:text-white hover:border-white/[0.1] transition-all"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm">{localeNames[locale]}</span>
        <ChevronDown className={cn(
          'w-4 h-4 transition-transform',
          isOpen && 'rotate-180'
        )} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 py-2 w-44 rounded-xl bg-[#0a0a0a] border border-white/[0.08] shadow-xl backdrop-blur-xl z-50"
          >
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleSelect(loc)}
                className={cn(
                  'w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors',
                  locale === loc
                    ? 'text-[#7C3AED] bg-[#7C3AED]/[0.05]'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.03]'
                )}
              >
                <span>{localeNames[loc]}</span>
                {locale === loc && <Check className="w-4 h-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
