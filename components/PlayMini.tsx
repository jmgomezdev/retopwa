"use client";

import { Button } from "./ui/button";
import usePlayerGlobal from "@/hooks/usePlayerGlobal";
import { Loader2, Pause, Play } from "lucide-react";

export default function PlayMini() {
  const { isReady, loading, play, tooglePlay } = usePlayerGlobal();
  return loading ? (
    <span className="flex items-center justify-center px-4 py-2 sm:hidden">
      <Loader2 className="h-6 w-6 animate-spin" />
    </span>
  ) : (
    <Button
      disabled={!isReady}
      className="sm:hidden"
      onClick={() => tooglePlay()}
    >
      {play ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
    </Button>
  );
}
