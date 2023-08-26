import React, { useEffect, useRef } from "react";
import "../index.css";
import { HOST, SERVER_PORT } from "../envVars";
import { SearchResult, Track, currentPlayingObject } from "../interfaces";
import axios from "axios";
import { MyQueue } from "./myQueue";
import { error } from "console";

interface AddQueueProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  searchResults: any[];
  setSearchResults: React.Dispatch<React.SetStateAction<any[]>>;

  selectedTrack: Track | undefined;
  setSelectedTrack: React.Dispatch<React.SetStateAction<Track | undefined>>;

  myQueue: Track[];
  setMyQueue: React.Dispatch<React.SetStateAction<Track[]>>;

  setCurrentPlaying: React.Dispatch<
    React.SetStateAction<currentPlayingObject | undefined>
  >;
  currentPlaying: currentPlayingObject | undefined;

  message: {
    message: string;
    error: boolean;
  };
  setMessage: React.Dispatch<
    React.SetStateAction<{
      message: string;
      error: boolean;
    }>
  >;
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
  currentPlaying,
  setCurrentPlaying,
  message,
  setMessage,
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
        setSearchResults(result.data);
      }
    } catch {}
  };

  const TrackClick = (Track: Track) => {
    setSelectedTrack(Track);
    drawerRef.current?.classList.add("drawer_open");
  };

  return (
    <div className="addQueue">
      <div className="binder_input_results">
        <div className="input_div">
          <input
            placeholder="הוסף מוזיקה לרשימה"
            className="search-input"
            value={query}
            onChange={(text) => setQuery(text.target.value)}
          />
        </div>
        <MyQueue
          currentPlaying={currentPlaying}
          setCurrentPlaying={setCurrentPlaying}
          myQueue={myQueue}
          setMyQueue={setMyQueue}
        />
        <div className="myQueue">
          {myQueue.length > 0 && (
            <MyQueue
              currentPlaying={currentPlaying}
              myQueue={myQueue}
              setCurrentPlaying={setCurrentPlaying}
              setMyQueue={setMyQueue}
            />
          )}
          {query.length > 2 && (
            <ul className="results-ui">
              {searchResults.map((result: SearchResult, index: number) => {
                return (
                  <li key={"track-" + index} className="result-li">
                    <div
                      className="results-div"
                      onClick={() => TrackClick(result)}
                    >
                      <img
                        className="image-results"
                        src={result.images[0].url}
                        height="35px"
                        width="35px"
                      />
                      <div>
                        <h3>{result.name}</h3>
                        <h4>{result.artists}</h4>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
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
              if (result.status === 200) {
                drawerRef.current?.classList.remove("drawer_open");
                setQuery("");
                setSearchResults([]);
                setMessage({
                  message: "השיר נוסף בהצלחה לרשימה",
                  error: false,
                });
                //handle myQueue;
              }
            } catch (e: any) {
              switch (e.response.status) {
                case 500:
                  setMessage({
                    message: "אופס נראה שקרתה תקלה אנא נסה שנית מאוחר יותר",
                    error: true,
                  });
                  break;
                case 429:
                  setMessage({
                    message: "המערכת עמוסה השירות לא זמין כרגע ):",
                    error: true,
                  });
                  break;
                case 400:
                  if (e.response.data.error_type === "ALREADY_ADD") {
                    setMessage({
                      message: "כבר הוספת שיר לסבב זה",
                      error: true,
                    });
                  } else {
                    setMessage({
                      message: "ז'אנר של השיר לא מקובל",
                      error: true,
                    });
                  }
                  break;
                case 503:
                  setMessage({
                    message: "שיר זה קיים כבר בסבב זה",
                    error: true,
                  });
                  break;
              }
            }
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
