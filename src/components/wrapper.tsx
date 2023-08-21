import React, { useState } from "react";
import "../index.css";
import AddQueue from "./addQueue";
import Header from "./header";
import Footer from "./footer";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Track } from "../interfaces";

const Wrapper: React.FC<{}> = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<Track>();
  const [myQueue, setMyQueue] = useState<Track[]>([]);
  return (
    <div className="wrapper">
      <Header myQueue={myQueue} setMyQueue={setMyQueue} />
      <Router>
        <Routes>
          <Route
            element={
              <AddQueue
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
            path="/react/queue"
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
      </Router>
      <Footer />
    </div>
  );
};

export default Wrapper;
