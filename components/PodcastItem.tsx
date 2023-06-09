import PodcastImage from "./PodcastImage";
import PodcastOptions from "./PodcastOptions";
import { Podcast } from "@/data/podcast";
import { dateFormatter } from "@/lib/format";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export default function PodcastItem({
  podcast,
  className,
  ...props
}: { podcast: Podcast } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      <PodcastImage
        aspectRatio="square"
        width={250}
        height={330}
        podcast={podcast}
      />
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
