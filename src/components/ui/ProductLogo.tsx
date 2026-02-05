'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ProductLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  xs: 'w-8 h-8',
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-24 h-24',
};

export default function ProductLogo({ size = 'md', className }: ProductLogoProps) {
  return (
    <div className={cn('relative', sizeMap[size], className)}>
      <Image
        src="/logo.png"
        alt="Orbiva Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
