"use client";

import { use, useEffect, useRef, useState } from "react";

import { Slider } from "./ui/slider";

interface lineTimeProps {
  audioplayer: any;
  onNext: Function;
}

export default function LineTime({ audioplayer, onNext }: lineTimeProps) {
  const [progress, setProgress] = useState(0);
  const progressBarRef = useRef();

  useEffect(() => {
    progressBarRef.current = setInterval(() => {
      if (audioplayer?.ended) {
        onNext();
      } else {
        setProgress(audioplayer?.currentTime);
      }
    }, [1000]);
    return () => {
      audioplayer?.pause();
      clearInterval(progressBarRef.current);
    };
  }, []);

  const handleOnChange = (value) => {
    console.log(value);
    audioplayer.currentTime = value;
    setProgress(audioplayer.currentTime);
  };

  console.log(audioplayer);

  return (
    <div className="flex w-full gap-2">
      <span>5:05</span>
      <Slider
        value={[progress] ?? [0]}
        max={100}
        step={1}
        onValueChange={handleOnChange}
        className="w-[90%]"
      />
      <span>6:43</span>
    </div>
  );
}
