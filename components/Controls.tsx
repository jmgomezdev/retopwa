"use client";

import { Button } from "./ui/button";
import usePlayerGlobal from "@/hooks/usePlayerGlobal";
import { Loader2, Pause, Play, SkipBack, SkipForward } from "lucide-react";

export default function Controls() {
  const { isReady, play, loading, prevElQueue, tooglePlay, nextElQueue } =
    usePlayerGlobal();

  return (
    <div className="hidden gap-6 sm:flex">
      <Button variant="ghost" onClick={() => prevElQueue()}>
        <SkipBack className="h-6 w-6" />
      </Button>
      {loading ? (
        <span className="flex items-center justify-center px-4 py-2">
          <Loader2 className="h-6 w-6 animate-spin" />
        </span>
      ) : (
        <Button
          disabled={!isReady}
          className="rounded-full p-4"
          onClick={() => tooglePlay()}
        >
          {play ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
      )}
      <Button variant="ghost" onClick={() => nextElQueue()}>
        <SkipForward className="h-6 w-6" />
      </Button>
    </div>
  );
}
