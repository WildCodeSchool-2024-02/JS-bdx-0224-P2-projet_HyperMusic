import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import "./App.css";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  async function searchAlbums(searchTerm) {
    const searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const idResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`,
      searchParameters
    );
    const artistData = await idResponse.json();
    const artistID = artistData.artists.items[0].id;

    const albumsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`,
      searchParameters
    );
    const albumsData = await albumsResponse.json();
    setAlbums(albumsData.items);
  }

  const searchResult = searchAlbums;

  return (
    <>
      <SearchBar searchResult={searchResult} />
      {albums.map((album) => (
        <section className="cardAlbum" key={album.id}>
          <img
            className="albumImage"
            src={album.images[0]?.url}
            alt={album.name}
          />
          <h3 className="albumName">{album.name}</h3>
        </section>
      ))}
    </>
  );
}

export default App;
