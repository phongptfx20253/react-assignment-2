import React, { useState } from "react";
import "./SearchForm.css";

const API_KEY = "5f8c3d931e31b5bdaf73c7432f405735";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=en-US`
    );

    const data = await response.json();

    onSearch(data.results);
  };

  const resetHandler = (e) => {
    setQuery("");
    window.location.replace("/search");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="SearchForm">
        <div className="sfInput">
          <input
            type="text"
            placeholder="Search movies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus="true"
          />
          <svg
            onClick={submitHandler}
            className="searchFormIcon svg-inline--fa fa-search fa-w-12"
            fill="#ccc"
            aria-hidden="true"
            data-prefix="fas"
            data-icon="search"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
          </svg>
        </div>
        <hr className="hr" />
        <div className="buttons">
          <button className="btnReset" onClick={resetHandler} type="button">
            RESET
          </button>
          <button className="btnSearch" type="submit">
            SEARCH
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
