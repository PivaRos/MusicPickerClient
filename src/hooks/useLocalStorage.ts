import { useEffect, useState } from "react";
import { Track } from "../interfaces";

export const useLocalStorage = (
  storageKey: string,
  fallbackState: any
): [Track[], React.Dispatch<React.SetStateAction<Track[]>>] => {
  const [value, setValue] = useState<Track[]>(
    JSON.parse(localStorage.getItem(storageKey) || "") ?? fallbackState
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return [value, setValue];
};
