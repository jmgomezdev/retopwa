"use client";

import { useEffect, useRef, useState } from "react";
import {
  playState,
  podcastSelectedState,
  queueState,
} from "@/global/playerState";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useRecoilState } from "recoil";

import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

export default function AudioPlayer() {
  const [play, setPlay] = useRecoilState(playState);
  const [urls, setUrls] = useRecoilState(queueState);
  const [actualIndex, setActualIndex] = useRecoilState(podcastSelectedState);
  const [progress, setProgress] = useState(0);

  const podcast = urls?.[actualIndex];

  const audioRef = useRef<HTMLAudioElement | undefined>();
  const progressBarRef = useRef();

  console.log(podcast);
  console.log(audioRef.current);

  useEffect(() => {
    // audioRef.current?.pause();
    audioRef.current =
      typeof Audio !== "undefined" && podcast?.audio_file
        ? new Audio(podcast?.audio_file)
        : undefined;
    if (audioRef.current) {
      setPlay(true);
    }
  }, [actualIndex]);

  useEffect(() => {
    console.log(play);
    if (play) {
      if (!audioRef.current) {
        audioRef.current = new Audio(podcast?.audio_file);
      }
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [play]);

  useEffect(() => {
    progressBarRef.current = setInterval(() => {
      if (audioRef.current?.ended) {
        nextElQueue();
      } else {
        setProgress(audioRef.current?.currentTime ?? 0);
      }
    }, [1000]);
    return () => {
      audioRef.current?.pause();
      clearInterval(progressBarRef.current);
    };
  }, []);

  const nextElQueue = () => {
    if (actualIndex >= urls.length - 1) {
      setActualIndex(0);
    }
    setActualIndex((prev) => prev + 1);
  };

  const prevElQueue = () => {
    if (actualIndex === 0) {
      setActualIndex(actualIndex);
    }
    setActualIndex((prev) => prev - 1);
  };

  const tooglePlay = () => setPlay((prev) => !prev);

  const moveLineTime = (value: [number]) => {
    console.log(value[0]);
    audioRef.current.currentTime = value[0];
    console.log(audioRef.current);
    // setProgress(audioRef.current?.currentTime);
  };

  console.log(audioRef.current);

  return (
    <div className="flex w-full max-w-4xl flex-col items-center">
      <div className="flex gap-6">
        <Button variant="ghost" onClick={() => prevElQueue()}>
          <SkipBack className="h-6 w-6" />
        </Button>
        <Button
          disabled={!audioRef.current || !podcast?.audio_file}
          className="rounded-full p-4"
          onClick={() => tooglePlay()}
        >
          {play ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <Button variant="ghost" onClick={() => nextElQueue()}>
          <SkipForward className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex w-full gap-2">
        <span>5:05</span>
        <Slider
          value={[progress] ?? [0]}
          max={100}
          step={1}
          onValueChange={moveLineTime}
          className="w-[90%]"
        />
        <span>6:43</span>
      </div>
    </div>
  );
}
