import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <h1>Generic Recipe Platform</h1>
      <nav>
        <Link to={"/"}>Home</Link> | <Link to={"/about"}>About</Link> |
        <Link to={"/posts"}>Posts</Link>
      </nav>
    </>
  );
}
