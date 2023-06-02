"use client";

import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

import usePlayerGlobal from "@/hooks/usePlayerGlobal";

import { Button } from "./ui/button";

export default function Controls() {
  const { isReady, play, prevElQueue, tooglePlay, nextElQueue } =
    usePlayerGlobal();

  return (
    <div className="flex gap-6">
      <Button variant="ghost" onClick={() => prevElQueue()}>
        <SkipBack className="h-6 w-6" />
      </Button>
      <Button
        disabled={!isReady}
        className="rounded-full p-4"
        onClick={() => tooglePlay()}
      >
        {play ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
      </Button>
      <Button variant="ghost" onClick={() => nextElQueue()}>
        <SkipForward className="h-6 w-6" />
      </Button>
    </div>
  );
}
