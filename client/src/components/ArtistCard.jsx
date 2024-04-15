export default function ArtistCard() {
  return (
    <section className="popular-artist">
      <h2>Artistes à succès :</h2>
      <section className="artist-card">
        <img
          src="https://cdns-images.dzcdn.net/images/artist/c8258a5de70dcf04c43762c6182ffc5b/264x264.jpg"
          alt="artist illustration"
          className="artist-picture"
        />
        <p>
          Artiste : <strong className="artist-name">Meltt</strong>
        </p>
      </section>
    </section>
  );
}
