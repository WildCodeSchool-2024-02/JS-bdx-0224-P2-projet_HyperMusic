import { useParams, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";

function ArtistPage() {
  const authAccess = useLoaderData();
  const { artistId } = useParams();
  const [artistData, setArtistData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://api.spotify.com/v1/artists/${artistId}`, authAccess)
      .then((result) => result.json())
      .then((data) => {
        setArtistData(data);
        setLoading(false);
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
    <article>
      <section>
        <h2>{artistData.name}</h2>
        <img src={artistData.images[1].url} alt="illustration artist" />
      </section>
    </article>
  );
}

export default ArtistPage;
