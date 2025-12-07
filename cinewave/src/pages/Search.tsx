import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "../components/Header";
import { MovieCard } from "../components/MovieCard";
import { MovieModal } from "../components/MovieModal";
import { searchMovies } from "../lib/tmdb";
import type { Movie } from "../types";

export const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      searchMovies(query)
        .then((movies) => {
          setResults(movies.filter((m) => m.backdrop_path || m.poster_path));
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedMovie(null), 300);
  };

  return (
    <div className="bg-black min-h-screen">
      <Header />

      <div className="pt-24 px-4 md:px-12">
        <h1 className="text-white text-2xl md:text-3xl font-semibold mb-8">
          {query
            ? `Search results for "${query}"`
            : "Search for movies and TV shows"}
        </h1>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-lg">Searching...</div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {results.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={handleMovieSelect}
              />
            ))}
          </div>
        ) : query ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-400 text-lg">
              No results found for "{query}"
            </div>
          </div>
        ) : null}
      </div>

      {/* Movie Modal */}
      <MovieModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
