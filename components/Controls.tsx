"use client";

import { HTMLAttributes } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

import { Button } from "./ui/button";

interface ControlsProps {
  isPlaying: boolean;
  onNext: Function;
  onPlay: Function;
  onPrev: Function;
}

export default function Controls({
  isPlaying,
  onNext,
  onPlay,
  onPrev,
}: ControlsProps) {
  return (
    <div className="flex gap-6">
      <Button variant="ghost" onClick={() => onPrev()}>
        <SkipBack className="h-6 w-6" />
      </Button>
      <Button className="rounded-full p-4" onClick={() => onPlay()}>
        {isPlaying ? (
          <Pause className="h-6 w-6" />
        ) : (
          <Play className="h-6 w-6" />
        )}
      </Button>
      <Button variant="ghost" onClick={() => onNext()}>
        <SkipForward className="h-6 w-6" />
      </Button>
    </div>
  );
}
