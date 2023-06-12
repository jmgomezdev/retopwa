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
import usePlayerAdd from "@/hooks/usePlayerAdd";
import {
  ExternalLink,
  ListPlus,
  MoreHorizontal,
  Play,
  Share2,
} from "lucide-react";
import { HtmlHTMLAttributes } from "react";

interface PodcastOptionsProps extends HtmlHTMLAttributes<HTMLDivElement> {
  podcast: Podcast;
}

export default function PodcastOptions({ podcast }: PodcastOptionsProps) {
  const { loadPodcast, addToQueue } = usePlayerAdd(podcast);

  const handleShare = async () => {
    if ("canShare" in navigator) {
      try {
        await navigator.share({
          title: `WR ${podcast.number}`,
          text: podcast.title,
          url: podcast.link,
        });
      } catch (error) {
        console.log("Navegador no soporta share");
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost">
          <MoreHorizontal className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem onClick={loadPodcast}>
          <Play className="mr-2 h-4 w-4" />
          Reproducir
        </DropdownMenuItem>
        <DropdownMenuItem onClick={addToQueue}>
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
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label=">Ir a la web"
            href={podcast.link}
          >
            Ir a la web
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShare}>
          <Share2 className="mr-2 h-4 w-4" />
          Compartir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
