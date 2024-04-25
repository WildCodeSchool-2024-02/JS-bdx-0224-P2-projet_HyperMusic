import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function AlbumCard({
  artistNameAlbum,
  albumName,
  imageAlbum,
  releaseDate,
  albumId,
}) {
  return (
    <figure className="album-card">
      <Link to={`/album/${albumId}`} className="link-card" />
      <img
        src={imageAlbum}
        alt="album illustration"
        className="album-picture"
      />
      <figcaption className="album-desc">
        <strong className="artist-name">{artistNameAlbum}</strong>
        Album : {albumName} {releaseDate}
      </figcaption>
    </figure>
  );
}

AlbumCard.propTypes = {
  artistNameAlbum: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  imageAlbum: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
  albumId: PropTypes.string.isRequired,
};

AlbumCard.defaultProps = {
  releaseDate: "",
};
