import { Alert, Button, ListGroup, Spinner } from "react-bootstrap";
import { useOutletContext } from "react-router";
import { UserDetail } from "../../../types/user.type";
import SubmissionItem from "../../submission/SubmissionItem";
import { Link } from "react-router-dom";

const YourSubmission: React.FC = () => {
  const userDetail = useOutletContext() as UserDetail | null;
  const userSubmission = userDetail?.submissions;

  if (!userSubmission) {
    return <Spinner animation="border"></Spinner>;
  }

  return (
    <div>
      <h4 className="display-6 mb-3">Your submission</h4>
      {userSubmission?.length !== 0 ? (
        <ListGroup>
          {userSubmission.map((user_sub) => (
            <ListGroup.Item>
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
