'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  xs: 'w-16 h-6',
  sm: 'w-20 h-8',
  md: 'w-28 h-10',
  lg: 'w-40 h-14',
  xl: 'w-48 h-16',
};

export default function ProductLogo({ size = 'md', className }: ProductLogoProps) {
  return (
    <div className={cn('relative', sizeMap[size], className)}>
      <Image
        src="/logo.png"
        alt="Orbiva Logo"
        fill
        sizes="192px"
        className="object-contain"
      />
    </div>
  );
}
