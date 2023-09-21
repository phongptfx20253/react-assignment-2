import { useState, useEffect, useCallback } from "react";
import YouTube from "react-youtube";
import "./MovieDetail.css";

const API_KEY = "5f8c3d931e31b5bdaf73c7432f405735";

const MovieDetail = ({ movieData }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  const clickMovieHandler = useCallback(async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=${API_KEY}`
      );
      const data = await res.json();
      if (data.status_code === 34 || data.results.length === 0) {
        setTrailerKey(null);
      } else {
        const trailer = data.results.find(
          (result) =>
            result.site === "YouTube" &&
            (result.type === "Trailer" || result.type === "Teaser")
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [movieData.id]);

  useEffect(() => {
    clickMovieHandler();
  }, [clickMovieHandler]);

  const opts = {
    height: "400",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const mdTrailer = trailerKey ? (
    <div className="mdTrailer">
      {<YouTube videoId={trailerKey} opts={opts} />}
    </div>
  ) : (
    <div className="mdTrailerImg">
      <img
        className="noTrailerImg"
        src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
        alt={movieData.title}
      />
    </div>
  );

  return (
    <div className="movieDetail">
      <div className="mdContainer">
        <div className="mdInfo">
          <h2 className="mdInfoTitle">{movieData.name || movieData.title}</h2>
          <hr />
          <p>
            <strong>Release Date: {movieData.release_date}</strong>
            <br />
            <strong>Vote: {movieData.vote_average}</strong>
          </p>
          <p>{movieData.overview}</p>
        </div>
        {mdTrailer}
      </div>
    </div>
  );
};

export default MovieDetail;
