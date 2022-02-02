import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "./services/api";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface MoviesContextProviderProps {
  children: ReactNode;
}

interface MoviesContextProps {
  genres: GenreResponseProps[];
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
  movies: MovieProps[];
  handleClickButton: (id: number) => void;
}

export const MoviesContext = createContext({} as MoviesContextProps);

export function MoviesContextProvider({
  children,
}: MoviesContextProviderProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );
  const [movies, setMovies] = useState<MovieProps[]>([]);

  const updateMoviesByGenreId = useCallback((id: number) => {
    api.get<MovieProps[]>(`movies/?Genre_id=${id}`).then((response) => {
      setMovies(response.data);
    });
  }, []);

  const updateSelectedGenreById = useCallback((id: number) => {
    api.get<GenreResponseProps>(`genres/${id}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, []);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, []);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    Promise.all([
      updateMoviesByGenreId(selectedGenreId),
      updateSelectedGenreById(selectedGenreId),
    ]);
  }, [selectedGenreId]);

  return (
    <MoviesContext.Provider
      value={{
        genres,
        selectedGenreId,
        movies,
        selectedGenre,
        handleClickButton,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  return useContext(MoviesContext);
}
