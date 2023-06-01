"use client";

import { useRef } from "react";
import {
  playState,
  podcastSelectedState,
  queueState,
} from "@/global/playerState";
import { useRecoilState, useRecoilValue } from "recoil";

// export default function Player() {
//   const play = useRecoilValue(playState);
//   const urls = useRecoilValue(queueState);
// }
export default function Player2() {
  const [play, setPlay] = useRecoilState(playState);
  const [urls, setUrls] = useRecoilState(queueState);
  const [actualIndex, setActualIndex] = useRecoilState(podcastSelectedState);

  const audioRef = useRef();
  const progressBarRef = useRef();

  const handleNext = () => {
    if (actualIndex >= urls.length - 1) {
      setActualIndex(0);
    }
    setActualIndex((prev) => prev + 1);
    setPlay(true);
  };

  const handlePrev = () => {
    if (actualIndex === 0) {
      setActualIndex(actualIndex);
    }
    setActualIndex((prev) => prev - 1);
    setPlay(true);
  };

  console.log(urls[actualIndex]);

  return (
    <div>
      <audio
        ref={audioRef}
        src={urls[actualIndex]}
        onEnded={handleNext}
        controls
        autoPlay={play}
      />
    </div>
  );
}
