import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1 className="display-1 fw-bold mb-4">404</h1>
      <p className="h3 mb-4">Oops! Page not found.</p>
      <Link to="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
