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

export const getOnlyYear = (dateString) => `(${dateString.split("-")[0]})`;

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  const lastSpaceIndex = text.lastIndexOf(" ");
  let truncatedText = text.slice(0, lastSpaceIndex);
  truncatedText += "...";
  return truncatedText;
};

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
      <h2 className="home-first-title">Best albums :</h2>
      <section className="best-album">
        {albumData.map((album) => (
          <AlbumCard
            key={album.id}
            artistNameAlbum={truncateText(album.artists[0].name, 24)}
            albumName={truncateText(album.name, 26)}
            imageAlbum={album.images[1].url}
            releaseDate={album.releaseYear}
            albumId={album.id}
            albumType="Album"
          />
        ))}
      </section>
      <h2>Team choice :</h2>
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
      <h2>Popular artists :</h2>
      <section className="popular-artist">
        {artistData.map((artist) => (
          <ArtistCard
            key={artist.id}
            artistName={truncateText(artist.name, 34)}
            imageArtist={artist.images[1].url}
            artistId={artist.id}
          />
        ))}
      </section>
    </>
  );
}

export default Home;
