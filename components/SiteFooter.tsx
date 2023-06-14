import Controls from "./Controls";
import LineTime from "./LineTime";
import PlayList from "./PlayList";
import PlayMini from "./PlayMini";
import PlayRate from "./PlayRate";
import PodcastInfo from "./PodcastInfo";

export default function SiteFooter() {
  return (
    <footer className="sticky bottom-0 z-40 w-full border-t bg-background py-4">
      <div className="container flex flex-wrap items-center justify-between overflow-hidden sm:flex-nowrap">
        <PodcastInfo />
        <div className="order-last flex w-full max-w-3xl flex-col items-center sm:order-none">
          <Controls />
          <LineTime />
        </div>
        <div className="flex max-w-[49%] gap-4">
          <PlayMini />
          <PlayRate />
          <PlayList />
        </div>
      </div>
    </footer>
  );
}
