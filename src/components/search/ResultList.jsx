import React, { useState } from "react";
import MovieItem from "../movie/MovieItem";
import MovieDetail from "../movie/MovieDetail";
import "./ResultList.css";

function ResultList({ searchResult }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  const clickMovieHandler = (movie) => {
    if (selectedMovie === movie) {
      setSelectedMovie(null);
      setShowDetail(!showDetail);
    } else {
      setShowDetail(true);
      setSelectedMovie(movie);
    }
  };

  return (
    <div className="resultList">
      <div className="resultListTitle">Search Results</div>
      <div className="rlContainer">
        {showDetail && <MovieDetail movieData={selectedMovie} />}
        {searchResult &&
          searchResult.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onClick={() => clickMovieHandler(movie)}
            />
          ))}
      </div>
    </div>
  );
}

export default ResultList;
