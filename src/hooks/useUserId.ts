import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import useWebSocket from "react-use-websocket";

const WEBSOCKETHOST =
  import.meta.env.VITE_WEBSOCKETHOST || "wss://localhost:8000/ws/";

export const useUserId: () => [
  string | undefined,
  React.Dispatch<React.SetStateAction<string | undefined>>
] = () => {
  const [userId, setUserId] = useState<string>();

  useWebSocket(WEBSOCKETHOST, {
    onMessage: (message) => {
      const { userid } = JSON.parse(message.data);
      if (userid) setUserId(userid);
    },
    onOpen: () => {
      console.log("connection opened");
    },
    onClose: () => {
      console.log("connection closed");
    },
  });

  return [userId, setUserId];
};
