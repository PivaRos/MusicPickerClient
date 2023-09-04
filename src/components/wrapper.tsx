import React, { useEffect, useRef, useState } from "react";
import "../index.css";
import AddQueue from "./addQueue";
import Header from "./header";
import Footer from "./footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Track, currentPlayingObject } from "../interfaces";
import { Queue } from "./queue";
import { Vote } from "./vote";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Wrapper: React.FC<{}> = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track>();
  const [myQueue, setMyQueue] = useLocalStorage("myQueue", []);
  const [currentPlaying, setCurrentPlaying] = useState<currentPlayingObject>();
  const [message, setMessage] = useState<{ message: string; error: boolean }>({
    error: false,
    message: "",
  });
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mover1: NodeJS.Timeout, mover2: NodeJS.Timeout;

    const timeForMessageMS = 4500;
    if (message.message !== "" && messageRef.current) {
      if (message.error) {
        messageRef.current.classList.add("error_message");
      }
      messageRef.current?.classList.add("message_open");
      mover1 = setTimeout(() => {
        messageRef.current?.classList.remove("message_open");
      }, timeForMessageMS);
      mover2 = setTimeout(() => {
        setMessage({ error: false, message: "" });
        messageRef.current?.classList.remove("error_message");
      }, timeForMessageMS + 1000);
    }

    return () => {
      clearTimeout(mover1);
      clearTimeout(mover2);
    };
  }, [message]);

  return (
    <div className="wrapper">
      <Header
        currentPlaying={currentPlaying}
        setCurrentPlaying={setCurrentPlaying}
      />
      <Routes>
        <Route
          element={<Queue currentPlaying={currentPlaying} />}
          path="/queue"
        />
        <Route element={<Vote />} path="/vote" />
        <Route
          element={
            <AddQueue
              message={message}
              setMessage={setMessage}
              currentPlaying={currentPlaying}
              setCurrentPlaying={setCurrentPlaying}
              myQueue={myQueue}
              setMyQueue={setMyQueue}
              selectedTrack={selectedTrack}
              setSelectedTrack={setSelectedTrack}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              query={query}
              setQuery={setQuery}
            />
          }
          path="/queue/add"
        />
        <Route
          path="/*"
          element={
            <div>
              <h2>not found !</h2>
            </div>
          }
        />
      </Routes>
      <Footer />
      <div ref={messageRef} className="message ">
        <h3>{message.message}</h3>
      </div>
    </div>
  );
};

export default Wrapper;
