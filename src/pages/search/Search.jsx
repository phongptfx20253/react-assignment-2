import React, { useState } from "react";
import SearchForm from "../../components/search/SearchForm";
import ResultList from "../../components/search/ResultList";
import Navbar from "../../components/navbar/Navbar";
import "./Search.css";

const Search = () => {
  const [searchResult, setSearchResult] = useState(null);

  const searchHandler = (result) => {
    setSearchResult(result);
  };

  return (
    <div className="search">
      <Navbar />
      <SearchForm onSearch={searchHandler} />
      {searchResult && <ResultList searchResult={searchResult} />}
    </div>
  );
};

export default Search;
