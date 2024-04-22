import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <h2 className="title-404">404 Not Found</h2>
      <Link to="/">Home from Link</Link>
    </>
  );
}
