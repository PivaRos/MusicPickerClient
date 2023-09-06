import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { WebSocketHost } from "../envVars";
import useWebSocket from "react-use-websocket";

export const useUserId: () => [
  string | undefined,
  React.Dispatch<React.SetStateAction<string | undefined>>
] = () => {
  const [userId, setUserId] = useState<string>();

  useWebSocket(WebSocketHost, {
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
