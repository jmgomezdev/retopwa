"use client";

import { Toggle } from "./ui/toogle";
import usePlayerGlobal from "@/hooks/usePlayerGlobal";
import { Hourglass } from "lucide-react";

export default function PlayRate() {
  const { rate, changeRate } = usePlayerGlobal();
  return (
    <Toggle aria-label="Playrate" pressed={rate} onPressedChange={changeRate}>
      <span className="text-xl">x2</span>
    </Toggle>
  );
}
