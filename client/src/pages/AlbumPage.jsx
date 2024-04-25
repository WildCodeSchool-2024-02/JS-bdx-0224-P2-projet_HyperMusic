import { useParams, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";

function AlbumPage() {
  const authAccess = useLoaderData();
  const { albumId } = useParams();
  const [albumData, setAlbumData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://api.spotify.com/v1/albums/${albumId}`, authAccess)
      .then((result) => result.json())
      .then((data) => {
        setAlbumData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching album data:", error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <article>
      <section>
        <h2>{albumData.name}</h2>
        <img src={albumData.images[1].url} alt="illustration artist" />
      </section>
    </article>
  );
}

export default AlbumPage;
