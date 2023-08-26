import React from "react";
import Wrapper from "./components/wrapper";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Wrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
