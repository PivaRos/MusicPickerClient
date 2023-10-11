import React, { useEffect } from "react";
import Wrapper from "./components/wrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminPage } from "./components/adminPage";
import { API } from "./Network";
import { useQuery, QueryClient } from "react-query";

function App() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["AppConfig"],
    queryFn: API.public.getAppConfig,
    refetchInterval: 1500,
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<AdminPage />} path="/admin" />
          {data && data.enableApp === "true" && (
            <Route path="/*" element={<Wrapper appConfig={data} />} />
          )}
          <Route
            path="/*"
            element={
              <div>
                <h2>נראה שהגעת לעמוד שלא קיים {"):"}</h2>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
