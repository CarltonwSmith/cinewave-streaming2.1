import axios from "axios";
import type { Movie, MovieDetails } from "../types";

const API_KEY = "4e44d9029b1270a757cddc766a1bcb63"; // TMDB public API key
const BASE_URL = "https://api.themoviedb.org/3";

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const requests = {
  fetchTrending: "/trending/all/week",
  fetchCinewaveOriginals: "/discover/tv?with_networks=213",
  fetchTopRated: "/movie/top_rated",
  fetchActionMovies: "/discover/movie?with_genres=28",
  fetchComedyMovies: "/discover/movie?with_genres=35",
  fetchHorrorMovies: "/discover/movie?with_genres=27",
  fetchRomanceMovies: "/discover/movie?with_genres=10749",
  fetchDocumentaries: "/discover/movie?with_genres=99",
};

export const fetchMovies = async (url: string): Promise<Movie[]> => {
  const response = await tmdbApi.get(url);
  return response.data.results;
};

export const fetchMovieDetails = async (
  id: number,
  mediaType = "movie",
): Promise<MovieDetails> => {
  const response = await tmdbApi.get(`/${mediaType}/${id}`, {
    params: {
      append_to_response: "videos",
    },
  });
  return response.data;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query) return [];
  const response = await tmdbApi.get("/search/multi", {
    params: {
      query,
    },
  });
  return response.data.results;
};

export const getImageUrl = (path: string, size = "original") => {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getTrailerKey = (videos?: {
  results: Array<{ key: string; type: string; site: string }>;
}): string | null => {
  if (!videos?.results) return null;

  const trailer = videos.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );

  return trailer?.key || videos.results[0]?.key || null;
};
