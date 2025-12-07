import { useState } from "react";
import { Header } from "../components/Header";
import { MovieCard } from "../components/MovieCard";
import { MovieModal } from "../components/MovieModal";
import { useMyList } from "../hooks/useMyList";
import type { Movie } from "../types";

export const MyList = () => {
  const { myList } = useMyList();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          My List
        </h1>

        {myList.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {myList.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onSelect={handleMovieSelect}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-gray-400 text-lg mb-2">Your list is empty</div>
            <div className="text-gray-500 text-sm">
              Add movies and TV shows to your list to watch them later
            </div>
          </div>
        )}
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
