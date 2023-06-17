"use client";

import usePlayerGlobal from "@/hooks/usePlayerGlobal";
import { dateFormatter } from "@/lib/format";

export default function PodcastInfo() {
  const { actual } = usePlayerGlobal();
  console.log("rener info");
  return (
    <span className="w-full overflow-hidden text-ellipsis whitespace-nowrap sm:max-w-xs sm:whitespace-normal">
      {actual?.title ?? "Ningún podcast seleccionado"}
    </span>
    // <div className="flex w-full max-w-xs flex-col">
    //   <span>{actual?.title}</span>
    //   <span>
    //     {actual?.isoDate
    //       ? dateFormatter.format(new Date(actual.isoDate))
    //       : "Desconocido"}
    //   </span>
    // </div>
  );
}
