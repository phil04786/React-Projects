import { Link, useParams } from "react-router-dom";

function ProductDetailPage() {
  const params = useParams();

  return (
    <>
      <h1>Product Details!</h1>
      {/*path: "/products/:productId"  For fetching Data from backend or react router DOM*/}
      <p>{params.productId}</p>
      <p>
        <Link to=".." relative="path">
          Back
        </Link>
      </p>
    </>
  );
}

export default ProductDetailPage;
