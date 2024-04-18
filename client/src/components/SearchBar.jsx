import { useState } from "react";
import PropTypes from 'prop-types'

function SearchBar({ searchResult }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      if (searchResult) {
        searchResult(searchTerm);
      }
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <section className="searchbar">
      <input
        type="search"
        className="searchbarInput"
        placeholder="Rechercher une musique, un artiste..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button type="button" onClick={handleSearch}>
       <img src="..\src\assets\images\icons8-chercher (1).svg" alt="Result" />
      </button>
    </section>
  );
}

SearchBar.propTypes = {
  searchResult: PropTypes.isRequired,
};

export default SearchBar;
