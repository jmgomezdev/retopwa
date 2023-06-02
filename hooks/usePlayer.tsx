"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Podcast } from "@/data/podcast";

let isInit = false;

export default function usePlayer() {
  const [queue, setQueue] = useState<[Podcast] | []>([]);
  const [actualIndex, setActualIndex] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const actual = useMemo(() => {
    return queue?.[actualIndex];
  }, [queue, actualIndex]);
  // const isReady = audio && actual?.audio_file;
  // const duration = audio?.duration ?? 0;

  useEffect(() => {
    if (!audioRef.current && !isInit) {
      console.log("Denifo el audio");
      audioRef.current = new Audio();
      isInit = true;
    }
  }, []);

  useEffect(() => {
    console.log("entro al UseEffect");
    console.log({ actual: actual?.audio_file, src: audioRef.current?.src });
    // if (!audioRef.current) {
    //   console.log("Denifo el audio");
    //   audioRef.current = typeof Audio !== "undefined" ? new Audio() : undefined;
    //   return true;
    //   // audioRef?.current.addEventListener("ended", nextElQueue);
    //   // audioRef.current.addEventListener("play", toogleIndicatorPlay);
    // }

    if (actual?.audio_file && actual?.audio_file !== audioRef.current?.src) {
      console.log("cambio");
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current?.load();
      audioRef.current.src = actual?.audio_file;
      audioRef.current.oncanplaythrough = () => {
        // Esperamos hasta que el media pueda ser reproducido
        audioRef.current.play();
      };
      setPlay(true);
    }

    // return () => {
    //   if (audio) {
    //     console.log("Salia del actual");
    //     audio.src = "";
    //     audio.load();
    //   }
    // };
  }, [actual]);

  const tooglePlay = () => {
    // if (audio?.paused) {
    //   audio?.play();
    //   setPlay(true);
    // } else {
    //   audio?.pause();
    //   setPlay(false);
    // }
  };

  const nextElQueue = () => {
    // if (actualIndex >= queue.length - 1) {
    //   setActualIndex(0);
    // }
    // setActualIndex((prev) => prev + 1);
  };

  const prevElQueue = () => {
    // if (actualIndex === 0) {
    //   setActualIndex(actualIndex);
    // }
    // setActualIndex((prev) => prev - 1);
  };

  const loadPodcast = (podcast: Podcast) => {
    console.log(podcast);
    setQueue([podcast]);
    setActualIndex(0);
  };

  const addToQueue = (podcast: Podcast) => {
    // setQueue((prev) => [...prev, podcast]);
  };

  const changeTime = (value: number): number | null => {
    // if (!audio) return 0;
    // const newTime = value > duration ? duration : value;
    // audio.currentTime = newTime;
    // return newTime;
  };

  const getTime = () => audioRef.current?.currentTime ?? 0;

  return {
    actual,
    duration: 10,
    isReady: true,
    play,
    queue,
    addToQueue,
    changeTime,
    getTime,
    loadPodcast,
    nextElQueue,
    prevElQueue,
    tooglePlay,
  };
}
