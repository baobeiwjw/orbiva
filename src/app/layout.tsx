import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Orbiva | AI 驱动的数字孪生健康生态',
  description:
    'Orbiva 通过 AI 驱动的 VivaBox 智能小方块，构建您的数字健康分身，预见未来健康状态，让健康管理从被动变主动。',
  keywords: [
    '数字孪生',
    '健康管理',
    'AI健康',
    '智能硬件',
    'VivaBox',
    '健康预测',
  ],
  authors: [{ name: 'Orbiva' }],
  openGraph: {
    title: 'Orbiva | AI 驱动的数字孪生健康生态',
    description: '通过 AI 驱动的智能硬件，构建您的数字健康分身',
    type: 'website',
    locale: 'zh_CN',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
