import React from "react";
import Wrapper from "./components/wrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminPage } from "./components/adminPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<AdminPage />} path="/admin" />
          <Route path="/*" element={<Wrapper />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
