import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { I18nProvider } from '@/lib/i18n';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Orbiva | AI-Powered Digital Twin Health Ecosystem',
  description:
    'Orbiva builds your digital health twin through AI-powered VivaBox smart cube, predicting your future health status.',
  keywords: [
    'Digital Twin',
    'Health Management',
    'AI Health',
    'Smart Hardware',
    'VivaBox',
    'Health Prediction',
  ],
  authors: [{ name: 'Orbiva' }],
  openGraph: {
    title: 'Orbiva | AI-Powered Digital Twin Health Ecosystem',
    description: 'Build your digital health twin through AI-powered smart hardware',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <I18nProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
