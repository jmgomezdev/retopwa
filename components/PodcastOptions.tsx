"use client";

import { HtmlHTMLAttributes } from "react";
import { Podcast } from "@/data/podcast";
import { playState, queueState } from "@/global/playerState";
import {
  ExternalLink,
  ListMusic,
  MoreHorizontal,
  Play,
  PlusCircle,
  Share2,
} from "lucide-react";
import { useSetRecoilState } from "recoil";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "./ui/button";

interface PodcastOptionsProps extends HtmlHTMLAttributes<HTMLDivElement> {
  podcast: Podcast;
}

export default function PodcastOptions({ podcast }: PodcastOptionsProps) {
  const addPodcastToQueue = useSetRecoilState(queueState);
  const updatePlay = useSetRecoilState(playState);

  const handlePlayNew = () => {
    addPodcastToQueue([podcast]);
    updatePlay(true);
  };

  const handleAddQueue = () => {
    addPodcastToQueue((prev) => [...prev, podcast]);
    updatePlay(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={handlePlayNew}>
          <Play className="mr-2 h-4 w-4" />
          Reproducir
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleAddQueue}>
          <PlusCircle className="mr-2 h-4 w-4" />
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
