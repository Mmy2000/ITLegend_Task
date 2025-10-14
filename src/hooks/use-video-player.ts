"use client";

import { useState, useRef } from "react";
import { VideoPlayerState } from "@/interfaces";

export function useVideoPlayer() {
  const [playerState, setPlayerState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 330,
    duration: 945,
    volume: 100,
    isFullscreen: false,
  });

  const videoContainerRef = useRef<HTMLDivElement | null>(null);

  const togglePlay = () => {
    setPlayerState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const setVolume = (volume: number) => {
    setPlayerState((prev) => ({ ...prev, volume }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen?.();
      setPlayerState((prev) => ({ ...prev, isFullscreen: true }));
    } else {
      document.exitFullscreen?.();
      setPlayerState((prev) => ({ ...prev, isFullscreen: false }));
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getProgressPercentage = (): number => {
    return (playerState.currentTime / playerState.duration) * 100;
  };

  return {
    playerState,
    togglePlay,
    setVolume,
    toggleFullscreen,
    formatTime,
    getProgressPercentage,
    videoContainerRef,
  };
}
