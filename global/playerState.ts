import { Podcast } from "@/data/podcast";
import { atom, selector } from "recoil";

export const playState = atom<boolean>({
  key: "playState",
  default: false,
});

export const progressState = atom<number>({
  key: "progressState",
  default: 0,
});


export const audioPlayerState = atom<HTMLAudioElement | null>({
  key: "audioPlayerState",
  default: null,
});

export const queueState = atom<[Podcast] | []>({
  key: "queueState",
  default: [],
});

export const actualIndexState = atom<number>({
  key: "actualIndexState",
  default: 0,
});

export const ActualState = selector({
  key: "ActualState",
  get: ({ get }) => {
    const queue = get(queueState);
    const actualIndex = get(actualIndexState);
    if (queue === null || actualIndex === null) {
      return null;
    }
    return queue?.[actualIndex];
  },
});
