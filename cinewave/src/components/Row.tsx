import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { Movie } from "../types";
import { MovieCard } from "./MovieCard";
import { Button } from "./ui/button";

interface RowProps {
  title: string;
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

export const Row = ({ title, movies, onMovieSelect }: RowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="space-y-2 md:space-y-4 px-4 md:px-12">
      <h2 className="text-white text-lg md:text-2xl font-semibold">{title}</h2>

      <div className="group relative">
        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-0 bottom-0 z-40 h-full w-12 rounded-none bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        {/* Movies Container */}
        <div
          ref={rowRef}
          className="flex space-x-2 md:space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="min-w-[150px] md:min-w-[250px]">
              <MovieCard movie={movie} onSelect={onMovieSelect} />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 bottom-0 z-40 h-full w-12 rounded-none bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};
