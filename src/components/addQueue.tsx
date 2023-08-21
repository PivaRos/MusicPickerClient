import React, { useEffect, useRef } from "react";
import "../index.css";
import { HOST, SERVER_PORT } from "../envVars";
import { SearchResult, Track } from "../interfaces";
import axios from "axios";

interface AddQueueProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResults: any[];
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;

  selectedTrack: Track | undefined;
  setSelectedTrack: React.Dispatch<React.SetStateAction<Track | undefined>>;

  myQueue: Track[];
  setMyQueue: React.Dispatch<React.SetStateAction<Track[]>>;
}

const AddQueue = ({
  query,
  setQuery,
  searchResults,
  setSearchResults,
  selectedTrack,
  setSelectedTrack,
  myQueue,
  setMyQueue,
}: AddQueueProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      RunEvent(query);
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  const drawerRef = useRef<HTMLDivElement>(null);

  const RunEvent = async (query: string) => {
    try {
      if (query && query !== "") {
        const result = await axios.get(
          `http://${HOST}:${SERVER_PORT}/search/${query}`,
          {}
        );
        console.log(result.data);
        setSearchResults(result.data);
      }
    } catch {}
  };

  useEffect(() => {
    let listener;
    if (drawerRef.current) {
      listener = drawerRef.current.addEventListener("blur", () => {
        drawerRef.current?.classList.remove("drawer_open");
      });
    }
    return drawerRef.current && listener !== undefined
      ? drawerRef.current.removeEventListener("blur", listener)
      : undefined;
  }, []);

  const TrackClick = (Track: Track) => {
    setSelectedTrack(Track);
    drawerRef.current?.classList.add("drawer_open");
  };

  return (
    <div className="addQueue">
      <div className="binder_input_results">
        <div className="input_div">
          <input
            className="search-input"
            value={query}
            onChange={(text) => setQuery(text.target.value)}
          />
        </div>
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
        <div>
          <ul className="results-ui">
            {searchResults.map((result: SearchResult, index: number) => {
              return (
                <li key={"tack-" + index} className="result-li">
                  <div onClick={() => TrackClick(result)}>
                    <h3>{result.name}</h3>
                    <h4>{result.artists}</h4>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div ref={drawerRef} className="addToQueue_drawer">
        <div
          className="close_queue_drawer"
          onClick={() => {
            if (drawerRef.current) {
              drawerRef.current.classList.remove("drawer_open");
            }
          }}
        >
          <h2 className="">x</h2>
        </div>
        <div className="image_add_queue">
          <img height={200} width={200} src={selectedTrack?.images[0].url} />
          <div className="track_info_add_to_queue">
            <h2>{selectedTrack?.name}</h2>
            <h3>{selectedTrack?.artists}</h3>
          </div>
        </div>

        <div
          onClick={async () => {
            try {
              const result = await axios.get(
                `http://${HOST}:${SERVER_PORT}/queue/add/${selectedTrack?.uri}`
              );
              console.log(result.status);
              if (result.status === 200) {
                drawerRef.current?.classList.remove("drawer_open");
                setMyQueue((queue) => {
                  if (selectedTrack) queue.push(selectedTrack);
                  return queue;
                });
              } else {
                if (result.status === 500) {
                  // error mess
                }
                if (result.status === 429) {
                  //message to many requests
                }
                if (result.status === 400) {
                  if (
                    result.data.error_type &&
                    result.data.error_type === "ALREADY_ADD"
                  ) {
                    console.log("already add track in the last round");
                    //already add message
                  }
                  if (
                    result.data.error_type &&
                    result.data.error_type === "GENRE_NOT_ALLOWED"
                  ) {
                    //genre not allowed message
                  }
                }
              }
            } catch {}
          }}
          className="add_To_Queue"
        >
          <h2 className="textADD">הוסף לתור</h2>
        </div>
      </div>
    </div>
  );
};

export default AddQueue;
