import "../App.css";
import { useLoaderData } from "react-router-dom";
import MusicCard from "../components/MusicCard";
import AlbumCard from "../components/AlbumCard";
import ArtistCard from "../components/ArtistCard";

function Home() {
  const { artistData, albumData, musicData } = useLoaderData();
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

export default Home;
