'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
}

export default function VideoModal({ isOpen, onClose, videoUrl, title }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  // 客户端挂载检测
  useEffect(() => {
    setMounted(true);
  }, []);

  // 关闭时暂停视频
  useEffect(() => {
    if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  // ESC 键关闭
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 lg:p-8"
          onClick={onClose}
        >
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          {/* 视频容器 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] as [number, number, number, number] }}
            className="relative w-full max-w-5xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className="absolute -top-12 right-0 sm:right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
            >
              <X className="w-6 h-6 text-white/70 group-hover:text-white transition-colors" />
            </motion.button>

            {/* 标题 */}
            {title && (
              <motion.h3
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute -top-12 left-0 text-white/80 text-lg font-medium"
              >
                {title}
              </motion.h3>
            )}

            {/* 视频播放器 */}
            <div className="relative rounded-2xl overflow-hidden bg-black/50 border border-white/10 shadow-2xl">
              {/* 装饰性发光效果 */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#06B6D4]/20 via-[#22D3EE]/20 to-[#06B6D4]/20 rounded-2xl blur-xl opacity-50" />
              
              <div className="relative">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full aspect-video"
                  style={{ outline: 'none' }}
                >
                  您的浏览器不支持视频播放
                </video>
              </div>
            </div>

            {/* 底部提示 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-center text-white/40 text-sm"
            >
              按 ESC 或点击外部区域关闭
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // 使用 Portal 将模态框渲染到 body
  if (!mounted) return null;
  
  return createPortal(modalContent, document.body);
}
