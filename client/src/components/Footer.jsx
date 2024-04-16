function Footer() {
  return (
    <>
      <nav className="navBarBottom">
        <img
          className="homeIcone"
          src="src\assets\images/Home.svg"
          alt="back to the homepage"
        />
        <img
          className="searchIcone"
          src="src/assets/images/Search.svg"
          alt="go to research page"
        />
        <img
          className="shuffleIcone"
          src="src/assets/images/Shuffle.svg"
          alt="go to discovery page"
        />
        <p>Home</p>
        <p>Research</p>
        <p>Discovery</p>
      </nav>
      <footer>
        <p>Terms of use</p>
        <p>Contact</p>
        <p>About us</p>
      </footer>
    </>
  );
}
export default Footer;
