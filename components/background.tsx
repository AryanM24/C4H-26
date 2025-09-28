"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const getFileExtension = (url: string): string => {
  return url.split(".").pop()?.toLowerCase() || "";
};

const isVideo = (extension: string): boolean => {
  const videoExtensions = ["mp4", "webm", "ogg", "mov", "avi", "m4v"];
  return videoExtensions.includes(extension);
};

const VideoWithPlaceholder = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      const handleLoadedData = () => {
        setVideoLoaded(true);
      };
      
      const handleCanPlay = () => {
        setVideoLoaded(true);
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("canplay", handleCanPlay);
      video.load();
      
      if (video.readyState >= 2) {
        setVideoLoaded(true);
      }
      
      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [src]);

  useEffect(() => {
    if (videoRef.current && videoLoaded) {
      videoRef.current.play();
    }
  }, [videoLoaded]);

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop
        controls={false}
        preload="auto"
        className={cn(className, "opacity-0 transition-opacity duration-300", { "opacity-100": videoLoaded })}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none rounded-[42px] md:rounded-[72px]" />
    </>
  );
};

export const Background = ({
  src,
}: {
  src: string;
}) => {
  const extension = getFileExtension(src);
  const isVideoFile = isVideo(extension);

  const classNames =
    "absolute bg-background left-0 top-0 w-full h-full object-cover rounded-[42px] md:rounded-[72px]";

  if (isVideoFile) {
    return (
      <VideoWithPlaceholder
        src={src}
        className={classNames}
      />
    );
  }

  return (
    <Image
      priority
      loading="eager"
      src={src}
      alt="Background"
      className={classNames}
      sizes="100vw"
      fill
    />
  );
};
