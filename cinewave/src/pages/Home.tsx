import { useEffect, useState } from "react";
import { Banner } from "../components/Banner";
import { Header } from "../components/Header";
import { MovieModal } from "../components/MovieModal";
import { Row } from "../components/Row";
import { fetchMovies, requests } from "../lib/tmdb";
import type { Movie } from "../types";

export const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [cinewaveOriginals, setCinewaveOriginals] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [actionMovies, setActionMovies] = useState<Movie[]>([]);
  const [comedyMovies, setComedyMovies] = useState<Movie[]>([]);
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);
  const [romanceMovies, setRomanceMovies] = useState<Movie[]>([]);
  const [documentaries, setDocumentaries] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [
          trending,
          cinewave,
          rated,
          action,
          comedy,
          horror,
          romance,
          docs,
        ] = await Promise.all([
          fetchMovies(requests.fetchTrending),
          fetchMovies(requests.fetchCinewaveOriginals),
          fetchMovies(requests.fetchTopRated),
          fetchMovies(requests.fetchActionMovies),
          fetchMovies(requests.fetchComedyMovies),
          fetchMovies(requests.fetchHorrorMovies),
          fetchMovies(requests.fetchRomanceMovies),
          fetchMovies(requests.fetchDocumentaries),
        ]);

        setTrendingMovies(trending);
        setCinewaveOriginals(cinewave);
        setTopRated(rated);
        setActionMovies(action);
        setComedyMovies(comedy);
        setHorrorMovies(horror);
        setRomanceMovies(romance);
        setDocumentaries(docs);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    loadMovies();
  }, []);

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

      {/* Banner */}
      <Banner movies={cinewaveOriginals} onMovieSelect={handleMovieSelect} />

      {/* Movie Rows */}
      <div className="relative -mt-20 md:-mt-32 space-y-8 md:space-y-12 pb-12">
        <Row
          title="Trending Now"
          movies={trendingMovies}
          onMovieSelect={handleMovieSelect}
        />
        <Row
          title="Cinewave Originals"
          movies={cinewaveOriginals}
          onMovieSelect={handleMovieSelect}
        />
        <Row
          title="Top Rated"
          movies={topRated}
          onMovieSelect={handleMovieSelect}
        />
        <Row
          title="Action Movies"
          movies={actionMovies}
          onMovieSelect={handleMovieSelect}
        />
        <Row
          title="Comedy Movies"
          movies={comedyMovies}
          onMovieSelect={handleMovieSelect}
        />
        <Row
          title="Horror Movies"
          movies={horrorMovies}
          onMovieSelect={handleMovieSelect}
        />
        <Row
          title="Romance Movies"
          movies={romanceMovies}
          onMovieSelect={handleMovieSelect}
        />
        <Row
          title="Documentaries"
          movies={documentaries}
          onMovieSelect={handleMovieSelect}
        />
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
