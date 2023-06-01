import { atom, atomFamily } from "recoil";

export const playState = atom({
  key: "playState",
  default: false,
});

export const podcastSelectedState = atom({
  key: "podcastSelectedState",
  default: 0,
});

export const queueState = atom({
  key: "queueState",
  default: [],
});
