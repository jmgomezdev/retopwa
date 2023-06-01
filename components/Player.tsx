"use client";

import { useEffect, useRef, useState } from "react";
import {
  playState,
  podcastSelectedState,
  queueState,
} from "@/global/playerState";
import { useRecoilState } from "recoil";

import Controls from "./Controls";
import LineTime from "./LineTime";
import { Slider } from "./ui/slider";

export default function Player() {
  const [play, setPlay] = useRecoilState(playState);
  const [urls, setUrls] = useRecoilState(queueState);
  const [actualIndex, setActualIndex] = useRecoilState(podcastSelectedState);

  const podcast = urls?.[actualIndex];

  const audioRef = useRef<HTMLAudioElement | undefined>(
    typeof Audio !== "undefined" && podcast?.audio_file
      ? new Audio(podcast?.audio_file)
      : undefined
  );

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
      // audioRef.current = new Audio(podcast?.audio_file);
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [play]);

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

  return (
    <div className="flex w-full max-w-4xl flex-col items-center">
      <Controls
        isPlaying={play}
        onNext={nextElQueue}
        onPlay={tooglePlay}
        onPrev={prevElQueue}
      />
      <LineTime onNext={nextElQueue} audioplayer={audioRef.current} />
    </div>
  );
}
