"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Podcast } from "@/data/podcast";

export default function usePlayer() {
  const [queue, setQueue] = useState<[Podcast] | []>([]);
  const [actualIndex, setActualIndex] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(false);
  // const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | undefined>(null);

  const actual = useMemo(() => {
    return queue?.[actualIndex];
  }, [queue, actualIndex]);
  const isReady = audioRef.current && actual?.audio_file;
  const duration = audioRef.current?.duration ?? 0;

  useEffect(() => {
    if (!audioRef.current) {
      console.log("entro al UseEffect");
      audioRef.current = typeof Audio !== "undefined" ? new Audio() : undefined;
      // audioRef?.current.addEventListener("ended", nextElQueue);
      // audioRef.current.addEventListener("play", toogleIndicatorPlay);
    }
    return () => {
      console.log("Salia del UseEffect");
      audioRef.current.src = "";
      audioRef.current?.load();
      // audioRef.current?.removeEventListener("ended", nextElQueue);
      // audioRef.current?.removeEventListener("play", toogleIndicatorPlay);
    };
  }, []);

  useEffect(() => {
    if (
      audioRef.current &&
      actual?.audio_file &&
      actual?.audio_file !== audioRef.current?.src
    ) {
      console.log("entro");
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
    //   if (audioRef.current) {
    //     console.log("Salia del actual");
    //     audioRef.current.pause();
    //     audioRef.current.src = "";
    //     audioRef.current.load();
    //   }
    // };
  }, [actual]);

  const toogleIndicatorPlay = () => {
    setPlay(!audioRef.current?.paused ?? false);
  };

  const tooglePlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current?.play();
      setPlay(true);
    } else {
      audioRef.current?.pause();
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

  const changeTime = (value: number): number | null => {
    if (!audioRef.current) return 0;
    const newTime = value > duration ? duration : value;
    audioRef.current.currentTime = newTime;
    return newTime;
  };

  const getTime = () => audioRef.current?.currentTime ?? 0;

  return {
    actual,
    duration,
    isReady,
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
