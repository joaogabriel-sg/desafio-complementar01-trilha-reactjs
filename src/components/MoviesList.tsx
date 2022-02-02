import { useMovies } from "../MoviesContext";

import { MovieCard } from "./MovieCard";

export function MoviesList() {
  const { movies } = useMovies();

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          title={movie.Title}
          poster={movie.Poster}
          runtime={movie.Runtime}
          rating={movie.Ratings[0].Value}
        />
      ))}
    </div>
  );
}
