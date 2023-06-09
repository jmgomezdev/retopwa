import data from "./podcast.json";

export interface Podcast {
  audio_file: string;
  guid: string;
  image_url: string;
  isoDate: string;
  link: string;
  number: string;
  slug: string;
  title: string;
}

export const podcasts: Podcast[] = data;
