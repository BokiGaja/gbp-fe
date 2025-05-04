'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('common');
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

    video.play();
    progress.style.animation = 'progressLoop 10s linear infinite';
    progress.style.animationPlayState = 'running';

    return () => {
      video.pause();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
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
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-50 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />

      {/* Overlay Content */}
      <div className="relative z-20 flex flex-col justify-end h-full px-8 pb-10 text-white mx-auto">
        <h1 className="text-5xl font-bold mb-8">{t('pageTitle')}</h1>

        {/* Progress bar and controls */}
        <div className="w-full mb-3">
          <div className="flex items-center justify-between">
            <div className="relative w-full h-[2px] bg-white/30 mx-2 overflow-hidden">
              <div
                ref={progressRef}
                className="absolute top-0 left-0 h-full bg-white"
              />
            </div>

            <button
              onClick={togglePlay}
              className="flex items-center space-x-2 px-4 py-1 w-28 cursor-pointer"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          </div>
        </div>

        {/* Subtitle row below */}
        <div className="flex justify-between items-center px-2 text-sm text-white/80">
          <p>{t('pageSubtitle')}</p>
          <span>{t('locatedInSerbia')} 🇷🇸</span>
        </div>
      </div>
    </div>
  );
}
