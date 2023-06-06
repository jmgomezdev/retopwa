import PodcastItem from "@/components/PodcastItem";
import { podcasts } from "@/data/podcast";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Reproductor de podcast
          <br className="hidden sm:inline" />
          construido con Next.js, Recoil y Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Reto de programación de la comunidad malandriner de Web Reactiva
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex w-full flex-wrap justify-center gap-4 pb-4">
          {podcasts.map((podcast) => (
            <PodcastItem
              key={podcast.title}
              podcast={podcast}
              className="w-[250px]"
              aspectRatio="square"
              width={250}
              height={330}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
