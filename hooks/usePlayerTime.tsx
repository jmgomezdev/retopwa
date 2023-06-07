"use client";

import { audioPlayerState, progressState } from "@/global/playerState";
import { useRecoilValue } from "recoil";

export default function usePlayerTime() {
  const audio = useRecoilValue(audioPlayerState);
  const progress = useRecoilValue(progressState);

  const changeTime = (value: number) => {
    if (!audio) return 0;
    const newTime = value > audio?.duration ? audio?.duration : value;
    audio.currentTime = newTime;
  };

  return {
    changeTime,
    duration: audio?.duration ?? 0,
    progress,
  };
}
