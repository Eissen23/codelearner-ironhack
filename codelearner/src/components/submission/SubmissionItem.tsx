import { UserSubmission } from "../../types/content/submission.type";

const SubmissionItem: React.FC<{ submission: UserSubmission }> = ({
  submission,
}) => {
  return (
    <div>
      <div>
        <strong>Submission ID:</strong> {submission.id}
      </div>
      <div>
        <strong>Language ID:</strong> {submission.language_id}
      </div>
      <div>
        <strong>Result:</strong> {submission.result}
      </div>
      <div>
        <strong>Points:</strong> {submission.point}
      </div>
      <div>
        <strong>Time (ms):</strong> {submission.time}
      </div>
      <div>
        <strong>Memory (KB):</strong> {submission.memory}
      </div>
      <div>
        <strong>User ID:</strong> {submission.user_id}
      </div>
      <div>
        <strong>Problem ID:</strong> {submission.problem_id}
      </div>
      <div>
        <strong>Created At:</strong> {submission.created_at.toLocaleString()}
      </div>
      <div>
        <strong>Updated At:</strong> {submission.updated_at.toLocaleString()}
      </div>
    </div>
  );
};

export default SubmissionItem;
