import React, { useEffect, useRef, useState } from "react";
import "../index.css";
import AddQueue from "./addQueue";
import Header from "./header";
import Footer from "./footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Track, Vote as IVote, currentPlayingObject } from "../interfaces";
import { Queue } from "./queue";
import { Vote } from "./vote";
import { useUserId } from "../hooks/useUserId";
import axios from "axios";
import { HOST } from "../envVars";
const Wrapper: React.FC<{}> = () => {
  const [userId, setUserId] = useUserId();
  const [activeVotes, setActiveVotes] = useState<IVote[]>();
  const [activeUsers, setActiveUsers] = useState<number>(0);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track>();
  const [myQueue, setMyQueue] = useState<Track[]>([]);
  const [currentPlaying, setCurrentPlaying] = useState<currentPlayingObject>();
  const [message, setMessage] = useState<{ message: string; error: boolean }>({
    error: false,
    message: "",
  });
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(userId);
    const interval = setInterval(() => {
      if (userId) {
        //get votes state;
        axios(HOST + "/vote/", {
          method: "GET",
          headers: {
            Authorization: userId,
          },
        })
          .then((result) => {
            const { votes, activeusers } = result.data;
            if (votes) setActiveVotes(votes);
            if (activeusers) setActiveUsers(activeusers);
          })
          .catch(() => {});
      }
    }, 1200);
    return () => clearInterval(interval);
  }, [userId]);

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

        <Route element={<Navigate to="/queue" replace />} path="/" />
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
          element={
            <Vote
              userId={userId || ""}
              activeUsers={activeUsers}
              activeVotes={activeVotes}
              setActiveVotes={setActiveVotes}
            />
          }
          path="/vote"
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
