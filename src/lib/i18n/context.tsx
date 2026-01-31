'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { Locale, translations, getTranslation } from './translations';

// 定义翻译键类型
type TranslationKey<S extends keyof typeof translations> = keyof typeof translations[S]['zh-CN'];

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: <S extends keyof typeof translations>(
    section: S,
    key: TranslationKey<S> | string
  ) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = 'orbiva-locale';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('zh-CN');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 从 localStorage 读取语言设置
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (savedLocale && ['zh-CN', 'zh-TW', 'en'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    } else {
      // 尝试从浏览器语言设置推断
      const browserLang = navigator.language;
      if (browserLang.startsWith('zh-TW') || browserLang.startsWith('zh-HK')) {
        setLocaleState('zh-TW');
      } else if (browserLang.startsWith('en')) {
        setLocaleState('en');
      }
    }
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    // 更新 HTML lang 属性
    document.documentElement.lang = newLocale === 'zh-TW' ? 'zh-TW' : newLocale === 'en' ? 'en' : 'zh-CN';
  }, []);

  // 当前使用的 locale（mounted 前使用默认值避免 hydration 问题）
  const currentLocale = mounted ? locale : 'zh-CN';

  // 翻译函数直接使用 currentLocale，接受 string 类型的 key
  const t = <S extends keyof typeof translations>(
    section: S,
    key: TranslationKey<S> | string
  ): string => {
    return getTranslation(section, key as TranslationKey<S>, currentLocale);
  };

  return (
    <I18nContext.Provider value={{ locale: currentLocale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// 简化的 hook，直接返回翻译函数
export function useTranslation<S extends keyof typeof translations>(section: S) {
  const { locale, t } = useI18n();
  
  return {
    locale,
    t: (key: TranslationKey<S> | string) => t(section, key),
  };
}
