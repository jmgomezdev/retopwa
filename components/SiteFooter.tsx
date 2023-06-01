import AudioPlayer from "./AudioPlayer";
import Player from "./Player";

export default function SiteFooter() {
  return (
    <footer className="sticky bottom-0 z-40 h-16 w-full border-b bg-background">
      <div className="container flex items-center space-x-4 sm:justify-between sm:space-x-0">
        <AudioPlayer />
      </div>
    </footer>
  );
}
