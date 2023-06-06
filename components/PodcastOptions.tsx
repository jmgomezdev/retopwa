"use client";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Podcast } from "@/data/podcast";
import usePlayerGlobal from "@/hooks/usePlayerGlobal";
import {
  ExternalLink,
  ListPlus,
  MoreHorizontal,
  Play,
  PlusCircle,
  Share2,
} from "lucide-react";
import { HtmlHTMLAttributes } from "react";

interface PodcastOptionsProps extends HtmlHTMLAttributes<HTMLDivElement> {
  podcast: Podcast;
}

export default function PodcastOptions({ podcast }: PodcastOptionsProps) {
  const { loadPodcast, addToQueue } = usePlayerGlobal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={() => loadPodcast(podcast)}>
          <Play className="mr-2 h-4 w-4" />
          Reproducir
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => addToQueue(podcast)}>
          <ListPlus className="mr-2 h-4 w-4" />
          Añadir a la cola
        </DropdownMenuItem>
        {/* <DropdownMenuSub>
      <DropdownMenuSubTrigger>Add to Playlist</DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="w-48">
        <DropdownMenuItem>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Playlist
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {playlists.map((playlist) => (
          <DropdownMenuItem key={playlist}>
            <ListMusic className="mr-2 h-4 w-4" /> {playlist}
          </DropdownMenuItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ExternalLink className="mr-2 h-4 w-4" />
          Ir a la web
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Share2 className="mr-2 h-4 w-4" />
          Compartir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
