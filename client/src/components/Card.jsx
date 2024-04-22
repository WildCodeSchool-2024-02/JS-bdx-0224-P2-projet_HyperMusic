import "./Card.css";

function Cards() {
  return (
    <>
      {" "}
      <figure className="artist-card">
        {" "}
        <img
          src="https://cdns-images.dzcdn.net/images/artist/c8258a5de70dcf04c43762c6182ffc5b/264x264.jpg"
          alt="artist illustration"
          className="artist-picture"
        />{" "}
        <figcaption>
          {" "}
          <h4>
            {" "}
            <strong className="artist-name">Bring Me The Horizon</strong>{" "}
          </h4>{" "}
          <h4 className="albumTitle">
            <b>Album</b>{" "}
          </h4>
          <p className="albumLength">50'</p> <p className="albumYear">2001</p>{" "}
        </figcaption>{" "}
      </figure>{" "}
      <section className="infoTrack">
        {" "}
        <img
          src="\src\assets\images\play_icon 48w.png"
          alt="Bouton play"
          className="playBtn"
        />
        <h4>1.</h4>{" "}
        <p className="trackTitle">
          <b>Track: $recupVar</b>{" "}
        </p>
        <p className="trackLength">4'42</p>{" "}
      </section>{" "}
    </>
  );
}

export default Cards;
