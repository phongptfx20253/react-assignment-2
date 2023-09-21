import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./Browse.css";
import Banner from "../../components/banner/Banner";
import MovieList from "../../components/movie/MovieList";

const THEMOVIEDB = "https://api.themoviedb.org/3/";
const API_KEY = "5f8c3d931e31b5bdaf73c7432f405735";
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};

function Browse() {
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = async () => {
    try {
      const response = await fetch(
        `${THEMOVIEDB}${requests.fetchNetflixOriginals}`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      setMovies(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  return (
    <div className="browse">
      <Navbar />
      <Banner
        key={movies.id}
        title={movies.name || movies.title}
        backdrop_path={movies.backdrop_path}
        poster_path={movies.poster_path}
        overview={movies.overview}
      />
      <MovieList endpoint={requests.fetchNetflixOriginals} />
      <MovieList endpoint={requests.fetchTrending} genres="Xu hướng" />
      <MovieList endpoint={requests.fetchTopRated} genres="Xếp hạng cao" />
      <MovieList endpoint={requests.fetchActionMovies} genres="Hành động" />
      <MovieList endpoint={requests.fetchComedyMovies} genres="Hài" />
      <MovieList endpoint={requests.fetchHorrorMovies} genres="Kinh dị" />
      <MovieList endpoint={requests.fetchRomanceMovies} genres="Lãng mạng" />
      <MovieList endpoint={requests.fetchDocumentaries} genres="Tài liệu" />
    </div>
  );
}

export default Browse;
