import { Track, currentPlayingObject } from "../interfaces";

interface MyQueueProps {
  myQueue: Track[];
  setMyQueue: React.Dispatch<React.SetStateAction<Track[]>>;
  setCurrentPlaying: React.Dispatch<
    React.SetStateAction<currentPlayingObject | undefined>
  >;
  currentPlaying: currentPlayingObject | undefined;
}

export const MyQueue = ({
  myQueue,
  setMyQueue,
  setCurrentPlaying,
  currentPlaying,
}: MyQueueProps) => {
  return (
    <div>
      {myQueue.length > 0 && (
        <div className="my_queue">
          <h4>התור שלי</h4>
          {myQueue.map((Track) => {
            return (
              <div>
                <h3>{Track.name}</h3>
                <h4>{Track.artists}</h4>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
