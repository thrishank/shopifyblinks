"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const Demo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isControlsVisible, setIsControlsVisible] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const showControls = () => {
    setIsControlsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsControlsVisible(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-purple-900 dark:text-purple-100">
          See Solana Blinks in Action
        </h2>
        <div className="max-w-3xl mx-auto relative">
          <div
            className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl bg-gray-200 dark:bg-gray-800 cursor-pointer"
            onMouseEnter={showControls}
            onMouseMove={showControls}
            onMouseLeave={() => setIsControlsVisible(false)}
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/blinks_demo.mp4"
              playsInline
              loop
            >
              Your browser does not support the video tag.
            </video>
            {isControlsVisible && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 transition-opacity duration-300">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                    className="p-2 rounded-full bg-white text-black hover:bg-gray-200 transition-colors duration-300"
                  >
                    {isPlaying ? (
                      <Pause className="h-8 w-8" />
                    ) : (
                      <Play className="h-8 w-8" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
