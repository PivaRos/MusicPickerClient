import { Track as SpotiTrack } from "spotify-types";

export interface SearchResult extends Track {}

export interface Vote {
  votes: number;
  type: votes;
}

export enum votes {
  VolumeUp = "VOLUMEUP",
  VolumeDown = "VOLUMEDOWN",
  Skip = "SKIP",
}

export interface Track {
  uri: string;
  name: string;
  artists: string[];
  images: image[];
}

export interface image {
  height: number;
  width: number;
  url: string;
}

export interface currentPlayingObject {
  currentlyPlaying: boolean;
  time: number;
  maxtime: number;
  uri: string;
  images: image[];
  name: string;
  genres: string[];
  artists: string[];
  queue: SpotiTrack[];
}
