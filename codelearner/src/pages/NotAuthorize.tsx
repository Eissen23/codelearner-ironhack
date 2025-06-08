import { useNavigate } from "react-router-dom";

const NotAuthorize = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5 text-center">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">Access Denied!</h4>
            <p>Sorry, you are not authorized to access this page.</p>
            <hr />
            <div className="mb-0">
              Please contact your administrator for access.
              <button
                onClick={() => navigate(-3)}
                className="btn btn-link d-block mx-auto"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorize;
