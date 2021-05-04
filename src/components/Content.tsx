import { Header } from "./Header";
import { MoviesList } from "./MoviesList";

export function Content() {
  return (
    <div className="container">
      <Header />
      <main>
        <MoviesList />
      </main>
    </div>
  );
}
