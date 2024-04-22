import PropTypes from "prop-types";

export default function AlbumCard({
  artistNameAlbum,
  albumName,
  imageAlbum,
  releaseDate,
}) {
  return (
    <figure className="album-card">
      <img
        src={imageAlbum}
        alt="album illustration"
        className="album-picture"
      />
      <figcaption className="album-desc">
        <strong className="artist-name-album">{artistNameAlbum}</strong>
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
};

AlbumCard.defaultProps = {
  releaseDate: "",
};
