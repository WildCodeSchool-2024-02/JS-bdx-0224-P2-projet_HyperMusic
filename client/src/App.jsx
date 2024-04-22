import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ArtistCard from "./components/ArtistCard";
import AlbumCard from "./components/AlbumCard";
import MusicCard from "./components/MusicCard";
import artistIds from "./artistIds";
import albumIds from "./albumIds";
import musicIds from "./musicIds";

function App() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const [accessToken, setAccessToken] = useState("");
  const [artistData, setArtistData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [musicData, setMusicData] = useState([]);
  const artistIdsString = artistIds.join(",");
  const albumIdsString = albumIds.join(",");
  const musicIdsString = musicIds.join(",");

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const getOnlyYear = (dateString) => `(${dateString.split("-")[0]})`;

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
      .then((data) => setAccessToken(data.access_token))
      .catch((error) => {
        console.error("Error getting token:", error);
      });

    const authAccess = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(
      `https://api.spotify.com/v1/artists?ids=${artistIdsString}`,
      authAccess
    )
      .then((result) => result.json())
      .then((data) => {
        const shuffledArtists = shuffleArray(data.artists).slice(0, 10);
        setArtistData(shuffledArtists);
      })
      .catch((error) => {
        console.error("Error fetching artist data:", error);
      });

    fetch(`https://api.spotify.com/v1/albums?ids=${albumIdsString}`, authAccess)
      .then((result) => result.json())
      .then((data) => {
        const shuffledAlbums = shuffleArray(data.albums).slice(0, 10);
        const albumsWithYear = shuffledAlbums.map((album) => ({
          ...album,
          releaseYear: getOnlyYear(album.release_date),
        }));
        setAlbumData(albumsWithYear);
      })
      .catch((error) => {
        console.error("Error fetching album data:", error);
      });

    fetch(`https://api.spotify.com/v1/tracks?ids=${musicIdsString}`, authAccess)
      .then((result) => result.json())
      .then((data) => {
        const shuffledMusics = shuffleArray(data.tracks).slice(0, 10);
        setMusicData(shuffledMusics);
      })
      .catch((error) => {
        console.error("Error fetching music data:", error);
      });
  }, []);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <h2>Albums incontournables :</h2>
      <section className="best-album">
        {albumData.map((album) => (
          <AlbumCard
            key={album.id}
            artistNameAlbum={
              album.artists[0].name.slice(0, 24) +
              (album.artists[0].name.length > 24 ? "..." : "")
            }
            albumName={
              album.name.slice(0, 26) + (album.name.length > 26 ? "..." : "")
            }
            imageAlbum={album.images[1].url}
            releaseDate={album.releaseYear}
          />
        ))}
      </section>
      <h2>Le choix de l&apos;équipe :</h2>
      <section className="team-choice">
        {musicData.map((music) => (
          <MusicCard
            key={music.id}
            artistNameMusic={music.artists[0].name}
            musicName={music.name}
            imageMusic={music.album.images[1].url}
          />
        ))}
      </section>
      <h2>Artistes à succès :</h2>
      <section className="popular-artist">
        {artistData.map((artist) => (
          <ArtistCard
            key={artist.id}
            artistName={
              artist.name.slice(0, 34) + (artist.name.length > 34 ? "..." : "")
            }
            imageArtist={artist.images[1].url}
          />
        ))}
      </section>
    </>
  );
}

export default App;
