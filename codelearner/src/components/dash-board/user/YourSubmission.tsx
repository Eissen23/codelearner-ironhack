import { Alert, Button, ListGroup, Spinner } from "react-bootstrap";
import SubmissionItem from "../../submission/SubmissionItem";
import { Link } from "react-router-dom";
import { useSubmissions } from "../../../features/hooks/submissions/useSubmissions";

const YourSubmission: React.FC = () => {
  const { submissions, loading } = useSubmissions();

  return (
    <div>
      <h4 className="fs-4  mb-3">Your submission</h4>
      {loading ? (
        <div className="d-flex justify-content-center h-100 align-content-center">
          <Spinner animation="border"></Spinner>
        </div>
      ) : submissions?.length !== 0 ? (
        <ListGroup>
          {submissions?.map((user_sub) => (
            <ListGroup.Item key={user_sub.id}>
              <SubmissionItem key={user_sub.id} submission={user_sub} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <div>
          <Alert variant="info">No submission yet.....</Alert>
          <Button className="btn btn-primary">
            <Link to={"/problems"} className="text-white text-decoration-none">
              Solve some problems to submit the submission
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default YourSubmission;
