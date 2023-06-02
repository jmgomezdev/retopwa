"use client";

import { Podcast } from "@/data/podcast";
import {
  ActualState,
  actualIndexState,
  audioPlayerState,
  playState,
  queueState,
  progressState,
} from "@/global/playerState";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

let isInit = false;

export default function usePlayerGlobal() {
  const [queue, setQueue] = useRecoilState(queueState);
  const [play, setPlay] = useRecoilState(playState);
  const [audio, setAudio] = useRecoilState(audioPlayerState);
  const [actualIndex, setActualIndex] = useRecoilState(actualIndexState);
  const [progress, setProgress] = useRecoilState(progressState);
  const actual = useRecoilValue(ActualState);
  const isReady = audio && actual?.audio_file;

  useEffect(() => {
    if (!audio || !isInit) {
      console.log("Denifo el audio");
      setAudio(typeof Audio !== "undefined" ? new Audio() : null);
      isInit = !!audio;
    } else {
      if (actual?.audio_file && actual?.audio_file !== audio?.src) {
        console.log("cambio");
        audio.pause();
        audio.src = actual?.audio_file;
        audio.oncanplaythrough = () => {
          audio.play();
        };
        audio.addEventListener("ended", nextElQueue);
        setPlay(true);
      }
    }

    return () => {
      audio?.removeEventListener("ended", nextElQueue);
    };
  }, [audio, setAudio, actual]);

  const tooglePlay = () => {
    if (audio?.paused) {
      audio?.play();
      setPlay(true);
    } else {
      audio?.pause();
      setPlay(false);
    }
  };

  const nextElQueue = () => {
    if (actualIndex >= queue.length - 1) {
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

  const loadPodcast = (podcast: Podcast) => {
    console.log(podcast);
    setQueue([podcast]);
    setActualIndex(0);
  };

  const addToQueue = (podcast: Podcast) => {
    setQueue((prev) => [...prev, podcast]);
  };

  const changeTime = (value: number): number => {
    if (!audio) return 0;
    const newTime = value > audio?.duration ? audio?.duration : value;
    audio.currentTime = newTime;
    return newTime;
  };

  const getTime = (): { current: number; total: number } => {
    console.log(audio);
    return {
      current: audio?.currentTime ?? 0,
      total: audio?.duration ?? 0,
    };
  };

  return {
    actual,
    isReady,
    play,
    queue,
    actualIndex,
    setActualIndex,
    addToQueue,
    changeTime,
    getTime,
    loadPodcast,
    nextElQueue,
    prevElQueue,
    tooglePlay,
  };
}
