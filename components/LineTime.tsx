"use client";

import { Slider } from "./ui/slider";
import usePlayerGlobal from "@/hooks/usePlayerGlobal";
import { timeFormatter, timeShortFormatter } from "@/lib/format";
import { isNumeric } from "@/lib/utils";
import { parse } from "path";
import { useEffect, useRef, useState } from "react";

const convertTime = (value: number): string => {
  if (!isNumeric(value)) return "00:00:00";
  const time = new Date(Math.floor(value) * 1000);
  const timeWithoutTimezone = new Date(
    time.getTime() + time.getTimezoneOffset() * 60000
  );
  return timeFormatter.format(timeWithoutTimezone);
};

export default function LineTime() {
  const { changeTime, duration, progress } = usePlayerGlobal();

  const durationTime = convertTime(duration);
  const progressTime = convertTime(progress);

  // useEffect(() => {
  //   progressBarRef.current = setInterval(() => {
  //     const { current, total } = getTime();
  //     console.log({ current, total });
  //     setProgress(current);
  //     setDuration(total);
  //   }, [1000]);
  //   return () => {
  //     clearInterval(progressBarRef.current);
  //   };
  // }, []);

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
