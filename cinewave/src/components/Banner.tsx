import { Info, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { getImageUrl } from "../lib/tmdb";
import type { Movie } from "../types";
import { Button } from "./ui/button";

interface BannerProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

export const Banner = ({ movies, onMovieSelect }: BannerProps) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (movies && movies.length > 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(randomMovie);
    }
  }, [movies]);

  if (!movie) return null;

  const title =
    movie.title || movie.name || movie.original_title || movie.original_name;
  const imageUrl = getImageUrl(movie.backdrop_path, "original");

  const truncate = (str: string, n: number) => {
    return str?.length > n ? `${str.substr(0, n - 1)}...` : str;
  };

  return (
    <div className="relative h-[60vh] md:h-[80vh] flex items-end pb-24 md:pb-32">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 md:px-12 max-w-2xl">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4">
          {title}
        </h1>

        <p className="text-sm md:text-lg text-white mb-6 leading-relaxed">
          {truncate(movie.overview, 150)}
        </p>

        <div className="flex items-center space-x-3">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90"
            onClick={() => onMovieSelect(movie)}
          >
            <Play className="mr-2 h-5 w-5 fill-current" />
            Play
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="bg-gray-500/70 text-white hover:bg-gray-500/50"
            onClick={() => onMovieSelect(movie)}
          >
            <Info className="mr-2 h-5 w-5" />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};
