import { Track as spotitrack } from "spotify-types";
import { Track } from "./interfaces";

// returns array of the times in which the tacks will be played
export const getTimes = (
  queue: spotitrack[],
  current_maxtime: number,
  current_progress: number
) => {
  let secondsStack = current_maxtime - current_progress;
  let returnArr: number[] = [];
  for (let i = 0; i < queue.length; i++) {
    returnArr.push(secondsStack);
    secondsStack += queue[i].duration_ms;
  }
  return returnArr;
};
