'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface VideoPreviewProps {
  videoUrl: string;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const t = useTranslations('item');

  // Extract YouTube video ID from various URL formats
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);

  if (!videoId) {
    return null;
  }

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  if (isPlaying) {
    return (
      <div className="w-full aspect-video mb-8">
        <iframe
          src={embedUrl}
          title="YouTube video player"
          className="w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-3xl font-[500] text-[#000D2D] mb-6">{t('watchVideo')}</h3>
      <div className="relative w-full aspect-video cursor-pointer group" onClick={handlePlayClick}>
        <img
          src={thumbnailUrl}
          alt="Video thumbnail"
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            // Fallback to medium quality thumbnail if maxresdefault fails
            const target = e.target as HTMLImageElement;
            target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg group-hover:bg-red-700 transition-colors">
            <Play size={32} className="text-white ml-1" />
          </div>
        </div>
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/20 rounded-lg group-hover:bg-black/10 transition-colors" />
      </div>
    </div>
  );
};

export default VideoPreview;
