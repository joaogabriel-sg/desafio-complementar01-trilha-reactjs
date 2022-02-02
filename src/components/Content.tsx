import { memo } from "react";
import { Header } from "./Header";
import { MoviesList } from "./MoviesList";

export function ContentComponent() {
  return (
    <div className="container">
      <Header />
      <main>
        <MoviesList />
      </main>
    </div>
  );
}

export const Content = memo(ContentComponent);
