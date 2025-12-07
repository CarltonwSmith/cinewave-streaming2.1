import { Check, Play, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { useMyList } from "../hooks/useMyList";
import { fetchMovieDetails, getImageUrl, getTrailerKey } from "../lib/tmdb";
import type { Movie, MovieDetails } from "../types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieModal = ({ movie, isOpen, onClose }: MovieModalProps) => {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const { isInList, addToList, removeFromList } = useMyList();

  useEffect(() => {
    if (movie && isOpen) {
      setLoading(true);
      const mediaType = movie.media_type || (movie.title ? "movie" : "tv");
      fetchMovieDetails(movie.id, mediaType)
        .then(setDetails)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [movie, isOpen]);

  if (!movie) return null;

  const inList = isInList(movie.id);
  const title =
    movie.title || movie.name || movie.original_title || movie.original_name;
  const trailerKey = getTrailerKey(details?.videos);

  const handleListToggle = () => {
    if (inList) {
      removeFromList(movie.id);
    } else {
      addToList(movie);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-zinc-900 text-white border-none max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Video/Image Header */}
          <div className="relative aspect-video">
            {trailerKey ? (
              <YouTube
                videoId={trailerKey}
                opts={{
                  width: "100%",
                  height: "100%",
                  playerVars: {
                    autoplay: 1,
                    controls: 0,
                    modestbranding: 1,
                  },
                }}
                className="aspect-video"
              />
            ) : (
              <img
                src={getImageUrl(
                  movie.backdrop_path || movie.poster_path,
                  "w1280",
                )}
                alt={title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-8">
            <DialogHeader>
              <DialogTitle className="text-3xl md:text-4xl font-bold mb-4">
                {title}
              </DialogTitle>
            </DialogHeader>

            {/* Buttons */}
            <div className="flex items-center space-x-3 mb-6">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                <Play className="mr-2 h-5 w-5 fill-current" />
                Play
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-zinc-800/50 border-gray-600 hover:bg-zinc-700"
                onClick={handleListToggle}
              >
                {inList ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    In My List
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-5 w-5" />
                    Add to List
                  </>
                )}
              </Button>
            </div>

            {/* Info */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-green-500 font-semibold">
                    {Math.round(movie.vote_average * 10)}% Match
                  </span>
                  {(movie.release_date || movie.first_air_date) && (
                    <span className="text-gray-400">
                      {new Date(
                        movie.release_date || movie.first_air_date || "",
                      ).getFullYear()}
                    </span>
                  )}
                  {details?.runtime && (
                    <span className="text-gray-400">
                      {Math.floor(details.runtime / 60)}h {details.runtime % 60}
                      m
                    </span>
                  )}
                  {details?.number_of_seasons && (
                    <span className="text-gray-400">
                      {details.number_of_seasons} Season
                      {details.number_of_seasons > 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                <p className="text-gray-300 leading-relaxed">
                  {movie.overview}
                </p>
              </div>

              <div className="space-y-4 text-sm">
                {details?.genres && details.genres.length > 0 && (
                  <div>
                    <span className="text-gray-400">Genres: </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {details.genres.map((genre) => (
                        <Badge key={genre.id} variant="secondary">
                          {genre.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {details?.tagline && (
                  <div>
                    <span className="text-gray-400">Tagline: </span>
                    <span className="text-white italic">{details.tagline}</span>
                  </div>
                )}

                {details?.status && (
                  <div>
                    <span className="text-gray-400">Status: </span>
                    <span className="text-white">{details.status}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
