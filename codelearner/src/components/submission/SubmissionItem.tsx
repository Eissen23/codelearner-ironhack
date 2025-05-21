import { Link } from "react-router";
import { SupportedLanguage } from "../../data/SupportedLanguage";
import { UserSubmission } from "../../types/content/submission.type";
import { Spinner } from "react-bootstrap";

const SubmissionItem: React.FC<{ submission: UserSubmission }> = ({
  submission,
}) => {
  const problemData = submission.problem;
  if (!problemData) {
    return (
      <div>
        <Spinner animation="grow" />
      </div>
    );
  }

  return (
    <div className="d-flex flex-wrap gap-3">
      <div className="text-primary">
        <Link to={`/user/submissions/${submission.id}`}>
          {problemData?.name}_{submission.id}
        </Link>
      </div>
      <div>
        <strong>Language:</strong>
        {
          SupportedLanguage.find((lang) => lang.code === submission.language_id)
            ?.name
        }
      </div>
      <div
        className={
          submission.result === "Accepted"
            ? "bg-success badge"
            : "bg-danger badge "
        }
      >
        <strong>Result:</strong> {submission.result}
      </div>
      <div
        className={
          submission.points > 80
            ? "text-success"
            : submission.points < 50
            ? "text-danger"
            : "text-warning"
        }
      >
        <strong>Points:</strong> {submission.points}
      </div>
      <div>
        <strong>Created At:</strong> {submission.created_at.toLocaleString()}
      </div>
    </div>
  );
};

export default SubmissionItem;
