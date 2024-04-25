import "../App.css";
import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import MusicCard from "../components/MusicCard";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";
import shuffleArray from "../shuffleArray";
import artistIds from "../artistIds";
import albumIds from "../albumIds";
import musicIds from "../musicIds";

const getOnlyYear = (dateString) => `(${dateString.split("-")[0]})`;

function Home() {
  const authAccess = useLoaderData();
  const artistIdsString = artistIds.join(",");
  const albumIdsString = albumIds.join(",");
  const musicIdsString = musicIds.join(",");

  const [artistData, setArtistData] = useState([]);
  const [albumData, setAlbumData] = useState([]);
  const [musicData, setMusicData] = useState([]);

  useEffect(() => {
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
        const shuffeldAlbumsWithYear = shuffledAlbums.map((album) => ({
          ...album,
          releaseYear: getOnlyYear(album.release_date),
        }));
        setAlbumData(shuffeldAlbumsWithYear);
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
            albumId={album.id}
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
            musicId={music.album.id}
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
            artistId={artist.id}
          />
        ))}
      </section>
    </>
  );
}

export default Home;
