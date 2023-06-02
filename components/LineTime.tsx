"use client";

import { Slider } from "./ui/slider";
import usePlayerGlobal from "@/hooks/usePlayerGlobal";
import { useEffect, useRef, useState } from "react";

export default function LineTime() {
  const { changeTime, getTime } = usePlayerGlobal();
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(10000);
  const progressBarRef = useRef();

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
    const newTime = changeTime(value[0]);
    setProgress(newTime);
  };

  return (
    <div className="flex w-full gap-2">
      <span>{progress}</span>
      <Slider
        value={[progress] ?? [0]}
        max={duration}
        step={1}
        onValueChange={moveLineTime}
        className="w-[90%]"
      />
      <span>{duration}</span>
    </div>
  );
}
