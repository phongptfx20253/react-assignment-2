import { useState, useEffect, Fragment } from "react";
import MovieItem from "./MovieItem";
import "./MovieList.css";
import MovieDetail from "./MovieDetail";

function MovieList({ endpoint, genres }) {
  const [movies, setMovies] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const THEMOVIEDB = "https://api.themoviedb.org/3/";

  const clickMovieHandler = (movie) => {
    if (selectedMovie === movie) {
      setSelectedMovie(null);
      setShowDetail(!showDetail);
    } else {
      setShowDetail(true);
      setSelectedMovie(movie);
    }
  };

  useEffect(() => {
    const fetchMoviesHandler = async () => {
      try {
        const response = await fetch(`${THEMOVIEDB}${endpoint}`);

        const data = await response.json();

        setMovies(data.results);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchMoviesHandler();
  }, [endpoint]);

  return (
    <Fragment>
      <div className="movieList">
        <div className="movieListTitle">{genres}</div>
        <div className="mlContainer">
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              genres={genres}
              onClick={() => clickMovieHandler(movie)}
            />
          ))}
        </div>
      </div>
      <div>{showDetail && <MovieDetail movieData={selectedMovie} />}</div>
    </Fragment>
  );
}

export default MovieList;
