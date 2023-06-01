import { HTMLAttributes } from "react";
import Image from "next/image";
import { Podcast } from "@/data/podcast";

import { dateFormatter } from "@/lib/format";
import { cn } from "@/lib/utils";

import PodcastOptions from "./PodcastOptions";

interface PoscastItemProps extends HTMLAttributes<HTMLDivElement> {
  podcast: Podcast;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

export default function PodcastItem({
  podcast,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: PoscastItemProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <div className="overflow-hidden rounded-md">
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

      <div className="flex items-center justify-between">
        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none">
            Web Reactiva: {podcast.number}
          </h3>
          <p className="text-xs text-muted-foreground">
            {podcast.isoDate
              ? dateFormatter.format(new Date(podcast.isoDate))
              : "Desconocido"}
          </p>
        </div>
        <PodcastOptions podcast={podcast} />
      </div>
    </div>
  );
}
