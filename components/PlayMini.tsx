"use client";

import { Button } from "./ui/button";
import usePlayerGlobal from "@/hooks/usePlayerGlobal";
import { Pause, Play } from "lucide-react";

export default function PlayMini() {
  const { isReady, play, tooglePlay } = usePlayerGlobal();
  return (
    <Button
      disabled={!isReady}
      className="sm:hidden"
      onClick={() => tooglePlay()}
    >
      {play ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
    </Button>
  );
}
