"use client";

import { Slider } from "./ui/slider";
import usePlayerTime from "@/hooks/usePlayerTime";
import { timeFormatter } from "@/lib/format";
import { isNumeric } from "@/lib/utils";

const convertTime = (value: number): string => {
  if (!isNumeric(value)) return "00:00:00";
  const time = new Date(Math.floor(value) * 1000);
  const timeWithoutTimezone = new Date(
    time.getTime() + time.getTimezoneOffset() * 60000
  );
  return timeFormatter.format(timeWithoutTimezone);
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
      <time dateTime={progressTime}>{progressTime}</time>
      <Slider
        value={[Math.floor(progress)] ?? [0]}
        max={Math.floor(duration) ?? 0}
        step={1}
        onValueChange={moveLineTime}
        className="w-[90%]"
      />
      <time dateTime={durationTime}>{durationTime}</time>
    </div>
  );
}
