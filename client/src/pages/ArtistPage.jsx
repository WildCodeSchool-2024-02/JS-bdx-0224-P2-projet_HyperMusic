import { useParams, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import { getOnlyYear } from "./HomePage";
import AlbumCard from "../components/AlbumCard";

function ArtistPage() {
  const authAccess = useLoaderData();
  const { artistId } = useParams();
  const [artistData, setArtistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [albumArtistData, setAlbumArtistData] = useState({ items: [] });
  const [singleArtistData, setSingleArtistData] = useState({ tracks: [] });

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/artists/${artistId}`, authAccess)
      .then((result) => result.json())
      .then((data) => {
        setArtistData(data);
        setLoading(false);
      });

    fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, authAccess)
      .then((result) => result.json())
      .then((data) => {
        const albumWithYear = data.items.map((album) => ({
          ...album,
          releaseYear: getOnlyYear(album.release_date),
        }));
        setAlbumArtistData({ items: albumWithYear });
        setLoading(false);
        console.info(data)
      });

    fetch(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
      authAccess
    )
      .then((result) => result.json())
      .then((data) => {
        setSingleArtistData(data);
        setLoading(false);
        console.info(data);
      })
      .catch((error) => {
        console.error("Error fetching artist data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <section className="album-section">
        <h2 className="artist-name">{artistData.name}</h2>
        <img
          className="artist-page-image"
          src={artistData.images[1].url}
          alt="illustration artist"
        />
      </section>
      <h2>Albums & EPs</h2>
      <section className="best-album">
        {albumArtistData.items &&
          albumArtistData.items.map((album) => (
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
              albumType="Album"
            />
          ))}
      </section>
      <h2>Top Singles</h2>
      <section className="best-album">
        {singleArtistData.tracks &&
          singleArtistData.tracks.map((single) => (
            <AlbumCard
              key={single.id}
              artistNameAlbum={
                single.album.artists[0].name.slice(0, 26) +
                (single.album.artists[0].length > 26 ? "..." : "")
              }
              albumName={
                single.name.slice(0, 26) +
                (single.name.length > 26 ? "..." : "")
              }
              imageAlbum={single.album.images[1].url}
              albumId={single.album.id}
              albumType="Single"
            />
          ))}
      </section>
    </>
  );
}

export default ArtistPage;
