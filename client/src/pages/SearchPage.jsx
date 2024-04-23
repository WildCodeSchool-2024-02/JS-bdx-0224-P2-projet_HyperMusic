import "../App.css";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import AlbumCard from "../components/AlbumCard";

function SearchPage() {
  const authAccess = useLoaderData();
  const [albums, setAlbums] = useState([]);

  async function searchAlbums(searchTerm) {
    const idResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`,
      authAccess
    );
    const artistData = await idResponse.json();
    const artistID = artistData.artists.items[0].id;

    const albumsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`,
      authAccess
    );
    const albumsData = await albumsResponse.json();
    setAlbums(albumsData.items);
  }

  const searchResult = searchAlbums;

  return (
    <>
      <SearchBar searchResult={searchResult} />
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          artistNameAlbum={
            album.artists[0].name.slice(0, 24) +
            (album.artists[0].name.length > 24 ? "..." : "")
          }
          albumName={
            album.name.slice(0, 26) + (album.name.length > 26 ? "..." : "")
          }
          imageAlbum={album.images[0]?.url}
          releaseDate={album.releaseYear}
        />
      ))}
    </>
  );
}

export default SearchPage;
