import "../App.css";
import { useParams } from "react-router-dom";

function AlbumPage() {
  const params = useParams();
  return <h2>Album : {params}</h2>;
}

export default AlbumPage;
