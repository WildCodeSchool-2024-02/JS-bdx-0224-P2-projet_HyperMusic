import { useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="searchbar">
      <input
        type="text"
        className="searchbarInput"
        placeholder="Rechercher une musique, un artiste..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </section>
  );
}

export default SearchBar;
