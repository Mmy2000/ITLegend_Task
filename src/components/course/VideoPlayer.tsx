"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Volume2, Maximize, Minimize2, Expand } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVideoPlayer } from "@/hooks/use-video-player";
import { VideoPlayerProps } from "@/interfaces";
import { useState } from "react";

export function VideoPlayer({ videoThumbnail }: VideoPlayerProps) {
  const {
    playerState,
    togglePlay,
    formatTime,
    getProgressPercentage,
    toggleFullscreen,
    videoContainerRef,
  } = useVideoPlayer();

  const [isWide, setIsWide] = useState(false);

  return (
    <div
      ref={videoContainerRef}
      className={cn(
        "relative w-full transition-all duration-300",
        isWide
          ? "fixed top-0 left-0 w-full h-auto z-50  "
          : "sticky top-0 z-30 lg:relative"
      )}
    >
      <Card
        className={cn(
          "overflow-hidden border-0 rounded-none transition-all duration-300 w-full",
          "aspect-video max-h-[70vh]"
        )}
      >
        <div className="relative w-full h-full group">
          <img
            src={videoThumbnail || "/placeholder.svg"}
            alt="Course video"
            className={cn(
              "w-full h-full object-cover transition-transform duration-500",
              playerState.isPlaying ? "brightness-90" : "brightness-100",
              "group-hover:scale-[1.02]"
            )}
          />

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              size="lg"
              className="h-16 w-16 rounded-full bg-white/90 hover:bg-white text-[#363636] transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
              onClick={togglePlay}
            >
              {playerState.isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 mr-1" />
              )}
            </Button>
          </div>

          {/* Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={togglePlay}
              >
                {playerState.isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#6abd8a] rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                />
              </div>

              <span className="text-white text-sm whitespace-nowrap">
                {formatTime(playerState.currentTime)} /{" "}
                {formatTime(playerState.duration)}
              </span>

              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
              >
                <Volume2 className="h-5 w-5" />
              </Button>

              {/* Wide Mode (desktop only) */}
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20 hidden md:flex"
                onClick={() => setIsWide(!isWide)}
              >
                {isWide ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Expand className="h-5 w-5" />
                )}
              </Button>

              {/* Fullscreen (all devices) */}
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={toggleFullscreen}
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
