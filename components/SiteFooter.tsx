import Controls from "./Controls";
import LineTime from "./LineTime";
import PlayList from "./PlayList";
import PlayMini from "./PlayMini";
import PlayRate from "./PlayRate";
import PodcastInfo from "./PodcastInfo";

export default function SiteFooter() {
  return (
    <footer className="sticky bottom-0 z-40 w-full border-t bg-background px-4 py-4 sm:px-0">
      <div className="flex w-full flex-wrap items-center justify-between overflow-hidden sm:container sm:flex-nowrap">
        <PodcastInfo />
        <div className="order-last flex w-full max-w-3xl flex-col items-center sm:order-none">
          <Controls />
          <LineTime />
        </div>
        <div className="flex w-full justify-center gap-4 py-2 sm:w-auto sm:py-0">
          <PlayMini />
          <PlayRate />
          <PlayList />
        </div>
      </div>
    </footer>
  );
}
