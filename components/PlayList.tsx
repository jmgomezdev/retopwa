"use client";

import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import usePlayerGlobal from "@/hooks/usePlayerGlobal";
import { dateFormatter } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ListVideo, ListX, Pause, Play } from "lucide-react";

export default function PlayList() {
  const {
    queue,
    actualIndex,
    play,
    setActualIndex,
    removeIndexQueue,
    tooglePlay,
  } = usePlayerGlobal();

  return (
    // <Select
    //   value={actualIndex.toString()}
    //   onChange={(value) => {
    //     console.log(value);
    //     console.log(parseInt(value));
    //     setActualIndex(parseInt(value));
    //   }}
    // >
    <Sheet>
      <SheetTrigger className="inline-flex h-10 items-center justify-center rounded-md bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <ListVideo className="h-6 w-6" />
        <span className="sr-only">Playlist</span>
      </SheetTrigger>
      {/* <SheetContent position="right" size="sm"> */}
      <SheetContent position="bottom" size="content">
        <SheetHeader>
          <SheetTitle>Cola de reproducción</SheetTitle>
        </SheetHeader>
        <ul>
          {queue?.length > 0 ? (
            queue.map((podcast, index) => (
              <li
                key={index}
                value={index.toString()}
                className={cn(
                  "flex w-full items-center justify-between",
                  actualIndex === index && "font-bold"
                )}
              >
                <div className="flex items-center gap-4">
                  <span>{podcast.title}</span>
                  <span>
                    {podcast?.isoDate
                      ? dateFormatter.format(new Date(podcast.isoDate))
                      : "Desconocido"}
                  </span>
                </div>
                <div className="flex items-center  gap-1">
                  {actualIndex === index ? (
                    <Button variant="ghost" onClick={() => tooglePlay()}>
                      {play ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      onClick={() => setActualIndex(index)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={() => removeIndexQueue(index)}
                  >
                    <ListX className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))
          ) : (
            <li>No hay podcasts en la cola</li>
          )}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
