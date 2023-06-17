"use client";

import {
  ActualState,
  actualIndexState,
  audioPlayerState,
  loadingState,
  playState,
  progressState,
  queueState,
  quickRateState,
} from "@/global/playerState";
import { useCallback, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const addToCache = async (url: string) => {
  if ("caches" in window) {
    const cache = await caches.open("podcast");
    cache.add(url);
  }
};

export default function usePlayerGlobal() {
  const [audio, setAudio] = useRecoilState(audioPlayerState);
  const [queue, setQueue] = useRecoilState(queueState);
  const [play, setPlay] = useRecoilState(playState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [rate, setRate] = useRecoilState(quickRateState);
  const [actualIndex, setActualIndex] = useRecoilState(actualIndexState);
  const setProgress = useSetRecoilState(progressState);
  const actual = useRecoilValue(ActualState);
  const isReady = audio && actual?.audio_file;

  const tooglePlay = useCallback(() => {
    if (audio?.paused) {
      audio?.play();
    } else {
      audio?.pause();
    }
  }, [audio]);

  const nextElQueue = useCallback(() => {
    if (actualIndex >= queue.length - 1) {
      setActualIndex(0);
    } else {
      setActualIndex((prev) => prev + 1);
    }
  }, [actualIndex, queue.length, setActualIndex]);

  const prevElQueue = useCallback(() => {
    if (actualIndex <= 0) {
      setActualIndex(queue.length - 1);
    } else {
      setActualIndex((prev) => prev - 1);
    }
  }, [actualIndex, queue.length, setActualIndex]);

  const changeRate = useCallback(() => {
    if (audio) {
      const newRate = audio.playbackRate === 1.0 ? 2.0 : 1.0;
      audio.playbackRate = newRate;
      setRate(newRate === 2.0);
    }
  }, [audio, setRate]);

  const removeIndexQueue = useCallback(
    (selected: number) => {
      setQueue((prev) => prev.filter((_, index) => index !== selected));
    },
    [setQueue]
  );

  const updateProgress = () => {
    setProgress(audio?.currentTime ?? 0);
  };

  const playOn = useCallback(() => setPlay(true), [setPlay]);
  const playOff = useCallback(() => setPlay(false), [setPlay]);

  useEffect(() => {
    if (audio instanceof Audio) {
      if (actual?.audio_file && actual?.audio_file !== audio?.src) {
        setLoading(true);
        addToCache(actual?.audio_file);
        audio.pause();
        audio.src = actual?.audio_file;
        audio.load();
        audio.oncanplay = () => {
          audio.play();
          setLoading(false);
          if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
              title: actual.title,
              artist: "Web Reactiva",
              album: `Episodio ${actual.number}`,
              artwork: [
                {
                  src: actual.image_url,
                  type: `image/${actual.image_url.split(".").pop()}`,
                  sizes: "256x256",
                },
                {
                  src: actual.image_url,
                  type: `image/${actual.image_url.split(".").pop()}`,
                  sizes: "512x512",
                },
              ],
            });
            navigator.mediaSession.setActionHandler("play", () => audio.play());
            navigator.mediaSession.setActionHandler("pause", () =>
              audio.pause()
            );
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
      }
    } else {
      setAudio(typeof Audio !== "undefined" ? new Audio() : null);
    }

    return () => {
      audio?.removeEventListener("ended", nextElQueue);
      audio?.removeEventListener("timeupdate", updateProgress);
      audio?.removeEventListener("play", playOn);
      audio?.removeEventListener("pause", playOff);
    };
  }, [audio, actual, nextElQueue]);

  useEffect(() => {
    if (audio && queue.length === 0) {
      audio.pause();
      audio.src = "";
      setProgress(0);
    }
  }, [queue, audio]);

  return {
    actual,
    isReady,
    play,
    queue,
    actualIndex,
    loading,
    rate,
    setActualIndex,
    changeRate,
    nextElQueue,
    prevElQueue,
    removeIndexQueue,
    tooglePlay,
  };
}
