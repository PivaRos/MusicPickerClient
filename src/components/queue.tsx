import { Track, currentPlayingObject } from "../interfaces";
import { TracksGrid } from "./tracksGrid";

interface QueueProps {
  currentPlaying: currentPlayingObject | undefined;
}
export const Queue = ({ currentPlaying }: QueueProps) => {
  if (!currentPlaying) return <div></div>; // if no currentPlaying object
  return (
    <div className="queuePage">
      <TracksGrid
        queue={currentPlaying.queue}
        current_maxtime={currentPlaying.maxtime}
        current_progress={currentPlaying.time}
        withTime
      />
    </div>
  );
};
