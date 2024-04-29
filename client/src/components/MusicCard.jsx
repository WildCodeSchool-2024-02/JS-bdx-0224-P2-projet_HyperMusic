import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function MusicCard({
  artistNameMusic,
  musicName,
  imageMusic,
  musicId,
}) {
  return (
    <figure className="music-card">
      <Link to={`/album/${musicId}`} className="link-card" />
      <img
        src={imageMusic}
        alt="music illustration"
        className="music-picture"
      />
      <figcaption className="music-desc">
        <strong className="artist-name">{artistNameMusic}</strong>
        Music : {musicName}
      </figcaption>
    </figure>
  );
}

MusicCard.propTypes = {
  artistNameMusic: PropTypes.string.isRequired,
  musicName: PropTypes.string.isRequired,
  imageMusic: PropTypes.string.isRequired,
  musicId: PropTypes.string.isRequired,
};
