import { Link } from "react-router";

const NotAuthorize = () => {
  return (
    <div className="container mt-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Access Denied!</h4>
            <p>Sorry, you are not authorized to access this page.</p>
            <hr />
            <p className="mb-0">
              Please contact your administrator for access.
            </p>
            <Link to={`/`}>HOME</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorize;
