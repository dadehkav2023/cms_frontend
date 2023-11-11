import React, { useRef } from "react";

interface VideoPlayerProps {
  videoSrc: string;
  width: number;
  height: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, width, height }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <div className="mt-3">
      <video width={width} height={height} ref={videoRef} controls className="rounded">
        <source src={videoSrc} type="" />
      </video>
    </div>
  );
};

export { VideoPlayer };
