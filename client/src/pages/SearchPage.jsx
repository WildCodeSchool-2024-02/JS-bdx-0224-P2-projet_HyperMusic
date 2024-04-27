import "../App.css";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AlbumCard from "../components/AlbumCard";
import imgWaitingChoice from "../assets/images/kitekat-cat-listening-to-music.png";
import { truncateText } from "./HomePage";

function SearchPage() {
  const authAccess = useLoaderData();
  const [albums, setAlbums] = useState([]);
  const [searchDone, setSearchDone] = useState(false);

  async function searchAlbums(searchTerm) {
    const idResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`,
      authAccess
    );
    const artistData = await idResponse.json();
    const artistID = artistData.artists.items[0].id;

    const albumsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=FR&limit=50`,
      authAccess
    );
    const albumsData = await albumsResponse.json();
    setAlbums(albumsData.items);
    setSearchDone(true);
  }

  const searchResult = searchAlbums;

  return (
    <>
      <SearchBar searchResult={searchResult} />
      {!searchDone && (
        <>
          <h2 className="title-waiting-choice">Waiting for your choice...</h2>
          <img src={imgWaitingChoice} alt="" className="img-waiting-choice" />
          <h2 className="subtitle-waiting-choice">
            Illustration by Ekaterina Rogova
          </h2>
        </>
      )}
      {searchDone && (<h2 className="title-search-result">Result of your research :</h2>)}
      <article className="search-result-container">
        <section className="search-result">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              artistNameAlbum={truncateText(album.artists[0].name, 24)}
              albumName={truncateText(album.name, 26)}
              imageAlbum={album.images[0]?.url}
              releaseDate={album.releaseYear}
              albumId={album.id}
            />
          ))}
        </section>
      </article>
    </>
  );
}

export default SearchPage;
