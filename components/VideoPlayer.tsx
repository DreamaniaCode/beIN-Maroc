import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
  src: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: Hls | null = null;
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play().catch(error => console.error("Autoplay was prevented:", error));
      });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (e.g., Safari)
      videoElement.src = src;
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play().catch(error => console.error("Autoplay was prevented:", error));
      });
    }

    // Cleanup function to destroy HLS instance when component unmounts or src changes
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
      <video
        ref={videoRef}
        controls
        playsInline
        className="w-full h-full"
      />
    </div>
  );
};
