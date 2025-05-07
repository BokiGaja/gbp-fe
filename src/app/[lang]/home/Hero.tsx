'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('home');
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    const progress = progressRef.current;
    if (!video || !progress) return;

    if (video.paused) {
      video.play();
      progress.style.animationPlayState = 'running';
      setIsPlaying(true);
    } else {
      video.pause();
      progress.style.animationPlayState = 'paused';
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    const progress = progressRef.current;
    if (!video || !progress) return;

    // Safely attempt to play video
    const tryPlay = async () => {
      try {
        await video.play();
        progress.style.animation = 'progressLoop 10s linear infinite';
        progress.style.animationPlayState = 'running';
      } catch (err) {
        console.warn('Video play failed:', err);
      }
    };

    tryPlay();

    return () => {
      video.pause();
    };
  }, []);


  return (
    <div className="relative w-full h-screen overflow-hidden px-4">
      {/* Background Video */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background_video.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#000D2D]/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t from-[#000D2D]/60 to-transparent z-10 pointer-events-none" />

      {/* Overlay Content */}
      <div className="relative z-20 flex flex-col justify-end h-full pb-10 text-white mx-auto">
        {/* Title and pause button row (desktop only) */}
        <div className="flex flex-row items-center justify-between mb-4 md:mb-8">
          <h1 className="text-3xl md:text-[56px] font-[500] md:font-[500] mb-0 text-left">{t('pageTitle')}</h1>
          <button
            onClick={togglePlay}
            className="hidden md:flex items-center space-x-2 px-4 py-1 w-28 cursor-pointer mr-[-20px]"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying ? t('pause') : t('play')}</span>
          </button>
        </div>
        {/* Description (mobile only) */}
        <p className="text-base text-white/80 mb-4 order-2 md:hidden">{t('pageSubtitle')}</p>

        {/* Progress bar and controls */}
        <div className="w-full mb-3 order-3 md:mb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0 relative">
            <div className="relative w-full h-[2px] bg-white/30 overflow-hidden">
              <div
                ref={progressRef}
                className="absolute top-0 left-0 h-full bg-white"
              />
            </div>
            {/* Desktop: flag at bottom right, vertically aligned with pause */}
            <span className="hidden md:block absolute right-0 top-full mt-2 text-m text-white/80">{t('locatedInSerbia')} 🇷🇸</span>
          </div>
        </div>

        {/* Description (desktop only, below progress) */}
        <p className="hidden md:block text-m text-white/80 mb-4 order-4">{t('pageSubtitle')}</p>

        {/* Flag and pause row (mobile only) */}
        <div className="flex flex-row justify-between items-center text-m text-white/80 order-4 md:hidden">
          <span>{t('locatedInSerbia')} 🇷🇸</span>
          <button
            onClick={togglePlay}
            className="flex items-center space-x-2 py-1 cursor-pointer"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying ? t('pause') : t('play')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
