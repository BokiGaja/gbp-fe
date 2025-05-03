'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function HomePage() {
  const t = useTranslations('common');
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // percent

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;
    let lastTime = 0;

    const update = () => {
      if (video.duration) {
        const current = video.currentTime;
        const percent = (current / video.duration) * 100;

        // Detect loop reset (when video loops and currentTime goes back to 0)
        if (current < lastTime) {
          setProgress(0);
        } else {
          setProgress(percent);
        }

        lastTime = current;
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);


  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/background_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-8 pb-18 text-white mx-auto">
        <h1 className="text-5xl font-bold mb-8">{t('pageTitle')}</h1>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-0 right-0 z-10 px-6 text-white text-sm">
        {/* Progress bar + button */}
        <div className="flex justify-between items-center">
          <div className="relative w-full h-[2px] bg-white/30 mx-2">
            <div
              className="absolute top-0 left-0 h-[2px] bg-white transition-[width] duration-75 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          <button
            onClick={togglePlay}
            className="flex items-center space-x-2 px-4 py-1 w-28"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>
        </div>

        {/* Subtitle row below */}
        <div className="mt-3 flex justify-between items-center px-2">
          <p className="text-white/80">{t('pageSubtitle')}</p>
          <span className="text-white/80">{t('locatedInSerbia')} 🇷🇸</span>
        </div>
      </div>
    </div>
  );
}
