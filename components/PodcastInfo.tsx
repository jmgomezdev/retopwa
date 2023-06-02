"use client";

import usePlayerGlobal from "@/hooks/usePlayerGlobal";
import { dateFormatter } from "@/lib/format";

export default function PodcastInfo() {
  const { actual } = usePlayerGlobal();
  return (
    <div className="flex w-full max-w-sm flex-col">
      <span>{actual?.title}</span>
      <span>
        {actual?.isoDate
          ? dateFormatter.format(new Date(actual.isoDate))
          : "Desconocido"}
      </span>
    </div>
  );
}
