"use client";

import { Podcast } from "@/data/podcast";
import { actualIndexState, queueState } from "@/global/playerState";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

export default function usePlayerAdd(podcast: Podcast) {
  const setQueue = useSetRecoilState(queueState);
  const setActualIndex = useSetRecoilState(actualIndexState);

  const loadPodcast = useCallback(() => {
    setQueue([podcast]);
    setActualIndex(0);
  }, [setQueue, setActualIndex, podcast]);

  const addToQueue = useCallback(() => {
    setQueue((prev) =>
      prev.some((item) => item.guid === podcast.guid)
        ? prev
        : [...prev, podcast]
    );
  }, [setQueue, podcast]);
  return { loadPodcast, addToQueue };
}
