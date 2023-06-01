import data from "./podcast.json"

export interface Podcast {
  audio_file: string
  image_url: string
  isoDate: string
  number: string
  slug: string
  title: string
}

export const podcasts: Podcast[] = data
