"use client";

import { Podcast } from "@/data/podcast";
import {
  ActualState,
  actualIndexState,
  audioPlayerState,
  loadingState,
  playState,
  progressState,
  queueState,
} from "@/global/playerState";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

let isInit = false;

const addToCache = async (url: string) => {
  if ("caches" in window) {
    const cache = await caches.open("podcast");
    cache.add(url);
  }
};

export default function usePlayerGlobal() {
  const [queue, setQueue] = useRecoilState(queueState);
  const [play, setPlay] = useRecoilState(playState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [audio, setAudio] = useRecoilState(audioPlayerState);
  const [actualIndex, setActualIndex] = useRecoilState(actualIndexState);
  const setProgress = useSetRecoilState(progressState);
  const actual = useRecoilValue(ActualState);
  const isReady = audio && actual?.audio_file;

  // console.log("render usePlayerGlobal");

  useEffect(() => {
    if (!audio || !isInit) {
      setAudio(typeof Audio !== "undefined" ? new Audio() : null);
      isInit = !!audio;
    } else {
      if (actual?.audio_file && actual?.audio_file !== audio?.src) {
        setLoading(true);
        addToCache(actual?.audio_file);
        audio.pause();
        audio.src = actual?.audio_file;
        audio.load();
        audio.oncanplay = () => {
          console.log("canplay");
          audio.play();
          setLoading(false);
          if ("mediaSession" in navigator) {
            // Establecer los metadatos
            navigator.mediaSession.metadata = new MediaMetadata({
              title: actual.title,
              artist: "Web Reactiva",
              album: `Episodio ${actual.number}`,
              artwork: [{ src: actual.image_url, type: "image/jpg" }],
            });
            navigator.mediaSession.setActionHandler("previoustrack", () =>
              nextElQueue()
            );
            navigator.mediaSession.setActionHandler("nexttrack", () =>
              prevElQueue()
            );
            navigator.mediaSession.setActionHandler(
              "seekto",
              function (details) {
                if (details.fastSeek && "fastSeek" in audio) {
                  audio.fastSeek(details.seekTime ?? 0);
                  return;
                }

                audio.currentTime = details.seekTime ?? 0;
              }
            );
          }
        };
        audio.addEventListener("ended", nextElQueue);
        audio.addEventListener("timeupdate", updateProgress);
        audio.addEventListener("play", playOn);
        audio.addEventListener("pause", playOff);
        // audio.addEventListener("loadeddata", addToCache);
      }
    }

    return () => {
      audio?.removeEventListener("ended", nextElQueue);
      audio?.removeEventListener("timeupdate", updateProgress);
      audio?.removeEventListener("play", playOn);
      audio?.removeEventListener("pause", playOff);
    };
  }, [audio, setAudio, actual, setLoading]);

  useEffect(() => {
    if (audio && queue.length === 0) {
      audio.pause();
      audio.src = "";
      setProgress(0);
    }
  }, [queue, audio, setProgress]);

  const tooglePlay = useCallback(() => {
    if (audio?.paused) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }, [audio]);

  const nextElQueue = useCallback(() => {
    console.log(actualIndex, queue.length);
    if (actualIndex >= queue.length - 1) {
      setActualIndex(0);
    } else {
      setActualIndex((prev) => prev + 1);
    }
  }, [actualIndex, queue.length, setActualIndex]);

  const prevElQueue = useCallback(() => {
    if (actualIndex === 0) {
      setActualIndex(actualIndex);
    } else {
      setActualIndex((prev) => prev - 1);
    }
  }, [actualIndex, setActualIndex, tooglePlay]);

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

  const changeRate = useCallback(() => {
    if (audio) {
      audio.playbackRate = audio.playbackRate === 1.0 ? 2.0 : 1.0;
    }
  }, [audio]);

  const removeIndexQueue = useCallback(
    (selected: number) => {
      setQueue((prev) => prev.filter((_, index) => index !== selected));
    },
    [setQueue]
  );

  const updateProgress = () => {
    setProgress(audio?.currentTime ?? 0);
  };

  const playOn = () => setPlay(true);
  const playOff = () => setPlay(false);

  return {
    actual,
    isReady,
    play,
    queue,
    actualIndex,
    duration: audio?.duration ?? 0,
    loading,
    rate: audio?.playbackRate === 1.0,
    setActualIndex,
    addToQueue,
    changeRate,
    loadPodcast,
    nextElQueue,
    prevElQueue,
    removeIndexQueue,
    tooglePlay,
  };
}
