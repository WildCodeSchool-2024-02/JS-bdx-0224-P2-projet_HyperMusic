import { useState } from "react";
import PropTypes from "prop-types";

function SearchBar({ searchResult }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchResult) {
      searchResult(searchTerm);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <section className="searchbar">
      <label htmlFor="searchbarInput">
        Entrez un nom d&apos;artiste ou un album :
      </label>
      <input
        type="search"
        className="searchbarInput"
        placeholder="What do you want to listen to ?"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button type="button" onClick={handleSearch} className="search-button">
        <img
          src="..\src\assets\images\icons8-chercher (1).svg"
          alt="Result"
          className="search-icon"
        />
      </button>
    </section>
  );
}

SearchBar.propTypes = {
  searchResult: PropTypes.func.isRequired,
};

export default SearchBar;
