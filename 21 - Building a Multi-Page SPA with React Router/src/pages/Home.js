import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <p>
        GO to <Link to="/products">the list of products</Link>
      </p>
    </>
  );
}

export default HomePage;
