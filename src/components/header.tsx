import React, { useEffect, useState } from "react";
import "../index.css";
import { Track, currentPlayingObject } from "../interfaces";
import axios from "axios";
import { HOST, SERVER_PORT, UPDATE_MS } from "../envVars";

interface HeaderProps {
  myQueue: Track[];
  setMyQueue: React.Dispatch<React.SetStateAction<Track[]>>;
  setCurrentPlaying: React.Dispatch<
    React.SetStateAction<currentPlayingObject | undefined>
  >;
  currentPlaying: currentPlayingObject | undefined;
}

const Header = ({
  myQueue,
  setMyQueue,
  currentPlaying,
  setCurrentPlaying,
}: HeaderProps) => {
  const checkState = async () => {
    try {
      //updatecurrentPlaying
      const result = await axios.get(
        `http://${HOST}:${SERVER_PORT}/player/current`
      );
      if (result.status === 200) setCurrentPlaying(result.data);
      else throw new Error("error");
    } catch {
      console.log("error");
    }
  };

  // useEffect(() => {
  //   if (!currentPlaying || myQueue.length === 0) return;
  //   for (let i = 0; i < myQueue.length; i++) {
  //     if (
  //       currentPlaying.name === myQueue[i].name &&
  //       JSON.stringify(currentPlaying.artists) ===
  //         JSON.stringify(myQueue[i].artists)
  //     ) {
  //       setMyQueue((queue) => {
  //         queue.splice(i, 1);
  //         return queue;
  //       });
  //     }
  //   }
  // }, [currentPlaying]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      checkState();
    }, UPDATE_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="header-container">
      <div className="header">
        {!currentPlaying && (
          <div className="center">
            <h2 className="margin-top">הנגן לא בפעילות כרגע </h2>
          </div>
        )}
        {currentPlaying && (
          <div className="slidecontainer">
            <img
              className="img_player"
              alt=""
              height={"60px"}
              width={"60px"}
              src={currentPlaying ? currentPlaying.images[0].url : ""}
            />
            <input
              type="range"
              min="1"
              max={currentPlaying ? currentPlaying.maxtime : 1}
              value={currentPlaying ? currentPlaying.time : 0}
              className="slider"
              id="myRange"
            />
          </div>
        )}
        {currentPlaying && (
          <div className="track_info">
            <h3>{currentPlaying && currentPlaying.name}</h3>
            <h4>{currentPlaying && currentPlaying.artists}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;