import React from "react";
import "./MovieItem.css";

const MovieItem = ({ movie, genres, onClick }) => {
  return (
    <div
      className={genres ? "movieItem" : "movieItemOriginal"}
      onClick={onClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${
          genres
            ? movie.backdrop_path
              ? movie.backdrop_path
              : movie.poster_path
            : movie.poster_path
        }`}
        alt={movie.title}
      />
    </div>
  );
};

export default MovieItem;
