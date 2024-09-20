"use client";
import React, { useState, useEffect, useRef } from "react";

// Dynamically load the YT player script since it relies on 'window'
const loadYouTubeAPI = () => {
  if (typeof window !== "undefined" && !(window as any).YT) {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);
  }
};

const Demo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isControlsVisible, setIsControlsVisible] = useState<boolean>(false);
  const [player, setPlayer] = useState<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Function to toggle play/pause
  const togglePlay = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Show controls when user interacts with video
  const showControls = () => {
    setIsControlsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsControlsVisible(false);
    }, 3000);
  };

  // Initialize the YouTube player after the iframe API is loaded
  useEffect(() => {
    loadYouTubeAPI(); // Load the YouTube API dynamically

    const onYouTubeIframeAPIReady = () => {
      const newPlayer = new (window as any).YT.Player("ytplayer", {
        videoId: "yzXBa84oRiI", // Replace with your YouTube video ID
        events: {
          onStateChange: (event: any) => {
            if (event.data === (window as any).YT.PlayerState.PLAYING) {
              setIsPlaying(true);
            } else if (event.data === (window as any).YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            }
          },
        },
      });
      setPlayer(newPlayer);
    };

    // Ensure the YouTube API callback is ready when the API is loaded
    (window as any).onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

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
        <div className="max-w-7xl mx-auto relative">
          <div
            className="aspect-w-16 aspect-video rounded-lg overflow-hidden shadow-xl bg-gray-200 dark:bg-gray-800 cursor-pointer"
            onMouseEnter={showControls}
            onMouseMove={showControls}
            onMouseLeave={() => setIsControlsVisible(false)}
            onClick={togglePlay}
          >
            <div id="ytplayer" className="w-full h-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
