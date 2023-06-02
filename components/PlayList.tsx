"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePlayerGlobal from "@/hooks/usePlayerGlobal";
import { cn } from "@/lib/utils";

export default function PlayList() {
  const { queue, actualIndex, setActualIndex } = usePlayerGlobal();

  return (
    <Select
      value={actualIndex.toString()}
      onChange={(value) => {
        console.log(value);
        console.log(parseInt(value));
        setActualIndex(parseInt(value));
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {queue.map((podcast, index) => (
          <SelectItem key={index} value={index.toString()}>
            {podcast.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
