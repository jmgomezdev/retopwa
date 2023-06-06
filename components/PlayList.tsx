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
import { ListVideo, ListX, Play } from "lucide-react";

export default function PlayList() {
  const { queue, actualIndex, setActualIndex } = usePlayerGlobal();

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
      <SheetTrigger>
        <Button variant="ghost" size="sm" className="w-9 p-0">
          <ListVideo className="h-6 w-6" />
          <span className="sr-only">Playlist</span>
        </Button>
      </SheetTrigger>
      {/* <SheetContent position="right" size="sm"> */}
      <SheetContent position="bottom" size="content">
        <SheetHeader>
          <SheetTitle>PlayList</SheetTitle>
        </SheetHeader>
        <ul>
          {queue.map((podcast, index) => (
            <li
              key={index}
              value={index.toString()}
              className={cn(
                "flex justify-between w-full",
                actualIndex === index && "selected"
              )}
            >
              <div className="flex gap-4">
                <span>{podcast.title}</span>
                <span>
                  {podcast?.isoDate
                    ? dateFormatter.format(new Date(podcast.isoDate))
                    : "Desconocido"}
                </span>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" onClick={() => setActualIndex(index)}>
                  <Play className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  // onClick={() => tooglePlay()}
                >
                  <ListX className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
