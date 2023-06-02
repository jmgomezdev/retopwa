import Controls from "./Controls";
import LineTime from "./LineTime";
import PlayList from "./PlayList";
import PodcastInfo from "./PodcastInfo";
import { Podcast } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="sticky bottom-0 z-40 h-16 w-full border-b bg-background">
      <div className="container flex items-center space-x-4 sm:justify-between sm:space-x-0">
        <PodcastInfo />
        <div className="flex w-full max-w-4xl flex-col items-center">
          <Controls />
          <LineTime />
        </div>
        <PlayList />
      </div>
    </footer>
  );
}
