import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="topPage">
      <Link to="/">
        <img
          className="logo"
          src="src/assets/images/Melody-Find-removebg-preview 3.png"
          alt="back to the homepage"
        />
      </Link>
      <h1>Hypermusic</h1>
      <p>Research</p>
      <p>Discovery</p>
    </header>
  );
}
export default Header;
