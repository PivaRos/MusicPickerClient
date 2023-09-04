import { Track } from "../interfaces";
import { Track as SpotiTrack } from "spotify-types";
import { useEffect, useState } from "react";
import { getTimes } from "../utility";
import {
  MdSignalCellularAlt1Bar,
  MdSignalCellularAlt2Bar,
  MdSignalCellularAlt,
} from "react-icons/md";

interface TracksGridProps {
  queue: SpotiTrack[];
  current_maxtime: number;
  current_progress: number;
  withTime?: boolean;
}

const icon1 = (
  <MdSignalCellularAlt1Bar
    className="time-icon"
    color="green"
    height={5}
    width={5}
  />
);
const icon2 = (
  <MdSignalCellularAlt2Bar
    className="time-icon"
    color="green"
    height={5}
    width={5}
  />
);
const icon3 = (
  <MdSignalCellularAlt
    className="time-icon"
    color="green"
    height={5}
    width={5}
  />
);

export const TracksGrid = ({
  current_maxtime,
  queue,
  current_progress,
  withTime,
}: TracksGridProps) => {
  const [timesArr, setTimesArr] = useState<number[]>([]); //  seconds
  const [animationIcon, setAnimationIcon] = useState({
    name: "icon1",
    node: icon1,
  });
  useEffect(() => {
    withTime && setTimesArr(getTimes(queue, current_maxtime, current_progress));
  }, [queue]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(animationIcon.name);
      if (animationIcon.name === "icon1") {
        setAnimationIcon({ name: "icon2", node: icon2 });
      }
      if (animationIcon.name === "icon2") {
        setAnimationIcon({ name: "icon3", node: icon3 });
      }

      if (animationIcon.name === "icon3") {
        setAnimationIcon({ name: "icon1", node: icon1 });
      }
    }, 1300);
    return () => clearInterval(interval);
  }, [animationIcon]);
  return (
    <ul className="TracksGrid">
      {queue.map((track: SpotiTrack, index) => {
        return (
          <li key={"track-" + index} className="result-li">
            <div className="results-div" onClick={() => {}}>
              <img
                className="image-results"
                src={track.album.images[0].url}
                height="35px"
                width="35px"
              />
              <div>
                <h3>{track.name}</h3>
                <h4>
                  {track.artists.map((artist, index) => {
                    return artist.name;
                  })}
                </h4>
              </div>
              {withTime && (
                <label className="time-label">
                  {animationIcon.node}
                  {!Number.isNaN(timesArr[index]) &&
                    Math.round(timesArr[index] / 1000 / 60)}
                </label>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
