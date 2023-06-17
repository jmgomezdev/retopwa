"use client";

import { Slider } from "./ui/slider";
import usePlayerTime from "@/hooks/usePlayerTime";
import { timeFormatter } from "@/lib/format";
import { isNumeric } from "@/lib/utils";

const convertTime = (value: number): string => {
  if (!isNumeric(value)) return "0:00:00";
  const time = new Date(Math.floor(value) * 1000);
  return timeFormatter.format(time);
};

export default function LineTime() {
  const { changeTime, duration, progress } = usePlayerTime();

  const durationTime = convertTime(duration);
  const progressTime = convertTime(progress);

  const moveLineTime = (value: [number]) => {
    changeTime(value[0]);
  };

  return (
    <div className="flex w-full gap-2">
      <time dateTime={progressTime} className="w-16 shrink-0">
        {progressTime}
      </time>
      <Slider
        value={[Math.floor(progress)] || [0]}
        max={Math.floor(duration) || 0}
        step={1}
        onValueChange={moveLineTime}
        className="grow"
      />
      <time dateTime={durationTime} className="w-16 shrink-0">
        {durationTime}
      </time>
    </div>
  );
}
