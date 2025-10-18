
import React, { useEffect, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
}

// NOTE: Native HLS playback is supported in Safari and some other browsers.
// For universal support (Chrome, Firefox), a library like HLS.js would be needed to attach to the video element.
// This component relies on native browser support for simplicity.

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
        // You would integrate HLS.js here if needed
        // For example:
        // if (Hls.isSupported()) {
        //   const hls = new Hls();
        //   hls.loadSource(src);
        //   hls.attachMedia(videoRef.current);
        // } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        //   videoRef.current.src = src;
        // }
      videoRef.current.src = src;
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current?.play().catch(error => console.error("Autoplay was prevented:", error));
      });
    }
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
