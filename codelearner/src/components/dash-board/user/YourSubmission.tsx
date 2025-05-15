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

  if (userSubmission?.length === 0) {
    return (
      <div>
        <Alert variant="info">No submission yet.....</Alert>
        <Button className="btn btn-primary">
          <Link to={"/problems"} className="text-white text-decoration-none">
            Solve some problems to submit the submission
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <ListGroup>
        {userSubmission.map((user_sub) => (
          <ListGroup.Item>
            {" "}
            <SubmissionItem key={user_sub.id} submission={user_sub} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default YourSubmission;
