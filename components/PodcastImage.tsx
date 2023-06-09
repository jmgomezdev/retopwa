"use client";

import { Podcast } from "@/data/podcast";
import usePlayerAdd from "@/hooks/usePlayerAdd";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface PoscastImageProps extends HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  podcast: Podcast;
}

export default function PodcastImage({
  podcast,
  width,
  height,
  aspectRatio,
}: PoscastImageProps) {
  const { loadPodcast } = usePlayerAdd(podcast);

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex items-center justify-center overflow-hidden rounded-md hover:cursor-pointer"
      onClick={loadPodcast}
      aria-hidden="true"
    >
      <Image
        src={podcast.image_url}
        alt={podcast.title}
        width={width}
        height={height}
        className={cn(
          "h-auto w-auto object-cover transition-all hover:scale-105",
          aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
        )}
      />
    </div>
  );
}
