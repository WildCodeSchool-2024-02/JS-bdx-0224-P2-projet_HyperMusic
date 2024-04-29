
import PropTypes from "prop-types";

export default function Card({
  artistNameAlbum,
  albumName,
  imageMusic,
  albumTitle,
  albumYear,

}) {
  return (
  <figure className="alPageCard">
    <img
      src={imageMusic}
      alt="artist illustration"
      className="albumIMG"
    />
    <figcaption className="alPageDesc">
      <h4 className="artist-name">
        <strong>{artistNameAlbum}</strong><br/>
      </h4>
      <h5>
        Album: {albumName}
        </h5>
      <h4 className="alPageTitle">
        {albumTitle}
        </h4>
      <p>{albumYear}</p>
    </figcaption>
  </figure>
) 
}

Card.propTypes = {
  albumName: PropTypes.string.isRequired,
  imageMusic: PropTypes.string.isRequired,
  albumTitle: PropTypes.string.isRequired,
  albumYear: PropTypes.string.isRequired,
  artistNameAlbum: PropTypes.string.isRequired,
};