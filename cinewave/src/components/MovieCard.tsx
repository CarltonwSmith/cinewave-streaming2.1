import { Check, Info, Play, Plus } from "lucide-react";
import { useState } from "react";
import { useMyList } from "../hooks/useMyList";
import { getImageUrl } from "../lib/tmdb";
import type { Movie } from "../types";
import { Button } from "./ui/button";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
}

export const MovieCard = ({ movie, onSelect }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInList, addToList, removeFromList } = useMyList();
  const inList = isInList(movie.id);

  const handleListToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inList) {
      removeFromList(movie.id);
    } else {
      addToList(movie);
    }
  };

  const title =
    movie.title || movie.name || movie.original_title || movie.original_name;
  const imageUrl = getImageUrl(
    movie.backdrop_path || movie.poster_path,
    "w500",
  );

  return (
    <div
      className="relative group cursor-pointer transition-transform duration-300 ease-out hover:scale-110 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(movie)}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-32 md:h-40 object-cover rounded-md"
        loading="lazy"
      />

      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent rounded-md flex flex-col justify-end p-3 md:p-4">
          <h3 className="text-white font-semibold text-sm md:text-base mb-2 line-clamp-1">
            {title}
          </h3>

          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              className="h-8 w-8 bg-white hover:bg-white/80 text-black"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(movie);
              }}
            >
              <Play className="h-4 w-4 fill-current" />
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 bg-transparent border-2 border-white/50 hover:border-white text-white"
              onClick={handleListToggle}
            >
              {inList ? (
                <Check className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
            </Button>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 bg-transparent border-2 border-white/50 hover:border-white text-white"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(movie);
              }}
            >
              <Info className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center mt-2 space-x-2 text-xs">
            <span className="text-green-500 font-semibold">
              {Math.round(movie.vote_average * 10)}% Match
            </span>
            {movie.release_date && (
              <span className="text-gray-400">
                {new Date(movie.release_date).getFullYear()}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
