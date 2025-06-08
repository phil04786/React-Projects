import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  // const navigate = useNavigate();

  // function navigateHandler() {
  //   navigate("/products");
  // }
  return (
    <>
      <h1>Home Page</h1>
      <p>
        GO to <Link to="products">the list of products</Link>
      </p>
      <p>
        {/* <button onClick={navigateHandler}>Navigate</button>  Use link to navigate */}
      </p>
    </>
  );
}

export default HomePage;
