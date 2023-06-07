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
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

let isInit = false;

export default function usePlayerGlobal() {
  const [queue, setQueue] = useRecoilState(queueState);
  const [play, setPlay] = useRecoilState(playState);
  const [audio, setAudio] = useRecoilState(audioPlayerState);
  const [actualIndex, setActualIndex] = useRecoilState(actualIndexState);
  const setProgress = useSetRecoilState(progressState);
  const actual = useRecoilValue(ActualState);
  const isReady = audio && actual?.audio_file;

  // console.log("render usePlayerGlobal");

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
        audio.addEventListener("timeupdate", updateProgress);
        setPlay(true);
      }
    }

    return () => {
      audio?.removeEventListener("ended", nextElQueue);
      audio?.removeEventListener("timeupdate", updateProgress);
    };
  }, [audio, setAudio, actual, setPlay]);

  const tooglePlay = useCallback(() => {
    if (audio?.paused) {
      audio?.play();
      setPlay(true);
    } else {
      audio?.pause();
      setPlay(false);
    }
  }, [audio, setPlay]);

  const nextElQueue = useCallback(() => {
    if (actualIndex >= queue.length - 1) {
      setActualIndex(0);
    }
    setActualIndex((prev) => prev + 1);
  }, [actualIndex, queue.length, setActualIndex]);

  const prevElQueue = useCallback(() => {
    if (actualIndex === 0) {
      setActualIndex(actualIndex);
    }
    setActualIndex((prev) => prev - 1);
  }, [actualIndex, setActualIndex]);

  const loadPodcast = useCallback(
    (podcast: Podcast) => {
      console.log(podcast);
      setQueue([podcast]);
      setActualIndex(0);
    },
    [setQueue, setActualIndex]
  );

  const addToQueue = useCallback(
    (podcast: Podcast) => {
      setQueue((prev) => [...prev, podcast]);
    },
    [setQueue]
  );

  // const changeTime = (value: number) => {
  //   if (!audio) return 0;
  //   const newTime = value > audio?.duration ? audio?.duration : value;
  //   audio.currentTime = newTime;
  // };

  const updateProgress = () => {
    setProgress(audio?.currentTime ?? 0);
  };

  return {
    actual,
    isReady,
    play,
    queue,
    actualIndex,
    // progress,
    duration: audio?.duration ?? 0,
    setActualIndex,
    addToQueue,
    // changeTime,
    // getTime,
    loadPodcast,
    nextElQueue,
    prevElQueue,
    tooglePlay,
  };
}
