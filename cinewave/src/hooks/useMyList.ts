import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import type { Movie } from "../types";

const MY_LIST_STORAGE_KEY = "cinewave_my_list";

export const useMyList = () => {
  const { user } = useAuth();
  const [myList, setMyList] = useState<Movie[]>([]);

  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`${MY_LIST_STORAGE_KEY}_${user.id}`);
      if (stored) {
        setMyList(JSON.parse(stored));
      }
    } else {
      setMyList([]);
    }
  }, [user]);

  const addToList = (movie: Movie) => {
    if (!user) return;

    const newList = [...myList, movie];
    setMyList(newList);
    localStorage.setItem(
      `${MY_LIST_STORAGE_KEY}_${user.id}`,
      JSON.stringify(newList),
    );
  };

  const removeFromList = (movieId: number) => {
    if (!user) return;

    const newList = myList.filter((movie) => movie.id !== movieId);
    setMyList(newList);
    localStorage.setItem(
      `${MY_LIST_STORAGE_KEY}_${user.id}`,
      JSON.stringify(newList),
    );
  };

  const isInList = (movieId: number) => {
    return myList.some((movie) => movie.id === movieId);
  };

  return { myList, addToList, removeFromList, isInList };
};
